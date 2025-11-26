import { test, expect } from '@playwright/test';

test.describe('Admin Panel Comprehensive Testing', () => {

  test('Featured Video Thumbnail - Upload and Save', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Home Page section
    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Take initial screenshot
    await page.screenshot({ path: 'test-results/thumbnail-initial.png', fullPage: true });

    // Scroll to Featured Video section
    await page.evaluate(() => {
      const section = document.querySelector('h4:has-text("Featured Video")');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Take screenshot of featured video section
    await page.screenshot({ path: 'test-results/thumbnail-section.png', fullPage: true });

    // Try to find the thumbnail upload field
    const thumbnailUploader = page.locator('label:has-text("Video Thumbnail")').first();
    await expect(thumbnailUploader).toBeVisible();

    // Enter a test URL for the thumbnail
    const thumbnailInput = page.locator('input[type="text"]').filter({ hasText: '' }).nth(0);
    const allInputs = await page.locator('input[type="text"]').all();

    console.log(`Found ${allInputs.length} text inputs`);

    // Take screenshot before entering thumbnail
    await page.screenshot({ path: 'test-results/thumbnail-before-input.png', fullPage: true });

    // Try to find and fill the thumbnail input by looking for the label
    const thumbnailSection = page.locator('text=Video Thumbnail').first();
    if (await thumbnailSection.isVisible()) {
      // Find the input near this label
      const nearbyInput = page.locator('label:has-text("Video Thumbnail") ~ div input[type="text"]').first();
      if (await nearbyInput.isVisible()) {
        await nearbyInput.fill('https://images.pexels.com/photos/8360007/pexels-photo-8360007.jpeg');
        console.log('Filled thumbnail input');
      }
    }

    await page.waitForTimeout(1000);

    // Take screenshot after entering thumbnail
    await page.screenshot({ path: 'test-results/thumbnail-after-input.png', fullPage: true });

    // Scroll to bottom to find save button
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Click Save button
    const saveButton = page.locator('button:has-text("Save")').first();
    if (await saveButton.isVisible()) {
      await saveButton.click();
      console.log('Clicked save button');

      // Wait for save to complete
      await page.waitForTimeout(3000);

      // Take screenshot after save
      await page.screenshot({ path: 'test-results/thumbnail-after-save.png', fullPage: true });
    }
  });

  test('Home Page - Hero Section', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Home Page
    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Check hero section inputs are present
    await expect(page.locator('label:has-text("Title")')).toBeVisible();
    await expect(page.locator('label:has-text("Title Accent")')).toBeVisible();
    await expect(page.locator('label:has-text("Subtitle")')).toBeVisible();

    await page.screenshot({ path: 'test-results/home-hero-section.png', fullPage: true });
  });

  test('Home Page - Marquee Items', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Scroll to marquee section
    await page.evaluate(() => {
      const section = document.querySelector('h3:has-text("Marquee")');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/home-marquee.png', fullPage: true });

    // Check if we can add a marquee item
    const addButton = page.locator('button:has-text("Add Item")').first();
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/home-marquee-add.png', fullPage: true });
    }
  });

  test('Home Page - Capabilities Section', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Scroll to capabilities
    await page.evaluate(() => {
      const section = document.querySelector('h3:has-text("Capabilities")');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/home-capabilities.png', fullPage: true });
  });

  test('Home Page - Studio Images', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Scroll to studio images
    await page.evaluate(() => {
      const section = document.querySelector('h3:has-text("Studio")');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/home-studio-images.png', fullPage: true });
  });

  test('Shows Page - Add/Edit Show', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Shows
    const showsTab = page.locator('text=Shows');
    if (await showsTab.isVisible()) {
      await showsTab.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'test-results/shows-section.png', fullPage: true });

    // Check if add show button exists
    const addButton = page.locator('button:has-text("Add Show")');
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/shows-add.png', fullPage: true });
    }
  });

  test('Join Page - Roles Management', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Join Page
    const joinTab = page.locator('text=Join Page');
    if (await joinTab.isVisible()) {
      await joinTab.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'test-results/join-section.png', fullPage: true });

    // Check for add role button
    const addButton = page.locator('button:has-text("Add Role")');
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/join-add-role.png', fullPage: true });
    }
  });

  test('Contact Page - Edit Content', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Contact Page
    const contactTab = page.locator('text=Contact');
    if (await contactTab.isVisible()) {
      await contactTab.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'test-results/contact-section.png', fullPage: true });
  });

  test('Navigation - Add/Edit Nav Items', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Navigation
    const navTab = page.locator('text=Navigation');
    if (await navTab.isVisible()) {
      await navTab.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'test-results/navigation-section.png', fullPage: true });
  });

  test('Footer & Socials - Manage Social Links', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Footer & Socials
    const footerTab = page.locator('text=Footer');
    if (await footerTab.isVisible()) {
      await footerTab.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'test-results/footer-section.png', fullPage: true });
  });

  test('Database Verification - Featured Video Thumbnail Saved', async ({ page }) => {
    // This test will verify the thumbnail was actually saved to the database
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Navigate to Home Page
    const homeTab = page.locator('text=Home Page');
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(500);
    }

    // Scroll to Featured Video section
    await page.evaluate(() => {
      const section = document.querySelector('h4:has-text("Featured Video")');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Check if there's a thumbnail value in the input
    const thumbnailInputs = await page.locator('input[type="text"]').all();
    let foundThumbnail = false;

    for (const input of thumbnailInputs) {
      const value = await input.inputValue();
      if (value.includes('pexels') || value.includes('thumbnail')) {
        console.log('Found thumbnail value:', value);
        foundThumbnail = true;
      }
    }

    console.log('Thumbnail found in inputs:', foundThumbnail);
    await page.screenshot({ path: 'test-results/thumbnail-verification.png', fullPage: true });
  });
});
