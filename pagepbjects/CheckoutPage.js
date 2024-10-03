const { BillingGuestUserPage } = require("./BillingGuestUserPage");
const {ShippingInformatonPage} = require("./ShippingInformationPage");

class CheckoutPage{
    constructor(page) {
        this.page = page;

        //Returning customers
         this.loginEmail = page.locator('#login-email');
         this.loginPassword = page.locator('#login-password');
         this.loginBtn = page.getByRole('button', {name: 'Login'});
         this.forgotPasswordLink = page.getByRole('a', {name: 'Forgot your password?'});

        // Checkout as guest or register
        this.checkoutAsGuest = page.locator('#login:guest');
        this.registerAndCheckout = page.locator('#login:register');
       
        // this.continueBtn = page.getByRole('button', {name: 'Continue'});
        this.btnContinue =  page.locator('button:visible :text("Continue")');
        
        //shipping information
        this.shippingInformation = new ShippingInformatonPage(this.page);
       
        //Shipping method
        this.tax = page.locator('dd label span.price');

        //Payment method
        this.creditCardRadioBtn = page.locator('#p_method_ccsave');
        this.cashMoneyRadioBtn = page.locator('#p_method_checkmo');

        //Credit card data
        this.creditCardName = page.locator('#ccsave_cc_owner');
        this.creditCardType = page.locator('#ccsave_cc_type');
        this.creditcardNumber = page.locator('#ccsave_cc_number');
        this.month = page.locator('#ccsave_expiration');
        this.year = page.locator('#ccsave_expiration_yr');
        this.ccv = page.locator('#ccsave_cc_cid');

        //Order Review
        this.billingAddress = page.locator('#billing-progress-opcheckout');
        this.shippingMetod = page.locator('#shipping_method-progress-opcheckout');
        this.shippingAddress = page.locator('#shipping-progress-opcheckout');
        this.paymentMethod = page.locator('#payment-progress-opcheckout');
        this.products = page.locator('table#checkout-review-table tbody tr');
        this.btnPlaceOrder = page.getByRole('button', {name: 'Place Order'});
        this.editCart = page.locator('#review-buttons-container a');
    }

    async logIn(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }

    async clickOnContinueBtn() {
        await this.btnContinue.click();
    }

    async selectCheckoutAsGuest() {
        await this.checkoutAsGuest.check();
        return new BillingGuestUserPage(this.page);
    }

    async selectRegisterAndCheckout() {
        await this.registerAndCheckout.check();
       return new BillingWithUserRegistrationPage(this.page);
    }

    async selectBillingInformationSameAddress() {
        await this.page.getByLabel('Ship to this address').click();
        await this.clickOnContinueBtn();
    }

    async selectBillingInformationDifferentAddress() {
        await this.page.getByLabel('Ship to different address').click();
        await this.clickOnContinueBtn();
    }

    async selectPaymentMethodCash() {
        await this.cashMoneyRadioBtn.click();
        await this.clickOnContinueBtn();
    }

    async clickPlaceOrder() {
        await this.btnPlaceOrder.click();
    }
   
    async checkoutAsLoggedInUser() {
        await this.selectBillingInformationSameAddress();
        await this.clickOnContinueBtn();
        await this.selectPaymentMethodCash();
        await this.clickPlaceOrder();
    }
}

module.exports = {CheckoutPage};