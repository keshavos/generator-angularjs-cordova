'use strict';

/**
 * @ngdoc service
 * @name <%= slugifiedModuleName %>.Services.<%= classifiedName %>
 * @description <%= classifiedName %> Factory
 */
angular
    .module('<%= slugifiedModuleName %>')
    .factory('<%= classifiedName %>',
        function() {
            return {

                /**
                 * @ngdoc function
                 * @name <%= slugifiedModuleName %>.Services.<%= classifiedName %>#method1
                 * @methodOf <%= slugifiedModuleName %>.Services.<%= classifiedName %>
                 * @return {boolean} Returns a boolean value
                 */
                method1: function() {
                    return true;
                },

                /**
                 * @ngdoc function
                 * @name <%= slugifiedModuleName %>.Services.<%= classifiedName %>#method2
                 * @methodOf <%= slugifiedModuleName %>.Services.<%= classifiedName %>
                 * @return {boolean} Returns a boolean value
                 */
                method2: function() {
                    return false
                }
            };
    });
