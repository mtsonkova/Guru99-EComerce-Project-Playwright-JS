class CheckoutPage{
    constructor(page) {
        this.page = page;

        //Returning customers
         this.loginEmail = page.locator('#login-email');
         this.loginPassword = page.locator('#login-password');
         this.loginBtn = page.getByRole('button', {name: 'Login'});
         this.forgotPasswordLink = page.getByRole('a', {name: 'Forgot your password?'});



    }

    async logIn(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }
}