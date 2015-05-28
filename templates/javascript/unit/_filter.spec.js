describe('<%= moduleName%>.filters: <%= classifiedName %>', function () {

    'use strict';

    var <%= classifiedName %>;

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('<%= moduleName%>'));

    beforeEach(inject(function ($filter) {
        <%= classifiedName %> = $filter('<%= camelizedName %>');
    }));

    it('should ...', function () {

    });

});
