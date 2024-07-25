class CartPage{
    constructor(page) {
        this.page = page;
        //cart
        this.productName = page.locator('h2 a');
        this.productSKU = page.locator('div.product-cart-sku span');
        this.productQTY = page.locator('input[title="Qty"]');
        this.productSubtotal = page.locator('product-cart-total span.price');
        this.deleteBtn = page.locator('.product-cart-remove a');
        this.editBtn = page.locator('Edit');
        this.emptyCartBtn = page.locator('#empty_cart_button');
        this.updateShoppingCart = page.locator('button[title="Update Shopping Cart"]');
        this.continueShoppingBtn = page.locator('.btn-continue');
        
        //discount section
        this.discountField = page.locator('#coupon_code');
        this.applyBtn = page.getByRole('button', {name: 'Apply'});
        
        //estimate shipping and tax
        this.selectCountry = page.locator('#country');
        this.stateProvince = page.locator('#region');
        this.ZIP = page.locator('#postcode');
        this.estimateBtn = page.getByRole('button', {name: 'Estimate'});

        //shopping cart totals table
        this.cartTotals = page.locator('#shopping-cart-totals-table');
        this.grandTotalPrice = this.cartTotals.locator('td').nth(2);
        this.proceedToCheckoutBtn = this.cartTotals.locator('.btn-proceed-checkout');
        this.checkoutMultipleAddresses = page.locator('.method-checkout-cart-methods-multishipping')
    }

    async getProductName(){
        return await this.productName.textContent();
    }

    async getProductSQU() {
        return await this.productSKU.textContent();
    }

    async getProductQty() {
        return await this.productQTY.textContent();
    }

    async changeProductQty(number) {
        await this.productQTY.fill(number);
    }
}

module.exports = {CartPage};