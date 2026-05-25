(function () {

  // ── Scroll animations (IntersectionObserver) ──
  (function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animatedEls = document.querySelectorAll('.motion-fade-up, .motion-scale, .motion-drift');
    if (prefersReducedMotion) {
      animatedEls.forEach(function(el) { el.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    animatedEls.forEach(function(el) { observer.observe(el); });
  })();

  const leads = [
    {
      rank: "#1",
      account: "East Village Thai Kitchen",
      context: "A recent pest-related inspection flag creates an immediate outreach window \u2014 the owner is aware of the issue and likely receptive to a fast, proactive service offer before the next cycle.",
      opener: "\u201cHey Daniel \u2014 East Village Thai Kitchen came up in a recent NYC DOHMH cycle with a note around pest evidence in the kitchen and dry storage. We do a same-week pest assessment for restaurants \u2014 entry points, drains, storage, prep surfaces. Takes about 30 minutes and gets you ahead of any follow-up visit. Worth booking before the weekend rush?\u201d",
      signal: "NYC DOHMH inspection flag \u2014 pest evidence in kitchen and dry storage, filed 3 days ago.",
      angle: "Lead with the DOHMH cycle, not a complaint \u2014 keeps the tone consultative.",
      next: "Lead with the DOHMH cycle. If no answer, follow with SMS linking your pest assessment page."
    },
    {
      rank: "#2",
      account: "Brooklyn Mini Market",
      context: "A recurring odor and cleanliness pattern across recent Yelp reviews creates a credible outreach window \u2014 the owner likely knows about the complaints and is open to a proactive fix before the pattern escalates.",
      opener: "\u201cHey \u2014 Brooklyn Mini Market has had a few Yelp mentions lately around odor and back-room cleanliness. We do a quick stock-room pest-risk check for corner stores \u2014 shelving, rear storage, delivery entry, and waste area. Takes about 20 minutes and gives you something concrete to act on. Worth scheduling this week?\u201d",
      signal: "Yelp review pattern \u2014 recurring odor and back-room cleanliness mentions across 3 recent reviews.",
      angle: "Lead with the review pattern as context, not as a complaint \u2014 position it as staying ahead.",
      next: "Call the owner before noon, reference the review pattern, and offer a 20-minute stock-room walkthrough."
    },
    {
      rank: "#3",
      account: "Bronx Multifamily",
      context: "Repeated tenant complaints suggest a building-level issue rather than isolated unit problems \u2014 a strong case to contact the property manager with a common-area inspection angle before it escalates.",
      opener: "\u201cHi \u2014 we flagged a pattern of tenant complaints at the Bronx property around pest and sanitation issues. We do a common-area pest-risk check for multifamily buildings \u2014 trash rooms, basements, entry points, and shared corridors. Usually takes about 45 minutes and gives you a documented sweep to share with tenants. Should I send some availability for this week?\u201d",
      signal: "Repeat tenant complaints \u2014 building-level pest and sanitation pattern flagged across multiple units.",
      angle: "Lead with the building-level pattern, not individual complaints \u2014 positions you as solving the root cause.",
      next: "Call the property manager directly, ask for building access, and propose a shared-area walkthrough."
    }
  ];

  const testimonials = [
    {
      name: "Pest control operator",
      role: "Beta discovery call \u2014 NYC",
      quote: "\u201cIf the account comes with the reason to call and the opening line, I would test this before giving another rep a random lead list.\u201d"
    },
    {
      name: "Commercial cleaning owner",
      role: "Beta discovery call \u2014 Austin",
      quote: "\u201cI do not need another dashboard. I need a weekly list my admin can work through with context and a decent pitch.\u201d"
    },
    {
      name: "Property maintenance contractor",
      role: "Beta discovery call \u2014 New Jersey",
      quote: "\u201cThe useful part is not the business name. It is knowing why now, who to call, and what problem to lead with.\u201d"
    }
  ];

  // ── Lead tabs ──
  let leadIndex = 0;
  const tabs     = Array.from(document.querySelectorAll(".lead-tab-btn"));
  const leadDots = Array.from(document.querySelectorAll(".lead-dot"));
  const leadEls = {
    account: document.getElementById("lead-account"),
    context: document.getElementById("lead-context"),
    opener: document.getElementById("lead-opener"),
    dashboardOpener: document.getElementById("dashboard-opener-quote"),
    rank: document.getElementById("lead-rank"),
    signal: document.getElementById("lead-signal"),
    angle: document.getElementById("lead-angle"),
    next: document.getElementById("lead-next-step")
  };
  const mobileLeadCurrent = document.getElementById("mobile-lead-current");
  const mobileLeadTotal = document.getElementById("mobile-lead-total");

  function renderLead(index) {
    leadIndex = (index + leads.length) % leads.length;
    const lead = leads[leadIndex];
    if (!lead) return;
    if (leadEls.account) leadEls.account.textContent = lead.account;
    if (leadEls.context) leadEls.context.textContent = lead.context;
    if (leadEls.opener) leadEls.opener.textContent = lead.opener;
    if (leadEls.rank) leadEls.rank.textContent = lead.rank;
    if (leadEls.signal) leadEls.signal.textContent = lead.signal;
    if (leadEls.angle) leadEls.angle.textContent = lead.angle;
    if (leadEls.next) leadEls.next.textContent = lead.next;
    if (leadEls.dashboardOpener) leadEls.dashboardOpener.textContent = lead.opener;
    if (mobileLeadCurrent) mobileLeadCurrent.textContent = "Lead " + (leadIndex + 1);
    if (mobileLeadTotal) mobileLeadTotal.textContent = leads.length;
    tabs.forEach((tab, i) => {
      const isActive = i === leadIndex;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    leadDots.forEach((dot, i) => {
      const isActive = i === leadIndex;
      dot.classList.toggle("lead-dot--active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  tabs.forEach((tab, index) => tab.addEventListener("click", () => renderLead(index)));
  leadDots.forEach((dot, index) => dot.addEventListener("click", () => renderLead(index)));
  const prevLead = document.getElementById("lead-prev");
  const nextLead = document.getElementById("lead-next");
  if (prevLead) prevLead.addEventListener("click", () => renderLead(leadIndex - 1));
  if (nextLead) nextLead.addEventListener("click", () => renderLead(leadIndex + 1));

  (function initLeadSwipe() {
    const card = document.querySelector(".lead-detail-card");
    if (!card) return;
    let touchStartX = 0;
    let touchStartY = 0;

    const hint = card.querySelector(".swipe-hint");
    let hintDismissed = false;

    function dismissHint() {
      if (!hint || hintDismissed) return;
      hintDismissed = true;
      hint.classList.remove("swipe-hint--active");
    }

    if (hint && !localStorage.getItem("swipeHintSeen") && window.matchMedia("(max-width:767px)").matches) {
      function activateHint() {
        hint.classList.add("swipe-hint--active");
        localStorage.setItem("swipeHintSeen", "1");
        hint.addEventListener("animationend", dismissHint, { once: true });
      }
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            activateHint();
          }
        }, { threshold: 0.5 });
        observer.observe(card);
      } else {
        activateHint();
      }
    }

    card.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      dismissHint();
    }, { passive: true });
    card.addEventListener("touchend", function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) { renderLead(leadIndex + 1); } else { renderLead(leadIndex - 1); }
      }
    }, { passive: true });
  })();

  // ── Testimonials ──
  let testimonialIndex = 0;
  const testimonialEls = {
    quote: document.getElementById("testimonial-quote"),
    name: document.getElementById("testimonial-name"),
    role: document.getElementById("testimonial-role"),
    count: document.getElementById("testimonial-count")
  };

  function renderTestimonial(index) {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    const t = testimonials[testimonialIndex];
    if (!t) return;
    if (testimonialEls.quote) testimonialEls.quote.textContent = t.quote;
    if (testimonialEls.name) testimonialEls.name.textContent = t.name;
    if (testimonialEls.role) testimonialEls.role.textContent = t.role;
    if (testimonialEls.count) testimonialEls.count.textContent = (testimonialIndex + 1) + "/" + testimonials.length;
  }

  const prevT = document.getElementById("testimonial-prev");
  const nextT = document.getElementById("testimonial-next");

  let autoRotateInterval = null;
  let restartTimeout = null;

  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      renderTestimonial(testimonialIndex + 1);
    }, 4500);
  }

  function pauseAndRestart() {
    clearInterval(autoRotateInterval);
    clearTimeout(restartTimeout);
    restartTimeout = setTimeout(startAutoRotate, 6000);
  }

  if (prevT) prevT.addEventListener("click", () => { renderTestimonial(testimonialIndex - 1); pauseAndRestart(); });
  if (nextT) nextT.addEventListener("click", () => { renderTestimonial(testimonialIndex + 1); pauseAndRestart(); });

  startAutoRotate();

  // ── Copy opener ──
  const copyOpenerBtn = document.getElementById("copy-opener-btn");
  if (copyOpenerBtn) {
    let copyResetTimer = null;
    copyOpenerBtn.addEventListener("click", () => {
      const openerEl = document.getElementById("dashboard-opener-quote");
      const text = openerEl ? openerEl.textContent : "";
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(() => {
        const label = copyOpenerBtn.querySelector(".copy-label");
        if (label) label.textContent = "Copied!";
        copyOpenerBtn.classList.add("copied");
        clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          if (label) label.textContent = "Copy opener";
          copyOpenerBtn.classList.remove("copied");
        }, 1800);
      });
    });
  }

  // ── Waitlist form submission ──
  const form = document.getElementById("waitlist-form");
  const submitBtn = document.getElementById("form-submit-btn");

  if (form && submitBtn) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name  = (document.getElementById("form-name")  || {}).value || "";
      const email = (document.getElementById("form-email") || {}).value || "";
      const trade = (document.getElementById("form-trade") || {}).value || "";
      const city  = (document.getElementById("form-city")  || {}).value || "";

      if (!email.trim()) {
        const emailEl = document.getElementById("form-email");
        if (emailEl) { emailEl.focus(); emailEl.classList.add("input-error"); }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, trade, city })
        });
        const json = await res.json();

        if (json.success) {
          const successEl = document.getElementById("form-success");
          const emailEl   = document.getElementById("form-success-email");
          if (emailEl) emailEl.textContent = email;
          form.style.display = "none";
          if (successEl) successEl.hidden = false;
        } else {
          throw new Error(json.error || "Submission failed");
        }
      } catch (err) {
        console.error(err);
        submitBtn.disabled = false;
        submitBtn.textContent = "Get first brief";
        submitBtn.classList.add("submit-error");
        setTimeout(() => submitBtn.classList.remove("submit-error"), 2400);
      }
    });

    // Remove error highlight on input
    const emailInput = document.getElementById("form-email");
    if (emailInput) {
      emailInput.addEventListener("input", () => emailInput.classList.remove("input-error"));
    }
  }

  // ── Account cards carousel ──
  (function initAccountCarousel() {
    const track = document.getElementById("account-cards-track");
    if (!track) return;

    const prev    = document.getElementById("account-prev");
    const next    = document.getElementById("account-next");
    const dotWrap = document.getElementById("account-dots");
    const dots    = dotWrap ? Array.from(dotWrap.querySelectorAll(".account-dot")) : [];

    const cardStep = () => {
      const card = track.querySelector(".account-card");
      return card ? card.offsetWidth + 12 : 300;
    };

    const numCards = () => track.querySelectorAll(".account-card").length;

    function currentIndex() {
      return Math.round(track.scrollLeft / cardStep());
    }

    function syncDots() {
      const idx = currentIndex();
      dots.forEach((d, i) => {
        const active = i === idx;
        d.classList.toggle("account-dot--active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function scrollToCard(index) {
      const n = numCards();
      const clamped = Math.max(0, Math.min(index, n - 1));
      track.scrollTo({ left: clamped * cardStep(), behavior: "smooth" });
    }

    function scrollBy(dir) {
      track.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
    }

    let autoTimer  = null;
    let pauseTimer = null;
    let paused     = false;

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        if (paused) return;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        if (atEnd) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollBy(1);
        }
      }, 3800);
    }

    function pauseAndResume(ms) {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => { paused = false; }, ms || 6000);
    }

    // Arrow buttons
    if (prev) prev.addEventListener("click", () => { scrollBy(-1); pauseAndResume(); });
    if (next) next.addEventListener("click", () => { scrollBy(1);  pauseAndResume(); });

    // Dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { scrollToCard(i); pauseAndResume(); });
    });

    // Keyboard — arrow keys when example section is in viewport
    document.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const section = document.getElementById("example");
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (r.top >= window.innerHeight || r.bottom <= 0) return;
      e.preventDefault();
      if (e.key === "ArrowRight") { scrollBy(1);  pauseAndResume(); }
      else                        { scrollBy(-1); pauseAndResume(); }
    });

    // Sync dots on scroll
    track.addEventListener("scroll", syncDots, { passive: true });

    track.addEventListener("mouseenter", () => { paused = true; clearTimeout(pauseTimer); });
    track.addEventListener("mouseleave", () => { paused = false; });
    track.addEventListener("touchstart",  () => pauseAndResume(7000), { passive: true });

    syncDots();
    startAuto();
  })();

  // ── Bar entrance animation ──
  (function initBarAnimation() {
    const fills = Array.from(document.querySelectorAll(".source-confidence-fill, .weight-fill"));
    if (!fills.length || !window.IntersectionObserver) return;

    fills.forEach(el => {
      el.dataset.targetWidth = el.style.width || "0%";
      el.style.transition = "none";
      el.style.width = "0%";
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        requestAnimationFrame(() => {
          el.style.transition = "width 1100ms cubic-bezier(.22,1,.36,1)";
          el.style.width = el.dataset.targetWidth;
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    fills.forEach(el => observer.observe(el));
  })();

  // ── Mobile: opener expand ──
  (function initOpenerExpand() {
    const btn   = document.getElementById("opener-expand-btn");
    const quote = document.getElementById("dashboard-opener-quote");
    if (!btn || !quote) return;

    function applyMobile() {
      if (window.innerWidth < 768) {
        quote.classList.add("is-truncated");
        btn.setAttribute("aria-expanded", "false");
        btn.classList.remove("is-expanded");
        btn.textContent = "Read full opener";
        btn.classList.remove("is-expanded");
      } else {
        quote.classList.remove("is-truncated");
      }
    }

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        quote.classList.add("is-truncated");
        btn.setAttribute("aria-expanded", "false");
        btn.classList.remove("is-expanded");
        btn.textContent = "Read full opener";
      } else {
        quote.classList.remove("is-truncated");
        btn.setAttribute("aria-expanded", "true");
        btn.classList.add("is-expanded");
        btn.textContent = "Show less";
      }
    });

    applyMobile();
    window.addEventListener("resize", applyMobile);
  })();

  // ── Mobile: show all signals ──
  (function initSigShowAll() {
    const btn   = document.getElementById("sig-show-all-btn");
    const items = document.querySelectorAll(".sig-feed-item--collapsible");
    if (!btn || !items.length) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      items.forEach(el => el.classList.toggle("is-visible", !expanded));
      btn.setAttribute("aria-expanded", !expanded ? "true" : "false");
      btn.textContent = expanded ? "See all 5 signals" : "Show fewer signals";
    });
  })();

  // ── Signals streaming carousel ──
  const sigTrack = document.getElementById("signals-track");
  if (sigTrack) {
    // Clone tiles for seamless infinite loop
    Array.from(sigTrack.children).forEach(t => sigTrack.appendChild(t.cloneNode(true)));

    let pos = 0;
    let paused = false;
    let resumeTimer = null;
    const speed = 0.45;

    const tick = () => {
      if (!paused) {
        pos += speed;
        const half = sigTrack.scrollWidth / 2;
        if (pos >= half) pos -= half;
        sigTrack.scrollLeft = pos;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const pause = () => { paused = true; clearTimeout(resumeTimer); };
    const resume = (delay) => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { pos = sigTrack.scrollLeft; paused = false; }, delay);
    };

    sigTrack.addEventListener("mouseenter", pause);
    sigTrack.addEventListener("mouseleave", () => resume(600));
    sigTrack.addEventListener("touchstart", pause, { passive: true });
    sigTrack.addEventListener("touchend", () => resume(3000), { passive: true });

    const sigPrev = document.getElementById("signals-prev");
    const sigNext = document.getElementById("signals-next");
    const cardStep = () => (sigTrack.querySelector(".signal-tile")?.offsetWidth || 220) + 10;
    if (sigPrev) sigPrev.addEventListener("click", () => { pause(); pos = Math.max(0, pos - cardStep()); sigTrack.scrollLeft = pos; resume(3000); });
    if (sigNext) sigNext.addEventListener("click", () => { pause(); pos += cardStep(); const half = sigTrack.scrollWidth / 2; if (pos >= half) pos -= half; sigTrack.scrollLeft = pos; resume(3000); });
  }
})();
