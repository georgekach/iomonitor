/**
 * Created by George on 9/10/2015.
 */
'use strict';

angular.module('readings').factory('ReadingsInPeriod', ['$resource',
    function($resource) {
        return $resource('readingsbydeviceforperiod/:myId1/:startOfPeriod/:endOfPeriod', { myId: '@_id',startOfPeriod:'@startOfPeriod',endOfPeriod:'@endOfPeriod'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
