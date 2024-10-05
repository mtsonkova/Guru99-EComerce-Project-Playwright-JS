const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const { LandingPage } = require('../pagepbjects/LandingPage');
const navigation = require('../testFiles/navigations.json');
const { HeaderNav } = require('../utils/HeaderNav');
const { ReusableProductsFunctions } = require('../utils/ReusableProductsFunctions');
const { ProductsPage } = require('../pagepbjects/ProductsPage');
const { ProductInformationPage } = require('../pagepbjects/ProductInformationPage');
const { CartPage } = require('../pagepbjects/CartPage');
const { TIMEOUT } = require('dns');
const { ReusableFunctions } = require('../utils/ReusableFunctions');
const { NavigationElements } = require('../utils/NavigationElements');
const { CompareProductsPage } = require('../pagepbjects/CompareProductsPage');
const { LoginPage } = require('../pagepbjects/LoginPage');
const { MyWishlistPage } = require('../pagepbjects/MyWishlistPage');
const { ShareYourWishListPage } = require('../pagepbjects/ShareYourWishlistPage');
const { CheckoutPage } = require('../pagepbjects/CheckoutPage');
const { PlacedOrderPage } = require('../pagepbjects/PlacedOrderPage');
const { MyOrdersPage } = require('../pagepbjects/MyOrdersPage');

const fs = require('fs');
const path = require('path');

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
let emailsArr = ['sofqatest1@abv.bg', 'ldonovantest1@abv.bg']
let checkoutPage;
let placedOrder;
let orders;

describe('End to End Tests', async () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext({ acceptDownloads: true });
        page = await context.newPage();
        await page.goto('/');
        headerNav = new HeaderNav(page);
        productFunctions = new ReusableProductsFunctions(page);
        productsPage = new ProductsPage(page);
        commonFunctions = new ReusableProductsFunctions(page);
        productInformationPage = new ProductInformationPage(page);
        cartPage = new CartPage(page);
        navigationElements = new NavigationElements(page);
        checkoutPage = new CheckoutPage(page);
        placedOrder = new PlacedOrderPage(page);
        orders = new MyOrdersPage(page);

    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Guru99 Tests', async () => {
        test('Sort mobile phones by price ascending and check if they are sorted correctly', async () => {
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

        test('Sort mobile phones by name from A to Z and check if they are sorted correctly', async () => {
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

        test('Verify if cost of product on products page and details page are the same', async () => {
            await headerNav.clickOnMobile();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            let device = await productsPage.getDeviceByName('Sony Xperia');
            let productPrice = await device.locator('.price').textContent();
            productPrice = Number(productPrice.slice(1));

            await page.locator('a:has-text("Sony Xperia")').click();
            let priceFromDetailsPage = await productInformationPage.getProductPrice();

            expect(productPrice).toEqual(priceFromDetailsPage);

        });

        test('Try to purchase more qty of a product than the available in the store', async () => {
            await headerNav.clickOnMobile();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            //let device = await productsPage.getDeviceByName('Sony Xperia');
            //await productFunctions.clickAddToCart(device);
            await productsPage.addProductToCart('Sony Xperia');
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

        test('Remove all products from shopping cart and expect Shopping cart is empty message', async () => {
            await headerNav.clickOnMobile();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            await productsPage.addProductToCart('IPhone');
            await page.waitForURL('http://live.techpanda.org/index.php/checkout/cart/');
            await cartPage.removeAllProductsFromCart();
            let emptyCartTitle = await headerNav.getTitle();
            await expect(emptyCartTitle).toEqual('Shopping Cart is Empty');
        });

        test('Verify that you are able to compare two products', async () => {
            await headerNav.clickOnMobile();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            for (let i = 0; i < devicesArr.length; i++) {
                let currentDeviceName = devicesArr[i];
                let device = await productsPage.getDeviceByName(currentDeviceName);
                await productFunctions.clickAddToCompare(device);
            }

            const [popupPage] = await Promise.all([
                context.waitForEvent('page'),
                page.getByRole('button', { name: 'Compare' }).click()
            ]);
            comparedProducts = new CompareProductsPage(popupPage);

            let comparedDevicesNames = await comparedProducts.getProductsNames();

            await popupPage.close();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');


            await expect(devicesArr.length === comparedDevicesNames.length).toBeTruthy();
            devicesArr.forEach(device => expect(comparedDevicesNames.includes(device)).toBeTruthy);

        });

        test('Login and share wishlist to other people', async () => {
            await headerNav.clickOnAccount();
            await headerNav.clickOnLogIn();
            await page.waitForURL('http://live.techpanda.org/index.php/customer/account/login/');

            let logInUser = new LoginPage(page);
            await logInUser.loginWithValidCredentials('samgreen@test.qa', 'password');
            await page.getByRole('link', { name: 'MY WISHLIST' }).click();
            let myWishList = new MyWishlistPage(page);
            await myWishList.clickShareWishListBtn();
            let shareWishListPage = new ShareYourWishListPage(page);
            await shareWishListPage.ShareYourWishlist(emailsArr, 'lorem ipsum');
            navigationElements = new NavigationElements(page);
            let sharedWishListMsg = await navigationElements.getSuccessMsg();
            console.log(sharedWishListMsg)
            await expect(sharedWishListMsg === 'Your Wishlist has been shared.').toBeTruthy();
        });

        test('Purchase products from My Wish List', async () => {
            await headerNav.clickOnAccount();
            await headerNav.clickOnLogIn();
            await page.waitForURL('http://live.techpanda.org/index.php/customer/account/login/');

            let logInUser = new LoginPage(page);
            await logInUser.loginWithValidCredentials('samgreen@test.qa', 'password');
            await headerNav.clickOnMobile();
            await page.waitForURL('http://live.techpanda.org/index.php/mobile.html');
            //add product to wishlist
            await productsPage.addProductToWishlist('Sony Xperia');

            let myWishList = new MyWishlistPage(page);
            await myWishList.clickOnAddToCart();

            await cartPage.clickOnProceedToCheckoutBtn();

            await checkoutPage.checkoutAsLoggedInUser();

            await page.waitForURL('http://live.techpanda.org/index.php/checkout/onepage/success/');
            let text = await placedOrder.getOrderReceivedTitle();
            let orderId = await placedOrder.getOrderId();

            await expect(text === 'Your order has been received.').toBeTruthy();
            await expect(orderId === '').toBeFalsy();
        });

        test('Save previously placed order as a pdf file', async () => {
            await headerNav.clickOnAccount();
            await headerNav.clickOnLogIn();
            await page.waitForURL('http://live.techpanda.org/index.php/customer/account/login/');

            let logInUser = new LoginPage(page);
            await logInUser.loginWithValidCredentials('samgreen@test.qa', 'password');
            await page.getByRole('link', { name: 'MY ORDERS' }).click();
            await orders.clickOnViewOrder();
            let orderHeader = await page.locator('h1').textContent();
            let arr = await orderHeader.split(' ');
            let orderId = arr[1].slice(1);

            // generate expected file name
            let fileName = `Print Order # ${orderId}.pdf`;
            let folderPath = path.join(__dirname, '..') + '\\Downloads';
            const filePath = path.join(folderPath, fileName);
            
           // Generate the PDF
            await page.pdf({
              path: filePath,  // File path where the PDF will be saved
              format: 'A4',  // Page format (can be 'A4', 'Letter', etc.)
              printBackground: true,  // Whether to include background graphics
              margin: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
              }
            });          
           
            let hasOrder = false;

            if(fs.existsSync(filePath)) {
               hasOrder = true;
              } 
             await expect(hasOrder).toBeTruthy();
        })
        
        test.only('Change product qty by using reorder option', async() => {
            await headerNav.clickOnAccount();
            await headerNav.clickOnLogIn();
            await page.waitForURL('http://live.techpanda.org/index.php/customer/account/login/');

            let logInUser = new LoginPage(page);
            await logInUser.loginWithValidCredentials('samgreen@test.qa', 'password');
            await page.getByRole('link', { name: 'MY ORDERS' }).click();
            let orderTotalBeforeChange = await orders.getFirstOrderTotal();
            let orderIdBeforeChange = await orders.getFirstOrderId();
            await orders.clickOnReorder();

            let firstProductName = await cartPage.getFirstProductName();
            await cartPage.changeProductQty(firstProductName, '10');
            await cartPage.clickOnProceedToCheckoutBtn();
            await checkoutPage.checkoutAsLoggedInUser();
            await page.waitForURL('http://live.techpanda.org/index.php/checkout/onepage/success/');
            let orderIdAfterChange = await page.locator('.col-main p a').first().textContent();
            await page.click('.col-main p a:nth-child(1)');
           
            let orderTotalAfterChange = await page.locator('tr.grand_total td span').textContent();
          
            await expect(orderIdBeforeChange === orderIdAfterChange).toBeFalsy();
            await expect(orderTotalBeforeChange === orderTotalAfterChange).toBeFalsy();
        })
    });    
});