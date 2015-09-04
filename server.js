'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function (err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(config.port);// Origional Code
app.get('server').listen(config.port);

// Expose app
exports = module.exports = app;

var net = require('net');

var socketServer = net.createServer(function (socket) {
    //socket.write('Echo server\r\n');
    //socket.pipe(socket);

    var unitId, type, time, channels, state1 = '', lastValue1 = '', state2 = '',
        lastValue2 = '', state3 = '', lastValue3 = '', state4 = '', lastValue4 = '', gps = '';
    var readingDataArray = '';
    var currentReadString = '';
    var Reading = mongoose.model('Reading');
    var completeData = '';

    //console.log('Data listener Ready');
    socket.on('data', function (data) {
        //socket.write(data.toString().toUpperCase())
        var receivedbytes = data.toString();
        completeData+= receivedbytes;
        console.log('Data recieved X - ' + receivedbytes.toUpperCase());


    });
    socket.on('end', function ( ) {
        console.log('Data recieved ' + completeData.toUpperCase());
        if (completeData.indexOf('ET33') > -1) {
            unitId = completeData.substring(1, 9);
            type = completeData.substring(9, 13);
            time = completeData.substring(13, 27);
            channels = completeData.substring(27, 29);

            /*
             console.log(chalk.green('Unit Id:'+ unitId));
             console.log(chalk.green('type:'+ type));
             console.log(chalk.green('time:'+ time));
             console.log(chalk.green('channels:'+ channels));
             */


            state1 = completeData.substring(29, 30);
            console.log('State1 is :' + state1);
            var firstComma = completeData.indexOf(',', 29);
            lastValue1 = completeData.substring(30, firstComma);
            console.log('lastValue1 is :' + lastValue1);

            var secondComma = completeData.indexOf(',', firstComma + 1)
            state2 = completeData.substring(firstComma + 1, firstComma + 2);
            //console.log('State2 is :'+ state2);
            lastValue2 = completeData.substring(firstComma + 2, secondComma);
            //console.log('lastValue2 is :'+ lastValue2);


            var thirdComma = completeData.indexOf(',', secondComma + 1)
            state3 = completeData.substring(secondComma + 1, secondComma + 2);
            //console.log('State3 is :'+ state3);
            lastValue3 = completeData.substring(secondComma + 2, thirdComma);
            //console.log('lastValue3 is :'+ lastValue3);

            var fourthComma = completeData.indexOf(',', thirdComma + 1)
            state4 = completeData.substring(thirdComma + 1, thirdComma + 2);
            //console.log('State4 is :'+ state4);
            lastValue4 = completeData.substring(thirdComma + 2, fourthComma);
            //console.log('lastValue4 is :'+ lastValue4);


            var reading = new Reading();
            reading.unitId = unitId;
            reading.type = type;
            reading.time = time;
            reading.channels = channels;
            reading.state1 = state1;
            reading.lastValue1 = lastValue1;
            reading.state2 = state2;
            reading.lastValue2 = lastValue2;
            reading.state3 = state3;
            reading.lastValue3 = lastValue3;
            reading.state4 = state4;
            reading.lastValue4 = lastValue4;
            reading.gps = gps;

            reading.save(function (err) {
                if (err) {
                    console.log('Error Saving Record' + err);
                }
                console.log('Saved record');
            });
        }

        completeData='';
    });
});

socketServer.listen(3000);

var cron = require('cron');
var cronJob = cron.job('0 */1 * * * *', function () {
    // perform operation e.g. GET request http.get() etc.

    // this cronjob aligns readings with devices
    var    readingsController = require('./app/controllers/readings.server.controller');
    if(readingsController){
        readingsController.processReadingsForDeviceID();
    }
    console.info('cron job completed');
});
cronJob.start();

var alertsCronJob = cron.job('0 */2 * * * *', function () {
    // perform operation e.g. GET request http.get() etc.

    // this cronjob aligns readings with devices
    var    readingsController = require('./app/controllers/readings.server.controller');
    if(readingsController){
        readingsController.processReadingsForAlerts();
    }
    console.info('cron job completed');
});
alertsCronJob.start();


var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kachambwa.george@gmail.com',
        pass: '7dAHgfu2s'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'George Takaedza Kachambwa ? <kachambwa.george@gmail.com>', // sender address
    to: 'kachambwa.george@gmail.com', // list of receivers
    subject: 'Hello ?', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
});

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
