class BillingGuestUserPage{
   
    constructor(page) {
        this.page = page;
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
        this.continueBtn = page.getByRole('button', {name: 'Continue'});
       
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

    async enterAddress(address) {
        await this.address.fill(address);        
    }

    async enterSecondAddress(address) {
        await this.secondAddress.fill(address);        
    }

    async entrCity(cityName){
        await this.city.fill(cityName);
    }

    async selectStateOrProvince(name){
        await this.stateOrProvince.selectOption(name);
    }

    async enterZIPPostCode(code) {
        await this.zipPostcode.fill(code);
    }

    async selectCountry(countryName) {
        await this.country.selectOption(countryName);
    }

    async enterPhoneNumber(phone) {
        await this.phone.fill(phone);
    }

    async enterFax(number) {
        await this.fax.fill(number);
    }

    async clickShipToAddressCheckbox() {
        await this.shipToAddressCheckbox.check();
    }

    async clickShipToDifferentAddresCheckbox() {
        await this.shipToDifferentAddresCheckbox.check();
    }

    async clickBtnContinue() {
        await this.continueBtn.click();
    }
}

module.exports = {BillingGuestUserPage};