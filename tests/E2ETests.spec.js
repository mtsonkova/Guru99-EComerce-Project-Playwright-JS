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
let navigationElements;
let productFunctions;
let productsPage;

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
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });
    
    describe('Guru99 Tests', async () => {
        test('Sort mobile phones by price and check if they are sorted correctly', async() => {
            await headerNav.clickOnMobile();  
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let devicesNames = await productsPage.getAllDevicesPrice();
            console.log(devicesNames);
            
        });

    });


   
});