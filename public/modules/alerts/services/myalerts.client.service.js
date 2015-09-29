/**
 * Created by George on 9/28/2015.
 */
'use strict';

angular.module('alerts').factory('MyAlerts', ['$resource',
    function($resource) {
        return $resource('myalerts/:userId', { userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
