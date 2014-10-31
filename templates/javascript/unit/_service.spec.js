'use strict';

describe('Service: <%= classifiedName %>Service', function () {

    beforeEach(module('<%= slugifiedModuleName %>').applicationModuleVendorDependencies);

    var <%= classifiedName %>;

    beforeEach(inject(function (<%= camelizedName %>Service) {
        <%= classifiedName %> = <%= camelizedName %>Service;
    }));

    it('should ...', function () {

    });

});
