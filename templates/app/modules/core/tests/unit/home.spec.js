'use strict';

describe('Core.Controllers: Home', function() {

    var $rootScope,
        ctrl,
        home,
        scope;

    //Load the ui.router module
    beforeEach(module('ui.router'));

    // Load the core module
    beforeEach(module('core'));

    beforeEach(inject(function(_$rootScope_, $controller) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        ctrl = $controller('Home as home', {
            $scope: scope
        });
    }));

    it(': should vm bound to the controller', function(){
        expect(scope).toBeDefined();
    });

    it(': should verify title', function() {
        expect(scope.home.title).toBe('Home');
    });
});
