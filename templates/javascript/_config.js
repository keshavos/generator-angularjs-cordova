(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name <%= slugifiedModuleName %>.config:<%= classifiedName %>
     * @description Custom config for the <%= slugifiedModuleName %> module
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .config(userConfig);

    /**
     * @ngdoc event
     * @name <%= slugifiedModuleName %>.config#userConfig
     * @eventOf <%= slugifiedModuleName %>.config
     */
    function userConfig() {
    };

})();
