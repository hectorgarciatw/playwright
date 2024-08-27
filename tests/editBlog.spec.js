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

    test("a blog can be edited", async ({ page }) => {
        // Search the blog
        await page.click('text="course of react"');
        await page.click("button.edit-blog");

        // Edit title and content
        await page.fill('input[name="title"]', "Título del Blog Editado");
        await page.fill('textarea[name="content"]', "Contenido del blog editado");

        // Save changes
        await page.click("button.save-blog");

        // Checks title and content
        await expect(page.locator("text=Título del Blog Editado")).toBeVisible();
        await expect(page.locator("text=Contenido del blog editado")).toBeVisible();
    });
});
