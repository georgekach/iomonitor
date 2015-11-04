/**
 * Created by George on 9/28/2015.
 */

'use strict';
var re = require('./app/models/alert.server.model.js');
var devw = require('./app/models/notification.server.model.js');
var re = require('./app/models/user.server.model.js');

var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');
var Alert = mongoose.model('Alert');
var User = mongoose.model('User');

var cron = require('cron');

exports.startNotificationsCronJob = function (io) {

    console.log('io value is ' + io);

    var notificationsCronJob = cron.job('0 */1 * * * *', function () {
        // perform operation e.g. GET request http.get() etc.

        // this cronjob aligns readings with devices
        Notification.find({processed: false}, function (err, unprocessedNotifications) {

            //console.log('Need to process' + unprocessedNotifications.length)
            unprocessedNotifications.forEach(function (notification) {

                switch (notification.action) {
                    case 'email':
                        console.log('send the email message');
                        break;
                    case  'text':

                        console.log('send the text message');
                        break;
                    case 'phone':

                        console.log('call the user');
                        break;

                    case 'alert':
                        //console.log('create the alert for the user');
                        var newAlert = new Alert();
                        newAlert.message = notification.message;
                       newAlert.dateofoccurence = notification.timeofoccurance;
                        newAlert.alerttype = notification.notificationtype;

                        User.findOne({_id: notification.actionaddress}, function(error,userdetail){
                           //console.log('Yippie Found the user');
                            if(error)
                            {
                                console.log('Error Locating user record '+ error);
                            }
                            newAlert.belongsto = userdetail;
                            newAlert.save(function(errsaving){
                               if(errsaving)
                               {
                                   console.log('Error Saving newAlert '+errsaving)
                               }
                            });
                        });

                        break;

                }


                notification.processed = true;
                notification.save(function (errorsaving) {
                    if (errorsaving) {
                        console.log('error saving '+ errorsaving);
                    }
                });
            });
        });

        //console.info('cron job completed');
    });
    notificationsCronJob.start();


};
