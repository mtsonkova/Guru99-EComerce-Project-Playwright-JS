class ReusableProductsFunctions {
    constructor(page) {
        this.page = page;
        this.sort = page.locator('select');
    }

    async sortByPostion() {
        await this.sort.selectOption('Position');
    }

    async sortByName() {
        await this.sort.selectOption('Name');
    }

    async sortByName() {
        await this.sort.selectOption('Price');
    }

    async clickAddToCart(device) {
        await device.getByRole('button', { name: 'Add to Cart' }).click();
    }

    async clickAddToWishList() {
        await this.btnAddToWishlist.click();
    }

    async clickAddToCompare(device) {
        await device.getByRole('link', {name: 'Add to Compare'}).click();
    }
}

module.exports = { ReusableProductsFunctions };