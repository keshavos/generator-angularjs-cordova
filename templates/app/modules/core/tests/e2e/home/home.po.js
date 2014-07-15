var homePage = (function(){

    //Declare all the page elements here
    function homePage(){
        this.heading = element(by.id('app-heading'));
        this.homeh1 = element(by.id('home-h1'));
        this.homeContent = element(by.id('home-content'));


    }

    /**
     * Navigate to the login page
     */
    homePage.prototype.goToHome = function(){
        browser.get('http://127.0.0.1:9000/#!/');
    };

    /**
    * Get app heading element
    */
    homePage.prototype.getAppHeading = function(){
        return this.heading.getText('value');
    };


    /**
    * Get homepage heading element
    */
    homePage.prototype.getHomeHeading = function(){
        return this.homeh1.getText('value');
    };

    /**
    * Get homepage content element
    */
    homePage.prototype.getHomeContent = function(){
        return this.homeContent.getText('value');
    };



    return homePage;
})();

module.exports = homePage;
