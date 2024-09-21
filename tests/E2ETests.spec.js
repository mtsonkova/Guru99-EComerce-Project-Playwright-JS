const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const { LandingPage } = require('../pagepbjects/LandingPage');
const navigation = require('../testFiles/navigations.json');
const {HeaderNav} = require('../utils/HeaderNav');
const { ReusableProductsFunctions } = require('../utils/ReusableProductsFunctions');
const { ProductsPage } = require('../pagepbjects/ProductsPage');
const { ProductInformationPage } = require('../pagepbjects/ProductInformationPage');
const { CartPage} = require('../pagepbjects/CartPage');
const { TIMEOUT } = require('dns');
const {ReusableFunctions} = require('../utils/ReusableFunctions');
const {NavigationElements} = require('../utils/NavigationElements');
const {CompareProductsPage} = require('../pagepbjects/CompareProductsPage');


let browser;
let context;
let page;
let headerNav;
let productFunctions;
let productsPage;
let commonFunctions;
let productInformationPage;
let cartPage;
let devicesArr = ['Sony Xperia', 'IPhone'];
let navigationElements;
let comparedProducts;


describe('End to End Tests', async () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/');
        headerNav = new HeaderNav(page);
        productFunctions = new ReusableProductsFunctions(page);
        productsPage = new ProductsPage(page);
        commonFunctions = new ReusableProductsFunctions(page);
        productInformationPage = new ProductInformationPage(page);
        cartPage = new CartPage(page);
        navigationElements = new NavigationElements(page);
        
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });
    
    describe('Guru99 Tests', async () => {
        test('Sort mobile phones by price ascending and check if they are sorted correctly', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let devices = await productsPage.getAllDevicesWithNameAndPrice();
            let sortedDevices = devices.sort((a, b) => a.price - b.price);
          
            //click sort by Price
            await productsPage.sortByOption('http://live.techpanda.org/index.php/mobile.html?dir=asc&order=price'); 
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html?dir=asc&order=price');
            let sortedDevicesByPrice = await productsPage.getAllDevicesWithNameAndPrice();
           
            let comparisonResult = ReusableFunctions.compareTwoProductArrays(sortedDevices, sortedDevicesByPrice);
         
            expect(comparisonResult).toBeTruthy();
            
        });

        test('Sort mobile phones by name from A to Z and check if they are sorted correctly', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let devices = await productsPage.getAllDevicesWithNameAndPrice();
            let sortedDevices = devices.sort((a, b) => (a.name).localeCompare(b.name));

            await productsPage.sortByOption('http://live.techpanda.org/index.php/mobile.html?dir=asc&order=name');
           
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html?dir=asc&order=name')
           
           let sortedDevicesByName = await productsPage.getAllDevicesWithNameAndPrice();
           
           let result = ReusableFunctions.compareTwoProductArrays(sortedDevices, sortedDevicesByName);
            
           expect(result).toBeTruthy();
        });

        test('Verify if cost of product on products page and details page are the same', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let device = await productsPage.getDeviceByName('Sony Xperia');
            let productPrice = await device.locator('.price').textContent();
            productPrice = Number(productPrice.slice(1));

            await page.locator('a:has-text("Sony Xperia")').click();
            let priceFromDetailsPage = await productInformationPage.getProductPrice();
           
            expect(productPrice).toEqual(priceFromDetailsPage);

        });

        test('Try to purchase more qty of a product than the available in the store', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let device = await productsPage.getDeviceByName('Sony Xperia');
            await productFunctions.clickAddToCart(device);
            await page.waitForURL('http://live.techpanda.org/index.php/checkout/cart/');
            let result = await cartPage.changeProductQty('Sony Xperia', '1000');
            let cartErrMsg = result.cartErrMsg;
            let productErrMsg = result.productErrMsg;
     
          await expect(result === undefined).toBeFalsy();
          await expect(productErrMsg === undefined).toBeFalsy();
          await expect(cartErrMsg === undefined).toBeFalsy();
          await expect(productErrMsg).toEqual('* The maximum quantity allowed for purchase is 500.');
          await expect(cartErrMsg).toEqual('Some of the products cannot be ordered in requested quantity.');
               
        });

        test('Remove all products from shopping cart and expect Shopping cart is empty message', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let device = await productsPage.getDeviceByName('Samsung Galaxy');
            await productFunctions.clickAddToCart(device);
            await page.waitForURL('http://live.techpanda.org/index.php/checkout/cart/');
            await cartPage.removeAllProductsFromCart();
            let emptyCartTitle = await headerNav.getTitle();
            await expect(emptyCartTitle).toEqual('Shopping Cart is Empty');
        });

        test.only('Verify that you are able to compare two products', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            for(let i = 0; i < devicesArr.length; i++) {
                let currentDeviceName = devicesArr[i];
                let device = await productsPage.getDeviceByName(currentDeviceName);
                await productFunctions.clickAddToCompare(device);
            }

            const [popupPage] = await Promise.all([
                context.waitForEvent('page'),
                page.getByRole('button', {name: 'Compare'}).click()
            ]);
            comparedProducts = new CompareProductsPage(popupPage);

            let comparedDevicesNames = await comparedProducts.getProductsNames();
            
            await popupPage.close();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
                    
          
           await expect(devicesArr.length === comparedDevicesNames.length).toBeTruthy();
           devicesArr.forEach(device => expect(comparedDevicesNames.includes(device)).toBeTruthy);
            
          
           
        });
    });
   
});