var <%= slugifiedE2eFolder %>Page = require('./<%= slugifiedE2eFolder %>.po.js');

describe('<%= slugifiedE2eFolder %> page tests',function(){
    var <%= slugifiedE2eFolder %>page = new <%= slugifiedE2eFolder %>Page();

    /**
     * Before each function, load the default landing page of the app
     */
    beforeEach(function() {
      browser.get('http://127.0.0.1:9000/');
    });

    /**
     * Should navigate to <%= slugifiedE2eFolder %> page
     */
    it('should navigate to login page by default', function(){
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:9000/#!/<%= slugifiedE2eFolder %>');
    });

    /**
     * Should display error message when the email field is left blank
     */
    it('should display error if email is empty', function(){
        loginpage.goToLogin();
        loginpage.setUsername('test');
        loginpage.username.clear();
    });

});
