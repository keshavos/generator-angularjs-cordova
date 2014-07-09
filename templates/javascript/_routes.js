'use strict';

//Setting up route
angular.module('<%= slugifiedModuleName %>').config(['$stateProvider',
    function($stateProvider) {
        // <%= humanizedModuleName %> state routing
        $stateProvider.
        state('<%= slugifiedName %>', {
            url: '/<%= slugifiedRoutePath %>',
            templateUrl: 'app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
            controller: '<%= classifiedControllerName %>Controller'
        });
    }
]);
