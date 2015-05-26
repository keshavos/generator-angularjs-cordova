(function() {

    'use strict';

    /**
     * @ngdoc controller
     * @name <%= slugifiedModuleName %>.controllers:<%= classifiedName %>
     * @description <%= classifiedName %> controller
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .controller('<%= classifiedName %>', <%= classifiedName %>);

    function <%= classifiedName %>() {
        var vm = this;

        vm.method1 = method1;
        vm.method2 = method2;

        /**
         * @ngdoc function
         * @name @name <%= slugifiedModuleName %>.controllers:<%= classifiedName %>#method1
         * @methodOf @name <%= slugifiedModuleName %>.controllers:<%= classifiedName %>
         * @description <%= slugifiedModuleName %> controller method
         */
        function method1() {

        }

        /**
         * @ngdoc function
         * @name @name <%= slugifiedModuleName %>.controllers:<%= classifiedName %>#method2
         * @methodOf @name <%= slugifiedModuleName %>.controllers:<%= classifiedName %>
         * @description <%= slugifiedModuleName %> controller method2
         */
        function method2() {

        }
    }

})();
