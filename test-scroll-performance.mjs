import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

(async () => {
  console.log('🔍 Ralph is investigating scroll performance...');

  const browser = await puppeteer.launch({
    headless: false, // Show browser so we can see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  console.log('📱 Navigating to site...');
  await page.goto('https://son-ivory.vercel.app', {
    waitUntil: 'networkidle0'
  });

  console.log('⏳ Waiting for content to load...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('📸 Taking initial screenshot...');
  await page.screenshot({
    path: '/Users/paulbridges/new son/SON/scroll-test-before.png',
    fullPage: false
  });

  // Enable performance metrics on the current page
  await page.evaluate(() => {
    window.scrollMetrics = [];
    window.frameDrops = 0;
    let lastTime = performance.now();

    window.addEventListener('scroll', () => {
      const now = performance.now();
      const delta = now - lastTime;
      window.scrollMetrics.push(delta);

      // Frame should be ~16.67ms for 60fps
      if (delta > 50) { // Dropped frames if > 50ms
        window.frameDrops++;
      }

      lastTime = now;
    });
  });

  console.log('🔄 Testing scroll performance...');

  // Smooth scroll test
  await page.evaluate(async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = scrollHeight - viewportHeight;

    return new Promise((resolve) => {
      let start = null;
      const duration = 3000; // 3 seconds

      function scroll(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;

        if (progress < 1) {
          window.scrollTo(0, scrollDistance * progress);
          requestAnimationFrame(scroll);
        } else {
          window.scrollTo(0, scrollDistance);
          resolve();
        }
      }

      requestAnimationFrame(scroll);
    });
  });

  console.log('⏳ Waiting after scroll...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get performance metrics
  const metrics = await page.evaluate(() => {
    return {
      scrollEvents: window.scrollMetrics.length,
      frameDrops: window.frameDrops,
      avgScrollDelay: window.scrollMetrics.reduce((a, b) => a + b, 0) / window.scrollMetrics.length,
      maxScrollDelay: Math.max(...window.scrollMetrics),
      url: window.location.href
    };
  });

  console.log('\n📊 SCROLL PERFORMANCE METRICS:');
  console.log('================================');
  console.log(`Total scroll events: ${metrics.scrollEvents}`);
  console.log(`Frame drops detected: ${metrics.frameDrops}`);
  console.log(`Average scroll delay: ${metrics.avgScrollDelay.toFixed(2)}ms (target: <16.67ms for 60fps)`);
  console.log(`Max scroll delay: ${metrics.maxScrollDelay.toFixed(2)}ms`);
  console.log(`Performance rating: ${metrics.frameDrops > 10 ? '❌ POOR (janky)' : metrics.avgScrollDelay > 20 ? '⚠️  FAIR' : '✅ GOOD'}`);

  // Analyze DOM complexity
  const domStats = await page.evaluate(() => {
    const images = document.querySelectorAll('img').length;
    const totalElements = document.querySelectorAll('*').length;
    const animations = document.querySelectorAll('[style*="animation"], .animate-').length;
    const useEffects = document.querySelectorAll('[data-react-root]').length;

    return {
      totalElements,
      images,
      animations,
      useEffects
    };
  });

  console.log('\n🔍 DOM ANALYSIS:');
  console.log('================================');
  console.log(`Total DOM elements: ${domStats.totalElements} ${domStats.totalElements > 1500 ? '⚠️  (high)' : '✅'}`);
  console.log(`Images: ${domStats.images}`);
  console.log(`Animated elements: ${domStats.animations}`);

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    metrics,
    domStats,
    conclusion: metrics.frameDrops > 10 ? 'SCROLL JANK DETECTED' : 'Performance acceptable'
  };

  writeFileSync(
    '/Users/paulbridges/new son/SON/scroll-performance-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log('\n✅ Report saved to scroll-performance-report.json');
  console.log('📸 Screenshot saved to scroll-test-before.png');

  await browser.close();

  console.log('\n🎯 Ralph says: Time to check the code for common scroll issues!');
})();
