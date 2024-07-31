const { BillingGuestUserPage } = require("./BillingGuestUserPage");

class BillingWithUserRegistrationPage extends BillingGuestUserPage{
    constructor(page) {
        super(page);

        this.password = page.locator('#billing:customer_password');
        this.confirmPassword = page.locator('#billing:confirm_password');
        
    }

    async enterPassword(pass) {
        await this.password.fill(pass);
    }

    async enterConfirmPassword(pass) {
        await this.confirmPassword.fill(pass);
    }
}