import { test, expect } from '@playwright/test';

test.describe('Real User Scroll Experience', () => {
  test('user can scroll immediately after preloader finishes', async ({ page }) => {
    await page.goto('/');

    // Wait for preloader animation to complete
    await page.waitForTimeout(4000);

    // Verify page is at top
    const initialY = await page.evaluate(() => window.scrollY);
    expect(initialY).toBe(0);

    // Simulate user pressing arrow down key multiple times (most reliable)
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await page.waitForTimeout(100);

    const afterArrowsY = await page.evaluate(() => window.scrollY);
    console.log('After arrow keys:', afterArrowsY);
    expect(afterArrowsY).toBeGreaterThan(0);

    // Reset
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Test Page Down
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(100);

    const afterPageDownY = await page.evaluate(() => window.scrollY);
    console.log('After Page Down:', afterPageDownY);
    expect(afterPageDownY).toBeGreaterThan(0);

    // Reset
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Test Space bar (should scroll down)
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);

    const afterSpaceY = await page.evaluate(() => window.scrollY);
    console.log('After Space:', afterSpaceY);
    expect(afterSpaceY).toBeGreaterThan(0);
  });

  test('scroll works immediately after preloader without waiting', async ({ page }) => {
    await page.goto('/');

    // Wait just until preloader element is gone
    await page.waitForFunction(() => {
      const preloader = document.querySelector('.preloader') ||
                       document.querySelector('[class*="z-[10001]"]');
      return !preloader || window.getComputedStyle(preloader).display === 'none';
    }, { timeout: 5000 });

    // Additional small wait to ensure animations complete
    await page.waitForTimeout(500);

    // Try scrolling immediately
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);

    const scrollY = await page.evaluate(() => window.scrollY);
    console.log('Scroll Y after preloader gone:', scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('no pointer-events blocking during or after load', async ({ page }) => {
    await page.goto('/');

    // Check that body/html don't have pointer-events: none
    const pointerEvents = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body).pointerEvents;
      const html = window.getComputedStyle(document.documentElement).pointerEvents;
      return { body, html };
    });

    console.log('Pointer events:', pointerEvents);
    expect(pointerEvents.body).not.toBe('none');
    expect(pointerEvents.html).not.toBe('none');

    // Wait for preloader
    await page.waitForTimeout(4000);

    // Check again after preloader
    const pointerEventsAfter = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body).pointerEvents;
      const html = window.getComputedStyle(document.documentElement).pointerEvents;
      return { body, html };
    });

    console.log('Pointer events after preloader:', pointerEventsAfter);
    expect(pointerEventsAfter.body).not.toBe('none');
    expect(pointerEventsAfter.html).not.toBe('none');
  });
});
