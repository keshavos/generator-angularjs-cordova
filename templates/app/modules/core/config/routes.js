(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name core.config:Coreconfig
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
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the path is `'/'`, route to state:home
         * */
        $stateProvider
            .state(home);
    };

})();
