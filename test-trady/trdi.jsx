/* global React */
/* ============================================================
   trdi — the character
   A toolbox-headed tradesman (Boardy energy, object swapped):
   a red metal toolbox with a carry handle + latches and a
   hand-drawn smiley, over a navy work shirt, hi-vis vest and
   tool belt. Breathes, blinks.
   ============================================================ */

const FACE = "var(--face)";          /* the marker-blue smiley (tweakable) */

const TRDI_EXPR = {
  warm:   { eyeR: 12, mouth: "M92 174 Q122 200 152 174",  brow: false, wink: false },
  closer: { eyeR: 8,  mouth: "M98 184 Q124 191 150 174",  brow: true,  wink: false },
  pro:    { eyeR: 9,  mouth: "M100 180 Q122 191 144 180", brow: false, wink: false },
  cheeky: { eyeR: 12, mouth: "M92 174 Q122 202 152 178",  brow: false, wink: true },
};

/* ---- headgear — soft-shaded, outline-free, sits on the lid ---- */
function HardHat() {
  return (
    <g transform="translate(0,24)">
      <ellipse cx="123" cy="64" rx="46" ry="32" fill="#000" opacity="0.14" filter="url(#trdiSoft)" />
      <path d="M70 66 Q123 24 176 66 Q150 78 123 78 Q96 78 70 66 Z" fill="#F3A91F" />
      <path d="M70 66 Q123 24 176 66 Q150 78 123 78 Q96 78 70 66 Z" fill="url(#trdiSheenW)" />
      <path d="M70 66 Q123 24 176 66 Q150 78 123 78 Q96 78 70 66 Z" fill="url(#trdiSheenD)" />
      <ellipse cx="123" cy="70" rx="78" ry="13" fill="#E89A14" />
      <ellipse cx="123" cy="70" rx="78" ry="13" fill="url(#trdiSheenD)" />
      <path d="M88 50 Q123 40 158 50" fill="none" stroke="#C9850F" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    </g>
  );
}

function FlatCap() {
  return (
    <g>
      {/* shadow cast on the lid */}
      <ellipse cx="123" cy="97" rx="50" ry="12" fill="#000" opacity="0.16" filter="url(#trdiSoft)" />
      {/* crown */}
      <path d="M80 96 C 82 67 104 59 124 60 C 161 61 174 78 171 93 C 144 101 104 101 80 96 Z" fill="#6E5836" />
      <path d="M80 96 C 82 67 104 59 124 60 C 161 61 174 78 171 93 C 144 101 104 101 80 96 Z" fill="url(#trdiSheenW)" />
      <path d="M80 96 C 82 67 104 59 124 60 C 161 61 174 78 171 93 C 144 101 104 101 80 96 Z" fill="url(#trdiSheenD)" />
      {/* front brim */}
      <path d="M82 96 C 60 94 55 102 64 106 C 78 107 96 99 99 95 Z" fill="#4C3C22" />
      <path d="M82 96 C 60 94 55 102 64 106 C 78 107 96 99 99 95 Z" fill="url(#trdiSheenW)" />
      {/* button */}
      <circle cx="125" cy="62" r="5" fill="#5A472A" />
      <circle cx="123.5" cy="60.5" r="1.8" fill="#fff" opacity="0.35" />
    </g>
  );
}

function Beanie() {
  return (
    <g transform="translate(0,22)">
      <ellipse cx="120" cy="74" rx="60" ry="14" fill="#000" opacity="0.14" filter="url(#trdiSoft)" />
      <path d="M64 76 C 66 36 120 18 176 76 C 140 86 100 86 64 76 Z" fill="#1F9A86" />
      <path d="M64 76 C 66 36 120 18 176 76 C 140 86 100 86 64 76 Z" fill="url(#trdiSheenW)" />
      <path d="M64 76 C 66 36 120 18 176 76 C 140 86 100 86 64 76 Z" fill="url(#trdiSheenD)" />
      <path d="M58 72 C 120 90 180 72 182 72 L 182 84 C 120 102 58 84 58 84 Z" fill="#16826F" />
      <circle cx="120" cy="22" r="9" fill="#26B19A" />
    </g>
  );
}

const HAT_COMPONENTS = { hardhat: HardHat, cap: FlatCap, beanie: Beanie };

function Trdi({ expr = "warm", hat = "none", wave = false, still = false, className = "" }) {
  const e = TRDI_EXPR[expr] || TRDI_EXPR.warm;
  const HatComp = HAT_COMPONENTS[hat] || null;
  const uid = React.useId().replace(/:/g, "");
  const metal = uid + "-metal";
  const vestClip = uid + "-vest";
  const VEST = "M34 300 C 31 246 38 216 82 205 C 100 199 120 200 130 203 C 150 206 178 208 196 216 C 218 226 226 256 222 300 Z";
  return (
    <svg
      className={"trdi " + (still ? "still " : "") + className}
      viewBox="0 0 250 300"
      width="100%"
      height="100%"
      role="img"
      aria-label="trady, a toolbox-headed tradesman bot"
    >
      <defs>
        {/* toolbox metal — derived light/mid/dark from --box */}
        <linearGradient id={metal} x1="0.15" y1="0" x2="0.5" y2="1">
          <stop offset="0" className="box-hi" />
          <stop offset="0.55" className="box-mid" />
          <stop offset="1" className="box-lo" />
        </linearGradient>
        {/* reusable directional light + shade (object-bounding-box) */}
        <linearGradient id="trdiSheenW" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trdiSheenD" x1="0.2" y1="0" x2="1" y2="1">
          <stop offset="0.5" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="trdiShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A586F" />
          <stop offset="1" stopColor="#1E3344" />
        </linearGradient>
        <radialGradient id="trdiGloss" cx="0.32" cy="0.26" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trdiChrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF1F3" />
          <stop offset="0.5" stopColor="#C2C8CD" />
          <stop offset="1" stopColor="#9AA1A8" />
        </linearGradient>
        <linearGradient id="trdiHandle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8C9197" />
          <stop offset="1" stopColor="#494E55" />
        </linearGradient>
        <filter id="trdiSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id={vestClip}><path d={VEST} /></clipPath>
      </defs>

      {/* soft contact shadow */}
      <ellipse cx="124" cy="289" rx="74" ry="11" fill="#000" opacity="0.16" filter="url(#trdiSoft)" />

      <g className="t-body">
        {/* ===== BODY: navy work jacket (collar + arm show under the vest) ===== */}
        <path d="M20 300 C 17 245 35 209 85 200 C 103 196 121 197 132 200 C 154 203 180 207 198 215 C 221 225 233 257 231 300 Z" fill="url(#trdiShirt)" />

        {/* ===== waving arm (hero only) ===== */}
        {wave && (
          <g className="t-arm">
            <path d="M78 212 L54 170" fill="none" stroke="#2E4A63" strokeWidth="27" strokeLinecap="round" />
            <path d="M54 170 L50 124" fill="none" stroke="#2E4A63" strokeWidth="22" strokeLinecap="round" />
            <path d="M78 212 L54 170" fill="none" stroke="url(#trdiSheenW)" strokeWidth="27" strokeLinecap="round" />
            <path d="M54 170 L50 124" fill="none" stroke="url(#trdiSheenW)" strokeWidth="22" strokeLinecap="round" />
            {/* glove */}
            <rect x="36" y="100" width="27" height="30" rx="13" fill="#3E5A73" transform="rotate(-6 49 115)" />
            <g stroke="#3E5A73" strokeWidth="6.5" strokeLinecap="round">
              <line x1="43" y1="104" x2="41" y2="89" />
              <line x1="50" y1="102" x2="49" y2="86" />
              <line x1="57" y1="104" x2="58" y2="90" />
            </g>
            <path d="M61 118 Q71 113 70 105" fill="none" stroke="#3E5A73" strokeWidth="6.5" strokeLinecap="round" />
            <rect x="36" y="100" width="27" height="30" rx="13" fill="url(#trdiSheenW)" transform="rotate(-6 49 115)" />
          </g>
        )}

        {/* ===== hi-vis vest — closed, up over the shoulders ===== */}
        <path d={VEST} fill="var(--trdi)" />
        <path d={VEST} fill="url(#trdiSheenW)" />
        <path d={VEST} fill="url(#trdiSheenD)" />
        {/* collar / lapels (asymmetric V) */}
        <path d="M102 204 C 110 214 119 223 127 230 L 131 206 C 120 203 109 203 102 204 Z" fill="#16293A" />
        <path d="M153 207 C 145 216 135 223 127 230 L 123 207 C 134 204 144 205 153 207 Z" fill="#1B3243" />
        {/* inner shirt at the neck (off-centre) */}
        <path d="M114 206 L137 207 L128 233 Z" fill="#E7EBEE" opacity="0.92" />
        <path d="M114 206 L137 207 L128 233 Z" fill="url(#trdiSheenD)" />
        {/* zipper placket */}
        <path d="M128 232 C 131 258 130 280 130 300" fill="none" stroke="#7A3A18" strokeOpacity="0.5" strokeWidth="2.5" />
        <circle cx="128" cy="238" r="3.2" fill="#C9CDD2" />
        {/* reflective tape — verticals + over-the-shoulder straps, clipped to the vest */}
        <g clipPath={"url(#" + vestClip + ")"}>
          <rect x="86" y="206" width="12" height="98" fill="#EAEDEF" opacity="0.9" />
          <rect x="158" y="208" width="12" height="96" fill="#EAEDEF" opacity="0.9" />
          <path d="M70 204 L96 250 L84 256 L58 212 Z" fill="#EAEDEF" opacity="0.85" />
          <path d="M182 206 L156 252 L168 258 L194 216 Z" fill="#EAEDEF" opacity="0.85" />
        </g>

        {/* soft AO where the head rests on the shoulders */}
        <ellipse cx="124" cy="200" rx="64" ry="18" fill="#000" opacity="0.2" filter="url(#trdiSoft)" />

        {/* ============ TOOLBOX HEAD (3D, angled) ============ */}
        <g className="t-head">
          {/* carry handle on the top (mostly under the cap) */}
          <path d="M104 99 Q124 87 146 97" fill="none" stroke="url(#trdiHandle)" strokeWidth="8" strokeLinecap="round" />
          <path d="M107 98 Q124 90 143 96" fill="none" stroke="#C4C9CE" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />

          {/* right side (turned away from the light) */}
          <path d="M178 104 L200 93 L200 185 L178 196 Z" fill="var(--box-lo)" />
          <path d="M178 104 L200 93 L200 185 L178 196 Z" fill="url(#trdiSheenD)" />
          {/* top face (catches the light) */}
          <path d="M66 106 L178 104 L200 93 L88 95 Z" fill="var(--box-hi)" />
          <path d="M66 106 L178 104 L200 93 L88 95 Z" fill="url(#trdiSheenW)" />
          {/* front face */}
          <path d="M66 106 L178 104 L178 196 L66 198 Z" fill={"url(#" + metal + ")"} />
          <path d="M66 106 L178 104 L178 196 L66 198 Z" fill="url(#trdiGloss)" />
          {/* brushed-metal streaks (break up the flat surface) */}
          <g strokeLinecap="round">
            <line x1="92" y1="118" x2="92" y2="188" stroke="#fff" strokeOpacity="0.06" strokeWidth="3" />
            <line x1="122" y1="116" x2="122" y2="190" stroke="#fff" strokeOpacity="0.05" strokeWidth="3" />
            <line x1="150" y1="115" x2="150" y2="186" stroke="#fff" strokeOpacity="0.05" strokeWidth="3" />
            <line x1="107" y1="117" x2="107" y2="189" stroke="#000" strokeOpacity="0.05" strokeWidth="2" />
            <line x1="136" y1="116" x2="136" y2="188" stroke="#000" strokeOpacity="0.05" strokeWidth="2" />
          </g>
          {/* rim light along the upper-left edges */}
          <path d="M67 197 L66 106 L178 104 M66 106 L88 95" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {/* core shadow along the lower-right edges */}
          <path d="M66 198 L178 196 L178 104" fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {/* lid seam across front + onto the side */}
          <path d="M66 122 L178 120 L200 109" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M66 119 L178 117 L200 106" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.4" />
          {/* latches straddling the seam */}
          <rect x="86" y="113" width="20" height="16" rx="3.5" fill="url(#trdiChrome)" transform="rotate(-1 96 121)" />
          <rect x="89" y="117" width="13" height="3" rx="1.5" fill="#000" opacity="0.26" />
          <rect x="88" y="114.5" width="15" height="2" rx="1" fill="#fff" opacity="0.7" />
          <rect x="138" y="112" width="20" height="16" rx="3.5" fill="url(#trdiChrome)" transform="rotate(-1 148 120)" />
          <rect x="141" y="116" width="13" height="3" rx="1.5" fill="#000" opacity="0.26" />
          <rect x="140" y="113.5" width="15" height="2" rx="1" fill="#fff" opacity="0.7" />

          {/* brow (focused look) */}
          {e.brow && (
            <g stroke={FACE} strokeWidth="6" strokeLinecap="round">
              <line x1="82" y1="136" x2="104" y2="130" />
              <line x1="140" y1="130" x2="162" y2="136" />
            </g>
          )}

          {/* ---- smiley (the one flat graphic, like the reference) ---- */}
          <g className="t-eyes" fill={FACE}>
            <circle cx="97" cy="148" r={e.eyeR} />
            {e.wink ? (
              <path d="M137 150 Q147 140 157 150" fill="none" stroke={FACE} strokeWidth="7" strokeLinecap="round" />
            ) : (
              <circle cx="147" cy="148" r={e.eyeR} />
            )}
          </g>
          <path d={e.mouth} fill="none" stroke={FACE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

          {/* headgear */}
          {HatComp && <HatComp />}
        </g>
      </g>
    </svg>
  );
}

/* ---------------- small head mark (nav / avatars) ---------------- */
function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 50" role="img" aria-label="trady">
      {/* carry handle */}
      <rect x="19.5" y="9.5" width="3" height="6" rx="1.3" fill="#6C727A" stroke="var(--ink)" strokeWidth="2" />
      <rect x="25.5" y="9.5" width="3" height="6" rx="1.3" fill="#6C727A" stroke="var(--ink)" strokeWidth="2" />
      <rect x="18" y="6" width="12" height="5" rx="2.5" fill="#6C727A" stroke="var(--ink)" strokeWidth="2.4" />
      {/* lid */}
      <rect x="7" y="14" width="34" height="8" rx="2.6" fill="var(--lid)" stroke="var(--ink)" strokeWidth="2.8" strokeLinejoin="round" />
      {/* body */}
      <rect x="9" y="21" width="30" height="23" rx="3" fill="var(--box)" stroke="var(--ink)" strokeWidth="2.8" strokeLinejoin="round" />
      {/* latch */}
      <rect x="21" y="19" width="6" height="5" rx="1" fill="#CBD0D5" stroke="var(--ink)" strokeWidth="2" />
      {/* smiley */}
      <circle cx="19" cy="32" r="3" fill="var(--face)" />
      <circle cx="31" cy="32" r="3" fill="var(--face)" />
      <path d="M18 37 Q24 43 32 37" fill="none" stroke="var(--face)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- channel icons ---------------- */
function ChannelIcon({ type, className = "ic" }) {
  const stroke = "var(--ink)";
  if (type === "email") {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <rect x="3" y="7" width="26" height="19" rx="4" fill="#fff" />
        <path d="M5 10 L16 18 L27 10" />
      </svg>
    );
  }
  if (type === "text") {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M4 7 h24 a3 3 0 0 1 3 3 v9 a3 3 0 0 1 -3 3 h-12 l-7 5 v-5 h-2 a3 3 0 0 1 -3 -3 v-9 a3 3 0 0 1 3 -3 z" fill="#fff" />
        <circle cx="11" cy="14.5" r="1.6" fill={stroke} stroke="none" />
        <circle cx="16" cy="14.5" r="1.6" fill={stroke} stroke="none" />
        <circle cx="21" cy="14.5" r="1.6" fill={stroke} stroke="none" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
      <rect x="10" y="3" width="14" height="26" rx="4" fill="#fff" />
      <line x1="14" y1="25" x2="20" y2="25" />
      <path d="M6 11 Q3 16 6 21" />
      <path d="M28 11 Q31 16 28 21" />
    </svg>
  );
}

/* ---------------- line icons (steps + capabilities) ---------------- */
function Icon({ name, className = "" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    watch: <g {...p}><path d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z" /><circle cx="12" cy="12" r="3.2" /></g>,
    target: <g {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.2" /><path d="M12 1.5 V5 M12 19 v3.5 M1.5 12 H5 M19 12 h3.5" /></g>,
    send: <g {...p}><path d="M21 3 L10.5 13.5 M21 3 L14 21 L10.5 13.5 L3 10 Z" /></g>,
    codes: <g {...p}><path d="M5 9 H19 M5 15 H19 M10 4 L8 20 M16 4 L14 20" /></g>,
    block: <g {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M3.5 10 H20.5 M3.5 14 H20.5 M10 3.5 V20.5 M14 3.5 V20.5" /></g>,
    permit: <g {...p}><path d="M6 2.5 H14 L18.5 7 V21.5 H6 Z" /><path d="M14 2.5 V7 H18.5 M9 12 H15 M9 16 H15" /></g>,
    pin: <g {...p}><path d="M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z" /><circle cx="12" cy="9.5" r="2.6" /></g>,
    review: <g {...p}><path d="M4 5.5 h16 a1.5 1.5 0 0 1 1.5 1.5 v8 a1.5 1.5 0 0 1 -1.5 1.5 h-9 l-5 4 v-4 h-2 a1.5 1.5 0 0 1 -1.5 -1.5 v-8 a1.5 1.5 0 0 1 1.5 -1.5 Z" /><path d="M12 8 l1.3 2.7 2.9 .3 -2.2 2 .6 2.9 -2.6 -1.5 -2.6 1.5 .6 -2.9 -2.2 -2 2.9 -.3 Z" /></g>,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      {paths[name] || paths.target}
    </svg>
  );
}

Object.assign(window, { Trdi, Logo, ChannelIcon, Icon });
