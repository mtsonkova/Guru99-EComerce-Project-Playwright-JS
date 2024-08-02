class ShippingInformatonPage{
    constructor(page) {
        //Shipping information form
        this.page = page;
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
        this.btnContinue =  page.locator('button:visible :text("Continue")');
    }
}

module.exports = {ShippingInformatonPage};