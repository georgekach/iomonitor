/**
 * Created by George on 11/6/2015.
 */
'use strict';

angular.module('devices').filter('paginateFrom', [
    function() {
        return function(data,start) {
            // Clientsfilter directive logic
            // ...

            return data.slice(start);
        };
    }
]);
