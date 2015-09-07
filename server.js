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

var socketServer = require('./server.readings.tcp');

socketServer.startReadingsTCPServer();



var cronjobs = require('./servercron');
cronjobs.startReadingsDeviceIdCronJob();
cronjobs.startAlertsCronJob();




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
//transporter.sendMail(mailOptions, function (error, info) {
 //   if (error) {
 //       console.log(error);
 //   } else {
 //       console.log('Message sent: ' + info.response);
 //   }
//});

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
