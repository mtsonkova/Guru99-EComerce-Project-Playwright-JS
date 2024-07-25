# Guru99 EComerce Project test automation with Playwright

**Purpose**
The purpose of this project is to perform E2E test automation for the [Guru99 EComerce project](http://live.techpanda.org/index.php/). Subscription for this project is available [here](https://www.guru99.com/live-ecommerce-project.html). Note that it is originally oriented towards Selenium and Java, but I choose to automate it on Playwright with JavaScript.

**Tools,Platforms, Browsers**
 - Language: JavaScript
 - Framework: Playwright
 - Platform: Windows
 - Browser: Chrome
 - Email : [Mailtrap](https://mailtrap.io/)
   

**In scope:**

- E2E Web UI
- Backend UI -> backend login details:
 http://live.techpanda.org/index.php/backendlogin/
 - id = user01
 - pass = guru99com
 
**Out of scope:**

-API

**NOTE:** GURU 99 does not provide any documentation for this project at all in comparason with other their projects like [GURU 99 Bank Project](https://www.guru99.com/live-selenium-project.html).


**Test cases to automate:**
 - Manual test cases authored by me.
 - Test cases, provided by Guru99 as part of their timeboxed live project demo. Tests, related to database changes will be excluded.

   Below are the test cases, provided by Guru99
   
![Testcase-v1](https://github.com/user-attachments/assets/48550049-f777-48de-93b6-9feffcb2cd83)
The first test case will be split to 3 separate test cases as follows:
1. Check the title of the landing page.
2. Check the title of the mobile page.
3. Sort products by name.
4. Additional test case: sort products by price.

![Testcase-v2](https://github.com/user-attachments/assets/324720ad-b1ab-4ddb-aa67-00ea6e5d3060)
This test case will be automated as is.

![Testcase-v3](https://github.com/user-attachments/assets/53ace54b-72e8-4067-85fd-82eed649c0eb)
This test case will be split to 3 separate test cases:
1. Try to purchase more qty than what is available in the store and check the error message.
2. Verify that when entering empty shopping cart there is a message sayng "SHOPPING CART IS EMPTY".
3. Remove all products from the shopping cart and verify that a message sayng "SHOPPING CART IS EMPTY" is displayed.

![Testcase-v4](https://github.com/user-attachments/assets/b189596a-73ba-4736-8de6-0f72903f461c)
This test case will be automated as is.
![Testcase-v5](https://github.com/user-attachments/assets/a213acce-c3e4-4161-a5af-39a983840c7a)
This test case will be split to 2 separate test cases:
1. Register a new account.
2. Login with the newly registered account, add products to the wishlist and send it to email. 

![Testcase-v6](https://github.com/user-attachments/assets/ec8ae193-1eca-4837-94e1-d66cdb4db7fe)
This test case will be automated as is.

![Testcase-v7](https://github.com/user-attachments/assets/1dba2770-9a00-4cf7-b4b7-e97b740dc139)
This test case will be automated as is. 
**NOTE** Additional research required how to automate the check if the order file is downloaded.

![Testcase-v8](https://github.com/user-attachments/assets/5d730a76-dab1-4310-ba91-1b456a4bc563)
This test case will be automated as is with one addition -> check what happens with the old order: whether it is canceled or deleted as this test case does not state what is expected to happen to it.

![Testcase-v9](https://github.com/user-attachments/assets/1479496a-6526-45c9-97d4-82ed76862c0b)
This test case will be automated as is.

![Testcase-v10](https://github.com/user-attachments/assets/af39fa4d-7041-4875-b46d-55e857ac48e4)

**Project Notes**

The challange with this project is that some sections, buttons, message placeholders are shared between different sections.
For example:
the header and footer are visible on all sections -> product catalog, shopping cart, etc.
The 3 buttons ADD TO CART, Add to Wishlist, Add to Compare are visible on products catalogue as well as on product details pages. That is why all common items are grouped in one class. All items from header and footer sections and the search box, are grouped in NavigationElements.js file.



