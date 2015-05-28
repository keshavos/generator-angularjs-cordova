describe('<%= moduleName%>.directives: <%= classifiedName %>', function () {

    'use strict';

    var scope,
        $compile,
        $rootScope,
        element;

    //Load the ui.router module
    beforeEach(module('ui.router'));

    //Load the module
    beforeEach(module('<%= moduleName%>'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        element = angular.element('<div></div>');
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $compile(element)($rootScope);
    }));

    it('should ...', function () {

    });
});
