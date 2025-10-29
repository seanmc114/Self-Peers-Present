// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
  // GAME 1 — Describing yourself & routine + Peer pressure (Present Tense)
  // Direction: English -> Spanish
  // (…full dataset content retained here…)
  const PRESENT = {
    1: [
      { en: "I speak", es: "Hablo" },
      { en: "You speak (tú)", es: "Hablas" },
      { en: "He speaks", es: "Habla" },
      { en: "We speak", es: "Hablamos" },
      { en: "They speak", es: "Hablan" },
      { en: "Do you speak?", es: "Hablas?" },
      { en: "I eat", es: "Como" },
      { en: "Do they eat?", es: "Comen?" },
      { en: "We live", es: "Vivimos" },
      { en: "She lives", es: "Vive" },
      { en: "Do we live?", es: "Vivimos?" }
    ],
    2: [
      { en: "I have", es: "Tengo" },
      { en: "Do you have?", es: "Tienes?" },
      { en: "He has", es: "Tiene" },
      { en: "They have", es: "Tienen" },
      { en: "We have", es: "Tenemos" },
      { en: "She doesn’t have", es: "No tiene" },
      { en: "Do we have?", es: "Tenemos?" },
      { en: "I need", es: "Necesito" },
      { en: "Do they need?", es: "Necesitan?" },
      { en: "I go", es: "Voy" },
      { en: "Do you go?", es: "Vas?" },
      { en: "We go", es: "Vamos" }
    ],
    3: [
      { en: "I want", es: "Quiero" },
      { en: "Do you want?", es: "Quieres?" },
      { en: "We want", es: "Queremos" },
      { en: "She wants", es: "Quiere" },
      { en: "They want", es: "Quieren" },
      { en: "I can", es: "Puedo" },
      { en: "Can you?", es: "Puedes?" },
      { en: "He can", es: "Puede" },
      { en: "We can", es: "Podemos" },
      { en: "They can", es: "Pueden" },
      { en: "Do we want?", es: "Queremos?" },
      { en: "Do they want?", es: "Quieren?" }
    ],
    4: [
      { en: "I like", es: "Me gusta" },
      { en: "Do you like?", es: "Te gusta?" },
      { en: "We like", es: "Nos gusta" },
      { en: "They like", es: "Les gusta" },
      { en: "He likes chocolate", es: "Le gusta el chocolate" },
      { en: "Do they like music?", es: "Les gusta la música?" },
      { en: "I live in Spain", es: "Vivo en españa" },
      { en: "Do you live here?", es: "Vives aquí?" },
      { en: "We study", es: "Estudiamos" },
      { en: "She studies", es: "Estudia" }
    ],
    5: [
      { en: "I’m from Ireland", es: "Soy de irlanda" },
      { en: "Are you from Spain?", es: "Eres de españa?" },
      { en: "We are teachers", es: "Somos profesores" },
      { en: "They aren’t students", es: "No son estudiantes" },
      { en: "He is tall", es: "Es alto" },
      { en: "Is she tall?", es: "Es alta?" },
      { en: "I am happy", es: "Estoy feliz" },
      { en: "Are we ready?", es: "Estamos listos?" },
      { en: "They are at home", es: "Están en casa" }
    ],
    6: [
      { en: "I’m hungry", es: "Tengo hambre" },
      { en: "I’m thirsty", es: "Tengo sed" },
      { en: "Do you have time?", es: "Tienes tiempo?" },
      { en: "We are tired", es: "Estamos cansados" },
      { en: "They are busy", es: "Están ocupados" },
      { en: "She is sick", es: "Está enferma" },
      { en: "Is he at school?", es: "Está en la escuela?" },
      { en: "Can we start?", es: "Podemos empezar?" },
      { en: "We start now", es: "Empezamos ahora" }
    ],
    7: [
      { en: "I play football", es: "Juego al fútbol" },
      { en: "Do you play?", es: "Juegas?" },
      { en: "We play", es: "Jugamos" },
      { en: "They play", es: "Juegan" },
      { en: "I read books", es: "Leo libros" },
      { en: "Do they read?", es: "Leen?" },
      { en: "He reads", es: "Lee" },
      { en: "We read", es: "Leemos" },
      { en: "I write", es: "Escribo" },
      { en: "Do you write?", es: "Escribes?" }
    ],
    8: [
      { en: "I’m going to study", es: "Voy a estudiar" },
      { en: "Are you going to read?", es: "Vas a leer?" },
      { en: "We are going to travel", es: "Vamos a viajar" },
      { en: "They are going to eat", es: "Van a comer" },
      { en: "She is going to write", es: "Va a escribir" },
      { en: "Is he going to play?", es: "Va a jugar?" },
      { en: "I’m going to speak", es: "Voy a hablar" }
    ],
    9: [
      { en: "Why are you here?", es: "Por qué estás aquí?" },
      { en: "Where do you live?", es: "Dónde vives?" },
      { en: "When do we start?", es: "Cuándo empezamos?" },
      { en: "How are they?", es: "Cómo están?" },
      { en: "What do you want?", es: "Qué quieres?" },
      { en: "How old are you?", es: "Cuántos años tienes?" },
      { en: "What time is it?", es: "Qué hora es?" },
      { en: "Which one is it?", es: "Cuál es?" }
    ]
  };

  const deepCopy = obj => JSON.parse(JSON.stringify(obj));
  const DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };

  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

  // ===================== Compare (accents required; ñ≈n; ? only for questions) =====================
  const norm = s => (s || "").trim();
  const isQuestion = s => {
    const t = norm(s);
    return t.endsWith("?") || t.startsWith("¿");
  };
  function coreKeepAccents(s){
    return (s || "")
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }
  function equalWithEnyeAllowance(a, b){
    if (a === b) return true;
    return a.replace(/ñ/g, "n") === b.replace(/ñ/g, "n");
  }
  function cmpAnswer(userRaw, expectedRaw){
    if (isQuestion(expectedRaw) && !isQuestion(userRaw)) return false;
    const u = coreKeepAccents(userRaw);
    const e = coreKeepAccents(expectedRaw);
    return equalWithEnyeAllowance(u, e);
  }

  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev=getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){
    if (lvl===1) return true;
    const need = BASE_THRESH[lvl-1];
    const prev = getBest(tense,lvl-1);
    return prev!=null && (need==null || prev<=need);
  }

  // ===================== Helpers / Mini UI bits =====================
  function miniBtn(text,title){ const b=document.createElement("button"); b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ========== Feedback highlighting (bold+underline wrong parts) ==========
  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;");
  }
  function splitTokens(str){
    return String(str ?? "").split(/(\s+|[,.!?;:¿¡()«»"“”'’])/g).filter(x => x !== "");
  }
  function highlightDiff(expectedRaw, receivedRaw){
    const e = splitTokens(expectedRaw);
    const r = splitTokens(receivedRaw);
    const eOut = [], rOut = [];
    const max = Math.max(e.length, r.length);
    for (let i=0;i<max;i++){
      const et = e[i] ?? "";
      const rt = r[i] ?? "";
      const same = equalWithEnyeAllowance(coreKeepAccents(et), coreKeepAccents(rt));
      if (!et && rt){ rOut.push(`<b><u>${escapeHtml(rt)}</u></b>`); }
      else if (et && !rt){ eOut.push(`<b><u>${escapeHtml(et)}</u></b>`); }
      else if (same){ eOut.push(escapeHtml(et)); rOut.push(escapeHtml(rt)); }
      else { eOut.push(`<b><u>${escapeHtml(et)}</u></b>`); rOut.push(`<b><u>${escapeHtml(rt)}</u></b>`); }
    }
    return { expectedHtml: eOut.join(""), receivedHtml: rOut.join("") };
  }

  // ===================== Rendering Levels =====================
  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="grid";
    const gm=$("#game"); if(gm) gm.style.display="none";
    $("#back-button").style.display = "none";
  }

  // ===================== Start Level / Build Round =====================
  let CURRENT_TENSE = "Present";
  let currentLevel = null;
  let quiz = [];
  let startedAt = 0;
  let timerId = null;
  let submitted = false;

  function startLevel(level){
    currentLevel = level; submitted=false;
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const host = $("#questions"); host.innerHTML="";
    quiz.forEach((q,idx)=>{
      const row = document.createElement("div"); row.className="question-item";
      const label = document.createElement("label"); label.textContent = q.prompt;
      const input = document.createElement("input"); input.type="text"; input.placeholder="Type answer…";
      input.autocomplete="off"; input.spellcheck=false; input.dataset.idx=idx;
      row.appendChild(label); row.appendChild(input);
      host.appendChild(row);
    });

    // Speak first prompt
    const first = host.querySelector("label")?.textContent?.trim();
    if (first) speak(first, "es-ES");

    $("#submit").onclick = finishAndCheck;
    $("#back-button").onclick = backToLevels;
    $("#back-button").style.display = "inline-block";
  }

  // ===================== Timer =====================
  function startTimer(){ stopTimer(); startedAt=Date.now(); timerId=setInterval(()=>{$("#timer").textContent=`Time: ${elapsed()}s`;},200); }
  function stopTimer(){ if (timerId) clearInterval(timerId); timerId=null; return elapsed(); }
  function elapsed(){ return Math.floor((Date.now()-startedAt)/1000); }

  // ===================== Submission / Feedback =====================
  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; const c=inputs[i].parentElement; c.classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.1rem; font-weight:700;">Final Score: ${finalScore}s</div>
       <div class="line">Time: <strong>${elapsed}s</strong></div>
       <div class="line">Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>`;

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      const __diff = ok ? { expectedHtml: escapeHtml(q.answer), receivedHtml: escapeHtml(q.user||"") } : highlightDiff(q.answer, q.user||"");
      li.innerHTML = `${escapeHtml(q.prompt)} — <strong>${__diff.expectedHtml}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${__diff.receivedHtml || ""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Utils =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

  // Robust speak: prefers Spanish voice; handles Chrome delayed load
  function speak(text, lang="es-ES"){
    try{
      if (!("speechSynthesis" in window)) return;
      if (!window.__voicesLoaded) {
        const assign = () => {
          const v = speechSynthesis.getVoices() || [];
          window.__esVoice = v.find(vo => /^es(-|_)/i.test(vo.lang)) || null;
          window.__voicesLoaded = true;
        };
        window.__voicesLoaded = false;
        try { assign(); } catch {}
        if (!window.__voicesLoaded) {
          try { window.speechSynthesis.addEventListener("voiceschanged", assign, { once:true }); } catch {}
          setTimeout(assign, 200);
        }
      }
      const u = new SpeechSynthesisUtterance(String(text));
      if (window.__esVoice) u.voice = window.__esVoice;
      u.lang = window.__esVoice?.lang || lang;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init cheats counter
    if (localStorage.getItem(GLOBAL_CHEATS_KEY) == null) localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX));

    // tense switching
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    // Ensure a truly fresh start has only Level 1 unlocked
    try {
      const INIT_KEY = "tqplus:v3:initSeeded";
      if (!localStorage.getItem(INIT_KEY)) {
        Object.keys(localStorage)
          .filter(k => k.startsWith("tqplus:v3:best:"))
          .forEach(k => localStorage.removeItem(k));
        localStorage.setItem(INIT_KEY, "1");
      }
    } catch {}

    renderLevels();
  });
})();
