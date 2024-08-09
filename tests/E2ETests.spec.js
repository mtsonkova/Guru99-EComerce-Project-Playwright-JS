const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const { LandingPage } = require('../pagepbjects/LandingPage');
const navigation = require('../testFiles/navigations.json');
const {HeaderNav} = require('../utils/HeaderNav');
const { ReusableProductsFunctions } = require('../utils/ReusableProductsFunctions');
const { ProductsPage } = require('../pagepbjects/ProductsPage');



let browser;
let context;
let page;
let headerNav;
let productFunctions;
let productsPage;
let commonFunctions;

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
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });
    
    describe('Guru99 Tests', async () => {
        test.only('Sort mobile phones by price and check if they are sorted correctly', async() => {
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

        test('Sort mobile phones name and check if they are sorted correctly', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            await productsPage.sortByOption('http://live.techpanda.org/index.php/mobile.html?dir=asc&order=price');
           
            let sortedDevices = await productsPage.getAllDevicesWithNameAndPrice();
           
            console.log(sortedDevices);
        });
    });


   
});