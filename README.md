# Guru99 EComerce Project test automation with Playwright

## Purpose
The purpose of this project is to perform E2E test automation for the [Guru99 EComerce project](http://live.techpanda.org/index.php/). Subscription for this project is available [here](https://www.guru99.com/live-ecommerce-project.html). Note that it is originally oriented towards Selenium and Java, but I choose to automate it on Playwright with JavaScript.

**Tools,Platforms, Browsers**
 - Language: JavaScript
 - Framework: Playwright
 - Platform: Windows
 - Browser: Chrome
 - Reporting Tool: Allure Report
   

**In scope:**

- E2E Web UI
- Backend UI -> backend login details:
 http://live.techpanda.org/index.php/backendlogin/
 - id = user01
 - pass = guru99com
 
**Out of scope:**

-API
-Credit card payment as it does not work
- register new account section. All tests will be automated with already created account.

**NOTE:** GURU 99 does not provide any documentation for this project at all in comparason with other their projects like [GURU 99 Bank Project](https://www.guru99.com/live-selenium-project.html).


**Test cases to automate:**
 - Manual test cases authored by me.
 - Test cases, provided by Guru99 as part of their timeboxed live project demo.

## Test cases, provided by Guru99
   
![Testcase-v1](https://github.com/user-attachments/assets/48550049-f777-48de-93b6-9feffcb2cd83)

![Testcase-v2](https://github.com/user-attachments/assets/324720ad-b1ab-4ddb-aa67-00ea6e5d3060)
This test case will be automated as is. - **done**

![Testcase-v3](https://github.com/user-attachments/assets/53ace54b-72e8-4067-85fd-82eed649c0eb)
This test case will be split to 3 separate test cases:
1. Try to purchase more qty than what is available in the store and check the error message. - **done**
2. Verify that when entering empty shopping cart there is a message sayng "SHOPPING CART IS EMPTY". - **done**
3. Remove all products from the shopping cart and verify that a message sayng "SHOPPING CART IS EMPTY" is displayed. - **done**

![Testcase-v4](https://github.com/user-attachments/assets/b189596a-73ba-4736-8de6-0f72903f461c)
This test case will be automated as is - **done**.

![Testcase-v5](https://github.com/user-attachments/assets/a213acce-c3e4-4161-a5af-39a983840c7a)
This test case will be automated using an existing account, because newly created users cannot be deleted from the database. Should you attempt to repeat the test case with the same test data, the system will throw an error that this user already exists. 

![Testcase-v6](https://github.com/user-attachments/assets/ec8ae193-1eca-4837-94e1-d66cdb4db7fe)
This test case will be automated as is.

![Testcase-v7](https://github.com/user-attachments/assets/1dba2770-9a00-4cf7-b4b7-e97b740dc139)
This test case will be automated as is. 
**NOTE** Additional research required how to automate the check if the order file is downloaded.

![Testcase-v8](https://github.com/user-attachments/assets/5d730a76-dab1-4310-ba91-1b456a4bc563)
This test case will be automated as is with one addition -> check what happens with the old order: whether it is canceled or deleted as this test case does not state what is expected to happen to it.

![Testcase-v9](https://github.com/user-attachments/assets/1479496a-6526-45c9-97d4-82ed76862c0b)
This test case will not be automated because the given discount is not deducted from the final price as seen in the screenshot below:

![discountFieldVisibleButNoActualDiscountAppliedOnProductPrice](https://github.com/user-attachments/assets/1c0cac13-11b0-4e7d-8431-5606c5b6cb86)


![Testcase-v10](https://github.com/user-attachments/assets/af39fa4d-7041-4875-b46d-55e857ac48e4)

## Project Notes

### Test Case 1

Solution, provided by Guru99

```
import java.io.File;
import org.testng.annotations.AfterTest;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeTest;
import org.testng.AssertJUnit;
import java.util.concurrent.TimeUnit;
import org.testng.annotations.*;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.*;
import org.openqa.selenium.By;


public class TestCase1 {
	  private WebDriver driver;
	  private String baseUrl;
	  public int scc = 0;
	  
	  private StringBuffer verificationErrors = new StringBuffer();

	  @BeforeMethod
	@BeforeTest
	public void setUp() throws Exception {
	    driver = new FirefoxDriver();
		// Step 1 Goto http://live.techpanda.org/
	    baseUrl = "http://live.techpanda.org/";
	    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	  }
	  @Test
	  public void testDay1TestCase1() throws Exception {
		
	    driver.get(baseUrl); 
		//Step 2. Verify Title of the page
	    String demoSite  = driver.findElement(By.cssSelector("h2")).getText();
	    System.out.println(demoSite);
	    try {
	      AssertJUnit.assertEquals("THIS IS DEMO SITE FOR   ", demoSite);
	    } catch (Error e) {
	      verificationErrors.append(e.toString());
	    }	    
	    

	    // Step 3. Click on �MOBILE� menu
	    driver.findElement(By.linkText("MOBILE")).click();	
        // Step 5. In the list of all mobile , select �SORT BY� dropdown as �name�		
	    new Select(driver.findElement(By.cssSelector("select[title=\"Sort By\"]"))).selectByVisibleText("Name");
	    
	    // Step 6. Verify all products are sorted by name
		// this will take a screen shot of the manager's page after a successful login
	    scc = (scc+1);
		File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		String png = ("C:\\Guru99 eCommerce Live Project\\Day01_TestCase1\\Mobile Products are sorted" + scc + ".png");
		FileUtils.copyFile(scrFile, new File(png));
	    }	
	  
	@AfterTest
	public void tearDown() throws Exception {
		driver.quit();
	   
	  }	  
	}
```
### **Some thoughts on this here**
It is clear from the code above, that they take a screenshot after filtering the products by Name (rows 85 to 92). However this only takes the screenshot. It does not prove clearly whether the devices are sorted in the expected order, thus making this case prone to giving false positive results. To know for sure whether case passes or fails, one has to open the screenshot manually and see for himself. This complicates the test case as it involves taking additional steps for verification. 
One way to avoid this, is to have a second screenshot with the expected resut and compare it versus the actual image taken. However further issues might arise:
1) Selenium WebDrtiver cannot compare images directly. To do this, we need a third-party API, such as [AShot]([https://spurqlabs.com/image-comparison-using-java-selenium/#:~:text=Image%20comparison%20cannot%20be%20directly,us%20to%20compare%20two%20images](https://github.com/pazone/ashot). Thus we increase the number of 3rd parties we depend on. 
2) The test case might fail due to the expected image no longer reflects the current state of the database (depending on when it is taken). Meaning there might be new devices added in the database which now show in the UI, or some divices might be hidden at a database level, thus making them invisible to the customer.

The image below shows devices available for purchase versus all devices from that brand in the database. Note that only one device is currently available for purchase:

<img width="365" alt="devicesInDBandUI" src="https://github.com/user-attachments/assets/10608f3c-90ea-4857-8558-893f51057d98">

**My approach**
The first test case will be split to 3 separate test cases as follows:

1. Check the title of the landing page. - **done**
2. Check the title of the mobile page. - **done**
3. Chek if the products are sorted by name following these steps: **done**  
	3.1. From the main page click on Mobile.
   
   	3.2. Grab the names of all products andstore them in a sorted array (A - Z).
   
   	3.3. Click on Sort By Name.
   
   	3.4. Grab the names of all sorted products and store them in another array.
   
   	3.5. Compare both arrays value by value.
   
   	3.6. Assert they are equal.

4.Additional test case: Sort products by price -> Repeat steps 3.1. to 3.6. - **done**


