/**
 * Created by George on 9/11/2015.
 */
'use strict';

angular.module('users').factory('ClientsUsers', ['$resource',
    function($resource) {
        return $resource('clientsusers/:clientId1', { clientId1: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
