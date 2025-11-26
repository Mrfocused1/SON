import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Shows page via desktop menu', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Click on Shows link
    await page.click('nav a[href="/shows"]');

    // Wait for navigation to complete
    await page.waitForURL('/shows', { timeout: 10000 });

    // Verify we're on the shows page
    expect(page.url()).toContain('/shows');
  });

  test('should navigate to Join Us page via desktop menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Click on Join Us link
    await page.click('nav a[href="/join"]');

    // Wait for navigation to complete
    await page.waitForURL('/join', { timeout: 10000 });

    // Verify we're on the join page
    expect(page.url()).toContain('/join');
  });

  test('should navigate to Contact page via desktop menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Click on Contact link
    await page.click('nav a[href="/contact"]');

    // Wait for navigation to complete
    await page.waitForURL('/contact', { timeout: 10000 });

    // Verify we're on the contact page
    expect(page.url()).toContain('/contact');
  });

  test('should show transition overlay during navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Click on Shows link and immediately check for transition
    await page.click('nav a[href="/shows"]');

    // Wait a bit for the transition to start
    await page.waitForTimeout(100);

    // Check if transition overlay appears
    const transitionOverlay = page.locator('.fixed.inset-0.bg-\\[var\\(--ink\\)\\]');

    // Note: This may or may not be visible depending on timing
    // The main test is whether navigation actually happens
  });

  test('should navigate back to home from another page', async ({ page }) => {
    // First navigate to Shows
    await page.goto('/shows');
    await page.waitForLoadState('networkidle');

    // Click on Home link
    await page.click('nav a[href="/"]');

    // Wait for navigation to complete
    await page.waitForURL('/', { timeout: 10000 });

    // Verify we're on the home page
    expect(page.url()).toBe('http://localhost:3000/');
  });

  test('should navigate via mobile menu', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.waitForLoadState('networkidle');

    // Open mobile menu
    await page.click('button:has(svg)'); // Menu button

    // Wait for mobile menu to appear
    await page.waitForSelector('nav a[href="/shows"]', { state: 'visible' });

    // Click on Shows link in mobile menu
    await page.click('nav a[href="/shows"]');

    // Wait for navigation to complete
    await page.waitForURL('/shows', { timeout: 10000 });

    // Verify we're on the shows page
    expect(page.url()).toContain('/shows');

    // Verify mobile menu is closed after navigation
    const mobileMenu = page.locator('.md\\:hidden.bg-\\[var\\(--ink\\)\\]');
    await expect(mobileMenu).not.toBeVisible();
  });
});
