class ReusableProductsFunctions {
    constructor(page) {
        this.page = page;
        this.sort = page.locator('select');
        this.btnAddToWishlist = page.getByRole('a', {name : 'Add to Wishlist'});
        this.btnAddToCompare = page.getByRole('a', {name : 'Add to Compare'});
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

    async clickAddToCart(device) {
        await device.getByRole('button', {name: 'Add to Cart'}).click();
    }

    async clickAddToWishList() {
        await this.btnAddToWishlist.click();
    }

    async clickAddToCompare() {
        await this.btnAddToCompare.click();
    }

    static compareTwoProductArrays(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
}

module.exports = {ReusableProductsFunctions};