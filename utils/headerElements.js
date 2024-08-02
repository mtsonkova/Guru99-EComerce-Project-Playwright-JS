class HeaderElements{
    constructor(page) {
        this.page = page;
        this.mobile = page.locator('.nav-1');
        this.tv = page.locator('.nav-2');
        this.account = page.locator('#header-account .label');
        this.headerAccount = page.locator('#header-account .links')
        this.myAccount = headerAccount.getByText('My account');
        this.myWishlist = headerAccount.getByText('My Wishlist');
        this.myCart = headerAccount.getByText('My Cart');
        this.checkout = headerAccount.getByText('Checkout');
        this.register = headerAccount.getByText('Register');
        this.logIn = this.headerAccount.getByText('Log In');
        this.cartBtn = page.locator('#header-cart .label');
    }
        
    async clickOnMobile() {
        await this.mobile.click();
    }

    async clickOnTV() {
        await this.tv.click();        
    }
    
    async clickOnAccount() {
        await this.account.click();
    }

    async clickOnCart() {
        await this.cartBtn.click();
    }

    async clickOnMyAccount() {
        await this.headerAccount.click();        
    }
}