(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name <%= slugifiedModuleName %>.config
     * @requires ng.$stateProvider
     * @description Defines the routes and other config within the <%= slugifiedModuleName %> module
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .config(moduleStateConfig);

    moduleStateConfig.$inject = ['$stateProvider'];

    function moduleStateConfig($stateProvider) {
        /**
         * @ngdoc event
         * @name <%= slugifiedModuleName %>.config.route
         * @eventOf <%= slugifiedModuleName %>.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'<%= slugifiedName %>'`, route to <%= slugifiedRoutePath %>
         *
         */
        var <%= slugifiedName %> = {
            name: '<%= slugifiedName %>',
            url: '/<%= slugifiedRoutePath %>',
            templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
            controller: '<%= classifiedControllerName %>Controller'
        };

        $stateProvider
            .state(<%= slugifiedName %>);
    };

})();
