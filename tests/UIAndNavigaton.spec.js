const { desribe, test, expect, beforeAll, afterAll, beforeEach, aftetrEach } = require('@playwright/test');
const { chromium } = require('playwright');

const { LandingPage } = require('../pagepbjects/LandingPage');
const navigation = require('../testFiles/navigations.json');
const { HeaderNav } = require('../utils/HeaderNav');


let browser;
let context;
let page;


describe('UI and navigation tests', async () => {
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
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    test('Go to Landing page and check title', async () => {
        const landingPage = new LandingPage(page);
        let title = await landingPage.getPageTitle();
        await expect(title).toContain('This is demo site');
    });

    test('On Landing page click on MOBILE and check title', async () => {
        const headers = new HeaderNav(page);
        await headers.clickOnMobile();
        let mobileTitle = await headers.getTitle();
        await expect(mobileTitle).toEqual('Mobile');

    });

    test('Check title on empty cart', async () => {
        await page.goto(navigation.myCart);
        const headers = new HeaderNav(page);
        let emptyCartTitle = await headers.getTitle();
        await expect(emptyCartTitle).toEqual('Shopping Cart is Empty');
    });

});
