(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name <%= slugifiedModuleName %>.values:<%= classifiedName %>
     * @description Define a value
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .value('<%= classifiedName %>', 42);

})();
