(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name core.config:routes
     * @requires ng.$stateProvider
     * @requires ng.$urlRouterProvider
     * @description Defines the routes and other config within the core module
     */
    angular
        .module('core')
        .config(Coreconfig);

    Coreconfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Coreconfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'modules/core/views/home.html',
            controller: 'Home'
        };

        /**
         * @ngdoc event
         * @name core.config:routes#route1
         * @eventOf core.config:routes
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'home'`, route to '/''
         *
         * - Controller: {@link core.controllers:Home Home}
         *
         */
        $stateProvider
            .state(home);
    };

})();
