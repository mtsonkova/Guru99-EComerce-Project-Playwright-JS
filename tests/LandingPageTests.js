const { test, expect } = require('@playwright/test');

let browser;
let browserContext;
let page;

const host = 'http://live.techpanda.org/';

describe('Login Page', async () => {
    test('Go to Landing page', async () => {
        await page.goto('host');
        
    })
})