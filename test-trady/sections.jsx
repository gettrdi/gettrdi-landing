/* global React, Trdi, Logo, ChannelIcon, Icon */
const { useState } = React;

/* ============================================================
   Personality presets — drive the hero voice + Meet section.
   ============================================================ */
const PERSONAS = {
  warm: {
    label: "Warm teammate",
    expr: "warm",
    img: "assets/trdi-warm.webp?q=85",
    headline: "I round up your next pest-control job <mark class='hl'>before the phone even rings.</mark>",
    speech: "G'day! Top lead this week — East Village Thai Kitchen in Manhattan just got flagged in a DOHMH cycle. Pest evidence in the kitchen, no PCO service detected. Want me to pull up Daniel's brief?",
  },
  closer: {
    label: "Sharp closer",
    expr: "closer",
    img: "assets/trdi-closer.webp?q=88",
    headline: "Your competition's guessing. <mark class='hl c'>I already know.</mark>",
    speech: "East Village Thai Kitchen flagged 4M three days ago — rodent evidence in the kitchen and dry storage, no PCO service detected. Pitch is drafted, objections are lined up. Call window is 10AM–1PM — you're walking in prepared.",
  },
  pro: {
    label: "Calm pro",
    expr: "pro",
    img: "assets/trdi-pro.webp?q=85",
    headline: "Every Monday, a ranked list of jobs <mark class='hl t'>worth the drive.</mark>",
    speech: "Top lead this week: East Village Thai Kitchen, Manhattan. DOHMH pest flag, three days ago — kitchen and dry storage. No exterminator on file. Brief and pitch are ready when you are.",
  },
  cheeky: {
    label: "A little cheeky",
    expr: "cheeky",
    img: "assets/trdi-cheeky.webp?q=85",
    headline: "Cold-calling in this economy? <mark class='hl p'>Nah. Leave it with me.</mark>",
    speech: "So East Village Thai Kitchen just got flagged — pest evidence, no exterminator, owner probably not sleeping great right now. You're welcome. Pitch is ready, the window's open — your move.",
  },
};
window.PERSONAS = PERSONAS;

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top" onClick={close}>
          <span className="logo"><Logo size={38} /></span>
          <span className="word">trady</span>
        </a>
        <div className="nav-links">
          <a className="hideSm" href="#how">How it works</a>
          <a className="hideSm" href="#brief">The Monday brief</a>
          <a className="hideSm" href="#knows">What it knows</a>
          <a className="btn sm sun" href="#access"><span className="full">Get early access</span><span className="compact">Early access</span> <span className="arrow">→</span></a>
          <button type="button" className="nav-burger" aria-label="Open menu" aria-expanded={open} aria-controls="nav-mobile" onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div id="nav-mobile" className={"nav-mobile" + (open ? " open" : "")}>
        <a href="#how" onClick={close}>How it works</a>
        <a href="#brief" onClick={close}>The Monday brief</a>
        <a href="#knows" onClick={close}>What it knows</a>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ headline }) {
  const [speaking, setSpeaking] = useState(false);
  const [flying, setFlying] = useState(false); // superman mode
  const [greetPhase, setGreetPhase] = useState("hidden"); // hidden → shown → fading → gone
  const audioRef = React.useRef(null);

  // Greeting: fade in → hold → fade out → collapse
  React.useEffect(() => {
    const t1 = setTimeout(() => setGreetPhase("shown"),   120);
    const t2 = setTimeout(() => setGreetPhase("fading"), 3000);
    const t3 = setTimeout(() => setGreetPhase("gone"),   3900);
    // After greeting collapses, force any still-hidden reveals into view
    const t4 = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 4900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const fly = () => {
    if (flying) return;
    setFlying("out");
    setTimeout(() => setFlying("in"), 900);
    setTimeout(() => setFlying(false), 1700);
  };
  // Preload audio on mount so first tap plays instantly
  React.useEffect(() => {
    const a = new Audio("assets/trdi-voice.mp3");
    a.preload = "auto";
    a.addEventListener("play", () => setSpeaking(true));
    a.addEventListener("ended", () => setSpeaking(false));
    a.addEventListener("pause", () => setSpeaking(false));
    audioRef.current = a;
    return () => { try { a.pause(); } catch (e) {} };
  }, []);
  const speak = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) { a.pause(); a.currentTime = 0; return; }
    a.currentTime = 0;
    a.play().catch(() => setSpeaking(false));
    // scroll to How it works
    const el = document.getElementById("how");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: "smooth" });
  };
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <p className={"hero-greeting greet-" + greetPhase}>G'day, I'm <span className="hero-greeting-name">trady</span></p>
        <div className="hero-copy">
          <h1 className="reveal" data-d="2" dangerouslySetInnerHTML={{ __html: headline }}></h1>
          <p className="hero-sub reveal" data-d="3">
            I'm an AI lead-gen sidekick for pest control operators. I hunt down NYC restaurants and shops with fresh pest trouble, score who needs an exterminator
            <b style={{ color: "var(--accent)", fontWeight: 700 }}> right now</b>, and send the job straight to your phone — so you can stay out in the field.
          </p>
          <div className="hero-cta reveal" data-d="4">
            <a className="btn sun" href="#access">Get early access <span className="arrow">→</span></a>
            <a className="btn ghost" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-mascot reveal" data-d="2">
          <img className={"trdi-img" + (speaking ? " speaking" : "")} src="assets/trdi-hero.webp?q=85" width="720" height="900" fetchpriority="high" loading="eager" alt="trady, the toolbox-headed tradesman bot, waving hello" />
          <button type="button" className={"voice-fab" + (speaking ? " on" : "")} onClick={speak} aria-label={speaking ? "Stop trady's intro" : "Play trady's intro"}>
            <span className="vf-ic">
              {speaking ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5 L19 12 L8 19 Z" /></svg>
              )}
            </span>
            {speaking ? "Playing… tap to stop" : "Hear me say g'day"}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function LdIcon({ n }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const ic = {
    user: <g {...p}><circle cx="12" cy="8" r="3.4" /><path d="M5.5 19.5c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6" /></g>,
    clipboard: <g {...p}><rect x="6" y="4.5" width="12" height="16" rx="2" /><path d="M9 4.5h6v2.4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" /><path d="M9 12h6M9 15.5h4" /></g>,
    check: <g {...p}><rect x="4.5" y="4.5" width="15" height="15" rx="3" /><path d="M8.5 12l2.4 2.4 4.6-4.8" /></g>,
    phone: <g {...p}><path d="M6 4.5h3l1.4 3.6-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 3.6 1.4v3a1.5 1.5 0 0 1-1.6 1.5A14 14 0 0 1 4.5 6.1 1.5 1.5 0 0 1 6 4.5z" /></g>,
    msg: <g {...p}><path d="M5 5.5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3.2V6.5a1 1 0 0 1 1-1z" /></g>,
    mail: <g {...p}><rect x="4.5" y="6" width="15" height="12" rx="1.6" /><path d="M5 7l7 5 7-5" /></g>,
    pin: <g {...p}><path d="M12 19.5c-3.2-3.6-4.8-6.4-4.8-8.5a4.8 4.8 0 0 1 9.6 0c0 2.1-1.6 4.9-4.8 8.5z" /><circle cx="12" cy="11" r="1.9" /></g>,
    globe: <g {...p}><circle cx="12" cy="12" r="7.5" /><path d="M4.5 12h15M12 4.5c2 2.3 3 5 3 7.5s-1 5.2-3 7.5c-2-2.3-3-5-3-7.5s1-5.2 3-7.5z" /></g>,
    instagram: <g {...p}><rect x="4.8" y="4.8" width="14.4" height="14.4" rx="4.2" /><circle cx="12" cy="12" r="3.4" /><circle cx="15.8" cy="8.2" r="0.95" fill="currentColor" stroke="none" /></g>,
    facebook: <g {...p}><path d="M15 6.6c-.5-.13-1.1-.2-1.7-.2-1.4 0-2 .9-2 2.4V19.4" /><path d="M9.6 11.4h5.4" /></g>,
    copy: <g {...p}><rect x="8.5" y="8.5" width="10" height="11" rx="2" /><path d="M5.5 14.5h-.5a1.5 1.5 0 0 1-1.5-1.5V5.5A1.5 1.5 0 0 1 5 4h7.5A1.5 1.5 0 0 1 14 5.5v.5" /></g>,
    arrowR: <g {...p}><path d="M9 6l6 6-6 6" /></g>,
    arrowL: <g {...p}><path d="M15 6l-6 6 6 6" /></g>,
    downArrow: <g {...p}><path d="M12 5v13M7 13l5 5 5-5" /></g>,
  };
  return <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">{ic[n]}</svg>;
}

function HowItWorks() {
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const opener = "Hey Daniel — East Village Thai Kitchen came up in a recent NYC DOHMH cycle with a note around pest evidence in the kitchen and dry storage. We do a same-week pest assessment for restaurants — entry points, drains, storage, prep surfaces. Takes about 30 minutes and gets you ahead of any follow-up visit. Worth booking before the weekend rush?";
  const copyOpener = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(opener).then(done).catch(done);
    else done();
  };
  const signals = [
    { src: "Google Maps", srcCls: "", title: "Pest sighting in recent review", titleCls: "", sub: "Multiple review mentions · recent repeated pattern", age: "7d ago" },
    { src: "NYC Business", srcCls: "", title: "Active listing confirmed", titleCls: "", sub: "Currently operating · owner on record", age: "12d ago" },
    { src: "Yelp", srcCls: "amber", title: "Rodent complaint", titleCls: "amber", sub: "Recent customer review flag · pest category", age: "15d ago" },
    { src: "NYC DOB", srcCls: "", title: "Kitchen equipment permit filed", titleCls: "", sub: "Active renovation · contractor window open", age: "18d ago" },
    { src: "State Registry", srcCls: "ok", title: "Owner identity confirmed", titleCls: "ok", sub: "Decision-maker ID · direct contact match", age: "just now" },
  ];
  const shownSignals = showAll ? signals : signals.slice(0, 2);
  const steps = [
    { n: "1", ic: "watch", h: "I watch the city", p: "311 complaints, DOHMH inspections, DOB permits and fresh Google & Yelp reviews — across every restaurant and commercial kitchen you cover, around the clock." },
    { n: "2", ic: "target", h: "I score who needs you", p: "A failed health inspection. A spike in roach reviews. A new kitchen with no exterminator. I score every signal and surface the most severe, most recent jobs first." },
    { n: "3", ic: "send", h: "I prep the pitch for you", p: "You get the lead, the reason, a ready pitch and every objection handled — so when you make the call, you already know what to say and why it'll land." },
  ];
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker plain">WHAT YOU GET</span>
          <h2>Here's what a trady lead looks like.</h2>
          <p style={{ fontSize: "18px", color: "var(--fg-dim)", margin: "18px 0 0", maxWidth: "56ch" }}>One prepared brief — business profile, reason to call, ready pitch, and every signal behind it. Scroll across to see the full breakdown.</p>
        </div>
        <div className="lead-deep">
          <div className="ld-carousel reveal">
            <button type="button" className="ld-arrow prev" aria-label="Previous" onClick={(e) => { const g = e.currentTarget.parentNode.querySelector(".ld-grid"); g.scrollBy({ left: -g.clientWidth * 0.85, behavior: "smooth" }); }}><span className="ld-arrow-ic"><LdIcon n="arrowL" /></span></button>
            <button type="button" className="ld-arrow next" aria-label="Next" onClick={(e) => { const g = e.currentTarget.parentNode.querySelector(".ld-grid"); g.scrollBy({ left: g.clientWidth * 0.85, behavior: "smooth" }); }}><span className="ld-arrow-ic"><LdIcon n="arrowR" /></span></button>

            <div className="ld-card">
              <div className="ld-grid" data-carousel="true">

                {/* ---- Card 1: Account & Owner ---- */}
                <div className="ld-col">
                  <div className="ld-chead"><span className="ld-chead-ic"><LdIcon n="user" /></span><span className="ld-chead-t">Account &amp; Owner</span></div>

                  <div className="ld-biz">
                    <span className="ld-logo"><b>EV</b><i>THAI</i></span>
                    <div className="ld-biz-meta">
                      <h4>East Village Thai Kitchen</h4>
                      <div className="ld-rate"><span className="stars">★★★★<span className="off">★</span></span> <b>4.2</b> <span className="cnt">(238)</span></div>
                      <div className="ld-type"><span className="dot"></span>Thai restaurant</div>
                      <div className="ld-loc"><span className="ld-loc-ic"><LdIcon n="pin" /></span>Manhattan, NY</div>
                    </div>
                  </div>

                  <span className="ld-lbl">Owners</span>
                  <div className="ld-owner">
                    <img className="ld-av" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=70" width="32" height="32" loading="lazy" alt="" />
                    <div className="ld-owner-meta"><b>Daniel K.</b><span>Owner · Since 2014</span></div>
                  </div>
                  <div className="ld-owner">
                    <img className="ld-av" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=160&q=70" width="32" height="32" loading="lazy" alt="" />
                    <div className="ld-owner-meta"><b>Nana T.</b><span>Co-owner · Since 2018</span></div>
                  </div>

                  <div className="ld-reach ld-pin">
                    <div className="ld-reach-top"><span className="ld-lbl">Ready to reach out</span><span className="ld-reach-ph"><LdIcon n="phone" /></span></div>
                    <h5>Call before lunch</h5>
                    <p>Highest answer-rate window is 10AM–1PM.</p>
                    <div className="ld-btns">
                      <span className="btn sm sun">Call now</span>
                      <span className="btn sm ghost">Send SMS</span>
                    </div>
                    <span className="ld-preview">Preview only — actions live in your account</span>
                  </div>
                </div>

                {/* ---- Card 2: Brief ---- */}
                <div className="ld-col">
                  <div className="ld-chead"><span className="ld-chead-ic"><LdIcon n="clipboard" /></span><span className="ld-chead-t">Brief</span></div>

                  <h4 className="ld-biz-name">East Village Thai Kitchen</h4>
                  <div className="ld-meta"><span className="m-pri">NYC DOHMH</span><span className="m-sep">·</span><span>3d ago</span><span className="m-sep">·</span><span>5 signals</span><span className="m-sep">·</span><span className="m-ok"><span className="dot"></span>High confidence</span></div>

                  <p className="ld-why">A recent pest-related inspection flag creates an immediate outreach window — the owner is aware of the issue and likely receptive to a fast, proactive service offer before the next cycle.</p>

                  <div className="ld-opener">
                    <div className="ld-opener-top"><span className="ld-lbl">Suggested opener</span><span className="ld-opener-r"><span className="ld-sec">28 SEC</span><button type="button" className="ld-copybtn" onClick={copyOpener}>{copied ? <React.Fragment><LdIcon n="check" />Copied</React.Fragment> : <React.Fragment><LdIcon n="copy" />Copy</React.Fragment>}</button></span></div>
                    <blockquote className="ld-quote">“Hey Daniel — East Village Thai Kitchen came up in a recent NYC DOHMH cycle with a note around pest evidence in the kitchen and dry storage. We do a same-week pest assessment for restaurants — entry points, drains, storage, prep surfaces. Takes about 30 minutes and gets you ahead of any follow-up visit. Worth booking before the weekend rush?”</blockquote>
                    <button type="button" className="ld-readmore" onClick={(e) => { const q = e.currentTarget.previousElementSibling; const open = q.classList.toggle("open"); e.currentTarget.innerHTML = open ? 'Show less' : 'Read full opener <span class="rm-arrow">↓</span>'; }}>Read full opener <span className="rm-arrow">↓</span></button>
                  </div>

                  <div className="ld-next ld-pin">
                    <span className="ld-lbl">Next step</span>
                    <p>Lead with the DOHMH cycle, not a complaint — keeps the tone consultative. If no answer, follow with SMS linking your pest assessment page.</p>
                  </div>
                </div>

                {/* ---- Card 3: Sources & Proof ---- */}
                <div className="ld-col">
                  <div className="ld-chead"><span className="ld-chead-ic"><LdIcon n="check" /></span><span className="ld-chead-t">Sources &amp; Proof</span></div>

                  <div className="ld-trigger">
                    <div className="ld-trigger-top"><span className="ld-lbl accent">Primary trigger</span><span className="ld-lbl accent">NYC DOHMH</span></div>
                    <h5>Pest &amp; rodent activity inspection flag</h5>
                    <p>Pest evidence noted in kitchen and dry storage during routine DOHMH cycle filed 3 days ago. Owner is aware and likely receptive to a same-week proactive service offer.</p>
                    <div className="ld-weight"><div className="ld-weight-bar"><i style={{ width: "82%" }}></i></div><span>High signal weight</span></div>
                  </div>

                  <span className="ld-lbl" style={{ marginTop: "4px" }}>Corroborating signals</span>
                  <ul className="ld-sig">
                    {shownSignals.map((sg, i) => (
                      <li key={i}>
                        <span className={"sig-src" + (sg.srcCls ? " " + sg.srcCls : "")}>{sg.src}</span>
                        <div className="sig-body"><b className={sg.titleCls || undefined}>{sg.title}</b><span>{sg.sub}</span></div>
                        <span className="sig-age">{sg.age}</span>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="ld-seeall ld-pin" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>{showAll ? "Show fewer signals" : "See all 5 signals"}</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* bridge into steps */}
        <div className="how-bridge reveal">
          <span className="kicker plain">HOW I BUILD THESE</span>
          <h3>Three things that happen before you see a lead.</h3>
        </div>

        <div className="steps" data-carousel="true">
          {steps.map((s, i) => (
            <div className="step reveal" data-d={i + 1} key={s.n}>
              <div className="step-ic"><Icon name={s.ic} /></div>
              <div className="num">Step {s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- THE MONDAY BRIEF ---------------- */
function MondayBrief() {
  const pts = [
    { h: "Ranked by severity & recency", p: "The worst, freshest pest problems first — not a random dump of names." },
    { h: "Why now, in one line", p: "The exact signal — a failed inspection, a roach review — that means this kitchen needs you this week." },
    { h: "A pitch, ready to send", p: "Written in your voice, with the objections lined up and answered before they're raised." },
    { h: "Signal-backed, not guesswork", p: "Every lead is tied to a real, dateable event — an inspection flag, a 311 complaint, a review spike. No cold lists, no stale data." },
  ];
  const ptsRef = React.useRef(null);

  // auto-scroll ticker — smooth rAF, no scroll-snap fighting
  React.useEffect(() => {
    const el = ptsRef.current;
    if (!el) return;
    if (window.innerWidth > 820) return; // desktop: no ticker
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    let touching = false;
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", () => { touching = true; paused = true; }, { passive: true });
    el.addEventListener("touchmove", () => { pos = el.scrollLeft; }, { passive: true });
    el.addEventListener("touchend", () => { touching = false; pos = el.scrollLeft; setTimeout(() => { if (!touching) resume(); }, 2200); });

    let pos = 0;
    let lastT = null;
    const SPEED = 21; // px per second
    let raf;
    const step = (t) => {
      if (!paused && lastT !== null) {
        pos += SPEED * (t - lastT) / 1000;
        const max = el.scrollWidth - el.clientWidth;
        if (pos >= max) pos = 0;
        el.scrollLeft = pos;
      }
      lastT = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);
  return (
    <section className="sec alt" id="brief">
      <div className="wrap">
        <div className="brief-grid">
          <div className="reveal">
            <span className="kicker plain">HOW IT REACHES YOU</span>
            <h2 style={{ fontSize: "clamp(30px,4.4vw,52px)", marginTop: "16px" }}>Your whole week of work, in one Monday email.</h2>
            <ul className="brief-pts" ref={ptsRef} style={{ marginTop: "22px" }}>
              {pts.map((p, i) => (
                <li key={i} className="reveal" data-d={i + 1}>
                  <span className="tick">✓</span>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="brief-card reveal" data-d="1">
            <div className="email-toolbar">
              <span className="et-left"><span className="et-ic"><LdIcon n="arrowL" /></span>Inbox</span>
              <span className="et-right"><span className="et-ic"><LdIcon n="mail" /></span><span className="et-ic"><LdIcon n="copy" /></span></span>
            </div>
            <div className="email-subject-row">
              <h4>Your 6 leads for the week · East Village Thai Kitchen is first 🔥</h4>
              <span className="email-star">★</span>
            </div>
            <div className="email-head">
              <span className="email-av"><Logo size={38} /></span>
              <div className="email-meta">
                <div className="email-from"><b>trady</b> <span className="email-addr">&lt;briefs@gettrady.com&gt;</span></div>
                <div className="email-to">to me <span className="email-caret">▾</span></div>
              </div>
              <span className="email-time">Mon 7:00 AM</span>
            </div>
            <div className="email-body">
              <p className="email-greet">Morning — 6 fresh leads this week, ranked by signal strength. East Village Thai Kitchen is your best call first. 👇</p>

              <p className="lead-num">Lead 1 of 6 <span className="lead-num-tag">HOT</span></p>
              <div className="lead">
                <div className="lead-head">
                  <span className="name">East Village Thai Kitchen · Manhattan</span>
                  <span className="score">HOT · 94</span>
                </div>
                <div className="lead-row">
                  <span className="k">Why now</span>
                  <span className="v">DOHMH inspection flag 4M filed 3 days ago — rodent evidence in kitchen &amp; dry storage, <b>no PCO service detected</b>.</span>
                </div>
                <div className="lead-row">
                  <span className="k">Signal</span>
                  <span className="v">2 Google reviews mention pests this month · 311 rodent complaint filed last week.</span>
                </div>
                <div className="lead-row">
                  <span className="k">Pitch</span>
                  <span className="v">"Hey Daniel — saw the DOHMH flag. We do a same-week assessment for restaurants. 30 minutes, gets you ahead of the next cycle."</span>
                </div>
                <div className="lead-row">
                  <span className="k">Objection</span>
                  <span className="v">"We've got a guy." → "Happy to second-opinion it free — your letter grade's on the line."</span>
                </div>
                <div className="lead-cta">
                  <a href="#access" className="btn sm sun">📞 Call Daniel now</a>
                </div>
              </div>

              <p className="lead-num" style={{ marginTop: "14px" }}>Lead 2 of 6</p>
              <div className="lead lead-peek">
                <div className="lead-head">
                  <span className="name">Midtown Sushi Bar · Midtown</span>
                  <span className="score">WARM · 81</span>
                </div>
                <div className="lead-row">
                  <span className="k">Why now</span>
                  <span className="v">311 rat complaint filed 5 days ago — <b>no PCO service detected</b>.</span>
                </div>
              </div>

              <p className="email-more">+ 4 more leads in the full brief</p>
              <p className="email-sign">Cheers,<br /><b>trady</b> — your lead-gen sidekick</p>
              <div className="brief-actions">
                <span className="brief-preview">Sample brief — actions go live in your account</span>
              </div>
            </div>
          </div>
        </div>

        <div className="brief-modes reveal">
          <span className="kicker plain">HOW THE WORK REACHES YOU</span>
          <div className="modes-row">
            <div className="mode">
              <span className="mode-ic email"><ChannelIcon type="email" /></span>
              <div className="mode-t"><b>The Monday brief</b><span>A ranked email, every week</span></div>
            </div>
            <div className="mode">
              <span className="mode-ic text"><ChannelIcon type="text" /></span>
              <div className="mode-t"><b>A text for the hot ones</b><span>Urgent leads, the moment they land</span></div>
            </div>
            <div className="mode">
              <span className="mode-ic phone"><ChannelIcon type="phone" /></span>
              <div className="mode-t"><b>You make the call</b><span>Pitch ready, objections handled, timing noted</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHAT trady KNOWS ---------------- */
function Knows() {
  const cards = [
    { badge: "CODES", ic: "codes", h: "I speak DOHMH", p: "04K, 4M and every DOHMH violation code — decoded with severity, re-grade windows, and what it means for you.", stat: "80+", unit: "codes indexed" },
    { badge: "311", ic: "block", h: "I read the complaints", p: "Rat and roach 311 spikes across addresses, BINs and blocks — not just one stray ticket.", stat: "27,000+", unit: "NYC restaurants tracked" },
    { badge: "REVIEWS", ic: "review", h: "I read the reviews", p: "A Google or Yelp review moaning about mice is a kitchen in trouble — and a job waiting for you.", stat: "24/7", unit: "review listening" },
    { badge: "PERMITS", ic: "permit", h: "New kitchens, new pests", p: "Fresh restaurant + reno permits flag commercial kitchens about to need an exterminator.", stat: "Daily", unit: "permit sync" },
  ];
  return (
    <section className="sec" id="knows">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker plain">WHAT I KNOW</span>
          <h2>NYC-specific. Not generic pest trivia.</h2>
          <p>I was built on the data that actually predicts a pest-control job in this city.</p>
        </div>
        <div className="knows-grid" data-carousel="true">
          {cards.map((c, i) => (
            <div className={"know k" + i + " reveal"} data-d={(i % 4) + 1} key={c.badge}>
              <div className="know-ic"><Icon name={c.ic} /></div>
              <span className="badge">MOD · {c.badge}</span>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
              <div className="stat">{c.stat}<small>{c.unit}</small></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MEET trady (personality) ---------------- */
function MeetTrdi({ initial, hat }) {
  const order = ["warm", "closer", "pro", "cheeky"];
  const [k, setK] = useState(initial || "warm");
  const traitsRef = React.useRef(null);
  const p = PERSONAS[k];

  const pickTrait = (id) => {
    setK(id);
    const idx = order.indexOf(id);
    const container = traitsRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    if (idx === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll so the 4th button peeks ~32px from the right edge
      const buttons = container.querySelectorAll(".trait-btn");
      const last = buttons[buttons.length - 1];
      if (last) {
        const peek = last.offsetLeft - container.clientWidth + last.offsetWidth + 32;
        container.scrollTo({ left: Math.max(0, peek), behavior: "smooth" });
      }
    }
  };
  return (
    <section className="sec alt" id="meet">
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: "820px" }}>
          <span className="kicker plain">MEET trady</span>
          <h2>Pick the personality. Same homework underneath.</h2>
          <p>I'll be straight — I'm not a local. I just read every inspection, 311 complaint and review in the five boroughs so you don't have to. Warm teammate or sharp closer, you set the tone — or skip the reading and call me to talk a lead through. Tap to hear me.</p>
        </div>
        <div className="meet-grid">
          <div className="meet-stage reveal">
            <img className="trdi-img" src={p.img || "assets/trdi-character.webp?q=85"} width="720" height="900" loading="lazy" alt={"trady in " + p.label.toLowerCase() + " mode"} key={k} />
          </div>
          <div className="reveal" data-d="1">
            <div className="traits" ref={traitsRef}>
              {order.map((id) => (
                <button key={id} className={"trait-btn" + (id === k ? " on" : "")} onClick={() => pickTrait(id)}>
                  {PERSONAS[id].label}
                </button>
              ))}
            </div>
            <div className="speech">
              <div className="q">“{p.speech}”</div>
              <div className="who">trady · {p.label.toLowerCase()} mode</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- VERSUS ---------------- */
function Versus() {
  const [flying, setFlying] = React.useState(false);
  const flyIt = () => {
    if (flying) return;
    setFlying("out");
    setTimeout(() => setFlying("in"), 900);
    setTimeout(() => setFlying(false), 1700);
  };
  const rows = [
    ["Tells you which restaurants need you this week", "yes", "no"],
    ["Reads inspections, 311 + reviews", "yes", "no"],
    ["Writes the pitch — objections and all", "yes", "no"],
    ["Validates the lead before you call", "yes", "no"],
    ["Hours of your week it eats", "Zero", "5–10 hrs"],
    ["Lead quality", "Qualified + timed", "Cold / stale"],
  ];
  return (
    <section className="sec" id="versus">
      <div className="wrap">
        <div className="vs-head reveal">
          <div className="vs-head-txt">
            <span className="kicker plain">THE DIFFERENCE</span>
            <h2>trady vs. buying lists &amp; cold-calling</h2>
            <p>One does the homework, shows up first and never gets tired. The other's a stale spreadsheet and a sore ear.</p>
          </div>
          <img className={"vs-hero-img" + (flying ? " fly-" + flying : "")} src="assets/trdi-hero-cape.webp?q=85" width="720" height="900" loading="lazy" alt="trady flying in like a hero, cape and all" onClick={flyIt} style={{ cursor: "pointer" }} />
        </div>
        <div className="vs reveal" data-d="1">
          <div className="vs-row head">
            <div></div>
            <div className="you">trady</div>
            <div>Lists &amp; cold calls</div>
          </div>
          {rows.map((r, i) => (
            <div className="vs-row" key={i}>
              <div className="rl">{r[0]}</div>
              <div className="you">{r[1] === "yes" ? <span className="yes">● Yes</span> : <b>{r[1]}</b>}</div>
              <div>{r[2] === "no" ? <span className="no">— No</span> : <span className="dim">{r[2]}</span>}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA({ expr, hat, img }) {
  const [ok, setOk] = useState(false);
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function submit(e) {
    e.preventDefault();
    const v = val.trim();
    if (!emailRe.test(v)) { setErr("That doesn't look like an email — mind checking it?"); return; }
    setErr(""); setBusy(true);
    setTimeout(() => { setBusy(false); setOk(true); }, 850);
  }
  return (
    <section className="sec" id="access">
      <div className="wrap">
        <div className="cta-panel reveal">
          <div className="cta-grid">
            <div>
              <span className="kicker on-dark"><span className="dot"></span>STATUS: STANDING BY</span>
              <h2 style={{ marginTop: "16px" }}>Let me fill your calendar.</h2>
              <p className="cta-sub">We're onboarding NYC pest-control operators now, across all five boroughs — Chicago, Miami, SF and LA next. Drop your email and I'll reach out.</p>
              {!ok ? (
                <form className="cta-form" onSubmit={submit} noValidate>
                  <label className="sr-only" htmlFor="cta-email">Your email address</label>
                  <input
                    id="cta-email" type="email" inputMode="email" autoComplete="email"
                    className={err ? "invalid" : ""}
                    aria-invalid={err ? "true" : "false"}
                    aria-describedby={err ? "cta-err" : undefined}
                    placeholder="you@yourshop.com" value={val}
                    onChange={(e) => { setVal(e.target.value); if (err) setErr(""); }}
                  />
                  <button className="btn sun" type="submit" disabled={busy}>
                    {busy ? "Sending…" : <React.Fragment>Get early access <span className="arrow">→</span></React.Fragment>}
                  </button>
                </form>
              ) : (
                <p className="cta-ok">✓ You're on the list. I'll be in touch — by email, fittingly.</p>
              )}
              {!ok && err && <p className="cta-err" id="cta-err" role="alert">{err}</p>}
              {!ok && !err && <p className="cta-note">No credit card. Claim shared leads, or lock down a whole neighborhood or borough exclusively.</p>}
            </div>
            <div className="cta-trdi"><img className="trdi-img" src="assets/trdi-calendar.webp?q=85" width="720" height="900" loading="lazy" alt="trady holding a calendar, ready to book your jobs" /></div>
          </div>

          <div className="cta-reviews">
            <span className="cta-reviews-lbl">What a first month looks like</span>
            <div className="cta-reviews-grid" data-carousel="true">
              {[
                {
                  n: "1",
                  tag: "WEEK 1",
                  q: "Your first Monday brief lands two qualified jobs by Wednesday — both failed inspections you'd never have found on your own.",
                  stage: "The first brief",
                },
                {
                  n: "2",
                  tag: "WEEK 2",
                  q: "A validated lead means the job's confirmed before you drive — no wasted trips to a kitchen that's already sorted it.",
                  stage: "Validated leads",
                },
                {
                  n: "4",
                  tag: "WEEK 4",
                  q: "No more Sundays buried in 311. You read the brief, hit the road, and book the work.",
                  stage: "A full route",
                },
              ].map((r, i) => (
                <figure className="cta-review reveal" data-d={i + 1} key={r.n}>
                  <div className="rv-week">{r.tag}</div>
                  <blockquote>{r.q}</blockquote>
                  <figcaption>
                    <span className="rv-av">{r.n}</span>
                    <span className="rv-meta">
                      <b>{r.stage}</b>
                      <span>Across the five boroughs</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brand" href="#top"><span className="logo"><Logo size={36} /></span><span className="word">trady</span></a>
            <p>I hustle up pest-control jobs while you're out on the job.</p>
          </div>
          <img className="foot-trdi" src="assets/trdi-reading.webp?q=85" width="1200" height="600" loading="lazy" alt="trady kicking back with a book, reading up on the city's inspections" />
          <div className="foot-links">
            <a href="#how">How it works</a>
            <a href="#brief">Monday brief</a>
            <a href="#knows">What it knows</a>
            <a href="#access">Early access</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 trady — made for NYC operators.</span>
          <span>built for roaches, rats &amp; city bureaucracy.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, HowItWorks, MondayBrief, Knows, MeetTrdi, Versus, CTA, Footer });
