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

        // Aquí, podrías crear un blog si es necesario
        await page.click('text="new blog"');
        await page.fill('input[name="title"]', "Blog para eliminar");
        await page.fill('input[name="author"]', "Autor de prueba");
        await page.fill('input[name="url"]', "http://prueba.com");
        await page.fill('input[name="likes"]', "5");
        await page.click('button[type="submit"]');
    });

    test("creator user can see the 'remove' button", async ({ page }) => {
        // Show details of the blog
        await page.click('text="view"');
        await expect(page.locator('button:has-text("remove")')).toBeVisible();
    });

    test("non-creator user cannot see the 'remove' button", async ({ page }) => {
        // Close the session
        await page.click('button:has-text("logout")');
        await page.fill('input[name="Username"]', "dummy");
        await page.fill('input[name="Password"]', "654321");

        // Send the form
        await page.click('button[type="submit"]');

        // Waits for the log text
        await expect(page.locator("text=dummy logged in")).toBeVisible();

        // Show details of blog
        await page.click('text="view"');
        await expect(page.locator('button:has-text("remove")')).not.toBeVisible();
    });
});
