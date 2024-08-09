class ProductsPage {
    constructor(page) {
        this.page = page;
        this.devices = page.getByRole('listitem').filter({
            has: this.page.locator('div.product-info')
        });
        this.sortBy = page.locator('div.sort-by select').first();
    }


    async sortByOption(text) {
        await this.sortBy.selectOption(text);
        this.sortBy.waitFor();
    }

    async addAllProductsToCart() {

        await this.devices.forEach(device => {
            device.getByRole('button', { name: 'Add to Cart' }).click();
        });
    }

    async addProductToCart(name) {
        let devices = await this.getAllDevices();
        let num = await this.getAllDevices().count();

        for (let i = 0; i < num; i++) {
            let currentDevice = await devices.nth(i);
            let currentDeviceName = await currentDevice.locator('h2, a').textContent();
            if (currentDeviceName === name) {
                await device.getByRole('button', { name: 'Add to Cart' }).click();
                break;
            }
        }
    }

    async getAllDevices() {
        return await this.devices;
    }

    async getDeviceByName(deviceName) {

        let devices = await this.getAllDevices();
        let num = await devices.count();

        for (let i = 0; i < num; i++) {
            let currentDevice = await devices.nth(i);
            let currentDeviceName = await currentDevice.locator('li h2 a').textContent();

            if (currentDeviceName === deviceName) {
                return currentDevice;
            }
        }

        return 'No such device';
    }

    //accepts array of strings
    async addMultipleProductsToCart(names) {
        await this.devices.forEach(device => {
            let currentName = device.locator('li h2 a').textContent();
            if (names.includes(currentName)) {
                device.getByRole('button', { name: 'Add to Cart' }).click();
            }
        });
    }

    async getAllDevicesWithNameAndPrice() {

        let products = [];


        let cards = await this.getAllDevices();
        let num = await cards.count();


        for (let i = 0; i < num; i++) {
            let device = {};

            let currentDevice = await cards.nth(i);
            let currentName = await currentDevice.locator('h2').textContent();
            let currentPrice = 0;
            if (currentName === 'Samsung Galaxy') {
                currentPrice = await currentDevice.locator('p.special-price span.price').textContent();
                currentPrice = currentPrice.split('$')[1];
            } else {
                currentPrice = await currentDevice.locator('.price').textContent();
                currentPrice = currentPrice.slice(1);
            }

            device.name = currentName;
            device.price = Number(currentPrice);
            products.push(device);

        }

        return products;
    }
}




module.exports = { ProductsPage }