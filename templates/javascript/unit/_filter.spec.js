'use strict';

describe('Filter: <%= slugifiedTestFileName %>', function () {

    beforeEach(module('<%= slugifiedModuleName %>'));

    var <%= slugifiedTestFileName %>;

    beforeEach(inject(function ($filter) {
        <%= slugifiedTestFileName %> = $filter('<%= slugifiedTestFileName %>');
    }));

    it('should ...', function () {

    });

});
