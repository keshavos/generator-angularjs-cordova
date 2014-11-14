'use strict';

describe('Filter: <%= classifiedName %>', function () {

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    var <%= classifiedName %>;

    beforeEach(inject(function ($filter) {
        <%= classifiedName %> = $filter('<%= camelizedName %>');
    }));

    it('should ...', function () {

    });

});
