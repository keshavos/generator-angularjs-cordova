'use strict';

describe('Controller: <%= slugifiedTestFileName %>Controller', function() {

    beforeEach(module('<%= slugifiedModuleName %>'));

    var <%= slugifiedTestFileName %>Controller,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        <%= slugifiedTestFileName %>Controller = $controller('<%= slugifiedTestFileName %>Controller', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
