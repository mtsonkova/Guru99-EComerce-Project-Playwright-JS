class ProductsPage {
    constructor(page) {
        this.page = page;
        this.devices = page.locator('div ul.products-grid li.item');
        this.sortBy = page.locator('Selector');
    }


    async sortByOption(option) {
        await this.sortBy.selectOption({ value: option });
    }

    async addAllProductsToCart() {

        await this.devices.forEach(device => {
            device.getByRole('button', { name: 'Add to Cart' }).click();
        });
    }

    async addProductToCart(name) {
        for (let i = 0; i < this.devices.length; i++) {
            let currentDevice = await devices[i];
            let currentDeviceName = await currentDevice.locator('h2, a').textContent();
            if (currentDeviceName === name) {
                await device.getByRole('button', { name: 'Add to Cart' }).click();
                break;
            }
        }
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

    async getAllDevices() {
        return this.devices;
    }

    async getAllDevicesPrice() {

        let products = [];
        let device = {};
        console.log(this.devices);
        for (let i = 0; i < this.devices.count(); i++) {
            let currentDevice = this.devices.nth(i);
            let currentName = currentDevice.locator('h2').textContent();
            let currentPrice = currentDevice.locator('.price').textContent().slice(1);

            device.name = currentName;
            device.price = Number(currentPrice);
            products.push(device);
        }

        return products;
    }


}
}

module.exports = { ProductsPage }