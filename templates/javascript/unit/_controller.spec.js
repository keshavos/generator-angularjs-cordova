'use strict';

describe('Controller: <%= classifiedControllerName %>Controller', function () {

  // load the controller's module
  beforeEach(module('<%= slugifiedModuleName %>'));

  var <%= classifiedControllerName %>Controller,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= classifiedControllerName %>Controller = $controller('<%= classifiedControllerName %>Controller', {
      $scope: scope
    });
  }));


});
