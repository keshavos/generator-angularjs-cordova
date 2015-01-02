'use strict';

describe('Directive: <%= classifiedName %>', function () {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    var scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should ...', inject(function () {

    }));
});
