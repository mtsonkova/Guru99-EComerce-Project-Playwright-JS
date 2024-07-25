class ProductsPage{
    constructor(page) {
        this.page = page;
        this.devices = page.locator('li.item');
        this.sortBy = page.locator('Selector');
    }


    async sortByOption(option) {
        await this.sortBy.selectOption({value : option});
    }

    async addAllProductsToCart() {
       
       await this.devices.forEach(device => {
            device.getByRole('button', {name : 'Add to Cart'}).click();
        });
    }

    async addProductToCart(name) {
        for(let i = 0; i < this.devices.length; i++){
            let currentDevice = await devices[i];
            let currentDeviceName = await currentDevice.locator('h2, a').textContent();
            if(currentDeviceName === name) {
                await device.getByRole('button', {name : 'Add to Cart'}).click(); 
                break;
            }
        }
     }

     //accepts array of strings
     async addMultipleProductsToCart(names) {
        await this.devices.forEach(device => {
            let currentName = device.locator('h2 a').textContent();
             if(names.includes(currentName)) {
                device.getByRole('button', {name : 'Add to Cart'}).click();
             }
         });
     }
}

module.exports = {ProductsPage}