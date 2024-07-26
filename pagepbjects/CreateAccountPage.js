class CreateAccountPage{
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#firstname');
        this.middleName = page.locator('#middlename'); //not required
        this.lastName = page.locator('#lastname');
        this.email = page.locator('#email_address');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmation');
        this.signUpForNewsletter = page.locator('#is_subscribed');  
        this.btnRegister = page.getByRole('button', {name: 'Register'});
      }

      async enterFirstName(firstName) {
        await this.firstName.fill(firstName);
      }

      async enterMiddleName(middleName) {
        await this.middleName.fill(middleName);
      }

      async enterLastName(lastName) {
        await this.lastName.fill(lastName);
      }

      async enterEmail(email) {
        await this.email.fill(email);
      }

      async enterPassword(pass) {
        await this.password.fill(pass);
      }

      async enterConfirmPassword(pass) {
        await this.confirmPassword.fill(pass);
      }

      async clickSignForNewsLetter() {
        await this.signUpForNewsletter.check();
      }

      async clickOnRegisterBtn() {
        await this.btnRegister.click();
      }

      async registerWithValidDataAllFields(firstName, middleName, lastName, password) {

      }
}