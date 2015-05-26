(function() {

    'use strict';

    /**
     * @ngdoc object
     * @name core.controllers:Home
     * @description Controller for the home page
     */
    angular
        .module('core')
        .controller('Home', Home);

    function Home() {
        var vm = this;
        vm.title = 'Home';
    };

})();
