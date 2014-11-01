'use strict';

describe('Service: <%= classifiedName %>Service', function () {

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    var <%= classifiedName %>;

    beforeEach(inject(function (_<%= camelizedName %>Service_) {
        <%= classifiedName %> = _<%= camelizedName %>Service_;
    }));

    it('should ...', function () {

    });

});
