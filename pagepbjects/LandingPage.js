class LandingPage{
    constructor(page) {
        this.page = page;
        this.title = page.locator('h2')
    }

    async getPageTitle() {
        return await this.title.textContent();
    }

    
    
}