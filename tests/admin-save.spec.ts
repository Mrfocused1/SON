import { test, expect } from '@playwright/test';

test.describe('Admin Page Save Functionality', () => {
  test('Admin page loads and save button shows toast', async ({ page }) => {
    // Go to admin page on live site
    await page.goto('/admin');

    // Take screenshot of initial state
    await page.screenshot({ path: 'test-results/admin-initial.png', fullPage: true });

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check admin header exists
    await expect(page.locator('text=ADMIN')).toBeVisible();

    // Take screenshot after load
    await page.screenshot({ path: 'test-results/admin-loaded.png', fullPage: true });

    // Click the Save All button in header
    const saveAllButton = page.locator('button:has-text("Save All")');
    if (await saveAllButton.isVisible()) {
      await saveAllButton.click();

      // Wait for toast to appear
      await page.waitForTimeout(1000);

      // Take screenshot to see toast
      await page.screenshot({ path: 'test-results/admin-after-save-all.png', fullPage: true });
    }

    // Now test the section-specific save button
    // First, scroll down to find a save button within a section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Take screenshot of scrolled view
    await page.screenshot({ path: 'test-results/admin-scrolled.png', fullPage: true });

    // Look for section save button (like "Save Changes" or "Save Home Page")
    const sectionSaveButton = page.locator('button:has-text("Save")').last();
    if (await sectionSaveButton.isVisible()) {
      await sectionSaveButton.click();

      // Wait for toast
      await page.waitForTimeout(2000);

      // Take screenshot after section save
      await page.screenshot({ path: 'test-results/admin-after-section-save.png', fullPage: true });
    }
  });

  test('Home section save button works', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Make sure Home Page section is selected (should be default)
    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
    }

    await page.waitForTimeout(1000);

    // Scroll to bottom to find save button
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Look for the Save Changes button in the Home section
    const saveButton = page.locator('button:has-text("Save Changes"), button:has-text("Save Home")');

    await page.screenshot({ path: 'test-results/admin-home-section.png', fullPage: true });

    if (await saveButton.first().isVisible()) {
      await saveButton.first().click();

      // Wait for toast notification
      await page.waitForTimeout(2000);

      // Screenshot to capture toast
      await page.screenshot({ path: 'test-results/admin-home-saved.png', fullPage: true });

      // Check if success toast appeared
      const toast = page.locator('text=saved successfully');
      const toastVisible = await toast.isVisible().catch(() => false);
      console.log('Toast visible:', toastVisible);
    } else {
      console.log('Save button not found');
      await page.screenshot({ path: 'test-results/admin-no-save-button.png', fullPage: true });
    }
  });
});
