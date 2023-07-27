/***********************************************************************************
 * Login to the store as a regular user.
 *
 * Parameters:
 *   username: string - The user that logs in
 *   password: string - The password of that user
 ************************************************************************************/
defineEvent(SeleniumSession, "Login", function (session, event) {
    with (session) {
        click("//a[contains(text(),'Sign In')]");
        writeText('//input[@id="email"]', event.user.username);
        writeText('//input[@id="pass"]', event.user.password);
        click('//button[@id="send2"]');

        if (event.expectedWelcome)
            waitForVisibility("//span[text()='" + event.expectedWelcome + "']", 5000)
    }
});

/***********************************************************************************
 * Add an item to the cart of the currently logged-in user.
 *
 * Parameters:
 *   s: string                  - The name of the session in which we want this event to take place.
 *   category : string          - The category of the product that we want to add.
 *   subCategory : string       - The sub-category of the product that we want to add.
 *   product : string           - The  product that we want to add.
 *   options : array of strings - A list of options for the product.
 *   quantity: number, optional - The number of items to add.
 ************************************************************************************/
defineEvent(SeleniumSession, "AddToCart", function (session, event) {
    with (session) {
        click("//span[text()='" + event.product.category + "']");
        click("(//span[text()='" + event.product.category + "'])/following::span[text()='" + event.product.subCategory + "']/following::a[text()[normalize-space()='" + event.product.subSubCategory + "']]");

        selectByValue("//div[@class='toolbar toolbar-products']/following::select[@id='limiter']", '36')

        moveToElement("(//img[@alt='" + event.product.product + "'])[last()]")
        waitForClickability("(//img[@alt='" + event.product.product + "'])[last()]", 1000);
        click("(//img[@alt='" + event.product.product + "'])[last()]");

        for (let opt in event.product.options) {
            // Click the options
            click("//div[@data-option-label='" + event.product.options[opt] + "']");

            // Verify that it was selected
            waitForVisibility("//div[@data-option-label='" + event.product.options[opt] + "' and contains(@class,'selected')]", 5000);
        }
        if (event.product.quantity) {
            writeText("//input[@title='Qty']", event.product.quantity, true);
        }

        if (event.product.expected_image) {
            waitForVisibility("//img[contains(@src, '" + event.product.expected_image + "')]", 5000);
        }
        click("//button[@id='product-addtocart-button']/span");
        waitForVisibility("//div[@data-ui-id='message-success']//div[1]", 5000);
        assertText("//div[@data-ui-id='message-success']//div[1]", "You added " + event.product.product + " to your shopping cart.");
    }
})



/***********************************************************************************
 * Check-out the items in the cart of the currently logged-in user.
 *
 * Parameters:
 *   s: string                                              - The name of the session in which we want this event to take place.
 *   verifyItems : array of strings, optional               - A list of items that we expect to see in the cart.
 *   verifyNonexistenceOfItems : array of strings, optional - A list of items that we expect not to see in the cart.
 *   shippingMethod : string, optional                      - The shopping method that we want to use for this order.
 ************************************************************************************/
defineEvent(SeleniumSession, "CheckOut", function (session, event) {

    with (session) {

        waitForClickability("//a[@class='action showcart']", 50000);
        click("//a[@class='action showcart']");
        waitForClickability("//button[@title='Proceed to Checkout']", 2000);
        click("//button[@title='Proceed to Checkout']", 5000);

        if (event.verifyItems || event.verifyNonexistenceOfItems) {
            waitForClickability("//div[contains(@class,'items-in-cart')]//div", 5000);
            waitForClickability("//div[contains(@class,'items-in-cart')]//div", 5000);
            click("//div[contains(@class,'items-in-cart')]//div");
        }

        if (event.verifyItems) {
            for (item in event.verifyItems) {
                waitForVisibility("//img[@alt='" + event.verifyItems[item] + "']", 5000);
            }
        }

        if (event.verifyNonexistenceOfItems) {
            for (item in event.verifyNonexistenceOfItems) {
                waitForInvisibility("//img[@alt='" + event.verifyNonexistenceOfItems[item] + "']", 5000);
            }
        }

        if (event.shippingMethod) {
            waitForClickability("//td[text()='" + event.shippingMethod + "']", 5000);
            click("//td[text()='" + event.shippingMethod + "']");
        }

        click("//span[text()='Next']");

        if (event.verifyItems) {
            for (item in event.verifyItems) {
                waitForVisibility("//img[@alt='" + event.verifyItems[item] + "']", 5000);
            }
        }
        if (event.verifyNonexistenceOfItems) {
            for (item in event.verifyNonexistenceOfItems) {
                waitForInvisibility("//img[@alt='" + event.user.verifyNonexistenceOfItems[item] + "']", 5000);
            }
        }

        waitForClickability("//button[contains(@class,'action primary')]", 5000);
        runCode("jQuery(document.querySelectorAll('button[class*=\"action primary\"]')).click()");
        waitForVisibility("//p[text()='Your order number is: ']", 5000);
        click("//span[text()='Continue Shopping']");
    }
});
