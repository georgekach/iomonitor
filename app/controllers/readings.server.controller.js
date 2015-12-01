'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Reading = mongoose.model('Reading'),
    Device = mongoose.model('Device'),
    Devicesensor = mongoose.model('Devicesensor'),
    Devicesensoralert = mongoose.model('Devicesensoralert'),
    Devicesensoralarmaction = mongoose.model('Devicesensoralarmaction'),
    _ = require('lodash');

/**
 * Create a Reading
 */
exports.create = function (req, res) {
    var reading = new Reading(req.body);
    reading.user = req.user;

    reading.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(reading);
        }
    });
};

/**
 * Show the current Reading
 */
exports.read = function (req, res) {
    res.jsonp(req.reading);
};

/**
 * Update a Reading
 */
exports.update = function (req, res) {
    var reading = req.reading;

    reading = _.extend(reading, req.body);

    reading.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(reading);
        }
    });
};

/**
 * Delete an Reading
 */
exports.delete = function (req, res) {
    var reading = req.reading;

    reading.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(reading);
        }
    });
};

/**
 * List of Readings
 */
exports.list = function (req, res) {
    Reading.find().exec(function (err, readings) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(readings);
        }
    });
};

/**
 * Reading middleware
 */
exports.readingByID = function (req, res, next, id) {
    Reading.findById(id).exec(function (err, reading) {
        if (err) return next(err);
        if (!reading) return next(new Error('Failed to load Reading ' + id));
        req.reading = reading;
        next();
    });
};

/**
 * Reading authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.reading.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};

/**
 * Reading middleware
 */
exports.readingByDeviceID = function (req, res) {
    Reading.find({device: req.params.myId}).exec(function (err, readings) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(readings);
        }
    });
};

/**
 * Readings for a specific device for a period
 *
 */
exports.readingByDeviceIDForPeriod = function (req, res) {


    var endDate = new Date(req.params.endOfPeriod);
     /* var startDate = endDate.getDate()-20;*/

    var startDate = new Date(req.params.startOfPeriod);
    console.log(req.params.startOfPeriod);
    console.log(req.params.endOfPeriod);
    console.log(startDate);
    console.log(endDate);
//req.params.startOfPeriod
    // req.params.endOfPeriod
    Reading.find({device: req.params.myId1,created:{$gte:startDate,$lt: endDate}}).exec(function (err, readings) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(readings);
        }
    });
};
/**
 <<<<<<< HEAD
 * Upload a Reading
 */

/*
 var reading = new Reading(req.body);
 reading.user = req.user;

 reading.save(function(err) {
 if (err) {
 return res.status(400).send({
 message: errorHandler.getErrorMessage(err)
 });
 } else {
 res.jsonp(reading);
 }
 });
 */

// Processing reading for DeviceId

exports.processReadingsForDeviceID = function (io) {

    console.log('processing readings for Device Id');

    Reading.find({device: {'$exists': false}}, function (err, readings) {
            if (err) {

                console.log('error here');
            }
            else {

                readings.forEach(function (item) {

                    console.log('reading readings ...' + item.unitId);
                    Device.findOne({'deviceId': item.unitId}, function (err2, device) {
                        if (err2) {
                            console.log('error finding the device');

                        } else {

                            item.device = device._id;
                            item.save(function (err3) {
                                if (err3) {
                                    console.log('error saving the record');
                                } else {
                                    console.log('saved the reading '+item._id);
                                }
                            });
                            if (device) {
                                device.previousreadingtime = device.latestreadingtime;
                                device.latestreadingtime = item.time;
                                device.latestreadingchannels = item.channels;
                                device.latestreadingstate1 = item.state1;
                                device.latestreadinglastValue1 = item.lastValue1;
                                device.latestreadingstate2 = item.state2;
                                device.latestreadinglastValue2 = item.lastValue2;
                                device.latestreadingstate3 = item.state3;
                                device.latestreadinglastValue3 = item.lastValue3;
                                device.latestreadingstate4 = item.state4;
                                device.latestreadinglastValue4 = item.lastValue4;
                                device.latestreadinggps = item.gps;
                            }
                            else {
                                console.log('Cant find the device');
                            }
                                //+device.deviceId
                            console.log(io);
                            io.sockets.emit('pushdata', {readingtime:new Date().getTime(),readingvalue: item.lastValue1});
                            console.log(item.lastValue1);

                            if (device) {
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
                            }
                        }

                    });
                    console.log(item.time);

                });


            }
        }
    );
};
/**
 * Process Readings to check for whether an alert can be raised or not
 */

exports.processReadingsForAlerts = function () {

    console.log('processing readings for alerts');

    Reading.find({processed: {'$exists': false},deviceId:{'$exists':true}}).populate('device').exec( function (err, readings) {
            if (err) {

                console.log('error here');
            }
            else {

                readings.forEach(function (item) {

                    console.log('reading readings for alerts processing ...' + item.unitId);
                    Devicesensor.find({'deviceId': item.device._id}, function (err2, devicesensors) {


                        if(err2){
                            console.log('error finding the device sensors'+err2.toString());
                        }
                        else {
                            if(devicesensors)
                            {
                                console.log('found some sensors proceeding to loop through them');

                                devicesensors.forEach(function(sensor){

                                    console.log('looping through sensors');

                                    Devicesensoralert.find({'devicesensorId':sensor._id}).populate('alarmactions').exec(function(err3,sensoralerts){
                                       if(err3)
                                       {
                                           console.log('Error finding the sensor alerts');

                                       }
                                        else{
                                           if(sensoralerts)
                                           {
                                               console.log('found some sensor alerts for sensor '+sensor.name+' proceeding to loop through them ' +sensoralerts.length);

                                               sensoralerts.forEach(function(sensoralert){
                                                   console.log('continuing loop through them');
                                                   if(sensoralert)
                                                   {
                                                       if(sensoralert.alarmactions){
                                                           console.log('found some sensor alert alarm action proceeding to loop through them');
                                                           sensoralert.alarmactions.forEach(function(alertaction){
                                                               console.log('proceeding to loop through them [sensor alert alarm action]');
                                                               if(alertaction){
                                                                console.log('alert action with name is being considered'+alertaction.name);

                                                               }
                                                               else{
                                                                   console.log('Cant work with a null alertaction');
                                                               }

                                                           });

                                                       }else{
                                                            console.log('The alert has no alarm actions');
                                                       }
                                                   }
                                                   else{
                                                       console.log('cannot work with null sensor alert');
                                                   }
                                               });

                                           }else{
                                               console.log('can work with a null array of sensor alerts');
                                           }
                                       }
                                    });

                                });

                            }
                            else{
                                console.log('Cant process a null sensor');
                            }
                        }

                    });


                });


            }
        }
    );
};


/* * Upload readings from devices
 */

exports.uploadReading = function (req, res) {
    var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
    socketio.sockets.emit('reading.received', req.param('reading'));// emit an event for all connected clients
    res.jsonp({reading: req.param('reading')});
};

