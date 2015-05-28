(function() {

    'use strict';

    /**
     * @ngdoc filter
     * @name <%= slugifiedModuleName %>.filters:<%= camelizedName %>
     * @description <%= camelizedName %>
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .filter('<%= camelizedName %>', <%= camelizedName %>);

    function <%= camelizedName %> () {
        return function(input) {
            return '<%= camelizedName %> filter: ' + input;
        };
    }

})();
