/**
 * Created by George on 9/27/2015.
 */
'use strict';

var coremodule = angular.module('core');

coremodule.directive('restrict',['Authentication', function(Authentication){
        return{
            restrict: 'A',
            priority: 100000,
            scope: false,
            link: function(){
                //alert('ergo sum!');
            },
            compile:  function(element, attr, linker){
                var accessDenied = true;
                var user = Authentication.user;//authService.getUser();


                var attributes = attr.access.split(' ');
                for(var i in attributes){
                    //if(user.role === attributes[i]){
                      //  accessDenied = false;
                    //}
                    if(user.roles)
                    if(user.roles.indexOf(attributes[i])>-1)
                    {
                        accessDenied = false;
                    }
                }


                if(accessDenied){
                    element.children().remove();
                    element.remove();
                }

            }
        };
    }]);

