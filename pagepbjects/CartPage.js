class CartPage {
    constructor(page) {
        this.page = page;
        //cart
        this.productsTable = page.locator('table#shopping-cart-table');
        this.allProductsInCart = this.productsTable.locator('tbody tr');
        this.productName = page.locator('h2 a');
        this.productSKU = page.locator('div.product-cart-sku span');
        this.productQTY = page.locator('input[title="Qty"]');
        this.productSubtotal = page.locator('product-cart-total span.price');
        this.deleteBtn = page.locator('.product-cart-remove a');
        this.emptyCartBtn = page.locator('#empty_cart_button');
        this.updateShoppingCart = page.getByRole('button', { name: 'Update Shopping Cart' });
        //this.updateShoppingCart = page.locator('button[title="Update Shopping Cart"]');
        this.continueShoppingBtn = page.locator('.btn-continue');
        this.shoppingCartSuccessMsg = page.locator('.success-msg');
        this.shoppingCartErrMsg = page.locator('.error-msg span');
        this.productErrMsg = page.locator('p.error');

        //discount section
        this.discountField = page.locator('#coupon_code');
        this.applyBtn = page.getByRole('button', { name: 'Apply' });

        //estimate shipping and tax
        this.selectCountry = page.locator('#country');
        this.stateProvince = page.locator('#region');
        this.ZIPCode = page.locator('#postcode');
        this.estimateBtn = page.getByRole('button', { name: 'Estimate' });

        //shopping cart totals table
        this.cartTotals = page.locator('#shopping-cart-totals-table');
        this.grandTotalPrice = this.cartTotals.locator('td').nth(2);
        this.proceedToCheckoutBtn = this.cartTotals.locator('.btn-proceed-checkout');
        this.checkoutMultipleAddresses = page.locator('.method-checkout-cart-methods-multishipping')
    }

    /*
    async getAllProductsInCart() {
        return await this.allProductsInCart;
    }
    */

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductSQU() {
        return await this.productSKU.textContent();
    }


    async getProductQty() {
        return await this.productQTY.textContent();
    }

    async changeProductQty(nameOfProduct, qty) {
        let currentRow;
        let qtyField;
        let productsCount = await this.allProductsInCart.count();
        for (let i = 0; i < productsCount; i++) {
            currentRow = this.allProductsInCart.nth(i);
            let currentName = await currentRow.locator('td h2 a').textContent();
            if (currentName.trim() === nameOfProduct) {
                qtyField = currentRow.locator('td.product-cart-actions input');
                await qtyField.fill(qty);
                await this.updateCart();
                break;
            }
        }
    }

    async getProductErrMsg(nameOfProduct) {
        let productsCount = await this.allProductsInCart.count();
        for (let i = 0; i < productsCount; i++) {
            let currentRow = this.allProductsInCart.nth(i);
            let currentName = await currentRow.locator('td h2 a').textContent();
            if (currentName.trim() === nameOfProduct) {
                await expect('p.error').toBeVisible()
                return await this.page.locator('p.error').textContent();

            }
        }
    }

    async getProductSubtotal() {
        return await this.productSubtotal.textContent();
    }

    async removeProductFromCart(productName) {
        if (this.allProductsInCart.size() === 1) {
            await this.deleteBtn.click();
        } else {
            for (let i = 0; i < this.allProductsInCart.size(); i++) {
                let currentProduct = await this.allProductsInCart.nth(i)
                let currentProductName = await currentProduct.getProductName();
                if (currentProductName === productName) {
                    await currentProduct.this.deleteBtn.click();
                    break;

                }
            }
        }
    }

    async getCartSuccessMsg() {
        return await this.shoppingCartSuccessMsg.textContent();
    }

    async getCartErrMsg() {
        return await this.shoppingCartErrMsg.textContent();
    }

    async removeAllProductsFromCart() {
        await this.emptyCartBtn.click();
    }

    async updateCart() {
        await this.updateShoppingCart.click();
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }

    async enterDiscountCoupon(discountCode) {
        await this.discountField.fill(discountCode);
    }

    async clickBtnApply() {
        await this.applyBtn.click();
    }

    async selectcCountry(countryName) {
        await this.selectCountry.selectOption(countryName);
    }

    async selectStateProvince(stateProvinceName) {
        await this.selectStateProvince.fill(stateProvinceName);
    }

    async enterZIP(ZIP) {
        await this.ZIPCode.fill(ZIP);
    }

    async clickEstimateBtn() {
        await this.estimateBtn.click();
    }

    async getGrandTotalPrice() {
        return await this.grandTotalPrice.textContent();
    }

    async clickOnProceedToCheckoutBtn() {
        await this.proceedToCheckoutBtn.click();
    }

    async clikcCheckoutMultipleAddresses() {
        await this.checkoutMultipleAddresses.click();
    }
}

module.exports = { CartPage };