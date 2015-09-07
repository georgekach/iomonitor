/**
 * Created by george on 5/9/15.
 */
'use strict';


var net = require('net'),
    mongoose = require('mongoose'),
    config = require('./config/config');

var unitId, type, time, channels, state1 = '', lastValue1 = '', state2 = '',
    lastValue2 = '', state3 = '', lastValue3 = '', state4 = '', lastValue4 = '', gps = '';
var readingDataArray = '';
var currentReadString = '';
var Reading = mongoose.model('Reading');
var completeData = '';

var socketServer = net.createServer(function (socket) {
    //socket.write('Echo server\r\n');
    //socket.pipe(socket);



    //console.log('Data listener Ready');
    socket.on('data', function (data) {
        //socket.write(data.toString().toUpperCase())
        var receivedbytes = data.toString();
        completeData+= receivedbytes;
        console.log('Data recieved X - ' + receivedbytes.toUpperCase());
        console.log('First $ is on pos '+ receivedbytes.indexOf('$'));
        console.log('last index of $ is on pos '+receivedbytes.lastIndexOf('$'));
        console.log('len of string is '+ receivedbytes.length);
        var lastPos = receivedbytes.length -1;
        console.log('Last pos is '+ lastPos);
        if((receivedbytes.indexOf('$')== 0) &&((receivedbytes.lastIndexOf('$')== lastPos)))
        {
            console.log('Am here');


            if (completeData.indexOf('ET33') > -1) {
                console.log('saving from X '+ receivedbytes.indexOf('$'));
                parseCompleteData(completeData);
            }

        }

    });
    /*
    socket.on('end', function ( ) {
        console.log('Data recieved ' + completeData.toUpperCase());
        if (completeData.indexOf('ET33') > -1) {
            parseCompleteData(completeData);
        }
        completeData='';
    });*/
});

var parseCompleteData = function(completeData){
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

    var secondComma = completeData.indexOf(',', firstComma + 1);
    state2 = completeData.substring(firstComma + 1, firstComma + 2);
    //console.log('State2 is :'+ state2);
    lastValue2 = completeData.substring(firstComma + 2, secondComma);
    //console.log('lastValue2 is :'+ lastValue2);


    var thirdComma = completeData.indexOf(',', secondComma + 1);
    state3 = completeData.substring(secondComma + 1, secondComma + 2);
    //console.log('State3 is :'+ state3);
    lastValue3 = completeData.substring(secondComma + 2, thirdComma);
    //console.log('lastValue3 is :'+ lastValue3);

    var fourthComma = completeData.indexOf(',', thirdComma + 1);
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


};

exports.startReadingsTCPServer = function () {
     socketServer.listen(config.readingsport);
    console.log('Readings tcp server started on port'+config.readingsport);
}


