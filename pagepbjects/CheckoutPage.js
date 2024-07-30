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
        this.fax = page.locator('#billing:fax');
        this.shipToAddressCheckbox = page.locator('#billing:use_for_shipping_yes');
        this.shipToDifferentAddresCheckbox = page.locator('billing:use_for_shipping_no');
        this.billingContinueBtn = page.getByRole('button', {name:'Continue'});
        
        //Register user during purchase
        this.password = page.locator('#billing:customer_password');
        this.confirmPassword = page.locator('#billing:confirm_password');

        //Shipping information form
        this.shippingFirstName = page.locator('#shipping:firstname');
        this.shippingMiddleName = page.locator('#shipping:middlename');
        this.shippingLastName = page.locator('#shipping:lastname');
        this.shippingCompany = page.locator('#shipping:company');
        this.shippingAddress = page.locator('#shipping:street1');
        this.shippingAddress2 = page.locator('#shipping:street2');
        this.shippingCity = page.locator('#shipping:city');
        this.shippingStateProvince = page.locator('#shipping:region_id');
        this.shippingZIPOrPostal = page.locator('#shipping:postcode');
        this.shippingCountry = page.locator('#shipping:country_id');
        this.shippingPhone = page.locator('#shipping:telephone');
        this.shippingFax = page.locator('#shipping:fax');

        this.useBillingAddressCheckbox = page.locator('#shipping:same_as_billing');
        this.shippingContinueBtn = page.getByRole('button', {name:'Continue'});

        //Shipping method
        this.tax = page.locator('dd label span.price');


        this.btnContinue = page.locatore('button:visible :text("Continue")');

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
        this.editCart = page.locator('#review-buttons-container a')
        



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