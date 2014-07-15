var <%= slugifiedE2eFolder %>Page = require('./<%= slugifiedE2eFolder %>.po.js');

describe('<%= slugifiedE2eFolder %> page tests',function(){
    var <%= slugifiedE2eFolder %>Page = new <%= slugifiedE2eFolder %>Page();

    /**
     * Before each function, load the page
     */
    beforeEach(function() {
      <%= slugifiedE2eFolder %>Page.goTo<%= slugifiedE2eFolder %>();
    });

    /**
     * Should navigate to <%= slugifiedE2eFolder %> page
     */
    it('should navigate to <%= slugifiedE2eFolder %> page by default', function(){
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:9000/#!/<%= slugifiedE2eFolder %>');
    });

    it('should... ', function(){
        //Tests
    });

});
