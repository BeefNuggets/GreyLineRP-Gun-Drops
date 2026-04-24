'use strict';

/* ══════════════════════════════════════
   TIER CONFIG
══════════════════════════════════════ */
const TIERS = {
  t0: {
    label:  "T0 — PROBATION",
    eyebrow:"TIER 0",
    title:  "Probation",
    desc:   "Knives and bats only.",
    drops:  2,
  },
  t05: {
    label:  "T0.5 — RISING",
    eyebrow:"TIER 0.5",
    title:  "Rising",
    desc:   "Melee weapons and basic low-grade pistols.",
    drops:  1,
  },
  t1: {
    label:  "T1 — PISTOLS",
    eyebrow:"TIER 1",
    title:  "Tier 1",
    desc:   "Low quality pistols. 1–2 mid-quality allowed.",
    drops:  2,
  },
  t15: {
    label:  "T1.5 — HIGH PISTOLS",
    eyebrow:"TIER 1.5",
    title:  "Tier 1.5",
    desc:   "High-quality pistols and 1–2 mid-range switches.",
    drops:  2,
  },
  t2: {
    label:  "T2 — PISTOLS & RIFLES",
    eyebrow:"TIER 2",
    title:  "Tier 2",
    desc:   "High quality pistols, 2 switches, 2 ARs, 2 Dracos.",
    drops:  1,
  },
  t25: {
    label:  "T2.5 — SWITCHES & RIFLES",
    eyebrow:"TIER 2.5",
    title:  "Tier 2.5",
    desc:   "High quality switches and rifles only.",
    drops:  1,
  },
};

/* ══════════════════════════════════════
   ITEMS  — add / edit freely
══════════════════════════════════════ */
const ITEMS = [
  // T0 — Melee only
  { tier:"t0",  name:"Machete",            img:"T0/Machete.png" },
  { tier:"t0",  name:"ChefKnife",  img:"T0/ChefKnife.png" },
  { tier:"t0",  name:"Hammer",   img:"T0/Hammer.png" },
  { tier:"t0",  name:"SwitchBlade",        img:"T0/SwitchBlade.png" },

  // T0.5 — Melee + basic pistols (edit as needed)
  { tier:"t05", name:"M1911",            img:"T0.5/M1911.png" },
  { tier:"t05", name:"WP22",        img:"T0.5/WP22.png" },
  { tier:"t05", name:"HiPointC9",        img:"T0.5/HiPointC9.png" },
  { tier:"t05", name:"S&W38",        img:"T0.5/S&W38.png" },

  // T1 — Low/Mid Pistols
  { tier:"t1",  name:"Glock17",    img:"T1/Glock17.png" },
  { tier:"t1",  name:"XDCompact",    img:"T1/XDCompact.png" },
  { tier:"t1",  name:"G2C",     img:"T1/G2C.png" },
  { tier:"t1",  name:"Glock17S",  img:"T1/Glock17S.png" },
  { tier:"t1",  name:"USP45",       img:"T1/USP45.png" },
  { tier:"t1",  name:"P320",       img:"T1/P320.png" },
  { tier:"t1",  name:"G27Ext",        img:"T1/G27Ext.png" },
  { tier:"t1",  name:"G26",        img:"T1/G26.png" },
  
  // T1.5 — High Pistols + Mid Switches
  { tier:"t15", name:"AR15",         img:"T1.5/AR15.png" },
  { tier:"t15", name:"Glock17Switch", img:"T1.5/Glock17Switch.png" },
  { tier:"t15", name:"FN5.7",img:"T1.5/FN5.7.png" },
  { tier:"t15", name:"P320RMR",img:"T1.5/P320RMR.png" },
  { tier:"t15", name:"P80Drum", img:"T1.5/P80Drum.png" },
  { tier:"t15", name:"P220",      img:"T1.5/P220.png" },
  { tier:"t15", name:"HKMK23", img:"T1.5/HKMK23.png" },

  // T2 — High Pistols + Switches + ARs + Dracos
  { tier:"t2",  name:"FullyARP",          img:"T2/FullyARP.png" },
  { tier:"t2",  name:"Deagle",         img:"T2/Deagle.png" },
  { tier:"t2",  name:"Glock30Switch",          img:"T2/Glock30Switch.png" },
  { tier:"t2",  name:"Draco",  img:"T2/Draco.png" },
  { tier:"t2",  name:"ClearARP",  img:"T2/ClearARP.png" },
  { tier:"t2",  name:"Tec-9",       img:"T2/Tec-9.png" },

  // T2.5 — High Quality Switches & Rifles
  { tier:"t25", name:"Cruiser",         img:"T2.5/Cruiser.png" },
  { tier:"t25", name:"Sawed-Off",       img:"T2.5/Sawed-Off.png" },
  { tier:"t25", name:"Draco60Rnd",       img:"T2.5/Draco60Rnd.png" },
  { tier:"t25", name:"Mac10Sup",     img:"T2.5/Mac10Sup.png" },
  { tier:"t25", name:"Mp5K",     img:"T2.5/Mp5K.png" },
  { tier:"t25", name:"Glock19Switch",           img:"T2.5/Glock19Switch.png" },
  { tier:"t25", name:"MicroUzi",           img:"T2.5/MicroUzi.png" },
];

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const CARD_W       = 120;
const CARD_GAP     = 8;
const STEP         = CARD_W + CARD_GAP;
const REEL_PADDING = 32;
const SPIN_MS      = 4200;   // duration of each individual spin
const PAUSE_MS     = 700;    // pause between spins

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let currentTier  = "t0";
let isSpinning   = false;

/* ══════════════════════════════════════
   ELEMENTS
══════════════════════════════════════ */
const $  = id => document.getElementById(id);
const grid              = $('grid');
const reel              = $('reel');
const spinnerOverlay    = $('spinnerOverlay');
const finalOverlay      = $('finalOverlay');
const finalItems        = $('finalItems');
const finalEyebrow      = $('finalEyebrow');
const finalConfirm      = $('finalConfirm');
const mainTitle         = $('mainTitle');
const tierEyebrow       = $('tierEyebrow');
const tierDesc          = $('tierDesc');
const dropCount         = $('dropCount');
const tierPillText      = $('tierPillText');
const spinnerTierLabel  = $('spinnerTierLabel');
const spinCurrentNum    = $('spinCurrentNum');
const spinTotalNum      = $('spinTotalNum');
const spinProgressFill  = $('spinProgressFill');
const spinStatus        = $('spinStatus');
const spinStatusText    = $('spinStatusText');
const wonStrip          = $('wonStrip');
const spinDot           = document.querySelector('.spin-dot');
const spinBtn           = $('spinBtn');

/* ══════════════════════════════════════
   LOGO — permanent image
   To set your logo, edit the <img src=""> in index.html
   and point it to your image file path.
══════════════════════════════════════ */
(function initLogo() {
  const img      = document.getElementById('logoImg');
  const fallback = document.getElementById('logoFallback');
  if (!img.src || img.src === window.location.href) {
    // No src set — show the GC fallback text
    img.style.display = 'none';
    fallback.style.display = 'flex';
  }
})();

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function tierText(t) {
  const map = { t0:'T0', t05:'T0.5', t1:'T1', t15:'T1.5', t2:'T2', t25:'T2.5' };
  return map[t] || t.toUpperCase();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWinners(pool, n) {
  return shuffle(pool).slice(0, Math.min(n, pool.length));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════
   GRID RENDER
══════════════════════════════════════ */
function renderGrid(list) {
  const old = [...grid.querySelectorAll('.card')];
  old.forEach(c => {
    c.style.transition = 'opacity .15s, transform .15s';
    c.style.opacity = '0';
    c.style.transform = 'scale(.94) translateY(8px)';
  });

  setTimeout(() => {
    grid.innerHTML = '';
    list.forEach((item, i) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.style.setProperty('--i', i);
      c.innerHTML = `
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="card-footer">
          <span class="label">${item.name}</span>
          <span class="badge badge-${item.tier}">${tierText(item.tier)}</span>
        </div>`;
      grid.appendChild(c);
    });
  }, old.length ? 160 : 0);
}

/* ══════════════════════════════════════
   SET TIER
══════════════════════════════════════ */
function setTier(t) {
  currentTier = t;
  const cfg = TIERS[t];

  // Nav active state
  document.querySelectorAll('.navbtn[data-filter]').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === t);
  });

  // Animate header elements out
  const headEls = [mainTitle, tierDesc, tierEyebrow];
  headEls.forEach(el => {
    el.style.transition = 'opacity .17s, transform .17s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-7px)';
  });

  setTimeout(() => {
    tierEyebrow.textContent  = cfg.eyebrow;
    mainTitle.textContent    = cfg.title;
    tierDesc.textContent     = cfg.desc;
    dropCount.textContent    = cfg.drops;
    tierPillText.textContent = tierText(t);

    headEls.forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 170);

  renderGrid(ITEMS.filter(i => i.tier === t));
}

document.querySelectorAll('.navbtn[data-filter]').forEach(b => {
  b.addEventListener('click', () => { if (!isSpinning) setTier(b.dataset.filter); });
});

/* ══════════════════════════════════════
   SPINNER CORE — one spin
   Returns a Promise that resolves when the
   reel has landed and the winner is known.
══════════════════════════════════════ */
function runOneSpin(pool, winner) {
  return new Promise(resolve => {
    // Reset reel instantly
    reel.innerHTML = '';
    reel.style.transition = 'none';
    reel.style.transform  = 'translateX(0)';

    // How many cards before the winner
    const leadCards = pool.length * 14 + Math.floor(Math.random() * pool.length);
    const finalIndex = leadCards; // winner sits exactly here

    // Build reel: fill lead with shuffled repeats, then winner, then a short tail
    const reelItems = [];

    // Lead — shuffled repeating copies so it looks varied while spinning
    const lead = [];
    while (lead.length < leadCards) {
      shuffle(pool).forEach(it => lead.push(it));
    }
    lead.length = leadCards; // trim to exact count
    lead.forEach(it => reelItems.push(it));

    // THE WINNER at finalIndex
    reelItems.push(winner);

    // Short tail so the reel doesn't look empty after landing
    const tail = shuffle(pool).slice(0, 8);
    tail.forEach(it => reelItems.push(it));

    // Render all reel cards
    reelItems.forEach(it => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.innerHTML = `<img src="${it.img}" alt="${it.name}" loading="lazy">`;
      reel.appendChild(card);
    });

    // Mark the winner card so we can verify visually
    reel.children[finalIndex].classList.add('is-winner');

    // Compute exact translate so winner card center aligns with marker center
    // reel-frame is 800px wide, marker sits at 50% = 400px from left
    const frameW  = reel.parentElement.offsetWidth || 800;
    const centerX = frameW / 2;
    // Card center within the reel's coordinate space:
    // padding-left (32px) + (index * step) + half card width
    const cardCenterInReel = REEL_PADDING + finalIndex * STEP + CARD_W / 2;
    const targetX = centerX - cardCenterInReel;

    // Double-rAF ensures the browser has committed the reset before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reel.style.transition = `transform ${SPIN_MS}ms cubic-bezier(.04,.6,0,1)`;
        reel.style.transform  = `translateX(${targetX}px)`;
      });
    });

    // Show "LOCKED IN" a bit before it fully stops
    setTimeout(() => setSpinStatus('locked', 'LOCKED IN'), SPIN_MS - 450);

    // Resolve + flash marker once animation completes
    setTimeout(() => {
      const bar = document.querySelector('.reel-marker-bar');
      if (bar) {
        bar.style.animation = 'markerFlash .55s ease forwards';
        setTimeout(() => { bar.style.animation = ''; }, 600);
      }
      resolve(winner);
    }, SPIN_MS);
  });
}

/* ══════════════════════════════════════
   STATUS HELPER
══════════════════════════════════════ */
function setSpinStatus(state, text) {
  spinStatusText.textContent = text;
  if (state === 'locked') {
    spinStatus.classList.add('locked');
  } else {
    spinStatus.classList.remove('locked');
  }
}

/* ══════════════════════════════════════
   MAIN SPIN SEQUENCE — sequential drops
══════════════════════════════════════ */
spinBtn.addEventListener('click', async () => {
  if (isSpinning) return;

  const pool = ITEMS.filter(i => i.tier === currentTier);
  if (pool.length < 2) {
    alert('Add at least 2 items to this tier first.');
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;

  const cfg     = TIERS[currentTier];
  const numDrops = cfg.drops;
  const winners  = pickWinners(pool, numDrops);

  // Setup overlay
  spinnerTierLabel.textContent = cfg.label;
  spinTotalNum.textContent     = numDrops;
  wonStrip.innerHTML           = '';
  setSpinStatus('spinning', 'Spinning…');
  spinProgressFill.style.width = '0%';

  spinnerOverlay.classList.add('visible');

  // Sequential spins
  for (let i = 0; i < winners.length; i++) {
    const winner = winners[i];

    // Update counter + progress
    spinCurrentNum.textContent = i + 1;
    spinProgressFill.style.width = `${(i / numDrops) * 100}%`;
    setSpinStatus('spinning', 'Spinning…');

    await sleep(i === 0 ? 300 : 200); // brief breath before each spin

    await runOneSpin(pool, winner);

    // Reveal won card in strip
    await sleep(350);
    addWonCard(winner);

    // Fill progress
    spinProgressFill.style.width = `${((i + 1) / numDrops) * 100}%`;

    // Pause between spins (not after last)
    if (i < winners.length - 1) {
      setSpinStatus('spinning', 'Next drop…');
      await sleep(PAUSE_MS);
    }
  }

  // Done — small pause then show final modal
  await sleep(900);
  spinnerOverlay.classList.remove('visible');

  await sleep(100);
  showFinalModal(winners, cfg);

  isSpinning = false;
  spinBtn.disabled = false;
});

/* ══════════════════════════════════════
   ADD WON CARD TO STRIP
══════════════════════════════════════ */
function addWonCard(item) {
  const el = document.createElement('div');
  el.className = 'won-card';
  el.innerHTML = `
    <img src="${item.img}" alt="${item.name}" loading="lazy">
    <div class="won-card-name">${item.name}</div>
    <div class="won-card-tier">${tierText(item.tier)}</div>
  `;
  wonStrip.appendChild(el);
}

/* ══════════════════════════════════════
   FINAL MODAL
══════════════════════════════════════ */
function showFinalModal(winners, cfg) {
  finalEyebrow.textContent = cfg.label;
  finalItems.innerHTML = '';

  winners.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'final-item';
    el.style.animationDelay = `${i * 70}ms`;
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="final-item-name">${item.name}</div>
      <div class="final-item-tier">${tierText(item.tier)}</div>
    `;
    finalItems.appendChild(el);
  });

  finalOverlay.classList.add('visible');
}

finalConfirm.addEventListener('click', () => {
  finalOverlay.classList.remove('visible');
});

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
setTier('t0');
