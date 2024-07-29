class CheckoutPage{
    constructor(page) {
        this.page = page;

        //Returning customers
         this.loginEmail = page.locator('#login-email');
         this.loginPassword = page.locator('#login-password');
         this.loginBtn = page.getByRole('button', {name: 'Login'});
         this.forgotPasswordLink = page.getByRole('a', {name: 'Forgot your password?'});

        // Checkout as guest or register
        this.checkoutAsGuest = page.locaotr('#login:guest');
        this.registerAndCheckout = page.locator('#login:register');
        this.continueBtn = page.locator('#onepage-guest-register-button');

        //Billing information
        this.firstName = page.locator('#billing:firstname');
        this.middleName = page.locator('#billing:middlename');
        this.lastName = page.locator('#billing:lastname');
        this.company = page.locator('#billing:company');
        this.email = page.locator('#billing:email');
        this.address = page.locator('#billing:street1');
        this.secondAddress = page.locator('#billing:street2');
        this.city = page.locator('#billing:city');
        this.stateOrProvince = page.locator('#billing:region_id');
        this.zipPostcode = page.locator('#billing:postcode');
        this.country = page.locator('#billing:country_id');
        this.phone = page.locator('#billing:telephone');



    }

    async logIn(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }

    async selectCheckoutAsGuest() {
        await this.checkoutAsGuest.check();
        await this.continueBtn.click();
    }

    async selectRegisterAndCheckout() {
        await this.registerAndCheckout.check();
        await this.continueBtn.click();
    }
}