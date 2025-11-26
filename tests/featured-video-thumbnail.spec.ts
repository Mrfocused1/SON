import { test, expect } from '@playwright/test';

test.describe('Featured Video Thumbnail Fix Verification', () => {

  test('Featured Video Thumbnail Upload and Save', async ({ page }) => {
    await page.goto('https://sonnetworks.site/admin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: 'test-results/01-admin-initial.png', fullPage: true });

    // The Home Page tab should be selected by default, but let's make sure by clicking the button
    const homeButton = page.getByRole('button', { name: 'Home Page' });
    await homeButton.click();
    await page.waitForTimeout(1000);

    // Scroll down to find the Featured Video section
    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/02-scrolled-to-featured-video.png', fullPage: true });

    // Find all inputs on the page to identify the thumbnail input
    // The thumbnail input should be near the "Video Thumbnail" label
    console.log('Looking for thumbnail input field...');

    // Try to find inputs by their labels
    const allLabels = await page.locator('label').allTextContents();
    console.log('Found labels:', allLabels);

    // More specific - find the container with "Video Thumbnail" text and get the input within it
    const thumbnailContainer = page.locator('div:has(label:has-text("Video Thumbnail"))');
    await thumbnailContainer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/03-thumbnail-section-visible.png', fullPage: true });

    // Find the input within this container
    const thumbnailInput = thumbnailContainer.locator('input[type="text"]');

    // Clear any existing value and enter a test URL
    await thumbnailInput.clear();
    await thumbnailInput.fill('https://images.pexels.com/photos/8360007/pexels-photo-8360007.jpeg');
    await page.waitForTimeout(500);

    console.log('Filled thumbnail input with test URL');
    await page.screenshot({ path: 'test-results/04-thumbnail-url-entered.png', fullPage: true });

    // Verify the value was entered
    const inputValue = await thumbnailInput.inputValue();
    console.log('Input value after fill:', inputValue);

    // Scroll to the bottom to find the save button
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/05-scrolled-to-save-button.png', fullPage: true });

    // Click the Save button (should be "Save Changes" or similar)
    const saveButton = page.locator('button:has-text("Save")').first();
    await saveButton.click();

    console.log('Clicked save button');

    // Wait for the save operation to complete
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'test-results/06-after-save-click.png', fullPage: true });

    // Check if success toast appeared
    const toastVisible = await page.locator('text=/saved|success/i').isVisible().catch(() => false);
    console.log('Toast notification visible:', toastVisible);

    // Reload the page to verify the data persisted
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'test-results/07-after-reload.png', fullPage: true });

    // Navigate back to the thumbnail field
    const homeButtonAfterReload = page.getByRole('button', { name: 'Home Page' });
    await homeButtonAfterReload.click();
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await page.waitForTimeout(500);

    // Check if the thumbnail value persisted
    const thumbnailContainerAfterReload = page.locator('div:has(label:has-text("Video Thumbnail"))');
    const thumbnailInputAfterReload = thumbnailContainerAfterReload.locator('input[type="text"]');
    const persistedValue = await thumbnailInputAfterReload.inputValue();

    console.log('Persisted thumbnail value:', persistedValue);
    await page.screenshot({ path: 'test-results/08-thumbnail-after-reload.png', fullPage: true });

    // Verify the value persisted
    expect(persistedValue).toBe('https://images.pexels.com/photos/8360007/pexels-photo-8360007.jpeg');
  });

  test('Check Database for Featured Video Thumbnail', async ({ page }) => {
    // This test will manually check if the database has the thumbnail field
    console.log('Manual database check: Query home_content table for featured_video_thumbnail column');
    console.log('Expected: The column should exist and contain the thumbnail URL');

    // For now, just verify the admin page loads and shows the field
    await page.goto('https://sonnetworks.site/admin');
    await page.waitForLoadState('networkidle');

    const homeButton = page.getByRole('button', { name: 'Home Page' });
    await homeButton.click();
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await page.waitForTimeout(500);

    // Verify the Video Thumbnail label exists
    const thumbnailLabel = page.locator('label:has-text("Video Thumbnail")');
    await expect(thumbnailLabel).toBeVisible();

    await page.screenshot({ path: 'test-results/09-thumbnail-field-exists.png', fullPage: true });
    console.log('Video Thumbnail field is present in the admin UI');
  });
});
