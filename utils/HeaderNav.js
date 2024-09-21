class HeaderNav{
    
    constructor(page) {
        this.page = page;
        this.mobile = this.page.locator('.nav-1');
        this.tv = this.page.locator('.nav-2');
        this.account = this.page.locator('a.skip-account span.label');
        this.headerAccount = this.page.locator('#header-account')
        this.myAccount = this.headerAccount.getByText('My Account');
        this.myWishlist = this.headerAccount.getByText('My Wishlist');
        this.myCart = this.headerAccount.getByText('My Cart');
        this.checkout = this.headerAccount.getByText('Checkout');
        this.register = this.headerAccount.getByText('Register');
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
        await this.headerAccount.click();
    }

    async clickOnCart() {
        await this.cartBtn.click();
    }

    async clickOnMyAccount() {
        await this.myAccount.click();        
    }

    async clickOnMyWishList(){
        await this.myWishlist.click();
    }

    async clickOnMyCart(){
        await this.myCart.click();
    }

    async clickOnCheckout(){
        await this.checkout.click();
    }

    async clickOnRegister() {
        await this.register.click();
    }

    async clickOnLogIn() {
        await this.logIn.click();
    }

    async getTitle(){
        return await this.page.locator('h1').textContent();
    }
}
module.exports = {HeaderNav};