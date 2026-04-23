// ============================================================
// PROJECT HAIL MARY — Eridian Memory (Dance Edition, i18n)
// ============================================================

// ============================================================
// Localization
// ============================================================
const I18N = {
  ja: {
    brandSub: "Eridian Memory",
    modeEndless: "ENDLESS",
    menu: "MENU",
    menuTitle: "メインメニュー",
    menuLanguage: "言語",
    menuStart: "スタート",
    speed: "速度",
    speedSlow: "ゆっくり",
    speedNormal: "ふつう",
    speedFast: "はやい",
    start: "START",
    stop: "STOP",
    round: "ROUND",
    best: "BEST",
    fuelLabel: "燃料",
    mode: "モード",
    modeNormal: "ふつう",
    modeEndless: "エンドレス",
    menuPractice: "練習する",
    menuStart: "本番開始",
    statusIdle: "お試し中 ／ STARTで本番",
    statusWatch: "よく見てね…",
    statusInput: "あなたの番！",
    statusWin: (n) => `OK！ (${n}問クリア)`,
    statusOver: (n) => `GAME OVER (Round ${n})`,
    statusTankLoss: (n) => `−1 燃料 ／ 残り ${n}`,
    statusRockyHelp: "ロッキーが考えてる…",
    statusRockyGives: "ロッキーが燃料をくれた！",
    statusComplete: "完走！宇宙を救った",
    resultTitle: "異星間交友の結果",
    reachedRound: "到達ラウンド",
    bestLabel: "ベスト",
    friendshipLabel: "友情レベル",
    close: "閉じる",
    retry: "もう一度",
    tiers: [
      { stars: "☆ ☆ ☆ ☆ ☆", message: "「２３」" },
      { stars: "★ ☆ ☆ ☆ ☆", message: "「きみは悪い」" },
      { stars: "★ ★ ☆ ☆ ☆", message: "「よい、よい」" },
      { stars: "★ ★ ★ ☆ ☆", message: "「とってもエリディアン」" },
      { stars: "★ ★ ★ ★ ☆", message: "「きみはもう友達。」" },
      { stars: "★ ★ ★ ★ ★", message: "（ぽんぽんと身体を弾ませている）" },
    ],
  },
  en: {
    brandSub: "Eridian Memory",
    modeEndless: "ENDLESS",
    menu: "MENU",
    menuTitle: "MAIN MENU",
    menuLanguage: "Language",
    menuStart: "Start",
    speed: "Speed",
    speedSlow: "Slow",
    speedNormal: "Normal",
    speedFast: "Fast",
    start: "START",
    stop: "STOP",
    round: "ROUND",
    best: "BEST",
    fuelLabel: "FUEL",
    mode: "MODE",
    modeNormal: "NORMAL",
    modeEndless: "ENDLESS",
    menuPractice: "Practice",
    menuStart: "Start Game",
    statusIdle: "Practice / press START",
    statusWatch: "Watch carefully…",
    statusInput: "Your turn!",
    statusWin: (n) => `OK! (round ${n} cleared)`,
    statusOver: (n) => `GAME OVER (Round ${n})`,
    statusTankLoss: (n) => `−1 fuel / ${n} left`,
    statusRockyHelp: "Rocky is thinking…",
    statusRockyGives: "Rocky gave you fuel!",
    statusComplete: "Completed! Saved the system.",
    resultTitle: "Interstellar Friendship",
    reachedRound: "Reached Round",
    bestLabel: "Best",
    friendshipLabel: "Friendship",
    close: "Close",
    retry: "Retry",
    tiers: [
      { stars: "☆ ☆ ☆ ☆ ☆", message: "\"23\"" },
      { stars: "★ ☆ ☆ ☆ ☆", message: "\"You are bad\"" },
      { stars: "★ ★ ☆ ☆ ☆", message: "\"Good, good\"" },
      { stars: "★ ★ ★ ☆ ☆", message: "\"Very Eridian\"" },
      { stars: "★ ★ ★ ★ ☆", message: "\"You are my friend now.\"" },
      { stars: "★ ★ ★ ★ ★", message: "(bouncing his body happily)" },
    ],
  },
};

let currentLang = localStorage.getItem("erid-lang") || "ja";
if (!I18N[currentLang]) currentLang = "ja";

function t() { return I18N[currentLang]; }

// ============================================================
// Rocky rig
// ============================================================
const JOINT_KEYS = ["FL","FR","BL","BR","BC"];
const legs = {
  FL: document.getElementById("leg-FL"),
  FR: document.getElementById("leg-FR"),
  BL: document.getElementById("leg-BL"),
  BR: document.getElementById("leg-BR"),
  BC: document.getElementById("leg-BC"),
};
const body = document.getElementById("body");
const headEl = body.querySelector(".head");
const BODY_BASE = { x: 250, y: 280 };

const POSES = {
  idle: {
    FL: [+22, -18, 0], FR: [-22, +18, 0],
    BL: [ +8,  -6, 0], BR: [ -8,  +6, 0],
    BC: [  0,   0, 0],
    body: [0, 0, 0], head: 0,
  },
  up: {
    FL: [+160,   0, 0], FR: [ -75, +75, 0],
    BL: [ +10,  -8, 0], BR: [ -10,  +8, 0],
    BC: [  +6,  +2, 0],
    body: [-8, -8, -5], head: -14,
  },
  down: {
    FL: [+50,   0, 0], FR: [-50,   0, 0],
    BL: [+10, -48, 0], BR: [-10, +48, 0],
    BC: [  0, +60, 0],
    body: [0, +40, 0], head: -4,
  },
  left: {
    FL: [+105, -10, 0], FR: [ -55, +60, 0],
    BL: [ +15, -12, 0], BR: [ -15, +35, 0],
    BC: [ +12,  +3, 0],
    body: [-22, +3, -10], head: -15,
  },
  right: {
    FL: [ +55, -60, 0], FR: [-105, +10, 0],
    BL: [ +15, -35, 0], BR: [ -15, +12, 0],
    BC: [ -12,  +3, 0],
    body: [+22, +3, +10], head: +15,
  },
  happy: {
    FL: [+125,  -5, 0], FR: [-125,  +5, 0],
    BL: [ +15, -28, 0], BR: [ -15, +28, 0],
    BC: [  0, +12, 0],
    body: [0, -12, 0], head: 0,
  },
  sad: {
    FL: [+20, +80, 0], FR: [-20, -80, 0],
    BL: [+15, -30, 0], BR: [-15, +30, 0],
    BC: [ 0, +45, 0],
    body: [0, +42, -1], head: +6,
  },
  // "Thinking" — one front arm raised in a contemplative bend, hand near where head would be
  think: {
    FL: [+135, +90, 0],   // arm bent up-left, forearm folds back to crown area
    FR: [ -22, +18, 0],
    BL: [ +10,  -8, 0],
    BR: [ -10,  +8, 0],
    BC: [   0,   0, 0],
    body: [0, 4, -3], head: -6,
  },
};
const POSE_DURATIONS = { idle: 180, up: 150, down: 240, left: 170, right: 170, happy: 150, sad: 450, think: 360 };

const kneeTranslate = {};
const footTranslate = {};
for (const key of JOINT_KEYS) {
  const leg = legs[key];
  if (!leg) continue;
  const kt = (leg.querySelector(".knee")?.getAttribute("transform") || "").match(/translate\([^)]+\)/);
  const ft = (leg.querySelector(".foot")?.getAttribute("transform") || "").match(/translate\([^)]+\)/);
  kneeTranslate[key] = kt ? kt[0] : "translate(0 0)";
  footTranslate[key] = ft ? ft[0] : "translate(0 0)";
}
const headTranslateMatch = (headEl?.getAttribute("transform") || "").match(/translate\([^)]+\)/);
const headTranslate = headTranslateMatch ? headTranslateMatch[0] : "translate(0 0)";

function clonePose(p) {
  const r = {};
  for (const k of JOINT_KEYS) r[k] = p[k].slice();
  r.body = p.body.slice();
  r.head = (typeof p.head === "number") ? p.head : 0;
  return r;
}

function applyJoints(pose) {
  for (const key of JOINT_KEYS) {
    const leg = legs[key];
    if (!leg) continue;
    const [hip, knee, foot] = pose[key];
    leg.querySelector(".hip")?.setAttribute("transform", `rotate(${hip.toFixed(2)})`);
    leg.querySelector(".knee")?.setAttribute("transform", `${kneeTranslate[key]} rotate(${knee.toFixed(2)})`);
    leg.querySelector(".foot")?.setAttribute("transform", `${footTranslate[key]} rotate(${foot.toFixed(2)})`);
  }
  const [bx, by, br] = pose.body;
  body.setAttribute("transform", `translate(${BODY_BASE.x + bx} ${BODY_BASE.y + by + breathPhase}) rotate(${br.toFixed(2)})`);
  if (headEl) headEl.setAttribute("transform", `${headTranslate} rotate(${pose.head.toFixed(2)})`);
}

function easeOutBack(x) {
  const c1 = 1.2, c2 = c1 + 1;
  return 1 + c2 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

let tweenMs = 180;
const current = clonePose(POSES.idle);
let tweenFrom = clonePose(current);
let tweenTarget = clonePose(current);
let tweenStart = 0;
let tweening = false;
let breathPhase = 0;

function setPoseTarget(name, durationMs) {
  const p = POSES[name] || POSES.idle;
  tweenFrom = clonePose(current);
  tweenTarget = clonePose(p);
  tweenMs = (durationMs != null) ? durationMs : (POSE_DURATIONS[name] || 180);
  tweenStart = performance.now();
  tweening = true;
}

// Unified RAF loop — advances pose tween AND breath oscillation, always renders.
function masterLoop(now) {
  if (tweening) {
    const x = Math.min(1, (now - tweenStart) / tweenMs);
    const e = easeOutBack(x);
    for (const k of JOINT_KEYS) {
      for (let i = 0; i < 3; i++) {
        current[k][i] = tweenFrom[k][i] + (tweenTarget[k][i] - tweenFrom[k][i]) * e;
      }
    }
    for (let i = 0; i < 3; i++) {
      current.body[i] = tweenFrom.body[i] + (tweenTarget.body[i] - tweenFrom.body[i]) * e;
    }
    current.head = tweenFrom.head + (tweenTarget.head - tweenFrom.head) * e;
    if (x >= 1) tweening = false;
  }
  // Breath — ±2px, ~2.6s cycle, subtle idle motion
  breathPhase = Math.sin(now / 1300) * 2;
  applyJoints(current);
  requestAnimationFrame(masterLoop);
}

requestAnimationFrame(masterLoop);

// ============================================================
// Input mapping
// ============================================================
const KEY_TO_DIR = { ArrowLeft: 0, ArrowDown: 1, ArrowUp: 2, ArrowRight: 3 };
const DIR_SYMBOL = ["←","↓","↑","→"];
const DIR_TO_POSE = ["left","down","up","right"];

// Rocky speaks in chords — each direction is a 3-note triad
const DIR_CHORDS = [
  [220.00, 261.63, 329.63], // ← Am
  [293.66, 349.23, 440.00], // ↓ Dm
  [392.00, 493.88, 587.33], // ↑ G
  [523.25, 659.25, 783.99], // → C
];

// ============================================================
// Emotion emits — floating notes / sparkles / drooping symbols
// ============================================================
const NOTE_SYMBOLS  = ["♪", "♫", "♬", "♩"];
const HAPPY_SYMBOLS = ["♥", "♡", "✦", "✧", "★", "♪", "♫"];
const SAD_SYMBOLS   = ["♭", "…", "?"];

const DIR_COLORS = [
  "#ff8fa3", // ← Am  pink
  "#7dd3fc", // ↓ Dm  sky
  "#a3e635", // ↑ G   lime
  "#ffd166", // → C   gold
];
const HAPPY_COLORS = ["#ffb347", "#ff8fa3", "#a3e635", "#ffd166", "#7dd3fc", "#fff2a8"];

function emitSymbol(symbol, color, variant, opts = {}) {
  const stage = document.querySelector(".rocky-stage");
  if (!stage) return;
  const el = document.createElement("div");
  el.className = `emit emit-${variant}`;
  el.textContent = symbol;
  el.style.color = color;

  const spread = opts.spread || 80;
  const offsetX = (Math.random() - 0.5) * spread;
  el.style.left = `calc(50% + ${offsetX}px)`;
  el.style.top = opts.top || "20%";

  el.style.setProperty("--dx",    `${(Math.random() - 0.5) * 90}px`);
  el.style.setProperty("--rot",   `${(Math.random() - 0.5) * 70}deg`);
  el.style.setProperty("--scale", `${0.85 + Math.random() * 0.45}`);

  stage.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function emitPoseNotes(dir) {
  const color = DIR_COLORS[dir] || "#ffb347";
  const count = 1 + Math.floor(Math.random() * 2);   // 1-2 notes per pose
  for (let i = 0; i < count; i++) {
    setTimeout(() => emitSymbol(
      NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
      color,
      "float"
    ), i * 70);
  }
}

function emitHappyBurst() {
  const total = 10;
  for (let i = 0; i < total; i++) {
    setTimeout(() => emitSymbol(
      HAPPY_SYMBOLS[Math.floor(Math.random() * HAPPY_SYMBOLS.length)],
      HAPPY_COLORS[Math.floor(Math.random() * HAPPY_COLORS.length)],
      "burst",
      { spread: 130 }
    ), i * 45);
  }
}

function emitSadNotes() {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => emitSymbol(
      SAD_SYMBOLS[Math.floor(Math.random() * SAD_SYMBOLS.length)],
      "#8892a0",
      "fall",
      { spread: 60, top: "30%" }
    ), i * 130);
  }
}

// ============================================================
// Game state
// ============================================================
const STATE = { IDLE: "idle", WATCH: "watch", INPUT: "input", OVER: "over" };
const TANK_MAX = 5;
const MAX_ROUND = 99;  // internal safety cap (effectively endless)

// Game modes — both refill fuel and both lower difficulty on miss.
// They differ only in the win condition (maxRound).
const MODES = {
  normal:  { tankStart: 3, canRefill: true, maxRound: 10   },
  endless: { tankStart: 3, canRefill: true, maxRound: null },
};
let currentMode = localStorage.getItem("erid-mode") || "normal";
if (!MODES[currentMode]) currentMode = "normal";
function modeCfg() { return MODES[currentMode]; }
let gameState = STATE.IDLE;
let sequence = [];
let inputIndex = 0;
let demoIndex = -1;
let round = 0;
let tanks = modeCfg().tankStart;
let best = Number(localStorage.getItem("erid-memory-best") || 0);

// Status is stored by key so language switch can re-render
let statusKey = "statusIdle";
let statusArg = null;
let statusCls = null;

function setGameState(s) {
  gameState = s;
  updateToggleBtn();
}

// ============================================================
// UI refs
// ============================================================
const statusEl = document.getElementById("status");
const roundEl  = document.getElementById("round");
const bestEl   = document.getElementById("best");
const progressEl = document.getElementById("sequence-progress");
const tanksEl  = document.getElementById("tanks");
const padEls   = Array.from(document.querySelectorAll(".pad"));
const toggleBtn = document.getElementById("toggle-btn");
const menuBtn  = document.getElementById("menu-btn");
const speedSel = document.getElementById("speed");
const arrowFlash = document.getElementById("arrow-flash");

const menuModal = document.getElementById("menu-modal");
const menuStartBtn = document.getElementById("menu-start");
const menuPracticeBtn = document.getElementById("menu-practice");
const menuCloseX = document.getElementById("menu-close-x");
const langBtns = Array.from(document.querySelectorAll(".lang-btn"));
const modeBtns = Array.from(document.querySelectorAll(".mode-btn"));

const resultModal = document.getElementById("result-modal");
const resultRoundEl = document.getElementById("result-round");
const resultBestEl  = document.getElementById("result-best");
const resultFriendshipEl = document.getElementById("result-friendship");
const resultMessageEl    = document.getElementById("result-message");
const resultCloseBtn = document.getElementById("result-close");
const resultRetryBtn = document.getElementById("result-retry");

bestEl.textContent = best;

// ============================================================
// i18n apply
// ============================================================
function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem("erid-lang", lang);
  langBtns.forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  document.documentElement.lang = lang;
  applyI18n();
}

function setMode(mode) {
  if (!MODES[mode]) return;
  currentMode = mode;
  localStorage.setItem("erid-mode", mode);
  modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  updateBrandMode();
}

function updateBrandMode() {
  const el = document.querySelector(".brand-mode");
  if (!el) return;
  const T = t();
  el.textContent = currentMode === "normal" ? T.modeNormal : T.modeEndless;
}

function applyI18n() {
  const T = t();
  // Generic data-i18n substitution
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (T[key] != null && typeof T[key] === "string") el.textContent = T[key];
  });
  // Dynamic elements
  updateStatus();
  updateToggleBtn();
  updateBrandMode();
  // Refresh result modal content if visible
  if (resultModal?.classList.contains("show")) populateResultModal();
}

// ============================================================
// Status
// ============================================================
function setStatus(key, cls, arg) {
  statusKey = key;
  statusCls = cls;
  statusArg = arg;
  updateStatus();
}
function updateStatus() {
  const T = t();
  let val = T[statusKey];
  let text = (typeof val === "function") ? val(statusArg) : (val || "");
  statusEl.textContent = text;
  statusEl.className = "status-pill" + (statusCls ? " " + statusCls : "");
}

// ============================================================
// Toggle button
// ============================================================
function updateToggleBtn() {
  if (!toggleBtn) return;
  const playing = gameState === STATE.WATCH || gameState === STATE.INPUT;
  const T = t();
  if (playing) {
    toggleBtn.textContent = T.stop;
    toggleBtn.className = "btn ghost";
    toggleBtn.dataset.action = "stop";
  } else {
    toggleBtn.textContent = T.start;
    toggleBtn.className = "btn primary";
    toggleBtn.dataset.action = "start";
  }
}

// ============================================================
// Progress ＊ indicator
// ============================================================
function renderProgress() {
  progressEl.innerHTML = "";
  if (sequence.length === 0) return;
  for (let i = 0; i < sequence.length; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = "＊";
    if (gameState === STATE.WATCH) {
      if (i === demoIndex) s.classList.add("lit");
    } else if (gameState === STATE.INPUT) {
      if (i < inputIndex) s.classList.add("done");
      else if (i === inputIndex) s.classList.add("current");
    } else if (gameState === STATE.OVER) {
      if (i < inputIndex) s.classList.add("done");
      else if (i === inputIndex) s.classList.add("wrong");
    }
    progressEl.appendChild(s);
  }
}

function renderTanks() {
  if (!tanksEl) return;
  tanksEl.innerHTML = "";
  for (let i = 0; i < TANK_MAX; i++) {
    const t = document.createElement("div");
    t.className = "tank" + (i >= tanks ? " empty" : "");
    tanksEl.appendChild(t);
  }
}

function popTank() {
  // `tanks` has already been decremented — the index of the just-lost tank IS `tanks`
  const cells = tanksEl?.querySelectorAll(".tank");
  if (!cells || !cells[tanks]) return;
  const idx = tanks;  // capture so timeout uses the right index
  cells[idx].classList.add("popping");
  setTimeout(() => {
    cells[idx].classList.remove("popping");
    cells[idx].classList.add("empty");
  }, 540);
}

function fillTank(idx) {
  const cells = tanksEl?.querySelectorAll(".tank");
  if (!cells || !cells[idx]) return;
  cells[idx].classList.remove("empty");
  cells[idx].classList.add("filling");
  setTimeout(() => cells[idx].classList.remove("filling"), 480);
}

function lightPad(dir, wrong = false) {
  const pad = padEls.find(p => Number(p.dataset.dir) === dir);
  if (!pad) return;
  pad.classList.add(wrong ? "wrong" : "lit");
  setTimeout(() => pad.classList.remove("lit", "wrong"), 260);
}
function setPadsEnabled(enabled) {
  padEls.forEach(p => { p.disabled = !enabled; });
}
function showArrowFlash(dir) {
  if (!arrowFlash) return;
  arrowFlash.textContent = DIR_SYMBOL[dir];
  arrowFlash.classList.remove("show");
  void arrowFlash.offsetWidth;
  arrowFlash.classList.add("show");
}

// ============================================================
// Audio
// ============================================================
let audioCtx = null;
function getAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = Ctx ? new Ctx() : null;
  }
  return audioCtx;
}
function tone(freq, dur = 0.22, type = "triangle", vol = 0.08, delay = 0) {
  const ctx = getAudio();
  if (!ctx) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}
function sweep(fromFreq, toFreq, dur = 0.3, type = "sine", vol = 0.07, delay = 0) {
  const ctx = getAudio();
  if (!ctx) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(fromFreq, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, toFreq), t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}
function playPose(dir) {
  const chord = DIR_CHORDS[dir];
  const dur = 0.44;
  chord.forEach((f, i) => {
    tone(f,     dur, "sine",     0.055 - i * 0.008, i * 0.012);
    tone(f * 2, dur * 0.55, "sine", 0.018 - i * 0.004, i * 0.012);
  });
}
function playStart() {
  sweep(220, 660, 0.28, "triangle", 0.08);
  tone(880, 0.18, "sine", 0.06, 0.24);
}
function playRoundStart() {
  tone(392, 0.10, "sine", 0.06);
  tone(523, 0.10, "sine", 0.06, 0.10);
  tone(659, 0.20, "sine", 0.07, 0.20);
}
function playDemoEnd() {
  tone(784,  0.12, "triangle", 0.06);
  tone(1046, 0.20, "triangle", 0.07, 0.08);
}
function playWin() {
  [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
    tone(f, 0.16 + i * 0.04, "triangle", 0.08, i * 0.10);
  });
}
function playWrongInput() { tone(85, 0.22, "sawtooth", 0.14); }
function playGameOver() {
  sweep(320, 90, 0.75, "sawtooth", 0.09);
  tone(80, 0.40, "triangle", 0.05, 0.35);
}
function playPico() {
  // cute high "pico" — quick rising sweep
  sweep(1200, 1900, 0.07, "sine", 0.06);
  tone(2400, 0.04, "sine", 0.03, 0.02);
}
function emitThinking() {
  for (let i = 0; i < 2; i++) {
    setTimeout(() => emitSymbol(
      "?",
      "#ffd166",
      "float",
      { spread: 50, top: "16%" }
    ), i * 220);
  }
}
function emitGiveHeart() {
  emitSymbol("♡", "#ff8fa3", "float", { spread: 40, top: "32%" });
}
function playFarewellChord() {
  const notes = [130.81, 196.00, 261.63, 329.63, 587.33];
  notes.forEach((f, i) => tone(f, 1.6, "sine", 0.06 - i * 0.005, i * 0.05));
  tone(1046.50, 1.2, "sine", 0.03, 0.6);
}

// ============================================================
// Friendship tier / result modal
// ============================================================
function getFriendshipTier(roundsCleared) {
  const tiers = t().tiers;
  let idx = 0;
  if (roundsCleared >= 15) idx = 5;
  else if (roundsCleared >= 10) idx = 4;
  else if (roundsCleared >= 6) idx = 3;
  else if (roundsCleared >= 3) idx = 2;
  else if (roundsCleared >= 1) idx = 1;
  return tiers[idx];
}
function populateResultModal() {
  const roundsCleared = Math.max(0, round - 1);
  const tier = getFriendshipTier(roundsCleared);
  resultRoundEl.textContent = round;
  resultBestEl.textContent  = best;
  resultFriendshipEl.textContent = tier.stars;
  resultMessageEl.textContent = tier.message;
}
function openResultModal() {
  if (!resultModal) return;
  populateResultModal();
  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
  playFarewellChord();
  setTimeout(() => resultRetryBtn?.focus(), 120);
}
function closeResultModal() {
  if (!resultModal) return;
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
}

// ============================================================
// Main menu modal
// ============================================================
function openMenu() {
  if (!menuModal) return;
  // If playing, stop the game first (abort)
  if (gameState === STATE.WATCH || gameState === STATE.INPUT) {
    resetGame();
  }
  menuModal.classList.add("show");
  menuModal.setAttribute("aria-hidden", "false");
  setTimeout(() => menuStartBtn?.focus(), 120);
}
function closeMenu() {
  if (!menuModal) return;
  menuModal.classList.remove("show");
  menuModal.setAttribute("aria-hidden", "true");
}

// ============================================================
// Game flow
// ============================================================
function startGame() {
  closeResultModal();
  closeMenu();
  sequence = [];
  inputIndex = 0;
  demoIndex = -1;
  round = 0;
  tanks = modeCfg().tankStart;
  renderTanks();
  setGameState(STATE.IDLE);
  getAudio();
  playStart();
  setTimeout(() => goToRound(1), 420);
}

function goToRound(n) {
  // Generate a completely fresh sequence of length n — no accumulation
  round = n;
  sequence = [];
  for (let i = 0; i < round; i++) {
    sequence.push(Math.floor(Math.random() * 4));
  }
  inputIndex = 0;
  demoIndex = -1;
  roundEl.textContent = round;
  playRoundStart();
  setTimeout(showSequence, 380);
}

function nextRound() {
  const cfg = modeCfg();
  const cap = cfg.maxRound || MAX_ROUND;
  if (round >= cap) {
    // Mode cleared
    setGameState(STATE.OVER);
    setPadsEnabled(false);
    setStatus("statusComplete", "win");
    setPoseTarget("happy");
    emitHappyBurst();
    playWin();
    if (round > best) {
      best = round;
      localStorage.setItem("erid-memory-best", best);
      bestEl.textContent = best;
    }
    setTimeout(openResultModal, 1500);
    return;
  }
  goToRound(round + 1);
}

function showSequence() {
  setGameState(STATE.WATCH);
  setStatus("statusWatch", "watch");
  setPadsEnabled(false);
  renderProgress();

  const gap = Number(speedSel.value) || 650;
  const hold = Math.max(220, Math.floor(gap * 0.55));

  let i = 0;
  function showNext() {
    if (gameState !== STATE.WATCH) return;
    if (i >= sequence.length) {
      demoIndex = -1;
      renderProgress();
      setPoseTarget("idle");
      playDemoEnd();
      setTimeout(() => {
        if (gameState !== STATE.WATCH) return;
        setGameState(STATE.INPUT);
        setStatus("statusInput", "input");
        setPadsEnabled(true);
        renderProgress();
      }, 300);
      return;
    }
    const dir = sequence[i];
    demoIndex = i;
    renderProgress();
    setPoseTarget(DIR_TO_POSE[dir]);
    lightPad(dir);
    playPose(dir);
    showArrowFlash(dir);
    emitPoseNotes(dir);
    i++;
    setTimeout(() => {
      setPoseTarget("idle");
      setTimeout(showNext, Math.max(120, gap - hold));
    }, hold);
  }
  setTimeout(showNext, 450);
}

let idleAfterInput = null;
function handleInput(dir) {
  if (gameState === STATE.WATCH) return;
  if (gameState === STATE.OVER) return;

  setPoseTarget(DIR_TO_POSE[dir]);
  playPose(dir);
  showArrowFlash(dir);
  emitPoseNotes(dir);

  if (gameState === STATE.IDLE) {
    lightPad(dir);
    clearTimeout(idleAfterInput);
    idleAfterInput = setTimeout(() => {
      if (gameState === STATE.IDLE) setPoseTarget("idle");
    }, 500);
    return;
  }

  const expected = sequence[inputIndex];
  if (dir !== expected) {
    handleWrongInput(dir);
    return;
  }

  lightPad(dir);
  inputIndex++;
  renderProgress();

  if (inputIndex >= sequence.length) {
    setPadsEnabled(false);
    setStatus("statusWin", "win", round);
    setTimeout(() => {
      setPoseTarget("happy");
      emitHappyBurst();
    }, 220);
    playWin();
    if (round > best) {
      best = round;
      localStorage.setItem("erid-memory-best", best);
      bestEl.textContent = best;
    }
    setTimeout(() => {
      setPoseTarget("idle");
      setTimeout(nextRound, 500);
    }, 1050);
  } else {
    clearTimeout(idleAfterInput);
    idleAfterInput = setTimeout(() => {
      if (gameState === STATE.INPUT) setPoseTarget("idle");
    }, 220);
  }
}

function handleWrongInput(dir) {
  tanks = Math.max(0, tanks - 1);
  popTank();
  lightPad(dir, true);
  playWrongInput();
  renderProgress();

  // Difficulty drops on any miss (min 1)
  round = Math.max(1, round - 1);
  roundEl.textContent = round;

  setGameState(STATE.OVER);
  setPadsEnabled(false);
  setStatus("statusTankLoss", "over", tanks);

  setTimeout(() => {
    setPoseTarget("sad");
    emitSadNotes();
  }, 220);

  if (tanks === 0) {
    // Rocky helps in BOTH modes now — thinking gesture + refill
    setTimeout(doRockyHelp, 1100);
    return;
  }

  // Tanks remain — replay at the new (lower) difficulty with a fresh sequence
  setTimeout(() => {
    setPoseTarget("idle");
    setTimeout(() => goToRound(round), 400);
  }, 1500);
}

function doRockyHelp() {
  setStatus("statusRockyHelp", "watch");
  setPoseTarget("think");
  emitThinking();

  // Pause for the thinking, then start refilling
  setTimeout(() => {
    setStatus("statusRockyGives", "win");
    refillTanksAnim(() => {
      setTimeout(() => {
        setPoseTarget("idle");
        // Continue at the current (already-lowered) round with a fresh sequence
        setTimeout(() => goToRound(round), 400);
      }, 420);
    });
  }, 1100);
}

function refillTanksAnim(done) {
  const need = TANK_MAX - tanks;
  if (need <= 0) { done(); return; }
  let i = 0;
  function fillNext() {
    if (i >= need) { done(); return; }
    tanks++;
    fillTank(tanks - 1);
    playPico();
    emitGiveHeart();
    i++;
    setTimeout(fillNext, 240);
  }
  fillNext();
}

// (replayRound removed — sequences are always freshly regenerated via goToRound)

function resetGame() {
  closeResultModal();
  sequence = [];
  inputIndex = 0;
  demoIndex = -1;
  round = 0;
  tanks = modeCfg().tankStart;
  roundEl.textContent = "—";
  setGameState(STATE.IDLE);
  renderProgress();
  renderTanks();
  setStatus("statusIdle");
  setPadsEnabled(true);
  setPoseTarget("idle");
}

// ============================================================
// Event wiring
// ============================================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (resultModal?.classList.contains("show")) { closeResultModal(); return; }
    if (menuModal?.classList.contains("show")) { closeMenu(); return; }
  }
  if (menuModal?.classList.contains("show")) return; // block pose input while menu is open
  const dir = KEY_TO_DIR[e.code];
  if (dir === undefined) return;
  e.preventDefault();
  handleInput(dir);
});
padEls.forEach(pad => {
  pad.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const dir = Number(pad.dataset.dir);
    handleInput(dir);
  });
});

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.dataset.action === "start") {
    startGame();
  } else {
    // STOP during a game — if user has played a round, show result
    if (round > 0) {
      setGameState(STATE.OVER);
      setPadsEnabled(false);
      openResultModal();
    } else {
      resetGame();
    }
  }
});
menuBtn?.addEventListener("click", openMenu);

// Menu events
langBtns.forEach(b => {
  b.addEventListener("click", () => setLanguage(b.dataset.lang));
});
modeBtns.forEach(b => {
  b.addEventListener("click", () => setMode(b.dataset.mode));
});
menuStartBtn?.addEventListener("click", () => {
  closeMenu();
  startGame();
});
menuPracticeBtn?.addEventListener("click", () => {
  closeMenu();
  // Reset to IDLE practice — tanks back to mode default, no rounds
  resetGame();
});
menuCloseX?.addEventListener("click", () => {
  closeMenu();
  if (statusKey !== "statusIdle") setStatus("statusIdle");
});
menuModal?.addEventListener("click", (e) => {
  if (e.target === menuModal) {
    closeMenu();
    if (statusKey !== "statusIdle") setStatus("statusIdle");
  }
});

// Result modal events
resultRetryBtn?.addEventListener("click", () => {
  closeResultModal();
  startGame();
});
resultCloseBtn?.addEventListener("click", () => {
  closeResultModal();
  resetGame();
});
resultModal?.addEventListener("click", (e) => {
  if (e.target === resultModal) closeResultModal();
});

// ============================================================
// Init
// ============================================================
setLanguage(currentLang);   // applies i18n
setMode(currentMode);       // marks active mode button + updates brand badge
resetGame();                 // IDLE / practice mode (menu is open on top)
