const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const {LandingPage} = require('../pagepbjects/LandingPage');

let browser;
let context;
let page;

const host = 'http://live.techpanda.org/';


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
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    test('Go to Landing page and check title', async () => {
        await page.goto('host');
       const landingPage = new LandingPage(page);
       let title = await landingPage.getPageTitle();
       await expect(title).toContain('This is demo site');
        
        
    })

    describe('Guest User actions', async() => {

    });


    describe('LogIn feature tests', async() => {

    });

    describe('Logged in User actions', async() => {

    })
})