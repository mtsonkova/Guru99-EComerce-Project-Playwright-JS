class PlacedOrderPage{
    constructor(page) {
        this.page = page;
        this.orderReceivedTitle = page.locator('h1');
        this.orderId = page.locator('div.col-main a').nth(0);
    }

    async getOrderId() {
        return this.orderId.textContent();
    }

    async getOrderReceivedTitle() {
        return this.orderReceivedTitle.textContent();
    }
}

module.exports = {PlacedOrderPage};