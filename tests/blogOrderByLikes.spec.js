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

    test("blogs are displayed in descending order of likes", async ({ page }) => {
        // Wait for the blog list to load
        await page.waitForSelector(".blog");

        // Get all blog like elements
        const likeElements = await page.locator(".blog-likes");

        // Extract the number of likes from each blog
        const likes = await likeElements.evaluateAll((elements) => elements.map((el) => parseInt(el.textContent.split(" ")[1], 10)));

        // Check if likes are sorted in descending order
        for (let i = 0; i < likes.length - 1; i++) {
            expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
        }
    });
});
