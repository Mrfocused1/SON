import { test, expect } from '@playwright/test';

test.describe('Simple Scroll Test', () => {
  test('should allow immediate scrolling after page load', async ({ page }) => {
    await page.goto('/');

    // Wait for preloader
    await page.waitForTimeout(4000);

    // Get initial position
    const initialY = await page.evaluate(() => window.scrollY);
    console.log('Initial Y:', initialY);

    // Try scrolling with evaluate (simulates programmatic scroll that happens on wheel)
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });

    await page.waitForTimeout(100);

    const afterScrollY = await page.evaluate(() => window.scrollY);
    console.log('After scroll Y:', afterScrollY);

    expect(afterScrollY).toBeGreaterThan(initialY);
  });

  test('should scroll immediately with keyboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(4000);

    const initialY = await page.evaluate(() => window.scrollY);

    // Try scrolling with Page Down key
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(200);

    const afterKeyY = await page.evaluate(() => window.scrollY);
    console.log('Initial:', initialY, 'After keyboard:', afterKeyY);

    expect(afterKeyY).toBeGreaterThan(initialY);
  });
});
