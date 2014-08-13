'use strict';

angular.module('<%= slugifiedModuleName %>').provider('<%= classifiedName %>', function () {

    this.name = 'Default';

    this.$get = function() {
        var self = this;
        return {
            sayHello: function() {
                return "Hello, " + self.name + "!"
            }
        }
    };

    this.setName = function(name) {
        this.name = name;
    };

});
