'use strict';

/**
 * @ngdoc service
 * @name <%= slugifiedModuleName %>.Providers.<%= classifiedName %>
 * @description <%= classifiedName %> Provider
 */
angular
    .module('<%= slugifiedModuleName %>')
    .provider('<%= classifiedName %>',
        function() {

            /**
             * @ngdoc property
             * @name <%= slugifiedModuleName %>.Providers.<%= classifiedName %>#name
             * @propertyOf <%= slugifiedModuleName %>.Providers.<%= classifiedName %>
             * @type {String}
             */
            this.name = 'Default';

            /**
             * @ngdoc function
             * @name <%= slugifiedModuleName %>.Providers.<%= classifiedName %>#$get
             * @methodOf <%= slugifiedModuleName %>.Providers.<%= classifiedName %>
             * @return {boolean} Returns an intialized string
             */
            this.$get = function() {
                var self = this;
                return {
                    sayHello: function() {
                        return "Hello, " + self.name + "!"
                    }
            };

            /**
             * @ngdoc function
             * @name <%= slugifiedModuleName %>.Providers.<%= classifiedName %>#setName
             * @methodOf <%= slugifiedModuleName %>.Providers.<%= classifiedName %>
             * @return {string} Returns the name property
             */
            this.setName = function(name) {
                this.name = name;
            };
        };
    });
