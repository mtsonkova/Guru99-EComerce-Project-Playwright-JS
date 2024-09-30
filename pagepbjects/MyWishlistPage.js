class MyWishlistPage{
    constructor(page) {
        this.page = page;
        this.textarea = page.locator('textarea');
        this.btnUpdateWishList = page.getByRole('button', {name: "Update Wishlist"}).first;
        this.btnDelete = page.locator('.btn-remove');
        this.edit = page.getByText('Edit');
        this.btnAddAllToCart = page.getByRole('button', {name: "Add All to Cart"});
        this.btnShareWishlist = page.getByRole('button', {name: "Share Wishlist"});
    }

    async fillInWishListTextArea(text) {
        await this.textarea.fill(text);
        await this.btnUpdateWishList.click();
    }

    async clickOnDeleteBtn() {
        await this.btnDelete.click();
    }

    async clickOnEditBtn() {
        await this.edit.click();
    }

    async clickOnAddAllToCart() {
        await this.btnAddAllToCart.click();
    }

    async clickShareWishListBtn() {
        await this.btnShareWishlist.click();
    }
}

module.exports = {MyWishlistPage};