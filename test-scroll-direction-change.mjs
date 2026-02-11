import puppeteer from 'puppeteer';

(async () => {
  console.log('🔍 Ralph is testing scroll DIRECTION CHANGE issue...');

  const browser = await puppeteer.launch({
    headless: false,
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

  // Inject scroll direction tracking
  await page.evaluate(() => {
    window.scrollAttempts = [];
    window.actualScrolls = [];

    let lastScrollY = window.scrollY;

    // Track wheel events
    window.addEventListener('wheel', (e) => {
      window.scrollAttempts.push({
        time: Date.now(),
        deltaY: e.deltaY,
        scrollY: window.scrollY
      });
    }, { passive: true });

    // Track actual scroll changes
    let scrollCheckInterval = setInterval(() => {
      if (window.scrollY !== lastScrollY) {
        window.actualScrolls.push({
          time: Date.now(),
          scrollY: window.scrollY,
          change: window.scrollY - lastScrollY
        });
        lastScrollY = window.scrollY;
      }
    }, 16);

    window.stopTracking = () => clearInterval(scrollCheckInterval);
  });

  console.log('🔄 TEST 1: Scroll down...');
  await page.mouse.move(700, 450);
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  await page.mouse.wheel({ deltaY: 100 });

  await new Promise(resolve => setTimeout(resolve, 500));
  const afterDown = await page.evaluate(() => window.scrollY);
  console.log(`   Scrolled down to: ${afterDown}px`);

  console.log('🔄 TEST 2: Change direction - scroll UP (this is where it should fail)...');
  console.log('   FIRST UP ATTEMPT:');
  await page.mouse.wheel({ deltaY: -100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  const afterFirstUp = await page.evaluate(() => window.scrollY);
  console.log(`   Position after 1st UP: ${afterFirstUp}px ${afterFirstUp >= afterDown ? '❌ STUCK!' : '✅ moved'}`);

  console.log('   SECOND UP ATTEMPT:');
  await page.mouse.wheel({ deltaY: -100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  const afterSecondUp = await page.evaluate(() => window.scrollY);
  console.log(`   Position after 2nd UP: ${afterSecondUp}px ${afterSecondUp < afterFirstUp ? '✅ moved' : '❌ still stuck'}`);

  console.log('\n🔄 TEST 3: Scroll up more, then change to DOWN...');
  await page.mouse.wheel({ deltaY: -100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  await page.mouse.wheel({ deltaY: -100 });
  await new Promise(resolve => setTimeout(resolve, 500));
  const afterMoreUp = await page.evaluate(() => window.scrollY);
  console.log(`   Scrolled up to: ${afterMoreUp}px`);

  console.log('   FIRST DOWN ATTEMPT (after going up):');
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  const afterFirstDown = await page.evaluate(() => window.scrollY);
  console.log(`   Position after 1st DOWN: ${afterFirstDown}px ${afterFirstDown <= afterMoreUp ? '❌ STUCK!' : '✅ moved'}`);

  console.log('   SECOND DOWN ATTEMPT:');
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(resolve => setTimeout(resolve, 200));
  const afterSecondDown = await page.evaluate(() => window.scrollY);
  console.log(`   Position after 2nd DOWN: ${afterSecondDown}px ${afterSecondDown > afterFirstDown ? '✅ moved' : '❌ still stuck'}`);

  // Get full tracking data
  const trackingData = await page.evaluate(() => {
    window.stopTracking();
    return {
      attempts: window.scrollAttempts,
      scrolls: window.actualScrolls
    };
  });

  console.log('\n📊 ANALYSIS:');
  console.log(`Total wheel events: ${trackingData.attempts.length}`);
  console.log(`Actual scroll changes: ${trackingData.scrolls.length}`);
  console.log(`Blocked attempts: ${trackingData.attempts.length - trackingData.scrolls.length}`);

  // Analyze direction changes
  let directionChangeFails = 0;
  for (let i = 1; i < trackingData.attempts.length; i++) {
    const prev = trackingData.attempts[i - 1];
    const curr = trackingData.attempts[i];
    const prevDir = Math.sign(prev.deltaY);
    const currDir = Math.sign(curr.deltaY);

    if (prevDir !== currDir) {
      // Direction changed - did scroll position change?
      const scrollChanged = trackingData.scrolls.some(s =>
        s.time >= curr.time && s.time < curr.time + 100
      );
      if (!scrollChanged) {
        directionChangeFails++;
        console.log(`   ❌ Direction change at ${curr.time}: wheel event fired but NO scroll movement`);
      }
    }
  }

  console.log(`\n🎯 VERDICT: ${directionChangeFails > 0 ? '❌ DIRECTION CHANGE RESISTANCE CONFIRMED' : '✅ No direction change issues detected'}`);

  await browser.close();
})();
