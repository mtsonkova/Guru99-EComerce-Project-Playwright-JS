class MyWishlistPage {
    constructor(page) {
        this.page = page;
        this.textarea = page.locator('textarea');
        this.btnUpdateWishList = page.getByRole('button', {name: "UPDATE WISHLIST"}).first;
        this.btnDelete = page.locator('.btn-remove');
        this.edit = page.getByText('Edit');
        this.btnAddToCart = page.getByRole('button', {name: 'ADD TO CART'});
        this.btnAddAllToCart = page.getByRole('button', {name: "ADD ALL TO CART"});
        this.btnShareWishlist = page.getByRole('button', {name: "SHARE WISHLIST"});
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

    async clickOnAddToCart() {
        await this.btnAddToCart.click();
    }

    async clickShareWishListBtn() {
        await this.btnShareWishlist.click();
    }
}

module.exports = {MyWishlistPage};