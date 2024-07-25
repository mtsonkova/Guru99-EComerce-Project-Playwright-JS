class ReusableProductsFunctions {
    constructor(page) {
        this.page = page;
        this.sort = page.locator('select');
        this.btnAddToCart = page.getByRole(button, {name : 'Add to Cart'});
        this.btnAddToWishlist = page.getByRole(a, {name : 'Add to Wishlist'});
        this.btnAddToCompare = page.getByRole(a, {name : 'Add to Compare'});
    }

    async sortByPostion(){
        await this.sort.selectOption('Position');
    } 

    async sortByName(){
        await this.sort.selectOption('Name');
    } 

    async sortByName(){
        await this.sort.selectOption('Price');
    } 

    async clickAddToCart() {
        await this.btnAddToCart.click();
    }

    async clickAddToWishList() {
        await this.btnAddToWishlist.click();
    }

    async clickAddToCompare() {
        await this.btnAddToCompare.click();
    }
}

module.exports = {ReusableProductsFunctions};