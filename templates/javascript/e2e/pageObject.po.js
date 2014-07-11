var <%= slugifiedE2eFolder %> = (function(){

    //Declare all the page elements here
    function <%= slugifiedE2eFolder %>Page(){
        this.username = element(by.model('user.username'));
        this.password = element(by.model('user.password'));
        this.loginButton = element(by.id('btn-login'));
    }

    /**
     * Navigate to the <%= slugifiedE2eFolder %> page
     */
    loginPage.prototype.goToLogin = function(){
        browser.get('http://127.0.0.1:9000/#!/<%= slugifiedE2eFolder %>');
    };

    /**
    * Get value within the username field
    * @return {[type]} [description]
    */
    loginPage.prototype.getUsername = function(){
        return this.username.getAttribute('value');
    };

    /**
     * Set username field
     */
    loginPage.prototype.setUsername = function(username){
        this.username.sendKeys(username);
    };

    /**
     * Get the value within the password field
     * @return {string} password field value
     */
    loginPage.prototype.getPassword = function(){
        return this.password.getAttribute('value');
    };

    /**
     * Set Password
     * @param  {string} password password string
     */
    loginPage.prototype.setpassword = function(password){
        this.password.sendKeys(password);
    };

    return loginPage;
})();

module.exports = loginPage;
