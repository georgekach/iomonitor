/**
 * Created by George on 11/6/2015.
 */
'use strict';

angular.module('devices').filter('mydevicesfilter', [
    function() {
        return function(input) {
            // Clientsfilter directive logic
            // ...

            return input.deviceId.match(/^Ma/) ? true : false;
        };
    }
]);
