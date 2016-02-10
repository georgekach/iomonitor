/**
 * Created by george on 5/9/15.
 */
'use strict';



/**
 * Module init function.
 */


var cron = require('cron');

exports.startReadingsDeviceIdCronJob = function(io){

    //console.log('io value is '+ io);

    var readingsDeviceIdCronJob = cron.job('0 */1 * * * *', function () {
        // perform operation e.g. GET request http.get() etc.

        // this cronjob aligns readings with devices
        var readingsController = require('./app/controllers/readings.server.controller');
        if (readingsController) {
            readingsController.processReadingsForDeviceID(io);
        }
        //console.info('cron job completed');
    });
    readingsDeviceIdCronJob.start();



};

exports.startAlertsCronJob = function(){
    var alertsCronJob = cron.job('0 */2 * * * *', function () {
        // perform operation e.g. GET request http.get() etc.

        // this cronjob aligns readings with devices 
        var readingsController = require('./app/controllers/readings.server.controller');
        if (readingsController) {
            readingsController.processReadingsForAlerts();
        }
        console.info('cron job completed');
    });
    alertsCronJob.start();
};

