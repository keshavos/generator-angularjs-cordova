var <%= slugifiedE2eFolder %>Page = (function(){

    //Declare all the page elements here
    function <%= slugifiedE2eFolder %>Page(){
        this.field1 = element(by.model('field1'));
        //this.field2 = element(by.model('field2'));
        //this.btn1 = element(by.id('btn1'));
    }

    /**
     * Navigate to the <%= slugifiedE2eFolder %> page
     */
    <%= slugifiedE2eFolder %>Page.prototype.goTo<%= slugifiedE2eFolder %> = function(){
        browser.get('http://127.0.0.1:9000/#!/<%= slugifiedE2eFolder %>');
    };

    /**
    * Get value of model - field1
    */
    <%= slugifiedE2eFolder %>Page.prototype.getField1 = function(){
        return this.field1.getAttribute('value');
    };

    /**
     * Set value of model - field1
     */
    <%= slugifiedE2eFolder %>Page.prototype.setField1 = function(value){
        this.field1.sendKeys(value);
    };

    return <%= slugifiedE2eFolder %>Page;
})();

module.exports = <%= slugifiedE2eFolder %>Page;
