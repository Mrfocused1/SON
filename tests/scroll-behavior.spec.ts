import { test, expect } from '@playwright/test';

test.describe('Scroll Behavior Investigation', () => {
  test('should detect scroll resistance and measure scroll performance', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for preloader to finish (preloader total duration ~3.4s)
    await page.waitForTimeout(4000);

    // Check initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    console.log('Initial scroll position:', initialScrollY);

    // Check for any overflow hidden on body/html
    const bodyOverflow = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      const html = window.getComputedStyle(document.documentElement);
      return {
        body: {
          overflow: body.overflow,
          overflowY: body.overflowY,
          overflowX: body.overflowX,
        },
        html: {
          overflow: html.overflow,
          overflowY: html.overflowY,
          overflowX: html.overflowX,
        }
      };
    });
    console.log('Overflow styles:', JSON.stringify(bodyOverflow, null, 2));

    // Check for scroll-snap
    const scrollSnap = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      const html = window.getComputedStyle(document.documentElement);
      return {
        bodyScrollSnapType: body.scrollSnapType,
        htmlScrollSnapType: html.scrollSnapType,
      };
    });
    console.log('Scroll snap:', JSON.stringify(scrollSnap, null, 2));

    // Check for scroll-behavior
    const scrollBehavior = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      const html = window.getComputedStyle(document.documentElement);
      return {
        bodyScrollBehavior: body.scrollBehavior,
        htmlScrollBehavior: html.scrollBehavior,
      };
    });
    console.log('Scroll behavior:', JSON.stringify(scrollBehavior, null, 2));

    // Check for touch-action
    const touchAction = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      const html = window.getComputedStyle(document.documentElement);
      return {
        bodyTouchAction: body.touchAction,
        htmlTouchAction: html.touchAction,
      };
    });
    console.log('Touch action:', JSON.stringify(touchAction, null, 2));

    // Check for wheel/touchmove event listeners
    const eventListeners = await page.evaluate(() => {
      const listeners: string[] = [];

      // Check if there are wheel listeners on window/document/body
      const hasWindowWheel = (window as any)._wheelListeners || false;
      const hasBodyWheel = (document.body as any)._wheelListeners || false;

      return {
        note: 'Cannot directly inspect event listeners, but we can test if preventDefault is called',
        hasWindowWheel,
        hasBodyWheel,
      };
    });
    console.log('Event listeners check:', JSON.stringify(eventListeners, null, 2));

    // Test scroll with wheel event
    console.log('Testing scroll with wheel event...');
    const beforeScrollTime = Date.now();

    // Try to scroll with mouse wheel - first click to ensure page has focus
    await page.mouse.click(500, 300);
    await page.waitForTimeout(50);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(100);

    const afterFirstWheelScrollY = await page.evaluate(() => window.scrollY);
    const afterFirstWheelTime = Date.now();
    console.log('After first wheel (100px):', afterFirstWheelScrollY, 'Time:', afterFirstWheelTime - beforeScrollTime, 'ms');

    // Try another wheel event
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(100);
    const afterSecondWheelScrollY = await page.evaluate(() => window.scrollY);
    console.log('After second wheel (100px):', afterSecondWheelScrollY);

    // Try a larger wheel event
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(200);
    const afterLargeWheelScrollY = await page.evaluate(() => window.scrollY);
    console.log('After large wheel (500px):', afterLargeWheelScrollY);

    // Test programmatic scroll
    console.log('Testing programmatic scroll...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    const afterResetScrollY = await page.evaluate(() => window.scrollY);
    console.log('After reset to top:', afterResetScrollY);

    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(100);
    const afterProgrammaticScrollY = await page.evaluate(() => window.scrollY);
    console.log('After programmatic scroll to 300:', afterProgrammaticScrollY);

    // Check ScrollTrigger configuration
    const scrollTriggerInfo = await page.evaluate(() => {
      // @ts-ignore - GSAP ScrollTrigger might be on window
      const ScrollTrigger = window.ScrollTrigger || window.gsap?.ScrollTrigger;
      if (ScrollTrigger) {
        return {
          exists: true,
          scrollerProxy: !!ScrollTrigger.scrollerProxy,
          normalizeScroll: !!ScrollTrigger.normalizeScroll,
          config: ScrollTrigger.config?.(),
          allTriggers: ScrollTrigger.getAll?.().length || 0,
        };
      }
      return { exists: false };
    });
    console.log('ScrollTrigger info:', JSON.stringify(scrollTriggerInfo, null, 2));

    // Check GSAP ticker
    const gsapInfo = await page.evaluate(() => {
      // @ts-ignore
      const gsap = window.gsap;
      if (gsap) {
        return {
          exists: true,
          ticker: {
            fps: gsap.ticker.fps,
          }
        };
      }
      return { exists: false };
    });
    console.log('GSAP info:', JSON.stringify(gsapInfo, null, 2));

    // Check if preloader is blocking scroll
    const preloaderInfo = await page.evaluate(() => {
      const preloader = document.querySelector('.preloader');
      const preloaderFixed = document.querySelector('[class*="z-[10001]"]');
      return {
        preloaderExists: !!preloader,
        preloaderFixedExists: !!preloaderFixed,
        preloaderVisible: preloader ? window.getComputedStyle(preloader).display !== 'none' : false,
      };
    });
    console.log('Preloader info:', JSON.stringify(preloaderInfo, null, 2));

    // Final assessment
    expect(afterFirstWheelScrollY).toBeGreaterThan(initialScrollY);
    console.log('\n=== SCROLL RESISTANCE TEST ===');
    console.log('Initial scroll should respond immediately to wheel events');
    console.log('If scroll is 0 after wheel events, there is scroll blocking');
    console.log('Expected smooth, instant scroll response');
  });

  test('should detect scroll event interception', async ({ page }) => {
    let wheelEventsCaptured = 0;
    let scrollEventsCaptured = 0;

    // Set up console message listener
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('WHEEL_EVENT')) wheelEventsCaptured++;
      if (text.includes('SCROLL_EVENT')) scrollEventsCaptured++;
    });

    await page.goto('/');
    await page.waitForTimeout(3500);

    // Inject scroll event detector
    await page.evaluate(() => {
      let wheelCount = 0;
      let scrollCount = 0;

      window.addEventListener('wheel', (e) => {
        wheelCount++;
        console.log('WHEEL_EVENT', wheelCount, 'defaultPrevented:', e.defaultPrevented);
      }, { passive: false, capture: true });

      window.addEventListener('scroll', () => {
        scrollCount++;
        console.log('SCROLL_EVENT', scrollCount, window.scrollY);
      }, { passive: true, capture: true });
    });

    // Trigger wheel events
    await page.mouse.move(500, 300);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(200);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(200);

    console.log('Wheel events captured:', wheelEventsCaptured);
    console.log('Scroll events captured:', scrollEventsCaptured);

    expect(wheelEventsCaptured).toBeGreaterThan(0);
  });
});
