$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedName %>.html',
            controller: '<%=classifiedControllerName %>Controller'
		}).