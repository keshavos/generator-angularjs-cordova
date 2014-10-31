'use strict';

describe('Filter: <%= classifiedName %>', function () {

    beforeEach(module('<%= slugifiedModuleName %>').applicationModuleVendorDependencies);

    var <%= classifiedName %>;

    beforeEach(inject(function ($filter) {
        <%= classifiedName %> = $filter('<%= classifiedName %>');
    }));

    it('should ...', function () {

    });

});
