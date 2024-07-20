# Guru99 EComerce Project test automation with Playwright

**Purpose**
The purpose of this project is to perform E2E test automation for the [Guru99 EComerce project](http://live.techpanda.org/index.php/). Subscription for this project is available [here](https://www.guru99.com/live-ecommerce-project.html). Note that it is originally oriented towards Selenium and Java, but I choose to automate it on Playwright with JavaScript.

**Tools,Platforms, Browsers**
 - Language: JavaScript
 - Framework: Playwright
 - Platform: Windows
 - Browser: Chrome

**In scope:**

- E2E Web UI

**Out of scope:**

-API

**NOTE:** GURU 99 does not provide any documentation for this project at all in comparason with other their projects like [GURU 99 Bank Project](https://www.guru99.com/live-selenium-project.html).

-Database
**NOTE:** Guru99 provides a password to access the database but only for a limited period of time. Therefore test cases that include or rely on database products manipulation are expected to fail after the provided password expires.

**Test cases to automate:**
 - Manual test cases authored by me.
 - Test cases, provided by Guru99 as part of their timeboxed live project demo. Tests, related to database changes will be excluded.

   Below are the test cases, provided by Guru99
   
![Testcase-v1](https://github.com/user-attachments/assets/48550049-f777-48de-93b6-9feffcb2cd83)

![Testcase-v2](https://github.com/user-attachments/assets/324720ad-b1ab-4ddb-aa67-00ea6e5d3060)

![Testcase-v3](https://github.com/user-attachments/assets/53ace54b-72e8-4067-85fd-82eed649c0eb)

![Testcase-v4](https://github.com/user-attachments/assets/b189596a-73ba-4736-8de6-0f72903f461c)

![Testcase-v5](https://github.com/user-attachments/assets/a213acce-c3e4-4161-a5af-39a983840c7a)

![Testcase-v6](https://github.com/user-attachments/assets/ec8ae193-1eca-4837-94e1-d66cdb4db7fe)

![Testcase-v7](https://github.com/user-attachments/assets/1dba2770-9a00-4cf7-b4b7-e97b740dc139)

![Testcase-v8](https://github.com/user-attachments/assets/5d730a76-dab1-4310-ba91-1b456a4bc563)


The challange with this project is that some sections, buttons, message placeholders are shared between different sections.
For example:
the header and footer are visible on all sections -> product catalog, shopping cart, etc.
The 3 buttons ADD TO CART, Add to Wishlist, Add to Compare are visible on products catalogue as well as on product details pages.


