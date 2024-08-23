class CartPage {
    constructor(page) {
        this.page = page;
        //cart
        this.productsTable = page.locator('table#shopping-cart-table');
        this.allProductsInCart = this.productsTable.locator('tbody tr');
      
        this.emptyCartBtn = page.locator('#empty_cart_button');
        this.updateShoppingCart = page.getByRole('button', { name: 'Update Shopping Cart' });
        
        this.continueShoppingBtn = page.locator('.btn-continue');
        this.cartMessages = page.locator('ul.messages')
        this.shoppingCartErrMsg = this.page.locator('li.error-msg ul li span');
       
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

    async changeProductQty(nameOfProduct, qty) {
        try {
            let currentRow;
            let qtyField;
            let productsCount = await this.allProductsInCart.count();
            
            for (let i = 0; i < productsCount; i++) {
                currentRow = this.allProductsInCart.nth(i);
                let currentNameLocator = currentRow.locator('td h2 a');
                let currentName = await currentNameLocator.textContent();
                if (currentName.trim() === nameOfProduct) {
                    qtyField = currentRow.locator('td.product-cart-actions input');
                    await qtyField.fill(qty);
                    await this.updateCart();
                    
                    if (qty > 500) {
                        let errMsgs = {};
                        let productErr = await this.getProductErrMsg(nameOfProduct);
                        let cartErr = await this.getCartErrMsg();
                        
                        errMsgs.productErrMsg = productErr;
                        errMsgs.cartErrMsg = cartErr;
    
                        return errMsgs;
                    }
    
                    return { success: true, message: "Quantity updated successfully" };
                }
            }
            return { error: true, message: "Product not found" };
        } catch (error) {
            console.error("An error occurred in changeProductQty:", error);
            return { error: true, message: "An unexpected error occurred" };
        }
    }

    async getProductErrMsg(productName) {
        let productsCount = await this.allProductsInCart.count();
        for (let i = 0; i < productsCount; i++) {
            let currentRow = this.allProductsInCart.nth(i);
            let currentName = await currentRow.locator('td h2 a').textContent();
            if (currentName.trim() === productName) {
                let errMsg = await currentRow.locator('p.error').textContent();
               //return await this.page.locator('p.error').textContent();
               return await errMsg.trim();               
            }
        }
        return 'No product error';
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
        let successMsg= await this.shoppingCartErrMsg.textContent();
        return successMsg;
    }

    async getCartErrMsg() {
        //await this.page.waitForLoadState('domcontentloaded');
        return await this.page.locator('.error-msg span').textContent();
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