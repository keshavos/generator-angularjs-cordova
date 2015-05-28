/**
         * @ngdoc event
         * @name <%= slugifiedModuleName %>.config:routes#<%= slugifiedName %>
         * @eventOf <%= slugifiedModuleName %>.config:routes
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'<%= slugifiedName %>'`, route to <%= slugifiedRoutePath %>
         *
         * - Controller: {@link <%= slugifiedModuleName %>.controllers:<%= classifiedControllerName %> <%= classifiedControllerName %>}
         *
         */
        var <%= slugifiedName %> = {
            name: '<%= slugifiedName %>',
            url: '/<%= slugifiedRoutePath %>',
            templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
            controller: '<%= classifiedControllerName %>'
        };

        $stateProvider
            .state(<%= slugifiedName %>)
            .
