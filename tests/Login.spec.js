import { test, expect } from "@playwright/test";

test("login without email and password", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");
  //
  // await page.

  const nameInput = page.getByTestId("login-email");
  await page.getByTestId("login-button").click();

  const message = await nameInput.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});
test("Enthe the email and does not entr the password", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");
  await page.getByTestId("login-email").fill("parthivbhavsar@gmail.com");

  const nameInput = page.getByTestId("login-password");
  await page.getByTestId("login-button").click();

  const message = await nameInput.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("Enter the password and empty the email field", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  await page.getByTestId("login-password").fill("Test@123");

  const nameInput = page.getByTestId("login-email");
  await page.getByTestId("login-button").click();

  const message = await nameInput.evaluate((el) => el.validationMessage);
  expect(message).toContain("fill out this field");
});

test("check the email format is proper or not", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");

  await page.getByTestId("login-email").fill("parthivbhavsar2001@@gmail.com");

  const nameInput = page.getByTestId("login-email");
  await page.getByTestId("login-button").click();

  const message = await nameInput.evaluate((el) => el.validationMessage);
  expect(message).toContain(
    "A part following '@' should not contain the symbol '@'."
  );
});

test("Login with proper email nad pssword", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");
  await page.getByTestId("login-email").fill("parthivbhavsar@gmail.com");
  await page.getByTestId("login-password").fill("Test@123");
  await page.getByTestId("login-button").click();
  await expect(page).toHaveURL("https://automationexercise.com/");
  await page.getByRole("link", { name: " Logout" }).click();
});
