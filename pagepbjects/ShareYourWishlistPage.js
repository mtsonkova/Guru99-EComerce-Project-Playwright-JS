class ShareYourWishListPage {
    constructor(page) {
        this.page = page;
        this.emailsBox = page.locator('#email_address');
        this.messageBox = page.locator('#message');
        this.btnShare = page.getByRole('button', { name: 'Share Wishlist' });
    }

    async ShareYourWishlist(emailArr, msgtext) {
        if (emailArr.length > 1) {
            let emails = '';

            for (let i = 0; i < emailArr.length - 1; i++) {
                emails += emailArr[i] + ', ';
            }

            emails += emailArr[emailArr.length - 1];

            await this.emailsBox.fill(emails);
        } else if (emailsArr.length === 1) {
            await this.emailsBox.fill(emailArr[0]);
        }

        await this.messageBox.fill(msgtext);
        await this.btnShare.click();
    }
}

module.exports = { ShareYourWishListPage };