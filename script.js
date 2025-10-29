(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ------------------ CONFIG ------------------
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  // Unlock thresholds for NEXT level based on previous best:
  // L2 after L1 ≤ 90, L3 after L2 ≤ 85, L4 ≤ 80, L5 ≤ 75, L6 ≤ 70, L7 ≤ 65, L8 ≤ 60, L9 ≤ 50.
  const UNLOCK_RULES = { L2:90, L3:85, L4:80, L5:75, L6:70, L7:65, L8:60, L9:50 };

  // ------------------ DATA (Present) ------------------
  // Keep content modest here; you can swap in your full bank.
  const BANK = {
    present: {
      L1: [
        { en:"I speak", es:["hablo","yo hablo"] },
        { en:"You speak (tú)", es:["hablas"] },
        { en:"He speaks", es:["habla","él habla"] },
        { en:"We speak", es:["hablamos","nosotros hablamos"] },
        { en:"They speak", es:["hablan","ellos hablan"] },
        { en:"Do you speak?", es:["¿hablas?","¿hablas tú?"] },
        { en:"I eat", es:["como","yo como"] },
        { en:"Do they eat?", es:["¿comen?","¿comen ellos?"] },
        { en:"We live", es:["vivimos","nosotros vivimos"] },
        { en:"She lives", es:["vive","ella vive"] },
        { en:"Do we live?", es:["¿vivimos?"] }
      ],
      L2: [
        { en:"I have", es:["tengo","yo tengo"] },
        { en:"Do you have?", es:["¿tienes?","¿tienes tú?"] },
        { en:"He has", es:["tiene","él tiene"] },
        { en:"They have", es:["tienen","ellos tienen"] },
        { en:"We have", es:["tenemos","nosotros tenemos"] },
        { en:"She doesn’t have", es:["no tiene","ella no tiene"] },
        { en:"Do we have?", es:["¿tenemos?"] },
        { en:"I need", es:["necesito","yo necesito"] },
        { en:"Do they need?", es:["¿necesitan?"] },
        { en:"I go", es:["voy","yo voy"] },
        { en:"Do you go?", es:["¿vas?","¿vas tú?"] },
        { en:"We go", es:["vamos","nosotros vamos"] }
      ],
      L3: [
        { en:"I want", es:["quiero","yo quiero"] },
        { en:"Do you want?", es:["¿quieres?"] },
        { en:"We want", es:["queremos"] },
        { en:"She wants", es:["quiere","ella quiere"] },
        { en:"They want", es:["quieren","ellos quieren"] },
        { en:"I can", es:["puedo","yo puedo"] },
        { en:"Can you?", es:["¿puedes?"] },
        { en:"He can", es:["puede"] },
        { en:"We can", es:["podemos"] },
        { en:"They can", es:["pueden"] },
        { en:"Do we want?", es:["¿queremos?"] },
        { en:"Do they want?", es:["¿quieren?"] }
      ],
      L4: [
        { en:"I like", es:["me gusta"] },
        { en:"Do you like?", es:["¿te gusta?"] },
        { en:"We like", es:["nos gusta"] },
        { en:"They like", es:["les gusta"] },
        { en:"He likes chocolate", es:["le gusta el chocolate"] },
        { en:"Do they like music?", es:["¿les gusta la música?"] },
        { en:"I live in Spain", es:["vivo en españa","yo vivo en españa"] },
        { en:"Do you live here?", es:["¿vives aquí?"] },
        { en:"We study", es:["estudiamos"] },
        { en:"She studies", es:["estudia"] }
      ],
      L5: [
        { en:"I’m from Ireland", es:["soy de irlanda","yo soy de irlanda"] },
        { en:"Are you from Spain?", es:["¿eres de españa?"] },
        { en:"We are teachers", es:["somos profesores"] },
        { en:"They aren’t students", es:["no son estudiantes"] },
        { en:"He is tall", es:["es alto","él es alto"] },
        { en:"Is she tall?", es:["¿es alta?","¿es ella alta?"] },
        { en:"I am happy", es:["estoy feliz","estoy contento","estoy contenta"] },
        { en:"Are we ready?", es:["¿estamos listos?"] },
        { en:"They are at home", es:["están en casa","ellos están en casa"] }
      ],
      L6: [
        { en:"I’m hungry", es:["tengo hambre"] },
        { en:"I’m thirsty", es:["tengo sed"] },
        { en:"Do you have time?", es:["¿tienes tiempo?"] },
        { en:"We are tired", es:["estamos cansados"] },
        { en:"They are busy", es:["están ocupados"] },
        { en:"She is sick", es:["está enferma","ella está enferma"] },
        { en:"Is he at school?", es:["¿está en la escuela?","¿está él en la escuela?"] },
        { en:"Can we start?", es:["¿podemos empezar?"] },
        { en:"We start now", es:["empezamos ahora"] }
      ],
      L7: [
        { en:"I play football", es:["juego al fútbol","yo juego al fútbol"] },
        { en:"Do you play?", es:["¿juegas?"] },
        { en:"We play", es:["jugamos"] },
        { en:"They play", es:["juegan"] },
        { en:"I read books", es:["leo libros","yo leo libros"] },
        { en:"Do they read?", es:["¿leen?"] },
        { en:"He reads", es:["lee"] },
        { en:"We read", es:["leemos"] },
        { en:"I write", es:["escribo","yo escribo"] },
        { en:"Do you write?", es:["¿escribes?"] }
      ],
      L8: [
        { en:"I’m going to study", es:["voy a estudiar","yo voy a estudiar"] },
        { en:"Are you going to read?", es:["¿vas a leer?"] },
        { en:"We are going to travel", es:["vamos a viajar"] },
        { en:"They are going to eat", es:["van a comer"] },
        { en:"She is going to write", es:["va a escribir","ella va a escribir"] },
        { en:"Is he going to play?", es:["¿va a jugar?"] },
        { en:"I’m going to speak", es:["voy a hablar"] }
      ],
        L9: [
        { en:"Why are you here?", es:["¿por qué estás aquí?"] },
        { en:"Where do you live?", es:["¿dónde vives?"] },
        { en:"When do we start?", es:["¿cuándo empezamos?"] },
        { en:"How are they?", es:["¿cómo están?"] },
        { en:"What do you want?", es:["¿qué quieres?"] },
        { en:"How old are you?", es:["¿cuántos años tienes?"] },
        { en:"What time is it?", es:["¿qué hora es?"] },
        { en:"Which one is it?", es:["¿cuál es?"] }
      ]
    }
  };

  // ------------------ STATE ------------------
  let currentLevel = null;
  let startedAt = 0;
  let timerId = null;
  let submitted = false;
  let currentTense = "present";
  let quiz = [];

  // ------------------ DOM ------------------
  const levelsEl = $("#level-list");
  const gameEl   = $("#game");
  const qWrap    = $("#questions");
  const timerEl  = $("#timer");
  const resultsEl= $("#results");
  const speakBtn = $("#speak-btn");
  const readToggle = $("#read-toggle");

  // ------------------ INIT ------------------
  document.addEventListener("DOMContentLoaded", () => {
    // One-time fresh lock seed so only L1 is unlocked on this build’s first run
    const INIT_KEY = "union:init:v1";
    if (!localStorage.getItem(INIT_KEY)) {
      Object.keys(localStorage)
        .filter(k => k.startsWith("union:best:"))
        .forEach(k => localStorage.removeItem(k));
      localStorage.setItem(INIT_KEY, "1");
    }

    // Read toggle: no audio unless ON
    readToggle.addEventListener("change", () => {
      speakBtn.disabled = !readToggle.checked;
    });
    speakBtn.disabled = !readToggle.checked;

    // Speak current focused prompt if toggle is on
    speakBtn.addEventListener("click", () => {
      if (!readToggle.checked) return;
      const focused = document.activeElement;
      const label = focused?.previousElementSibling?.textContent?.trim()
                 || qWrap.querySelector(".question-item label")?.textContent?.trim();
      if (label) speak(label, "es-ES");
    });

    renderLevels();
  });

  // ------------------ LEVEL LOCKS ------------------
  function bestKey(level, tense) { return `union:best:${tense}:${level}`; }
  function getBest(level, tense) {
    const v = localStorage.getItem(bestKey(level,tense));
    const n = v==null ? NaN : Number(v);
    return Number.isFinite(n) ? n : Infinity;
  }
  function setBest(level, tense, secs) {
    const cur = getBest(level, tense);
    if (secs < cur) localStorage.setItem(bestKey(level,tense), String(secs));
  }

  function renderLevels(){
    levelsEl.innerHTML = "";
    const lvlIds = Object.keys(BANK[currentTense]).sort();

    lvlIds.forEach((id, idx) => {
      const btn = document.createElement("button");
      btn.className = "level-btn";

      // lock all except L1 initially; then apply rules
      btn.disabled = id !== "L1";

      // Unlock chain: each level unlocks if previous best ≤ rule
      if (id !== "L1") {
        const prevId = "L" + (parseInt(id.slice(1),10)-1);
        const rule = UNLOCK_RULES[id];
        const prevBest = getBest(prevId, currentTense);
        if (Number.isFinite(prevBest) && rule != null && prevBest <= rule) {
          btn.disabled = false;
        }
      }

      btn.textContent = btn.disabled ? `🔒 ${id}` : id;
      btn.addEventListener("click", () => startLevel(id));
      levelsEl.appendChild(btn);
    });

    // reset game area
    gameEl.style.display = "none";
    resultsEl.innerHTML = "";
  }

  // ------------------ BUILD ROUND ------------------
  function startLevel(levelId){
    currentLevel = levelId;
    submitted = false;
    levelsEl.style.display = "none";
    gameEl.style.display   = "block";
    resultsEl.innerHTML = "";
    $("#back-button").style.display = "inline-block";

    // build questions
    const pool = BANK[currentTense][levelId] || [];
    shuffle(pool);
    quiz = (pool.slice(0, QUESTIONS_PER_ROUND)).map(item => ({
      prompt: item.en,
      expected: item.es,  // array of forms
      user: ""
    }));

    renderQuestions();
    startTimer();
  }

  function renderQuestions(){
    qWrap.innerHTML = "";
    quiz.forEach((q, i) => {
      const row = document.createElement("div");
      row.className = "question-item";
      const label = document.createElement("label");
      label.textContent = q.prompt;
      label.htmlFor = `q${i}`;
      const input = document.createElement("input");
      input.type = "text";
      input.id = `q${i}`;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.addEventListener("input", e => { q.user = e.target.value; });
      row.appendChild(label);
      row.appendChild(input);
      qWrap.appendChild(row);
    });

    // controls
    $("#submit").onclick = finishAndCheck;
    $("#back-button").onclick = backToLevels;

    // DO NOT auto read on load (toggle controls reading)
  }

  // ------------------ TIMER ------------------
  function startTimer(){
    stopTimer();
    startedAt = Date.now();
    timerId = setInterval(() => {
      timerEl.textContent = formatTime(Math.floor((Date.now()-startedAt)/1000));
    }, 200);
  }
  function stopTimer(){
    if (timerId) clearInterval(timerId);
    timerId = null;
    return Math.floor((Date.now()-startedAt)/1000);
  }
  function formatTime(s){
    const m = Math.floor(s/60), r=s%60;
    return `${String(m).padStart(2,"0")}:${String(r).padStart(2,"0")}`;
  }

  // ------------------ COMPARISON & FEEDBACK ------------------
  function normalizeStrict(s){
    return (s ?? "")
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }
  function isQuestion(s){ const t=(s||"").trim(); return t.startsWith("¿") || t.endsWith("?"); }
  function equalWithEnye(a,b){
    if (a===b) return true;
    return a.replace(/ñ/g,"n") === b.replace(/ñ/g,"n");
  }
  function cmpOne(studentRaw, expectedRaw){
    if (isQuestion(expectedRaw) && !isQuestion(studentRaw)) return false;
    return equalWithEnye(normalizeStrict(studentRaw), normalizeStrict(expectedRaw));
  }
  function isCorrect(studentRaw, expected){
    const targets = Array.isArray(expected) ? expected : [expected];
    return targets.some(t => cmpOne(studentRaw, t));
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;");
  }
  function tokenSplit(str){
    return String(str ?? "").split(/(\s+|[,.!?;:¿¡()«»"“”'’])/g).filter(Boolean);
  }
  function highlightDiff(expectedRaw, receivedRaw){
    const e = tokenSplit(expectedRaw);
    const r = tokenSplit(receivedRaw);
    const eOut = [], rOut = [];
    const max = Math.max(e.length, r.length);
    for (let i=0;i<max;i++){
      const et = e[i] ?? "";
      const rt = r[i] ?? "";
      const ok = equalWithEnye(normalizeStrict(et), normalizeStrict(rt));
      if (!et && rt){ rOut.push(`<b class="u">${escapeHtml(rt)}</b>`); }
      else if (et && !rt){ eOut.push(`<b class="u">${escapeHtml(et)}</b>`); }
      else if (ok){ eOut.push(escapeHtml(et)); rOut.push(escapeHtml(rt)); }
      else { eOut.push(`<b class="u">${escapeHtml(et)}</b>`); rOut.push(`<b class="u">${escapeHtml(rt)}</b>`); }
    }
    return { expectedHtml: eOut.join(""), receivedHtml: rOut.join("") };
  }

  // ------------------ SUBMISSION ------------------
  function finishAndCheck(){
    if (submitted) return;
    submitted = true;

    const secs = stopTimer();

    let wrong = 0;
    const items = qWrap.querySelectorAll(".question-item input");

    const list = document.createElement("ul");

    quiz.forEach((q, i) => {
      const ok = isCorrect(q.user, q.expected);
      if (!ok) wrong++;

      const li = document.createElement("li");
      li.className = ok ? "correct" : "incorrect";

      const canonical = Array.isArray(q.expected) ? q.expected[0] : q.expected;
      const diff = ok
        ? { expectedHtml: escapeHtml(canonical), receivedHtml: escapeHtml(q.user||"") }
        : highlightDiff(canonical, q.user||"");

      li.innerHTML = `
        <div class="prompt"><strong>${escapeHtml(q.prompt)}</strong></div>
        <div class="you">You: ${diff.receivedHtml || "(blank)"}</div>
        <div class="exp">Expected: <strong>${diff.expectedHtml}</strong></div>
      `;
      list.appendChild(li);

      // lock inputs
      items[i].readOnly = true;
      items[i].disabled = true;
    });

    const penalty = wrong * PENALTY_PER_WRONG;
    const finalScore = secs + penalty;

    resultsEl.innerHTML = `
      <p><strong>Time:</strong> ${formatTime(secs)} &nbsp; + &nbsp;
         <strong>Penalty:</strong> ${penalty}s &nbsp; = &nbsp;
         <strong>Score:</strong> ${formatTime(finalScore)}</p>
    `;
    resultsEl.appendChild(list);

    // Save best and apply locks
    setBest(currentLevel, currentTense, finalScore);
    // show a Try Again and Back button inline:
    const again = document.createElement("button");
    again.className = "submit";
    again.textContent = "Try Again";
    again.onclick = () => startLevel(currentLevel);

    const back = document.createElement("button");
    back.className = "cancel";
    back.textContent = "Back to Levels";
    back.onclick = backToLevels;

    const row = document.createElement("div");
    row.className = "actions";
    row.appendChild(again);
    row.appendChild(back);
    resultsEl.appendChild(row);

    // update level list in background so unlock becomes visible on return
    // (don’t force-goto the list; user can try again)
  }

  function backToLevels(){
    gameEl.style.display = "none";
    levelsEl.style.display = "grid";
    renderLevels();
  }

  // ------------------ VOICE ------------------
  let VOICES_READY = false;
  let ES_VOICE = null;
  function loadVoices(){
    return new Promise(res => {
      const set = () => {
        const v = window.speechSynthesis?.getVoices() || [];
        if (v.length) {
          ES_VOICE = v.find(x => /^es(?:-|_)/i.test(x.lang)) || null;
          VOICES_READY = true;
          res();
          return true;
        }
        return false;
      };
      if (!set()) setTimeout(() => { if (!set()) setTimeout(set, 200); }, 150);
      window.speechSynthesis?.addEventListener?.("voiceschanged", set, { once:true });
    });
  }
  async function speak(text, lang="es-ES"){
    try {
      if (!("speechSynthesis" in window)) return;
      if (!VOICES_READY) await loadVoices();
      const u = new SpeechSynthesisUtterance(String(text));
      if (ES_VOICE) u.voice = ES_VOICE;
      u.lang = ES_VOICE?.lang || lang;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  }

  // ------------------ UTILS ------------------
  function shuffle(a){ for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } }
})();
