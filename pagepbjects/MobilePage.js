class MobilePage{
    constructor(page) {
        this.page = page;
        this.devices = page.locator('li.item');
        this.sortBy = page.locator('Selector');
    }
}