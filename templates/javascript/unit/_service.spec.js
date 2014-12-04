'use strict';

describe('Service: <%= classifiedName %>Service', function () {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    var <%= classifiedName %>;

    beforeEach(inject(function (_<%= camelizedName %>Service_) {
        <%= classifiedName %> = _<%= camelizedName %>Service_;
    }));

    it('should ...', function () {

    });

});
