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
        let lastCell = await firstRow.locator('td:nth-last-child');
        await lastCell.locator('a').nth(1).click();
    }
}

module.exports = {MyOrdersPage};