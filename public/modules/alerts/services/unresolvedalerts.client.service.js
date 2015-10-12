/**
 * Created by George on 9/30/2015.
 */
'use strict';

angular.module('alerts').factory('UnresolvedAlerts', ['$resource',
    function($resource) {
        return $resource('unresolvedalerts/:alerttype', { userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
