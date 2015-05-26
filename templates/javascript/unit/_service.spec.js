describe('<%= moduleName%>.services: <%= classifiedName %>', function() {

    'use strict';

    var <%= classifiedName %> ;

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    beforeEach(inject(function(_<%= camelizedName %>_) {
        <%= classifiedName %> = _<%= camelizedName %>_;
    }));

    it(': should validate methods on the service', function() {
        expect(angular.isFunction(<%= classifiedName %>.method1)).toBeTruthy();
        expect(angular.isFunction(<%= classifiedName %>.method2)).toBeTruthy()
    });

    it(': should return true when method1 is called', function() {
        expect(<%= classifiedName %>.method1()).toBeTruthy();
    });

    it(': should return false when method2 is called', function() {
        expect(<%= classifiedName %>.method2()).toBeFalsy();
    });

});
