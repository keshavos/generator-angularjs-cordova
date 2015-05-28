(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>
     * @description <%= classifiedName %> Provider
     */
    angular
        .module('<%= slugifiedModuleName %>')
        .provider('<%= classifiedName %>', <%= classifiedName %>);

    function <%= classifiedName %> () {

        /**
         * @ngdoc property
         * @name <%= slugifiedModuleName %>.Providers.<%= classifiedName %>#name
         * @propertyOf <%= slugifiedModuleName %>.Providers.<%= classifiedName %>
         * @type {String}
         */
        this.name = 'Default';

        /**
         * @ngdoc function
         * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>#$get
         * @methodOf <%= slugifiedModuleName %>.services:<%= classifiedName %>
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
             * @name <%= slugifiedModuleName %>.services:<%= classifiedName %>#setName
             * @methodOf <%= slugifiedModuleName %>.services:<%= classifiedName %>
             * @return {string} Returns the name property
             */
            this.setName = function(name) {
                this.name = name;
            };
        };
    };

})();
