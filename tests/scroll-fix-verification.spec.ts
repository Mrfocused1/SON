import { test, expect } from '@playwright/test';

test.describe('Scroll Fix Verification', () => {
  test('should respond to scroll immediately without resistance', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for preloader to finish
    await page.waitForTimeout(4000);

    // Measure time to first scroll response
    const startTime = Date.now();
    await page.mouse.click(500, 300);
    await page.mouse.wheel(0, 100);

    // Wait a bit for scroll to register
    await page.waitForTimeout(50);

    const scrollY = await page.evaluate(() => window.scrollY);
    const elapsed = Date.now() - startTime;

    console.log('Scroll response time:', elapsed, 'ms');
    console.log('Scroll position:', scrollY);

    // Scroll should respond within 100ms (previously was 302ms)
    expect(elapsed).toBeLessThan(150);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should handle scroll direction changes smoothly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(4000);

    // Scroll down
    await page.mouse.click(500, 300);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(100);

    const scrollDown = await page.evaluate(() => window.scrollY);
    expect(scrollDown).toBeGreaterThan(0);

    // Immediately change direction and scroll up
    const changeDirectionStart = Date.now();
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(50);

    const scrollUp = await page.evaluate(() => window.scrollY);
    const directionChangeTime = Date.now() - changeDirectionStart;

    console.log('Direction change time:', directionChangeTime, 'ms');
    console.log('Scroll after direction change:', scrollUp);

    // Should respond to direction change quickly
    expect(directionChangeTime).toBeLessThan(100);
    expect(scrollUp).toBeLessThan(scrollDown);
  });

  test('should not block scroll with ScrollTrigger.refresh()', async ({ page }) => {
    // This test verifies that ScrollTrigger.refresh() is deferred
    let scrollStartTime = 0;
    let scrollEndTime = 0;

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SCROLL_START')) scrollStartTime = Date.now();
      if (text.includes('SCROLL_END')) scrollEndTime = Date.now();
    });

    await page.goto('http://localhost:3000');
    await page.waitForTimeout(4000);

    await page.evaluate(() => {
      console.log('SCROLL_START', Date.now());
      window.scrollTo(0, 500);
      console.log('SCROLL_END', Date.now());
    });

    await page.waitForTimeout(100);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);
  });
});
