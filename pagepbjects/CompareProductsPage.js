class CompareProductsPage{
    constructor(page) {
        this.page = page;
        this.productsCards = page.locator('.product-shop-row.top');
    }

    async getProductsNames() {
        let nameArr = [];
       let size =  await this.productsCards.size();
        
        console.log(size);

    }
}

module.exports = {CompareProductsPage};