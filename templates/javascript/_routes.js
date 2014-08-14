'use strict';

/**
* @ngdoc object
* @name <%= slugifiedModuleName %>.config
* @requires ng.$stateProvider
* @description Defines the routes and other config within the <%= slugifiedModuleName %> module
*/
angular
    .module('<%= slugifiedModuleName %>')
    .config(['$stateProvider',
        function($stateProvider) {
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
            $stateProvider
                .state('<%= slugifiedName %>', {
                    url: '/<%= slugifiedRoutePath %>',
                    templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
                    controller: '<%= classifiedControllerName %>Controller'
                });
        }
    ]);
