// ======================= DATA =======================
// Minimal sample bank per level (present tense). Each item may include multiple acceptable answers.
// Add more items freely; the app randomly selects 10 each round.
const BANK = {
  present: {
    "L1": [
      { en: "I speak", es: ["yo hablo", "hablo"] },
      { en: "You speak", es: ["tú hablas", "hablas"] },
      { en: "He speaks", es: ["él habla", "habla"] },
      { en: "She speaks", es: ["ella habla", "habla"] },
      { en: "We speak", es: ["nosotros hablamos", "hablamos"] },
      { en: "They speak", es: ["ellos hablan", "hablan"] },
      { en: "Do you speak?", es: ["¿hablas tú?", "¿hablas?"] },
      { en: "I eat", es: ["yo como", "como"] },
      { en: "Do they eat?", es: ["¿comen ellos?", "¿comen?"] },
      { en: "We live", es: ["vivimos", "nosotros vivimos"] },
      { en: "She lives", es: ["ella vive", "vive"] },
      { en: "Do we live?", es: ["¿vivimos?"] }
    ],
    "L2": [
      { en: "I have", es: ["tengo", "yo tengo"] },
      { en: "Do you have?", es: ["¿tienes?", "¿tienes tú?"] },
      { en: "He has", es: ["él tiene", "tiene"] },
      { en: "They have", es: ["ellos tienen", "tienen"] },
      { en: "We have", es: ["tenemos", "nosotros tenemos"] },
      { en: "She doesn’t have", es: ["ella no tiene", "no tiene"] },
      { en: "Do we have?", es: ["¿tenemos?"] },
      { en: "I need", es: ["necesito", "yo necesito"] },
      { en: "Do they need?", es: ["¿necesitan?", "¿necesitan ellos?"] },
      { en: "I go", es: ["voy", "yo voy"] },
      { en: "Do you go?", es: ["¿vas?", "¿vas tú?"] },
      { en: "We go", es: ["vamos", "nosotros vamos"] }
    ],
    "L3": [
      { en: "I want", es: ["quiero", "yo quiero"] },
      { en: "Do you want?", es: ["¿quieres?", "¿quieres tú?"] },
      { en: "We want", es: ["queremos", "nosotros queremos"] },
      { en: "She wants", es: ["ella quiere", "quiere"] },
      { en: "They want", es: ["ellos quieren", "quieren"] },
      { en: "I can", es: ["puedo", "yo puedo"] },
      { en: "Can you?", es: ["¿puedes?", "¿puedes tú?"] },
      { en: "He can", es: ["él puede", "puede"] },
      { en: "We can", es: ["podemos", "nosotros podemos"] },
      { en: "They can", es: ["pueden", "ellos pueden"] },
      { en: "Do we want?", es: ["¿queremos?"] },
      { en: "Do they want?", es: ["¿quieren?"] }
    ],
    "L4": [
      { en: "I like", es: ["me gusta"] },
      { en: "Do you like?", es: ["¿te gusta?"] },
      { en: "We like", es: ["nos gusta"] },
      { en: "They like", es: ["les gusta"] },
      { en: "He likes chocolate", es: ["a él le gusta el chocolate", "le gusta el chocolate"] },
      { en: "Do they like music?", es: ["¿les gusta la música?"] },
      { en: "I live in Spain", es: ["vivo en españa", "yo vivo en españa"] },
      { en: "Do you live here?", es: ["¿vives aquí?"] },
      { en: "We study", es: ["estudiamos", "nosotros estudiamos"] },
      { en: "She studies", es: ["ella estudia", "estudia"] }
    ],
    "L5": [
      { en: "I’m from Ireland", es: ["soy de irlanda", "yo soy de irlanda"] },
      { en: "Are you from Spain?", es: ["¿eres de españa?", "¿eres tú de españa?"] },
      { en: "We are teachers", es: ["somos profesores"] },
      { en: "They aren’t students", es: ["no son estudiantes", "ellos no son estudiantes"] },
      { en: "He is tall", es: ["él es alto", "es alto"] },
      { en: "Is she tall?", es: ["¿es alta?","¿es ella alta?"] },
      { en: "I am happy", es: ["estoy feliz", "estoy contento", "estoy contenta"] },
      { en: "Are we ready?", es: ["¿estamos listos?"] },
      { en: "They are at home", es: ["están en casa", "ellos están en casa"] }
    ],
    "L6": [
      { en: "I’m hungry", es: ["tengo hambre"] },
      { en: "I’m thirsty", es: ["tengo sed"] },
      { en: "Do you have time?", es: ["¿tienes tiempo?"] },
      { en: "We are tired", es: ["estamos cansados"] },
      { en: "They are busy", es: ["están ocupados"] },
      { en: "She is sick", es: ["ella está enferma", "está enferma"] },
      { en: "Is he at school?", es: ["¿está en la escuela?", "¿está él en la escuela?"] },
      { en: "Can we start?", es: ["¿podemos empezar?"] },
      { en: "We start now", es: ["empezamos ahora"] }
    ],
    "L7": [
      { en: "I play football", es: ["juego al fútbol", "yo juego al fútbol"] },
      { en: "Do you play?", es: ["¿juegas?"] },
      { en: "We play", es: ["jugamos"] },
      { en: "They play", es: ["juegan"] },
      { en: "I read books", es: ["leo libros", "yo leo libros"] },
      { en: "Do they read?", es: ["¿leen?"] },
      { en: "He reads", es: ["lee"] },
      { en: "We read", es: ["leemos"] },
      { en: "I write", es: ["escribo", "yo escribo"] },
      { en: "Do you write?", es: ["¿escribes?"] }
    ],
    "L8": [
      { en: "I’m going to study", es: ["voy a estudiar", "yo voy a estudiar"] },
      { en: "Are you going to read?", es: ["¿vas a leer?"] },
      { en: "We are going to travel", es: ["vamos a viajar"] },
      { en: "They are going to eat", es: ["van a comer"] },
      { en: "She is going to write", es: ["ella va a escribir", "va a escribir"] },
      { en: "Is he going to play?", es: ["¿va a jugar?"] },
      { en: "I’m going to speak", es: ["voy a hablar"] }
    ],
    "L9": [
      { en: "Why are you here?", es: ["¿por qué estás aquí?"] },
      { en: "Where do you live?", es: ["¿dónde vives?"] },
      { en: "When do we start?", es: ["¿cuándo empezamos?"] },
      { en: "How are they?", es: ["¿cómo están?"] },
      { en: "What do you want?", es: ["¿qué quieres?"] },
      { en: "How old are you?", es: ["¿cuántos años tienes?"] },
      { en: "What time is it?", es: ["¿qué hora es?"] },
      { en: "Which one is it?", es: ["¿cuál es?"] }
    ]
  }
};

// Unlock thresholds (seconds) based on the previous level’s best time.
// L2 unlocks after L1 ≤ 90s, L3 after L2 ≤ 85s, etc.
const UNLOCK_RULES = {
  "L2": 90,   // A2
  "L3": 85,   // Level 3 (A1 + A2 revision)
  "L4": 80,   // B1
  "L5": 75,   // B2
  "L6": 70,   // revision
  "L7": 65,   // C1
  "L8": 60,   // C2
  "L9": 50    // Final boss
};

// ======================= STATE =======================
let currentLevel = null;
let currentDirection = "en-es";
let currentTense = "present";
let quizItems = [];
let startedAt = 0;
let timerId = null;

// ======================= DOM =======================
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const levelsEl = $("#levels");
const playSec = $("#play");
const resSec = $("#results");
const qWrap = $("#questions");
const timerEl = $("#timer");
const playTitle = $("#playTitle");

// ======================= INIT / LOCKS =======================

const INIT_KEY = "union:v1:init";
document.addEventListener("DOMContentLoaded", () => {
  // One-time seed to ensure L1 only unlocked for this build
  if (!localStorage.getItem(INIT_KEY)) {
    Object.keys(localStorage)
      .filter(k => k.startsWith("union:best:"))
      .forEach(k => localStorage.removeItem(k));
    localStorage.setItem(INIT_KEY, "1");
  }

  // UI binds
  $("#direction").addEventListener("change", e => {
    currentDirection = e.target.value;
    applyLevelLocks();
  });
  $("#tense").addEventListener("change", e => {
    currentTense = e.target.value;
    applyLevelLocks();
  });
  $("#resetProgress").addEventListener("click", () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith("union:best:"))
      .forEach(k => localStorage.removeItem(k));
    applyLevelLocks();
    alert("Progress reset. Only Level 1 is now unlocked.");
  });

  levelsEl.addEventListener("click", onLevelClick);
  $("#submitBtn").addEventListener("click", submitAnswers);
  $("#cancelBtn").addEventListener("click", backToMenu);
  $("#backToMenu").addEventListener("click", backToMenu);
  $("#tryAgain").addEventListener("click", () => startLevel(currentLevel));
  $("#speakBtn").addEventListener("click", () => {
    // Speak the first visible prompt, if any
    const firstPrompt = $(".qitem .prompt")?.textContent?.trim();
    if (firstPrompt) speak(firstPrompt, currentDirection === "es-en" ? "es-ES" : "en-US");
  });

  applyLevelLocks();
});

function applyLevelLocks() {
  // Lock all
  $$(".level").forEach(btn => {
    btn.classList.add("locked");
    btn.setAttribute("aria-disabled", "true");
    btn.tabIndex = -1;
  });

  // Always unlock L1
  const l1 = $(`[data-level="L1"]`);
  if (l1) {
    l1.classList.remove("locked");
    l1.removeAttribute("aria-disabled");
    l1.tabIndex = 0;
  }

  // Unlock based on previous level best times
  for (const [lvl, req] of Object.entries(UNLOCK_RULES)) {
    const prevNum = Number(lvl.slice(1)) - 1;
    const prevId = `L${prevNum}`;
    const bestPrev = getBest(prevId, currentTense, currentDirection);
    if (bestPrev <= req) {
      const b = $(`[data-level="${lvl}"]`);
      if (b) {
        b.classList.remove("locked");
        b.removeAttribute("aria-disabled");
        b.tabIndex = 0;
      }
    }
  }
}

function onLevelClick(e) {
  const btn = e.target.closest(".level");
  if (!btn || btn.classList.contains("locked")) return;
  const lvl = btn.dataset.level;
  startLevel(lvl);
}

// ======================= TIMER =======================
function startTimer() {
  startedAt = Date.now();
  stopTimer();
  tick();
  timerId = setInterval(tick, 200);
}
function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}
function tick() {
  const sec = Math.floor((Date.now() - startedAt) / 1000);
  timerEl.textContent = formatTime(sec);
}
function elapsedSeconds() {
  return Math.floor((Date.now() - startedAt) / 1000);
}
function formatTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2,"0")}:${String(r).padStart(2,"0")}`;
}

// ======================= BUILD QUIZ =======================
function startLevel(levelId) {
  currentLevel = levelId;
  resSec.classList.add("hidden");
  playSec.classList.remove("hidden");

  playTitle.textContent = `Level ${levelId.slice(1)} — ${currentDirection.toUpperCase()} — ${currentTense}`;
  quizItems = buildQuiz(levelId, currentTense, currentDirection);
  renderQuestions(quizItems);
  startTimer();

  // speak first prompt automatically for accessibility
  const firstPrompt = $(".qitem .prompt")?.textContent?.trim();
  if (firstPrompt) speak(firstPrompt, currentDirection === "es-en" ? "es-ES" : "en-US");
}

function buildQuiz(levelId, tense, dir) {
  const pool = (BANK[tense] && BANK[tense][levelId]) ? [...BANK[tense][levelId]] : [];
  shuffle(pool);
  const pick = pool.slice(0, 10);
  return pick.map(item => {
    if (dir === "en-es") {
      return { prompt: item.en, answer: item.es };
    } else {
      // es-en: pick a canonical expected (first), but allow any variant to appear as prompt
      const all = Array.isArray(item.es) ? item.es : [item.es];
      const randPrompt = all[Math.floor(Math.random() * all.length)];
      return { prompt: randPrompt, answer: item.en };
    }
  });
}

function renderQuestions(items) {
  qWrap.innerHTML = "";
  items.forEach((it, idx) => {
    const div = document.createElement("div");
    div.className = "qitem";
    div.innerHTML = `
      <div>
        <label>Prompt</label>
        <div class="prompt">${escapeHtml(it.prompt)}</div>
      </div>
      <div>
        <label>Your answer</label>
        <input type="text" inputmode="latin" autocapitalize="none" autocomplete="off" spellcheck="false" data-i="${idx}" />
      </div>
    `;
    qWrap.appendChild(div);
  });
}

// ======================= ANSWER CHECK (strict accents; ñ≈n; ? only if question) =======================
const norm = s => (s || "").trim().replace(/\s+/g, " ").toLowerCase();
const isQuestion = s => /\?$/.test((s || "").trim()) || /^¿/.test((s || "").trim());

function coreKeepAccents(s){
  return (s || "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
function equalWithEnyeAllowance(a, b){
  if (a === b) return true;
  const aNo = a.replace(/ñ/g, "n");
  const bNo = b.replace(/ñ/g, "n");
  return aNo === bNo;
}
function cmpAnswer(userRaw, expectedRaw){
  const user = coreKeepAccents(userRaw);
  const exp  = coreKeepAccents(expectedRaw);
  if ( isQuestion(expectedRaw) && !isQuestion(userRaw) ) return false;
  return equalWithEnyeAllowance(user, exp);
}

// Multi-answer aware check
function isCorrectAnswer(studentRaw, expected) {
  const targets = Array.isArray(expected) ? expected : [expected];
  const s = studentRaw;
  for (const t of targets) if (cmpAnswer(s, t)) return true;
  return false;
}

// ======================= FEEDBACK HIGHLIGHT (bold + underline wrong parts) =======================
function escapeHtml(s){
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function tokenSplit(str){
  return String(str ?? "").split(/(\s+|[,.!?;:¿¡()«»"“”'’])/g).filter(x => x !== "");
}
function highlightDiff(expectedRaw, receivedRaw){
  const eToks = tokenSplit(expectedRaw);
  const rToks = tokenSplit(receivedRaw);
  const eOut = [], rOut = [];
  const max = Math.max(eToks.length, rToks.length);
  for (let i=0;i<max;i++){
    const eTok = eToks[i] ?? "";
    const rTok = rToks[i] ?? "";
    const eCore = coreKeepAccents(eTok);
    const rCore = coreKeepAccents(rTok);
    const same = equalWithEnyeAllowance(eCore, rCore) &&
                 (!isQuestion(eTok) || isQuestion(rTok) || !isQuestion(expectedRaw)); // gentle punctuation handling
    if (!eTok && rTok) {
      rOut.push(`<mark class="u">${escapeHtml(rTok)}</mark>`);
    } else if (eTok && !rTok) {
      eOut.push(`<mark class="u">${escapeHtml(eTok)}</mark>`);
    } else if (same) {
      eOut.push(escapeHtml(eTok));
      rOut.push(escapeHtml(rTok));
    } else {
      eOut.push(`<mark class="u">${escapeHtml(eTok)}</mark>`);
      rOut.push(`<mark class="u">${escapeHtml(rTok)}</mark>`);
    }
  }
  return { expectedHtml: eOut.join(""), receivedHtml: rOut.join("") };
}

// ======================= SUBMIT / SCORE / RESULTS =======================
function submitAnswers() {
  stopTimer();
  const secs = elapsedSeconds();

  const results = [];
  let wrongCount = 0;

  quizItems.forEach((it, idx) => {
    const input = qWrap.querySelector(`input[data-i="${idx}"]`);
    const val = input?.value ?? "";
    const ok = isCorrectAnswer(val, it.answer);

    const canonicalExpected = Array.isArray(it.answer) ? it.answer[0] : it.answer;
    const diff = ok
      ? { expectedHtml: escapeHtml(canonicalExpected), receivedHtml: escapeHtml(val||"") }
      : highlightDiff(canonicalExpected, val);

    results.push({
      prompt: it.prompt,
      expected: canonicalExpected,
      user: val,
      correct: ok,
      expectedHtml: diff.expectedHtml,
      receivedHtml: diff.receivedHtml
    });

    if (!ok) wrongCount++;
  });

  const penalty = wrongCount * 30; // 30s per incorrect or incomplete
  const finalScore = secs + penalty;

  // Save best time for this level/tense/direction
  setBest(currentLevel, currentTense, currentDirection, finalScore);

  // Render results
  renderResults(results, secs, penalty, finalScore);

  // Update locks after a new best might unlock next level
  applyLevelLocks();
}

function renderResults(results, baseSecs, penalty, total) {
  playSec.classList.add("hidden");
  resSec.classList.remove("hidden");

  $("#scoreLine").textContent =
    `Time: ${formatTime(baseSecs)}  + Penalty: ${penalty}s  =  Score: ${formatTime(total)}`;

  const fb = $("#feedback");
  fb.innerHTML = `
    <div class="row head">
      <div class="cell">Prompt</div>
      <div class="cell">Your answer</div>
      <div class="cell">Expected</div>
      <div class="cell">✓/✗</div>
    </div>
    ${results.map(r => `
      <div class="rrow ${r.correct ? 'ok' : 'bad'}">
        <div class="cell">${escapeHtml(r.prompt)}</div>
        <div class="cell">${r.receivedHtml || "(blank)"}</div>
        <div class="cell"><strong>${r.expectedHtml}</strong></div>
        <div class="cell">${r.correct ? "✓" : "✗"}</div>
      </div>
    `).join("")}
  `;
}

// ======================= BEST TIMES =======================
function bestKey(levelId, tense, direction) {
  return `union:best:${levelId}:${tense}:${direction}`;
}
function getBest(levelId, tense, direction) {
  const key = bestKey(levelId, tense, direction);
  const raw = localStorage.getItem(key);
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : Infinity;
}
function setBest(levelId, tense, direction, seconds) {
  const key = bestKey(levelId, tense, direction);
  const cur = getBest(levelId, tense, direction);
  if (seconds < cur) localStorage.setItem(key, String(seconds));
}

// ======================= VOICE (robust) =======================
let __voicesLoaded = false;
let __esVoice = null;
function loadVoicesOnce(){
  if (__voicesLoaded) return;
  const set = () => {
    const v = speechSynthesis.getVoices() || [];
    __esVoice = v.find(vo => /^es(-|_)/i.test(vo.lang)) || null;
    __voicesLoaded = true;
  };
  set();
  if (!__voicesLoaded) {
    window.speechSynthesis.addEventListener("voiceschanged", () => set(), { once: true });
    // Fallback poke
    setTimeout(() => set(), 200);
  }
}
function speak(text, lang = "es-ES"){
  try{
    if (!("speechSynthesis" in window)) return;
    loadVoicesOnce();
    const u = new SpeechSynthesisUtterance(String(text));
    if (__esVoice) u.voice = __esVoice;
    u.lang = __esVoice?.lang || lang;
    u.rate = 1; u.pitch = 1; u.volume = 1;
    window.speechSynthesis.cancel(); // avoid overlap
    window.speechSynthesis.speak(u);
  } catch {}
}

// ======================= NAV =======================
function backToMenu() {
  stopTimer();
  playSec.classList.add("hidden");
  resSec.classList.add("hidden");
  currentLevel = null;
  // reveal menu (levels are always visible)
}

// ======================= UTILS =======================
function shuffle(a) {
  for (let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
