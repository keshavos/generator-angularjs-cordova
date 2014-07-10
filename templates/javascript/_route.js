$stateProvider.
state('<%= slugifiedName %>', {
    url: '/<%= slugifiedRoutePath %>',
    templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
    controller: '<%= classifiedControllerName %>Controller'
}).
