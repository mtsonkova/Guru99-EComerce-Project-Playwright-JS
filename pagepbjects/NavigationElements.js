class NavigationElements{
    constructor(page) {
        this.page = page;
        this.mobile = page.locator('.nav-1');
        this.tv = page.locator('.nav-2');
        this.account = page.locator('#header-account .label');
        this.cartBtn = page.locator('#header-cart .label');
        this.comparedItemsList = page.locator('ol#recently-compared-items');
        this.searchBox = page.locator('.search');
        this.newsLetterBox = page.locator('input[type="email"]');
        
    }
}