'use strict';

describe('Controller: <%= slugifiedTestFileName %>Controller', function() {

    // load the controller's module
    beforeEach(module('<%= slugifiedModuleName %>'));

    var <%= slugifiedTestFileName %> Controller,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new(); <%= slugifiedTestFileName %> Controller = $controller('<%= slugifiedTestFileName %>Controller', {
            $scope: scope
        });
    }));

    //Tests
    it('should..', function() {

    });


});
