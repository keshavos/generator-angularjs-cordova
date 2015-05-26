(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>
     * @description <%= classifiedName %> Service
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .service('<%= classifiedName %>', <%= classifiedName %> );

    function <%= classifiedName %> () {

        return {
            method1: method1,
            method2: method2
        }

        /**
         * @ngdoc function
         * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>#method1
         * @methodOf <%= slugifiedModuleName %>.services:<%= classifiedName %>
         * @return {boolean} Returns a boolean value
         */
        function method1() {
            return true;
        }

        /**
         * @ngdoc function
         * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>#method2
         * @methodOf <%= slugifiedModuleName %>.services:<%= classifiedName %>
         * @return {boolean} Returns a boolean value
         */
        function method2() {
            return false;
        }
    }

})();
