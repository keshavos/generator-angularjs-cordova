'use strict';

/**
 * @ngdoc filter
 * @name <%= slugifiedModuleName %>.Filters.<%= camelizedName %>
 * @description <%= camelizedName %> filter
 */
angular
    .module('<%= slugifiedModuleName %>')
    .filter('<%= camelizedName %>', [

        function() {
            return function(input) {

                return '<%= camelizedName %> filter: ' + input;
            };
        }
]);
