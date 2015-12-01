/**
 * Created by george on 5/9/15.
 */
'use strict';


var net = require('net'),
    mongoose = require('mongoose'),
    config = require('./config/config');
/*var re = require('./app/models/reading.server.model.js');
 var devw = require('./app/models/device.server.model.js');
 var sa= require('./app/models/devicesensoralert.server.model.js');
 var notfj = require('./app/models/notification.server.model.js');*/
var unitId, type, time, channels, state1 = '', lastValue1 = '', state2 = '',
    lastValue2 = '', state3 = '', lastValue3 = '', state4 = '', lastValue4 = '', gps = '';
var readingDataArray = '';
var currentReadString = '';
var Reading = mongoose.model('Reading');
var Device = mongoose.model('Device');
var Devicesensoralert = mongoose.model('Devicesensoralert');
var Notification = mongoose.model('Notification');
var User = mongoose.model('User');

var completeData = '';

module.exports = function (io) {

    console.log('The value of ios from the readings tcp server are ' + io);

    var socketServer = net.createServer(function (socket) {
        //socket.write('Echo server\r\n');
        //socket.pipe(socket);


        //console.log('Data listener Ready');

        socket.on('data', function (data) {
            //socket.write(data.toString().toUpperCase())
            var receivedbytes = data.toString();
            completeData += receivedbytes;
            console.log('Data recieved X - vv' + receivedbytes.toUpperCase());
            console.log('First $ is on pos ' + receivedbytes.indexOf('$'));
            console.log('last index of $ is on pos ' + receivedbytes.lastIndexOf('$'));
            console.log('len of string is ' + receivedbytes.length);
            var lastPos = receivedbytes.length - 1;
            console.log('Last pos is ' + lastPos);
            /*if ((receivedbytes.indexOf('$') == 0) && ((receivedbytes.lastIndexOf('$') == lastPos))) {
             console.log('Am here');*/


            if (completeData.indexOf('ET33') > -1) {
                console.log('saving from X ' + receivedbytes.indexOf('$'));
                parseCompleteData(completeData);
                completeData = '';
            }

            //}

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

    var parseCompleteData = function (completeData) {
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

            Device.findOne({'deviceId': reading.unitId}).populate({path: 'user sensors'}).exec(function (err2, device) {
                var options = {
                    path: 'sensors.sensoralerts',
                    model: 'Devicesensoralert'
                };
                //var actions = device.sensors[0].sensoralerts[0].alertactions[0];
                //console.log('Sensor @ 0 is ' + actions);

                if (err2) {
                    console.log('error finding the device');

                } else {

                    if (device) {
                        reading.device = device._id;
                        reading.save(function (err3) {
                            if (err3) {
                                console.log('error saving the record');
                            } else {
                                console.log('saved the reading from inside receiving the readings' + reading._id);
                            }


                        });
                    }
                    else {
                        console.log('error saving the record could not match the device id');
                    }
                    if (device) {
                        //device.previousreadingtime = device.latestreadingtime;
                        device.latestreadingtime = reading.time;
                        device.latestreadingchannels = reading.channels;
                        device.latestreadingstate1 = reading.state1;
                        device.latestreadinglastValue1 = reading.lastValue1;
                        device.latestreadingstate2 = reading.state2;
                        device.latestreadinglastValue2 = reading.lastValue2;
                        device.latestreadingstate3 = reading.state3;
                        device.latestreadinglastValue3 = reading.lastValue3;
                        device.latestreadingstate4 = reading.state4;
                        device.latestreadinglastValue4 = reading.lastValue4;
                        device.latestreadinggps = reading.gps;

                        //+device.deviceId
                        //console.log(io);
                        /*
                        io.sockets.emit('pushdata', {
                            readingtime: new Date().getTime(),
                            sensor1: reading.lastValue1,
                            sensor2: reading.lastValue2,
                            sensor3: reading.lastValue3,
                            sensor4: reading.lastValue4,
                            device: device.deviceId
                        });
                        console.log(reading.lastValue1);
*/
                        device.save(function (err4) {
                            if (err4) {
                                console.log('Error Saving Devices latest Reading');
                            }

                            //socket.io to emit data here
                            var previousdatetime = Date.parse(device.previousreadingtime);
                            var currentdatetime = Date.parse(device.latestreadingtime);

                            //if(currentdatetime>previousdatetime)
                            // {

                            //var data = getRandomInt(0,100);


                            //}
                        });

                        //process reading for alerts

                        if (device.sensors) {


                            console.log('found some sensors proceeding to loop through them');

                            device.sensors.forEach(function (sensor) {

                                console.log('looping through sensors');

                                if (sensor.sensoralerts) {
                                    console.log('found some sensor alerts for sensor ' + sensor.name + ' proceeding to loop through them ' + sensor.sensoralerts.length);

                                    sensor.sensoralerts.forEach(function (sensoralert) {
                                        console.log('continuing loop through them');
                                        if (sensoralert) {
                                            if (sensoralert.alertactions) {
                                                console.log('found some sensor alert alarm action proceeding to loop through them');
                                                sensoralert.alertactions.forEach(function (alertaction) {
                                                    console.log('proceeding to loop through them [sensor alert alarm action]');
                                                    if (alertaction) {
                                                        console.log('alert action with name is being considered' + alertaction.name);

                                                        if (sensor.channel.indexOf('1') > -1) {
                                                            if ((reading.lastValue1 < alertaction.thresholdvaluemin) || (reading.lastValue1 > alertaction.thresholdvaluemax)) {
                                                                createNotification(device, sensor, sensoralert, reading.lastValue1, alertaction);
                                                                console.log('Compare the channel 1 readings .... value is out of range' + reading.lastValue1);
                                                            }
                                                            else {
                                                                console.log('All is OK');
                                                            }

                                                        }


                                                        if (sensor.channel.indexOf('2') > -1) {
                                                            if ((reading.lastValue2 < alertaction.thresholdvaluemin) || (reading.lastValue2 > alertaction.thresholdvaluemax)) {
                                                                console.log('Compare the channel 2 readings .... value is out of range' + reading.lastValue2);
                                                            }
                                                            else {
                                                                console.log('All is OK');
                                                            }
                                                        }

                                                        if (sensor.channel.indexOf('3') > -1) {
                                                            if ((reading.lastValue3 < alertaction.thresholdvaluemin) || (reading.lastValue3 > alertaction.thresholdvaluemax)) {
                                                                console.log('Compare the channel 3 readings .... value is out of range' + reading.lastValue3);
                                                            }
                                                            else {
                                                                console.log('All is OK');
                                                            }
                                                        }

                                                        if (sensor.channel.indexOf('4') > -1) {
                                                            if ((reading.lastValue4 < alertaction.thresholdvaluemin) || (reading.lastValue4 > alertaction.thresholdvaluemax)) {
                                                                console.log('Compare the channel 4 readings .... value is out of range' + reading.lastValue4);
                                                            }
                                                            else {
                                                                console.log('All is OK');
                                                            }
                                                        }

                                                    }
                                                    else {
                                                        console.log('Cant work with a null alertaction');
                                                    }

                                                });

                                            } else {
                                                console.log('The alert has no alarm actions');
                                            }
                                        }
                                        else {
                                            console.log('cannot work with null sensor alert');
                                        }
                                    });

                                } else {
                                    console.log('can work with a null array of sensor alerts');
                                }
                                //}
                                //});

                            });


                        }

                    }
                    else {
                        console.log('Cant find the device');
                    }


                }
                //});

                //});
            });

        });
    };

    var createNotification = function (device, sensor, alert, reading, alertaction) {
        var notificationmessage = 'Device ' + device.name + ' [' + device.deviceId + '] sensor ' + sensor.name + 'has raised alert ' + alert.name + ' with value' + reading + ' required range is [' + alertaction.thresholdvaluemin + ' - ' + alertaction.thresholdvaluemax + ' ]';

        var newNotification = new Notification();
        newNotification.action = alertaction.actiontype;
        newNotification.message = notificationmessage;
        newNotification.timeofoccurance = Date.now();
        newNotification.notificationtype = 'device';
        newNotification.processed = false;
        newNotification.haserrors = false;
        newNotification.errormessages = '';
        newNotification.created = Date.now();

        User.findById(alertaction.usertonotify, function (err, user) {
            //console.log('looking for the user');
            if (user) {
                if (alertaction.actiontype === 'email') {
                    newNotification.actionaddress = user.email;
                }
                if (alertaction.actiontype === 'text') {
                    newNotification.actionaddress = user.cellnumber;
                }
                if (alertaction.actiontype === 'phone') {
                    newNotification.actionaddress = user.phonenumber;
                }
                if (alertaction.actiontype === 'alert') {

                    newNotification.actionaddress = user.id;
                }

                newNotification.save(function (err) {
                    if (err) {
                        console.log('Error saving notification record' + err);
                    }

                    //console.log('Notification record saved');

                });
            }
            else {
                console.log('unable to find user');
            }
        });


        console.log(notificationmessage);
    };

    return socketServer;
};
