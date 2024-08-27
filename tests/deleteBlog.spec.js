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

        // Create a dummy blog
        await page.click('text="new blog"');
        await page.fill('input[name="title"]', "Blog para eliminar");
        await page.fill('input[name="author"]', "Autor de prueba");
        await page.fill('input[name="url"]', "http://prueba.com");
        await page.fill('input[name="likes"]', "5");
        await page.click('button[type="submit"]');
    });

    test("a blog can be deleted by the user who created it", async ({ page }) => {
        // Find the blog to delete
        await page.click('text="view"');

        // Intercepts the window.confirm
        page.on("dialog", (dialog) => dialog.accept());
        await page.click('button:has-text("remove")');

        // Verify the eliminate process
        await expect(page.locator('text="Título del Blog para eliminar"')).not.toBeVisible();
    });
});
