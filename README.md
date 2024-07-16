# Guru99 EComerce Project test automation with Playwright

Purpose
The purpose of this project is to perform E2E test automation for the [Guru99 EComerce project]http://live.techpanda.org/index.php/. Subscription for this project is available [here]: https://www.guru99.com/live-ecommerce-project.html. Note that it is originally oriented towards Selenium and Java, but I choose to automate it on Playwright with JavaScript.

Tools,Platforms, Browsers
 - Language: JavaScript
 - Framework: Playwright
 - Platform: Windows
 - Browser: Chrome

In scope:
- Web UI

Out of scope:
-API
-Database
 NOTE: Guru99 provides a password to access the database but only for a limited period of time. Therefore test cases that include or rely on database products manipulation are expected to fail after the provided password expires.

 Test cases to automate:
 - Manual test cases authored by me
 - Test cases, provided by Guru99 as part of their timeboxed live project demo, excluding the ones related to database changes
