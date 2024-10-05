class MyOrdersPage{
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator('#my-orders-table tbody');
        this.tableRows = this.ordersTable.locator('tr');
    }

    async clickOnViewOrder() {
        let firstRow = await this.tableRows.first();
        let lastCell = await firstRow.locator('td a:nth-child(1)');
        await lastCell.click();

        //#my-orders-table > tbody > tr.first.odd > td.a-center.view.last > span > a:nth-child(1)
    }
   
    async clickOnReorder() {
        let firstRow = await this.tableRows.first();
        let lastCell = await firstRow.locator('a:has-text("REORDER")');
        await lastCell.click();
    }

    async getFirstOrderTotal(){
        let firstRow = await this.tableRows.first();
        let orderTotal = await firstRow.locator('td:nth-child(4)').textContent();
        return orderTotal;
    }

    async getFirstOrderId() {
        let firstRow = await this.tableRows.first();
        let firstOrderId = await firstRow.locator('td:nth-child(1)').textContent();
        return firstOrderId;
    }
}

module.exports = {MyOrdersPage};