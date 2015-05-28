describe('<%= moduleName%>.Controllers: <%= classifiedName %>', function() {

    'use strict';

    var scope,
        ctrl,
        <%= classifiedName %>;

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('<%= classifiedName %> as <%= classifiedName %>', {
            $scope: scope
        });
    }));

    it(': should verify vm and methods available on vm', function() {
        expect(angular.isFunction(scope.<%= classifiedName %>.method1)).toBeTruthy();
        expect(angular.isFunction(scope.<%= classifiedName %>.method2)).toBeTruthy();
    });

    it(': should ', function() {
        //
    });
});
