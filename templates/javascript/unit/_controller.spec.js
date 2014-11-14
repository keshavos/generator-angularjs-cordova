'use strict';

describe('Controller: <%= classifiedName %>Controller', function() {

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    var <%= classifiedName %>Controller,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        <%= classifiedName %>Controller = $controller('<%= classifiedName %>Controller', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
