$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'www/app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.html'
		}).