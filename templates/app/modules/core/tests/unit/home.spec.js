'use strict';

describe('HomeController', function() {

    var HomeController, scope;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function($controller, $rootScope) {

        scope = $rootScope.$new();

        HomeController = $controller('HomeController', {
            $scope : scope
        });
    }));

    //Tests
    it('should have scope bound to the controller', function(){
        expect(scope).toBeDefined();
    });
});
