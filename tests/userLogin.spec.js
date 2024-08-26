const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        // Empty the data
        await request.post("http://localhost:3003/api/testing/reset");

        // Create a user for the backend
        const newUser = {
            username: "testuser",
            name: "Test User",
            password: "password123",
        };

        await request.post("http://localhost:3003/api/users", {
            data: newUser,
        });

        // The login url
        await page.goto("http://localhost:5173");
    });

    test("Login form is shown", async ({ page }) => {
        // Check that login form is on screen
        await expect(page.locator('input[name="Username"]')).toBeVisible();
        await expect(page.locator('input[name="Password"]')).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
        // Credentials for test
        await page.locator('input[name="Username"]').fill("hrgarciatw");
        await page.locator('input[name="Password"]').fill("654321");

        // Log in
        await page.getByRole("button", { name: "login" }).click();

        // Check the correct login for me
        const userName = "hector";
        await expect(page.locator(`text = ${userName} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
        // Wrong credentials
        await page.locator('input[name="Username"]').fill("testuser");
        await page.locator('input[name="Password"]').fill("wrongpassword");

        // Log in
        await page.getByRole("button", { name: "login" }).click();
        await expect(page.locator("text=wrong username or password")).toBeVisible();
    });
});
