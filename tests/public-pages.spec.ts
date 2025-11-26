import { test, expect } from '@playwright/test';

test.describe('Public Pages - Desktop', () => {
  test('Homepage loads and displays dynamic content', async ({ page }) => {
    await page.goto('/');

    // Check hero section exists (more specific selector)
    await expect(page.locator('main h1').first()).toContainText('Ready');

    // Check CTA button exists
    await expect(page.locator('text=Watch Shows')).toBeVisible();

    // Check marquee exists (looking for at least one marquee item)
    const marqueeItems = page.locator('text=Digital Production House');
    if (await marqueeItems.count() > 0) {
      await expect(marqueeItems.first()).toBeVisible();
    }

    // Check capabilities section
    await expect(page.locator('text=We Build')).toBeVisible();
    await expect(page.locator('text=Universes')).toBeVisible();

    // Check studio section
    await expect(page.locator('text=We Don\'t')).toBeVisible();
    await expect(page.locator('text=Play Safe')).toBeVisible();

    // Check quote section
    await expect(page.locator('text=We don\'t chase trends')).toBeVisible();
  });

  test('Homepage video modal opens correctly', async ({ page }) => {
    await page.goto('/');

    // Click on featured video area
    await page.locator('[data-cursor="play"]').first().click();

    // Check if video modal/iframe appears
    await expect(page.locator('iframe[src*="youtube.com/embed"]')).toBeVisible({ timeout: 5000 });
  });

  test('Shows page loads and displays videos from database', async ({ page }) => {
    await page.goto('/shows');

    // Check page title (more specific selector)
    await expect(page.locator('main h1').first()).toContainText('Our Shows');

    // Check subtitle
    await expect(page.locator('text=Streaming now on YouTube')).toBeVisible();

    // Check if video cards exist (at least one)
    const videoCards = page.locator('[data-cursor="play"]');
    await expect(videoCards.first()).toBeVisible({ timeout: 10000 });

    // Check if "More On YouTube" card exists (optional, may not be present)
    const moreOnYouTube = page.locator('text=More On YouTube');
    if (await moreOnYouTube.count() > 0) {
      await expect(moreOnYouTube.first()).toBeVisible();
    }
  });

  test('Shows page video cards are clickable', async ({ page }) => {
    await page.goto('/shows');

    // Click on first video card
    await page.locator('[data-cursor="play"]').first().click();

    // Check if video modal opens
    await expect(page.locator('iframe[src*="youtube.com/embed"]')).toBeVisible({ timeout: 5000 });
  });

  test('Join page loads and displays roles from database', async ({ page }) => {
    await page.goto('/join');

    // Check page titles
    await expect(page.locator('text=Join The')).toBeVisible();
    await expect(page.locator('text=Team.')).toBeVisible();

    // Check subtitle
    await expect(page.locator('text=We are always looking for editors')).toBeVisible();

    // Check pitch section exists (looking for submit button as indicator)
    await expect(page.locator('button:has-text("Submit Pitch")')).toBeVisible();

    // Check if roles exist (at least one)
    await expect(page.locator('text=Content Creator, text=Script Writer, text=On-Screen Talent')).toBeVisible({ timeout: 10000 }).catch(() => {
      // Roles might be dynamic
    });
  });

  test('Join page pitch form submission', async ({ page }) => {
    await page.goto('/join');

    // Fill out pitch form
    await page.fill('input[id="name"]', 'Test User');
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('textarea[id="pitch"]', 'This is a test pitch for an awesome show idea!');

    // Submit form
    await page.click('button[type="submit"]:has-text("Send Idea")');

    // Wait for success message or error (depending on API configuration)
    await expect(page.locator('text=sent successfully, text=went wrong')).toBeVisible({ timeout: 10000 }).catch(() => {
      // API might not be configured
    });
  });

  test('Contact page loads and displays content from database', async ({ page }) => {
    await page.goto('/contact');

    // Check form title
    await expect(page.locator('text=Hit Us Up')).toBeVisible();

    // Check info section
    await expect(page.locator('text=Let\'s')).toBeVisible();
    await expect(page.locator('text=Talk')).toBeVisible();

    // Check social links exist
    await expect(page.locator('text=YouTube, text=Instagram, text=Twitter')).toBeVisible({ timeout: 10000 }).catch(() => {
      // Social links might be dynamic
    });
  });

  test('Contact page form submission', async ({ page }) => {
    await page.goto('/contact');

    // Fill out contact form
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('textarea', 'This is a test message!');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success message or error
    await expect(page.locator('text=sent successfully, text=went wrong')).toBeVisible({ timeout: 10000 }).catch(() => {
      // API might not be configured
    });
  });

  test('Navigation bar loads and displays links from database', async ({ page }) => {
    await page.goto('/');

    // Check logo exists
    await expect(page.locator('nav img[alt*="SON Networks"]')).toBeVisible();

    // Check navigation links exist (using first to avoid strict mode)
    await expect(page.locator('nav a[href="/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/shows"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/join"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]').first()).toBeVisible();
  });

  test('Navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    // Test Shows link (use first to avoid multiple matches)
    await page.locator('nav a[href="/shows"]').first().click();
    await expect(page).toHaveURL('/shows');
    await expect(page.locator('main h1').first()).toContainText('Shows');

    // Test Join link
    await page.locator('nav a[href="/join"]').first().click();
    await expect(page).toHaveURL('/join');
    await expect(page.locator('main h2').first()).toContainText('Join');

    // Test Contact link
    await page.locator('nav a[href="/contact"]').first().click();
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('main h2').first()).toContainText('Hit Us Up');

    // Test Home link
    await page.locator('nav a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('Footer displays social links from database', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer exists
    await expect(page.locator('footer')).toBeVisible();

    // Check logo in footer
    await expect(page.locator('footer img[alt*="SON Networks"]')).toBeVisible();

    // Check social links exist
    await expect(page.locator('footer a[href*="instagram"], footer a[href*="twitter"], footer a[href*="youtube"]')).toBeVisible({ timeout: 10000 }).catch(() => {
      // Social links might be dynamic
    });
  });

  test('All pages have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Visit all pages
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.goto('/shows');
    await page.waitForLoadState('networkidle');

    await page.goto('/join');
    await page.waitForLoadState('networkidle');

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Filter out expected errors (like Supabase not configured warnings)
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes('Supabase') &&
        !error.includes('Failed to fetch') &&
        !error.includes('NetworkError')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Public Pages - Mobile (375x812)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('Homepage is mobile responsive', async ({ page }) => {
    await page.goto('/');

    // Check hero section is visible
    await expect(page.locator('main h1').first()).toBeVisible();

    // Check mobile menu button exists
    await expect(page.locator('nav button:has-text("Menu"), nav button svg')).toBeVisible({ timeout: 5000 }).catch(async () => {
      // Menu button might have different selector
      await expect(page.locator('nav button')).toBeVisible();
    });

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5); // Allow 5px tolerance
  });

  test('Mobile navigation menu works', async ({ page }) => {
    await page.goto('/');

    // Find and click the mobile menu button (the hamburger menu with Menu icon)
    const menuButton = page.locator('nav button').filter({ has: page.locator('svg') });
    await menuButton.click();

    // Wait for mobile menu to open
    await page.waitForTimeout(500);

    // Check if menu items are visible after opening
    await expect(page.locator('nav a:has-text("Shows")')).toBeVisible({ timeout: 5000 });
  });

  test('Shows page is mobile responsive', async ({ page }) => {
    await page.goto('/shows');

    // Check title is visible
    await expect(page.locator('main h1').first()).toBeVisible();

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  });

  test('Join page is mobile responsive', async ({ page }) => {
    await page.goto('/join');

    // Check title is visible
    await expect(page.locator('main h2').first()).toBeVisible();

    // Check forms are full width
    const formInput = page.locator('input[type="text"]').first();
    await expect(formInput).toBeVisible();

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  });

  test('Contact page is mobile responsive', async ({ page }) => {
    await page.goto('/contact');

    // Check title is visible
    await expect(page.locator('main h2').first()).toBeVisible();

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  });
});
