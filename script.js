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
 const PRESENT = {
  1: [
    { en: "I am Irish.", es: "Soy irlandés." },
    { en: "I am a student.", es: "Soy estudiante." },
    { en: "I live in Dublin.", es: "Vivo en Dublín." },
    { en: "I live with my family.", es: "Vivo con mi familia." },
    { en: "Do you have a pet?", es: "Tienes una mascota?" },
    { en: "I do not have brothers.", es: "No tengo hermanos." },
    { en: "Do you have sisters?", es: "Tienes hermanas?" },
    { en: "I am sixteen years old.", es: "Tengo dieciséis años." },
    { en: "What is your name?", es: "Cómo te llamas?" },
    { en: "My name is Daniel.", es: "Me llamo Daniel." },
    { en: "I like music.", es: "Me gusta la música." },
    { en: "I do not like coffee.", es: "No me gusta el café." },
    { en: "Do you like football?", es: "Te gusta el fútbol?" },
    { en: "Where are you from?", es: "De dónde eres?" },
    { en: "I am from Ireland.", es: "Soy de Irlanda." },
    { en: "Do you speak Spanish?", es: "Hablas español?" }
  ],
  2: [
    { en: "I get up at seven.", es: "Me levanto a las siete." },
    { en: "Do you get up early?", es: "Te levantas temprano?" },
    { en: "I do not get up late.", es: "No me levanto tarde." },
    { en: "I have a quick shower.", es: "Me ducho rápido." },
    { en: "Do you take a shower in the morning?", es: "Te duchas por la mañana?" },
    { en: "I brush my teeth.", es: "Me cepillo los dientes." },
    { en: "I get dressed quickly.", es: "Me visto rápidamente." },
    { en: "I prepare my bag.", es: "Preparo mi mochila." },
    { en: "Do you make your bed?", es: "Haces la cama?" },
    { en: "I do not make the bed.", es: "No hago la cama." },
    { en: "I help in the kitchen.", es: "Ayudo en la cocina." },
    { en: "Do you help at home?", es: "Ayudas en casa?" },
    { en: "I feed the dog.", es: "Doy de comer al perro." },
    { en: "I talk with my mum.", es: "Hablo con mi madre." },
    { en: "Do you talk with your dad?", es: "Hablas con tu padre?" },
    { en: "I check my phone.", es: "Reviso el móvil." }
  ],
  3: [
    { en: "I eat breakfast at home.", es: "Desayuno en casa." },
    { en: "I drink tea and eat toast.", es: "Bebo té y como tostadas." },
    { en: "Do you eat cereal?", es: "Comes cereales?" },
    { en: "I do not drink coffee in the morning.", es: "No bebo café por la mañana." },
    { en: "What do you eat for breakfast?", es: "Qué desayunas?" },
    { en: "I prefer fruit.", es: "Prefiero la fruta." },
    { en: "I sometimes skip breakfast.", es: "A veces me salto el desayuno." },
    { en: "Do you eat with your family?", es: "Desayunas con tu familia?" },
    { en: "I prepare a smoothie.", es: "Preparo un batido." },
    { en: "I set the table.", es: "Pongo la mesa." },
    { en: "I do not have much time.", es: "No tengo mucho tiempo." },
    { en: "Do you wash the dishes?", es: "Lavas los platos?" },
    { en: "I wash the dishes quickly.", es: "Lavo los platos rápidamente." },
    { en: "I clean the kitchen a little.", es: "Limpio un poco la cocina." },
    { en: "I leave the house at eight.", es: "Salgo de casa a las ocho." },
    { en: "Do you leave earlier?", es: "Sales más temprano?" }
  ],
  4: [
    { en: "I go to school by bus.", es: "Voy al colegio en autobús." },
    { en: "I walk when it is sunny.", es: "Camino cuando hace sol." },
    { en: "Do you go by car?", es: "Vas en coche?" },
    { en: "I do not go by train.", es: "No voy en tren." },
    { en: "How do you go to school?", es: "Cómo vas al colegio?" },
    { en: "The journey is short.", es: "El viaje es corto." },
    { en: "I listen to music on the way.", es: "Escucho música por el camino." },
    { en: "I chat with friends on the bus.", es: "Charlo con amigos en el autobús." },
    { en: "Do you use your phone?", es: "Usas el móvil?" },
    { en: "I do not use it much.", es: "No lo uso mucho." },
    { en: "I arrive at school at half eight.", es: "Llego al colegio a las ocho y media." },
    { en: "Do you arrive late sometimes?", es: "Llegas tarde a veces?" },
    { en: "I wait at the bus stop.", es: "Espero en la parada de autobús." },
    { en: "I cross the street carefully.", es: "Cruzo la calle con cuidado." },
    { en: "I meet my best friend at the gate.", es: "Quedo con mi mejor amigo en la puerta." },
    { en: "Do you carry many books?", es: "Llevas muchos libros?" }
  ],
  5: [
    { en: "I start classes at nine.", es: "Empiezo las clases a las nueve." },
    { en: "Do you study Spanish?", es: "Estudias español?" },
    { en: "I like Spanish a lot.", es: "Me gusta mucho el español." },
    { en: "I do not like Maths.", es: "No me gustan las matemáticas." },
    { en: "Which subject do you prefer?", es: "Qué asignatura prefieres?" },
    { en: "I have six classes every day.", es: "Tengo seis clases cada día." },
    { en: "I take notes in a notebook.", es: "Tomo apuntes en un cuaderno." },
    { en: "Do you pay attention in class?", es: "Prestas atención en clase?" },
    { en: "I ask questions when I do not understand.", es: "Hago preguntas cuando no entiendo." },
    { en: "I participate in class.", es: "Participo en clase." },
    { en: "I do not forget my homework.", es: "No olvido los deberes." },
    { en: "Do you use a laptop at school?", es: "Usas un portátil en el colegio?" },
    { en: "I work well in a team.", es: "Trabajo bien en equipo." },
    { en: "I respect my teachers.", es: "Respeto a mis profesores." },
    { en: "Do you enjoy learning?", es: "Disfrutas aprender?" },
    { en: "I prefer practical activities.", es: "Prefiero actividades prácticas." }
  ],
  6: [
    { en: "I eat lunch at one o'clock.", es: "Como a la una." },
    { en: "Do you eat in the canteen?", es: "Comes en el comedor?" },
    { en: "I bring a packed lunch.", es: "Llevo un almuerzo de casa." },
    { en: "I do not buy food at school.", es: "No compro comida en el colegio." },
    { en: "I drink water with lunch.", es: "Bebo agua con la comida." },
    { en: "Do you eat fruit every day?", es: "Comes fruta todos los días?" },
    { en: "I share snacks with friends.", es: "Comparto meriendas con amigos." },
    { en: "I prefer a sandwich.", es: "Prefiero un bocadillo." },
    { en: "I avoid junk food.", es: "Evito la comida basura." },
    { en: "Do you have allergies?", es: "Tienes alergias?" },
    { en: "I eat vegetarian food sometimes.", es: "Como comida vegetariana a veces." },
    { en: "I do not drink fizzy drinks.", es: "No bebo refrescos." },
    { en: "Do you finish lunch quickly?", es: "Terminas de comer rápido?" },
    { en: "I tidy the table after eating.", es: "Recojo la mesa después de comer." },
    { en: "I wash my hands before eating.", es: "Me lavo las manos antes de comer." },
    { en: "Do you queue for the canteen?", es: "Haces cola para el comedor?" }
  ],
  7: [
    { en: "I do my homework in the evening.", es: "Hago los deberes por la tarde." },
    { en: "Do you study every day?", es: "Estudias todos los días?" },
    { en: "I study for two hours.", es: "Estudio durante dos horas." },
    { en: "I do not procrastinate.", es: "No procrastino." },
    { en: "I revise for tests.", es: "Repaso para los exámenes." },
    { en: "Do you use online resources?", es: "Usas recursos en línea?" },
    { en: "I ask for help when I need it.", es: "Pido ayuda cuando la necesito." },
    { en: "I do not copy homework.", es: "No copio los deberes." },
    { en: "I prepare my bag for tomorrow.", es: "Preparo mi mochila para mañana." },
    { en: "Do you plan your week?", es: "Planificas tu semana?" },
    { en: "I organise my notes.", es: "Organizo mis apuntes." },
    { en: "I take regular breaks.", es: "Hago descansos regulares." },
    { en: "Do you study with friends?", es: "Estudias con amigos?" },
    { en: "I improve little by little.", es: "Mejoro poco a poco." },
    { en: "I do not use my phone while studying.", es: "No uso el móvil mientras estudio." },
    { en: "Do you highlight key points?", es: "Subrayas las ideas clave?" }
  ],
  8: [
    { en: "I help at home after school.", es: "Ayudo en casa después del colegio." },
    { en: "I set the table for dinner.", es: "Pongo la mesa para la cena." },
    { en: "Do you cook sometimes?", es: "Cocinas a veces?" },
    { en: "I do not cook very well.", es: "No cocino muy bien." },
    { en: "I tidy my room on weekdays.", es: "Ordeno mi habitación entre semana." },
    { en: "Do you take out the rubbish?", es: "Sacas la basura?" },
    { en: "I look after my little brother.", es: "Cuido de mi hermano pequeño." },
    { en: "I do not argue with my parents.", es: "No discuto con mis padres." },
    { en: "I play with my dog in the garden.", es: "Juego con mi perro en el jardín." },
    { en: "Do you water the plants?", es: "Riegas las plantas?" },
    { en: "I clean the bathroom at the weekend.", es: "Limpio el baño el fin de semana." },
    { en: "I sweep the floor.", es: "Barro el suelo." },
    { en: "Do you iron your clothes?", es: "Planchas la ropa?" },
    { en: "I fold my clothes.", es: "Doblo mi ropa." },
    { en: "I do not break house rules.", es: "No rompo las reglas de la casa." },
    { en: "Do you walk the dog every day?", es: "Paseas al perro todos los días?" }
  ],
  9: [
    { en: "I relax after dinner.", es: "Me relajo después de cenar." },
    { en: "I watch a series with my family.", es: "Veo una serie con mi familia." },
    { en: "Do you read before bed?", es: "Lees antes de acostarte?" },
    { en: "I do not watch TV for many hours.", es: "No veo la tele muchas horas." },
    { en: "I chat with friends online.", es: "Charlo con amigos en línea." },
    { en: "Do you play video games at night?", es: "Juegas a los videojuegos por la noche?" },
    { en: "I listen to music to relax.", es: "Escucho música para relajarme." },
    { en: "I do not go out on school nights.", es: "No salgo entre semana." },
    { en: "I prepare my uniform.", es: "Preparo mi uniforme." },
    { en: "Do you check your timetable?", es: "Revisas tu horario?" },
    { en: "I pack my lunch for tomorrow.", es: "Preparo el almuerzo para mañana." },
    { en: "I speak with my parents about my day.", es: "Hablo con mis padres sobre mi día." },
    { en: "Do you switch off your phone?", es: "Apagas el móvil?" },
    { en: "I do not use screens after ten.", es: "No uso pantallas después de las diez." },
    { en: "I brush my teeth again.", es: "Me cepillo los dientes otra vez." },
    { en: "Do you set an alarm?", es: "Pones una alarma?" }
  ],
  10: [
    { en: "I go to bed at half ten.", es: "Me acuesto a las diez y media." },
    { en: "Do you fall asleep quickly?", es: "Te duermes rápido?" },
    { en: "I do not sleep badly.", es: "No duermo mal." },
    { en: "I need eight hours of sleep.", es: "Necesito ocho horas de sueño." },
    { en: "Do you follow a healthy routine?", es: "Sigues una rutina saludable?" },
    { en: "I balance school and hobbies.", es: "Equilibro el colegio y los pasatiempos." },
    { en: "I take care of my mental health.", es: "Cuido mi salud mental." },
    { en: "Do you manage your time well?", es: "Organizas bien tu tiempo?" },
    { en: "I try to improve every day.", es: "Intento mejorar cada día." },
    { en: "I do not waste time at night.", es: "No pierdo el tiempo por la noche." },
    { en: "Do you prepare goals for tomorrow?", es: "Preparas objetivos para mañana?" },
    { en: "I am happy with my routine.", es: "Estoy contento con mi rutina." },
    { en: "Do you feel ready for school?", es: "Te sientes listo para el colegio?" },
    { en: "I thank my parents for their help.", es: "Agradezco a mis padres su ayuda." },
    { en: "I do not forget my responsibilities.", es: "No olvido mis responsabilidades." },
    { en: "Do you finish the day proud of yourself?", es: "Terminas el día orgulloso de ti mismo?" }
  ]
};

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
