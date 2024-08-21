const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const { LandingPage } = require('../pagepbjects/LandingPage');
const navigation = require('../testFiles/navigations.json');
const {HeaderNav} = require('../utils/HeaderNav');
const { ReusableProductsFunctions } = require('../utils/ReusableProductsFunctions');
const { ProductsPage } = require('../pagepbjects/ProductsPage');
const { ProductInformationPage } = require('../pagepbjects/ProductInformationPage');



let browser;
let context;
let page;
let headerNav;
let productFunctions;
let productsPage;
let commonFunctions;
let productInformationPage;


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
           
            let comparisonResult = productFunctions.compareTwoProductArrays(sortedDevices, sortedDevicesByPrice);
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
           
           let result = productFunctions.compareTwoProductArrays(sortedDevices, sortedDevicesByName);
            
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

        test.only('Try to purchase more qty of a product than the available in the store', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let device = await productsPage.getDeviceByName('Sony Xperia');
            await productFunctions.clickAddToCart(device);
            await headerNav.clickOnMyCart();
            
        });
    });


   
});