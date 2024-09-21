class CompareProductsPage{
    constructor(page) {
        this.page = page;
        this.productsCards = page.locator('tr.product-shop-row.top h2 a');
    }

    async getProductsNames() {
        let nameArr = await this.productsCards.allTextContents();
      
        
        console.log(nameArr);

    }
}

module.exports = {CompareProductsPage};