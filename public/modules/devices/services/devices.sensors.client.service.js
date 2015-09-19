/**
 * Created by George on 9/17/2015.
 */
'use strict';
//Devices Sensor service used to communicate Devices sensors REST endpoints

angular.module('devices').factory('DeviceSensor', ['$resource',
    function($resource) {
        return $resource('devicesensor/:sensId', { sensId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
