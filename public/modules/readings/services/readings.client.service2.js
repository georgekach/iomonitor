/**
 * Created by George on 9/10/2015.
 */
'use strict';

angular.module('readings').factory('Readings2', ['$resource',
    function($resource) {
        return $resource('readingsbydevice/:myId', { myId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
