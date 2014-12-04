'use strict';

describe('Filter: <%= classifiedName %>', function () {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    var <%= classifiedName %>;

    beforeEach(inject(function ($filter) {
        <%= classifiedName %> = $filter('<%= camelizedName %>');
    }));

    it('should ...', function () {

    });

});
