$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html',
            controller: '<%= classifiedControllerName %>Controller'
		}).