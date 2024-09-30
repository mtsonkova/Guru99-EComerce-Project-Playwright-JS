const { Agent } = require("http");

class ShareYourWishList{
    constructor(page) {
        this.page = page;
        this.emailsBox = page.locator('#email_address');
        this.messageBox = page.locator('#message');
        
    }
}