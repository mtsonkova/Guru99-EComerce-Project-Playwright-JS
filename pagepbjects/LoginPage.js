class LoginPage{
    constructor(page){
        this.page = page;
        this.email = page.locator('#email');
        this.password = page.locator('#pass');
        this.btnLogin = page.locator('#send2');
        this.forgotPassword = page.locator('a.f-left');
        this.createAccount = page.locator('.buttons-set a');
    }

    async enterEmail(email) {
        await this.email.fill(email);
    }

    async enterPassword(pass) {
        await this.password.fill(pass);
    }

    async clickBtnLogin() {
        await this.btnLogin.click();
    }

    async clickForgotPassword() {
        await this.forgotPassword.click();
    }

    async clickCreateAccount(){
        await this.createAccount.click();
    }

    async loginWithValidCredentials(email, pass) {
        await this.enterEmail(email);
        await this.enterPassword(pass);
        await this.clickBtnLogin();
    }
}

module.exports = {LoginPage};