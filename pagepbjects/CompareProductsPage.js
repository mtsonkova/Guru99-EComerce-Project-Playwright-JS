class CompareProductsPage{
    constructor(popupPage) {
        this.popupPage = popupPage;
        this.productsCards = popupPage.locator('tr.product-shop-row.top h2 a');
    }

    async getProductsNames() {
        await this.productsCards.first().waitFor();
        let comparedDevicesNames = await this.productsCards.allTextContents();       
     
       return Array.from(comparedDevicesNames);

    }
}

module.exports = {CompareProductsPage};