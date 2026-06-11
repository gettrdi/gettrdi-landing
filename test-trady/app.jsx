/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakColor, TweakRadio,
   Nav, Hero, HowItWorks, MondayBrief, Knows, MeetTrdi, Versus, CTA, Footer, PERSONAS */
const { useEffect } = React;

const FONTS = {
  "Bricolage (default)": "'Bricolage Grotesque', system-ui, sans-serif",
  "Hanken (clean)": "'Hanken Grotesk', system-ui, sans-serif",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "personality": "warm",
  "displayFont": "Bricolage (default)"
}/*EDITMODE-END*/;

const PERSONA_LABELS = {
  warm: "Warm teammate",
  closer: "Sharp closer",
  pro: "Calm pro",
  cheeky: "A little cheeky",
};

function useReveal() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const trigger = window.innerHeight * 0.92;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < trigger) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const t1 = setTimeout(check, 120);
    const t2 = setTimeout(check, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2); if (raf) cancelAnimationFrame(raf);
    };
  });
}

// Turn [data-carousel] grids into swipeable carousels with dot indicators (mobile only).
function useCarousels() {
  useEffect(() => {
    const scrollers = Array.from(document.querySelectorAll("[data-carousel]"));
    const cleanups = [];
    scrollers.forEach((sc) => {
      const anchor = sc.closest(".ld-card") || sc;
      let dots = anchor.nextElementSibling;
      if (!dots || !dots.classList.contains("carousel-dots")) {
        dots = document.createElement("div");
        dots.className = "carousel-dots";
        anchor.parentNode.insertBefore(dots, anchor.nextSibling);
      }
      const kids = Array.from(sc.children);
      dots.innerHTML = "";
      kids.forEach((k, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cdot";
        b.setAttribute("aria-label", "Go to card " + (i + 1));
        b.addEventListener("click", () => {
          const scRect = sc.getBoundingClientRect();
          const kRect = k.getBoundingClientRect();
          const pad = parseFloat(getComputedStyle(sc).paddingLeft) || 0;
          sc.scrollBy({ left: kRect.left - scRect.left - pad, behavior: "smooth" });
        });
        dots.appendChild(b);
      });
      const update = () => {
        const scRect = sc.getBoundingClientRect();
        const center = scRect.left + scRect.width / 2;
        let best = 0, bestDist = Infinity;
        kids.forEach((k, i) => {
          const r = k.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        Array.from(dots.children).forEach((d, i) => d.classList.toggle("on", i === best));
      };
      update();
      sc.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      cleanups.push(() => { sc.removeEventListener("scroll", update); window.removeEventListener("resize", update); });
    });
    return () => cleanups.forEach((c) => c());
  }, []);
}

function useHideCtaAtAccess() {  useEffect(() => {
    const target = document.getElementById("access");
    if (!target || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        document.body.classList.toggle("at-access", entries[0].isIntersecting);
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);
}

// Show the sticky mobile CTA only after the user scrolls past the hero.
function useScrolledFlag() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const past = window.scrollY > window.innerHeight * 0.72;
      document.body.classList.toggle("scrolled", past);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  useHideCtaAtAccess();
  useScrolledFlag();
  useCarousels();

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--font-display", FONTS[t.displayFont] || FONTS["Bricolage (default)"]);
  }, [t.displayFont]);

  const persona = PERSONAS[t.personality] || PERSONAS.warm;

  return (
    <React.Fragment>
      <Nav />
      <Hero headline={persona.headline} expr={persona.expr} />
      <HowItWorks />
      <MondayBrief />
      <Knows />
      <MeetTrdi initial={t.personality} key={t.personality} />
      <Versus />
      <CTA expr={persona.expr} img={persona.img} />
      <Footer />

      <a className="mobile-cta" href="#access" aria-label="Get early access">
        <span>Get early access</span><span className="arrow">→</span>
      </a>

      <TweaksPanel>
        <TweakSection label="Character" />
        <TweakSelect
          label="Personality"
          value={t.personality}
          options={Object.keys(PERSONA_LABELS).map((v) => ({ value: v, label: PERSONA_LABELS[v] }))}
          onChange={(v) => setTweak("personality", v)}
        />
        <TweakSection label="Type" />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={Object.keys(FONTS)}
          onChange={(v) => setTweak("displayFont", v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
