// createBlog.spec.js

const { test, expect } = require("@playwright/test");

test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
        // Open the page of the app
        await page.goto("http://localhost:5173");

        // Fill the login form
        await page.fill('input[name="Username"]', "hrgarciatw");
        await page.fill('input[name="Password"]', "654321");

        // Send the form
        await page.click('button[type="submit"]');

        // Waits for the log text
        await expect(page.locator("text=hector logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
        await page.click("text=new blog");
        // Complete the login form
        await page.fill('input[name="title"]', "Nuevo Blog de Prueba");
        await page.fill('input[name="author"]', "Autor de Prueba");
        await page.fill('input[name="url"]', "http://example.com");
        await page.fill('input[name="likes"]', "5");

        // Send the form
        await page.click('button[name="create"]');

        // The checks
        await expect(page.locator("text=a new blog Nuevo Blog de Prueba by Autor de Prueba added")).toBeVisible();
        await expect(page.locator(".blog-header", { hasText: "Nuevo Blog de Prueba" })).toBeVisible();
    });
});
