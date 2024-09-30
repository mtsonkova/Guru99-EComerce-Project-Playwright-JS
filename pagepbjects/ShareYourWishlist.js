const { Agent } = require("http");

class ShareYourWishList{
    constructor(page) {
        this.page = page;
        this.emailsBox = page.locator('#email_address');
        this.messageBox = page.locator('#message');
        this.btnShare = page.getByRole('button', {name:'Share Wishlist'});
    }

    async ShareYourWishlist(emailArr, msgtext) {
        if(emailArr.length > 1) {
            let emails = '';

            emailArr.forEach(element => {
                emails += element + ' ';                
            });

            emails.trimEnd;

            await this.emailsBox.fill(emails);            
        } else if(emailsArr.length === 1) {
            await this.emailsBox.fill(emailArr[0]);
        }

        await this.messageBox.fill(msgtext);
        await this.btnShare.click();
    }
}