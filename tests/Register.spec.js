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
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" })
  ).toHaveText("Enter Account Information");

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
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" })
  ).toHaveText("Enter Account Information");

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
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" })
  ).toHaveText("Enter Account Information");

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
