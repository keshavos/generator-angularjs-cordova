'use strict';

angular.module('<%= slugifiedModuleName %>').factory('<%= classifiedName %>',

    function() {
        // <%= classifiedName %> factory logic

        return {
            method1 : function() {
                return true;
            },

            method2 : function(){
                return false
            }
        };
    });
