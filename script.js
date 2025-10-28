// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

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
// Rules applied:
// - Only final ? is used in answers (no inverted ¿ needed)
// - Accents required
// - Pronouns not required EXCEPT "usted" must appear when marked (formal)
// - Connector for Game 1 appears in later levels: "porque"

const PRESENT = {
  // Level 1 — super simple, short, no reflexives, no connectors
  1: [
    { en: "My name is Sean", es: "Me llamo Sean" },
    { en: "I am a student", es: "Soy estudiante" },
    { en: "I am Irish", es: "Soy irlandés" },
    { en: "I am 17 years old", es: "Tengo 17 años" },
    { en: "I live in Dublin", es: "Vivo en Dublín" },
    { en: "I go to school", es: "Voy al colegio" },
    { en: "I like music", es: "Me gusta la música" },
    { en: "I like sport", es: "Me gusta el deporte" },
    { en: "I have one brother", es: "Tengo un hermano" },
    { en: "Peer pressure is a problem", es: "La presión de grupo es un problema" }
  ],

  // Levels 2–10 — unchanged difficulty ramp, with questions using only final '?'
  2: [
    { en: "My school is big", es: "Mi colegio es grande" },
    { en: "I live near the school", es: "Vivo cerca del colegio" },
    { en: "I like music and football", es: "Me gusta la música y el fútbol" },
    { en: "I eat breakfast at home", es: "Desayuno en casa" },
    { en: "I walk to school", es: "Camino al colegio" },
    { en: "I do my homework in the afternoon", es: "Hago los deberes por la tarde" },
    { en: "It is hard to say no", es: "Es difícil decir que no" },
    { en: "I say no to drugs", es: "Digo no a las drogas" },
    { en: "Do you like Spanish?", es: "Te gusta el español?" },      // tú
    { en: "Do you smoke? (formal)", es: "Fuma usted?" }              // usted required
  ],
  3: [
    { en: "I get on well with my friends", es: "Me llevo bien con mis amigos" },
    { en: "I help at home", es: "Ayudo en casa" },
    { en: "I cook sometimes", es: "Cocino a veces" },
    { en: "I use my phone too much", es: "Uso el móvil demasiado" },
    { en: "Social media pressures young people", es: "Las redes sociales presionan a los jóvenes" },
    { en: "I avoid alcohol", es: "Evito el alcohol" },
    { en: "I prefer healthy habits", es: "Prefiero hábitos saludables" },
    { en: "Do you play sport?", es: "Practicas deporte?" },
    { en: "Do you study every day? (formal)", es: "Estudia usted todos los días?" },
    { en: "I study because I want a good future", es: "Estudio porque quiero un buen futuro" }
  ],
  4: [
    { en: "I usually take the bus", es: "Suelo coger el autobús" },
    { en: "I drink water at school", es: "Bebo agua en el colegio" },
    { en: "I bring a packed lunch", es: "Llevo un almuerzo" },
    { en: "I practise the guitar", es: "Practico la guitarra" },
    { en: "I relax with my friends", es: "Me relajo con mis amigos" },
    { en: "I avoid bad influences", es: "Evito las malas influencias" },
    { en: "I choose real friends", es: "Elijo amigos de verdad" },
    { en: "Do you feel pressure?", es: "Sientes presión?" },
    { en: "Do you vape? (formal)", es: "Vapea usted?" },
    { en: "I say no because it is dangerous", es: "Digo que no porque es peligroso" }
  ],
  5: [
    { en: "On weekdays I wake up early", es: "Entre semana me despierto temprano" },
    { en: "I get dressed quickly", es: "Me visto rápido" },
    { en: "I arrive at school on time", es: "Llego al colegio a tiempo" },
    { en: "I pay attention in class", es: "Presto atención en clase" },
    { en: "I eat well and I sleep well", es: "Como bien y duermo bien" },
    { en: "I refuse cigarettes", es: "Rechazo los cigarrillos" },
    { en: "I avoid fights", es: "Evito las peleas" },
    { en: "Do you help your friends?", es: "Ayudas a tus amigos?" },
    { en: "Do you drink alcohol? (formal)", es: "Bebe usted alcohol?" },
    { en: "I choose my path because it is right", es: "Elijo mi camino porque es correcto" }
  ],
  6: [
    { en: "After school I study for an hour", es: "Después del colegio estudio una hora" },
    { en: "At the weekend I rest", es: "El fin de semana descanso" },
    { en: "I go out with friends", es: "Salgo con amigos" },
    { en: "I play video games a little", es: "Juego a los videojuegos un poco" },
    { en: "I practice sport in the evening", es: "Practico deporte por la tarde" },
    { en: "Peer pressure affects confidence", es: "La presión de grupo afecta a la confianza" },
    { en: "I support my friends", es: "Apoyo a mis amigos" },
    { en: "Do you tell the truth?", es: "Dices la verdad?" },
    { en: "Do you feel confident? (formal)", es: "Se siente usted seguro?" },
    { en: "I say no because I respect myself", es: "Digo que no porque me respeto" }
  ],
  7: [
    { en: "I have a balanced routine", es: "Tengo una rutina equilibrada" },
    { en: "I limit the phone at night", es: "Limito el móvil por la noche" },
    { en: "I look after my mental health", es: "Cuido mi salud mental" },
    { en: "I talk with my parents", es: "Hablo con mis padres" },
    { en: "I avoid toxic behaviour", es: "Evito el comportamiento tóxico" },
    { en: "I choose good company", es: "Elijo buena compañía" },
    { en: "I focus on my goals", es: "Me concentro en mis metas" },
    { en: "Do you respect the rules?", es: "Respetas las normas?" },
    { en: "Do you need help? (formal)", es: "Necesita usted ayuda?" },
    { en: "I say no because I have values", es: "Digo que no porque tengo valores" }
  ],
  8: [
    { en: "Every day I make my bed", es: "Cada día hago la cama" },
    { en: "I prepare my bag the night before", es: "Preparo la mochila la noche anterior" },
    { en: "I eat fruit and vegetables", es: "Como fruta y verduras" },
    { en: "I revise a little each day", es: "Repaso un poco cada día" },
    { en: "I avoid parties during exams", es: "Evito las fiestas durante los exámenes" },
    { en: "I speak kindly to others", es: "Hablo con amabilidad a los demás" },
    { en: "I control my stress", es: "Controlo mi estrés" },
    { en: "Do you pressure others?", es: "Presionas a los demás?" },
    { en: "Do you set a good example? (formal)", es: "Da usted buen ejemplo?" },
    { en: "I say no because I am responsible", es: "Digo que no porque soy responsable" }
  ],
  9: [
    { en: "I manage my time well", es: "Gestiono bien mi tiempo" },
    { en: "I avoid gossip", es: "Evito los chismes" },
    { en: "I surround myself with positive people", es: "Me rodeo de gente positiva" },
    { en: "I trust my best friend", es: "Confío en mi mejor amigo" },
    { en: "I practise mindfulness", es: "Practico la atención plena" },
    { en: "I reject dangerous trends", es: "Rechazo las modas peligrosas" },
    { en: "I take healthy decisions", es: "Tomo decisiones saludables" },
    { en: "Do you accept yourself?", es: "Te aceptas a ti mismo?" },
    { en: "Do you avoid drugs? (formal)", es: "Evita usted las drogas?" },
    { en: "I say no because my health matters", es: "Digo que no porque mi salud importa" }
  ],
  10: [
    { en: "I balance study, sport, and rest", es: "Equilibro estudio, deporte y descanso" },
    { en: "I organise my day carefully", es: "Organizo mi día con cuidado" },
    { en: "I protect my identity online", es: "Protejo mi identidad en línea" },
    { en: "I resist group pressure at parties", es: "Resisto la presión del grupo en las fiestas" },
    { en: "I choose friends who respect me", es: "Elijo amigos que me respetan" },
    { en: "I build self-esteem with good habits", es: "Construyo la autoestima con buenos hábitos" },
    { en: "I make decisions that help my future", es: "Tomo decisiones que ayudan a mi futuro" },
    { en: "Do you support your classmates?", es: "Apoyas a tus compañeros?" },
    { en: "Do you take responsibility? (formal)", es: "Asume usted la responsabilidad?" },
    { en: "I say no because it goes against my values", es: "Digo que no porque va en contra de mis valores" }
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

  // ===================== Compare =====================
  const norm = s => (s||"").trim();
  const endsWithQM = s => norm(s).endsWith("?");
  function core(s){
    let t = norm(s);
    if (t.startsWith("¿")) t = t.slice(1);
    if (t.endsWith("?"))  t = t.slice(0,-1);
    t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    t = t.replace(/ñ/gi, "n");
    return t.replace(/\s+/g," ").toLowerCase();
  }
  function cmpAnswer(user, expected){ if (!endsWithQM(user)) return false; return core(user) === core(expected); }

  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input,onStatus){
    const r=ensureRecognizer(); if(!r){onStatus&&onStatus(false);return;}
    if(recActive){try{r.stop();}catch{} recActive=false; onStatus&&onStatus(false);}
    try{
      r.onresult=e=>{ const txt=(e.results[0]&&e.results[0][0]&&e.results[0][0].transcript)||""; const v=txt.trim(); input.value = v.endsWith("?")?v:(v+"?"); input.dispatchEvent(new Event("input",{bubbles:true})); };
      r.onend=()=>{recActive=false; onStatus&&onStatus(false);};
      recActive=true; onStatus&&onStatus(true); r.start();
    }catch{ onStatus&&onStatus(false); }
  }
  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

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
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const qwrap=$("#questions"); if(!qwrap) return; qwrap.innerHTML="";
    quiz.forEach((q,i)=>{
      const row=document.createElement("div"); row.className="q";

      const p=document.createElement("div"); p.className="prompt"; p.textContent=`${i+1}. ${q.prompt}`;
      const controls=document.createElement("span");
      Object.assign(controls.style,{display:"inline-block",marginLeft:"6px",verticalAlign:"middle"});

      const enBtn=miniBtn("🔈 EN","Read English prompt"); enBtn.onclick=()=>speak(q.prompt,"en-GB");
      const esBtn=miniBtn("🔊 ES","Read Spanish target (uses 1 this attempt)"); esBtn.setAttribute("data-role","es-tts");
      esBtn.onclick=()=>{ if (attemptRemaining()<=0){ updateESButtonsState(qwrap); return; } speak(q.answer,"es-ES"); cheatsUsedThisRound+=1; updateESButtonsState(qwrap); };
      const micBtn=miniBtn("🎤","Dictate into this answer"); micBtn.onclick=()=>{ startDictationFor(input,(on)=>{ micBtn.style.borderColor=on?"#f39c12":"#ddd"; micBtn.style.boxShadow=on?"0 0 0 2px rgba(243,156,18,0.25)":"none"; }); };

      controls.appendChild(enBtn); controls.appendChild(esBtn); controls.appendChild(micBtn); p.appendChild(controls);

      const input=document.createElement("input"); input.type="text"; input.placeholder="Type the Spanish here (must end with ?)";
      input.oninput=e=>{ quiz[i].user=e.target.value; };
      input.addEventListener("keydown",(e)=>{ if(e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ if(e.code==="KeyR"){e.preventDefault();enBtn.click();} else if(e.code==="KeyS"){e.preventDefault();esBtn.click();} else if(e.code==="KeyM"){e.preventDefault();micBtn.click();} }});

      row.appendChild(p); row.appendChild(input); qwrap.appendChild(row);
    });
    updateESButtonsState(qwrap);

    const submit=$("#submit"); if(submit){ submit.disabled=false; submit.textContent="Finish & Check"; submit.onclick=finishAndCheck; }
    const back=$("#back-button"); if(back){ back.style.display="inline-block"; back.onclick=backToLevels; }
  }

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

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

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
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

    renderLevels();
  });
})();
