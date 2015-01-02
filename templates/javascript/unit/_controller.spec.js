'use strict';

describe('Controller: <%= classifiedName %>Controller', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

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
