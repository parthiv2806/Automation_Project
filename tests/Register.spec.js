import { test, expect } from "@playwright/test";

test("click on the signup/login button", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.getByRole("link", { name: "Signup / Login" }).click();
  await expect(page).toHaveURL(/login/);
});

test("click signup with empty name and email", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  const nameInput = page.getByTestId("signup-name");
  await page.getByTestId("signup-button").click();

  const message = await nameInput.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("enter name but keep email empty", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  await page.getByTestId("signup-name").fill("parthiv");
  const emailInput = page.getByTestId("signup-email");

  await page.getByTestId("signup-button").click();

  const message = await emailInput.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Enter the name and invalid email", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  await page.getByTestId("signup-name").fill("parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@@gmail.com");

  const emailInput = page.getByTestId("signup-email");
  await page.getByTestId("signup-button").click();

  const message = await emailInput.evaluate((el) => el.validationMessage);
  expect(message).toContain(
    "A part following '@' should not contain the symbol '@'."
  );
});

test("Enter the valid Name and Email", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  await page.getByTestId("signup-name").fill("parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");

  await page.getByTestId("signup-button").click();

  await expect(page).toHaveURL("https://automationexercise.com/signup");
});

test("Detail page should show pre-filled name and email", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup");
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
});

test("Detail page should show pre-filled name and email and passwrod should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup");
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  const password = page.getByTestId("password");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await password.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Firstname should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("password").fill("Test@123");
  const firstname = page.getByTestId("first_name");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await firstname.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Lastname should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("first_name").fill("Bhavsar");

  const lastname = page.getByTestId("last_name");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await lastname.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Address should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");

  const Address = page.getByTestId("address");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await Address.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Check the country dropdown", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );

  // // Open dropdown
  // await page.getByTestId("country").click();
  // // Select option
  // await page.getByText("United States").click();
  await page.getByTestId("country").selectOption({ label: "United States" });
});

test("Detail page should show pre-filled name and email and State should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("address").fill("Ahmedabd near by reverfront");

  const state = page.getByTestId("state");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await state.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and City should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("address").fill("Ahmedabd near by reverfront");
  await page.getByTestId("state").fill("Gujrat");

  const city = page.getByTestId("city");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await city.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Zipcode should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("address").fill("Ahmedabd near by reverfront");
  await page.getByTestId("state").fill("Gujrat");
  await page.getByTestId("city").fill("Ahmedabad");

  const zipcode = page.getByTestId("zipcode");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await zipcode.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Detail page should show pre-filled name and email and Mobile-number should not empty validation", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");
  await page.getByTestId("password").fill("Test@123");
  await page.getByTestId("address").fill("Ahmedabd near by reverfront");
  await page.getByTestId("state").fill("Gujrat");
  await page.getByTestId("city").fill("Ahmedabad");
  await page.getByTestId("zipcode").fill("123456");

  const mobile_number = page.getByTestId("mobile_number");
  //click on the create account button
  await page.getByTestId("create-account").click();

  const message = await mobile_number.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("check the tille have the radio button are wroking peroperly or not", async ({
  page,
}) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.locator('label[for="id_gender1"]').click();
});

test("check the checkbox is wroking ", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.locator('label[for="newsletter"]').check();
  await page.locator('label[for="optin"]').check();
});

test("Check the date of birth (DOB) dropdown", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.getByTestId("days").selectOption({ label: "1" });
  await page.getByTestId("months").selectOption({ label: "January" });
  await page.getByTestId("years").selectOption({ label: "1983" });
});

test("Enter the all valid data", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();

  // Step 2: Redirect verify
  await expect(page).toHaveURL("https://automationexercise.com/signup", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Step 3: Pre-filled data verify
  await expect(page.getByTestId("name")).toHaveValue("Parthiv");
  await expect(page.getByTestId("email")).toHaveValue(
    "parthivbhavsar@gmail.com"
  );
  await page.locator('label[for="id_gender1"]').click();

  await page.getByTestId("password").fill("Test@123");

  await page.getByTestId("days").selectOption("1");
  await page.getByTestId("months").selectOption("January");
  await page.getByTestId("years").selectOption("1995");

  await page.getByTestId("first_name").fill("Bhavsar");
  await page.getByTestId("last_name").fill("Rakeshkumar");
  await page.getByTestId("address").fill("Ahmedabad near riverfront");

  await page.getByTestId("country").selectOption("India");

  await page.getByTestId("state").fill("Gujarat");
  await page.getByTestId("city").fill("Ahmedabad");
  await page.getByTestId("zipcode").fill("123456");
  await page.getByTestId("mobile_number").fill("9876543210");

  await page.locator('label[for="newsletter"]').check();
  await page.locator('label[for="optin"]').check();

  //click on the create account button
  await page.getByTestId("create-account").click();
  await expect(page).toHaveURL(
    "https://automationexercise.com/account_created"
  );

  await expect(
    page.getByRole("heading", { name: "Account Created!" })
  ).toHaveText("Account Created!");
  await expect(
    page.getByText(
      "Congratulations! Your new account has been successfully created!"
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      "You can now take advantage of member privileges to enhance your online shopping experience with us."
    )
  ).toBeVisible();

  //Continue button
  await page.getByTestId("continue-button").click();
  await expect(page).toHaveURL("https://automationexercise.com/");

  //logout the account

  await page.getByRole("link", { name: " Logout" }).click();
});

test("already account and register again", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  // Step 1: Signup page
  await page.getByTestId("signup-name").fill("Parthiv");
  await page.getByTestId("signup-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("signup-button").click();
  await expect(page.getByText(/already exist/i)).toBeVisible();
});
