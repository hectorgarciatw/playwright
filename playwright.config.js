// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    fullyParallel: false,
    timeout: 30000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: "html",
    use: {
        trace: "on-first-retry",
        baseURL: "http://localhost:5173",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
});
