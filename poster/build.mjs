// Build the poster for news-image-20261121, round 5 (Concept C + flags).
// Reads poster/data/stories38.json, writes poster/poster.html.
// Round 5 changes vs round 4: a small flag strip on every feature card
// (countries readable at 300px without reading text), richer lead art
// (Riyadh windows + moon, COP31 draft papers, quake "FELT IN LIMA" tag),
// robot/Canberra art fixes, DATE CHECK names the check time.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const d = JSON.parse(readFileSync(join(dir, "data", "stories38.json"), "utf8"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const NAVY = "#1d2a44", RED = "#a31d21", CREAM = "#f6f1e5", INK = "#201a14", MUTED = "#5a5148", GREEN = "#2e7d4f", GOLD = "#b5892e";

// ---------- flags: small simplified country flags, 30x18 ----------
function flag(name) {
  const F = (inner) => `<svg width="30" height="18" viewBox="0 0 30 18"><rect width="30" height="18" fill="#fff" stroke="#999" stroke-width="0.5"/>${inner}</svg>`;
  switch (name) {
    case "ukraine": return F(`<rect width="30" height="9" fill="#0057b7"/><rect y="9" width="30" height="9" fill="#ffd700"/>`);
    case "palestine": return F(`<rect width="30" height="6" fill="#000"/><rect y="6" width="30" height="6" fill="#fff"/><rect y="12" width="30" height="6" fill="#007a3d"/><polygon points="0,0 12,9 0,18" fill="#ee1c25"/>`);
    case "iran": return F(`<rect width="30" height="6" fill="#239f40"/><rect y="6" width="30" height="6" fill="#fff"/><rect y="12" width="30" height="6" fill="#da0001"/><circle cx="15" cy="9" r="2.5" fill="#da0001"/>`);
    case "usa": return F(`<rect width="30" height="18" fill="#fff"/><g fill="#b22234">${[0, 2.6, 5.2, 7.8, 10.4, 13, 15.6].map((y) => `<rect y="${y}" width="30" height="1.3"/>`).join("")}</g><rect width="13" height="9" fill="#3c3b6e"/>`);
    case "china": return F(`<rect width="30" height="18" fill="#de2910"/><circle cx="7" cy="5" r="2.4" fill="#ffde00"/><circle cx="13" cy="3" r="1" fill="#ffde00"/><circle cx="15" cy="6" r="1" fill="#ffde00"/><circle cx="13" cy="9" r="1" fill="#ffde00"/>`);
    case "japan": return F(`<rect width="30" height="18" fill="#fff"/><circle cx="15" cy="9" r="4.5" fill="#bc002d"/>`);
    case "philippines": return F(`<rect width="30" height="9" fill="#0038a8"/><rect y="9" width="30" height="9" fill="#ce1126"/><polygon points="0,0 13,9 0,18" fill="#fff"/><circle cx="5" cy="9" r="2" fill="#fcd116"/>`);
    case "australia": return F(`<rect width="30" height="18" fill="#00247d"/><path d="M0 0 L12 0 L12 9 L0 9 Z" fill="#00247d"/><path d="M0 0 L12 9 M12 0 L0 9" stroke="#fff" stroke-width="1.6"/><circle cx="21" cy="5" r="1.2" fill="#fff"/><circle cx="25" cy="10" r="1.2" fill="#fff"/><circle cx="19" cy="13" r="1.2" fill="#fff"/>`);
    case "india": return F(`<rect width="30" height="6" fill="#ff9933"/><rect y="6" width="30" height="6" fill="#fff"/><rect y="12" width="30" height="6" fill="#138808"/><circle cx="15" cy="9" r="2.2" fill="none" stroke="#000080" stroke-width="1"/>`);
    case "newzealand": return F(`<rect width="30" height="18" fill="#00247d"/><circle cx="20" cy="5" r="1.2" fill="#ff0000"/><circle cx="25" cy="9" r="1.2" fill="#ff0000"/><circle cx="20" cy="13" r="1.2" fill="#ff0000"/><circle cx="24" cy="15" r="1" fill="#ff0000"/>`);
    case "netherlands": return F(`<rect width="30" height="6" fill="#ae1c28"/><rect y="6" width="30" height="6" fill="#fff"/><rect y="12" width="30" height="6" fill="#21468b"/>`);
    case "un": return F(`<rect width="30" height="18" fill="#5b92e5"/><circle cx="15" cy="9" r="4.5" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M15 5 L15 13 M11 9 L19 9" stroke="#fff" stroke-width="1.2"/>`);
    case "coin": return F(`<circle cx="15" cy="9" r="7" fill="#f7931a"/><text x="15" y="13" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">₿</text>`);
    default: return "";
  }
}

// ---------- inline SVG art, drawn in a 300x90 box, centre-cropped ----------
function art(kind, w, h) {
  const sky = (bg, inner) => `<svg width="${w}" height="${h}" viewBox="0 0 300 90" preserveAspectRatio="xMidYMid slice"><rect width="300" height="90" fill="${bg}"/>${inner}</svg>`;
  const stars = [[22, 18], [58, 16], [150, 17], [210, 19], [268, 16], [120, 22], [250, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#f5d76e"/>`).join("");
  const win = (x, y, cw, ch, n, lit) => Array.from({ length: n }, (_, i) => `<rect x="${x + (i % cw) * 7}" y="${y + Math.floor(i / cw) * 8}" width="3.5" height="4.5" fill="${i % 3 === 0 ? "#ffd76e" : "#2b3a55"}"/>`).join("");
  switch (kind) {
    case "riyadh": return sky("#101a33", `${stars}<circle cx="272" cy="24" r="9" fill="#f5d76e"/><circle cx="268" cy="22" r="8" fill="#101a33"/><rect x="20" y="46" width="34" height="44" fill="#1d2a44"/><rect x="62" y="30" width="26" height="60" fill="#24344f"/><rect x="96" y="52" width="40" height="38" fill="#1d2a44"/><rect x="144" y="36" width="24" height="54" fill="#24344f"/><rect x="176" y="56" width="44" height="34" fill="#1d2a44"/><rect x="228" y="40" width="30" height="50" fill="#24344f"/><rect x="266" y="58" width="34" height="32" fill="#1d2a44"/>${win(24, 52, 4, 5, 12)}${win(66, 36, 3, 5, 12)}${win(100, 58, 5, 4, 10)}${win(180, 62, 5, 4, 10)}${win(232, 46, 3, 5, 10)}<path d="M30 34 Q110 6 190 30" stroke="#f5d76e" stroke-width="1.6" fill="none" stroke-dasharray="5 4"/><path d="M210 40 Q250 22 288 34" stroke="#f5d76e" stroke-width="1.6" fill="none" stroke-dasharray="5 4"/><circle cx="30" cy="34" r="4" fill="#e8543a"/><circle cx="190" cy="30" r="4" fill="#e8543a"/><circle cx="288" cy="34" r="4" fill="#e8543a"/>`);
    case "cop31": return sky("#efe6cf", `<circle cx="64" cy="46" r="26" fill="#2e7d4f"/><path d="M44 40 Q58 26 76 38 Q84 48 72 62 Q56 72 44 58 Z" fill="#7fb069"/><rect x="128" y="14" width="34" height="34" fill="#fff" stroke="#999" stroke-width="1"/><circle cx="145" cy="31" r="13" fill="none" stroke="#1d2a44" stroke-width="2"/><path d="M145 31 L145 20 M145 31 L153 35" stroke="#1d2a44" stroke-width="2"/><text x="145" y="56" font-size="8" text-anchor="middle" font-family="Arial" fill="#5a5148">DAY 13</text><rect x="196" y="12" width="16" height="52" rx="7" fill="#e8e0cc" stroke="#a31d21" stroke-width="1.5"/><rect x="200" y="30" width="8" height="30" fill="#a31d21"/><circle cx="204" cy="58" r="7" fill="#a31d21"/><text x="228" y="26" font-size="11" font-weight="bold" font-family="Arial" fill="#a31d21">+1.5°C</text><g transform="rotate(-4 248 62)"><rect x="228" y="48" width="52" height="30" fill="#fff" stroke="#999"/><rect x="232" y="54" width="44" height="2" fill="#bbb"/><rect x="232" y="60" width="44" height="2" fill="#bbb"/><rect x="232" y="66" width="30" height="2" fill="#bbb"/><text x="254" y="46" font-size="8" font-weight="bold" font-family="Arial" fill="#1d2a44">DRAFT 3</text></g>`);
    case "quake": return sky("#e8d9b0", `<polygon points="0,90 0,52 52,22 96,58 140,26 190,62 240,30 300,64 300,90" fill="#a9804f"/><polygon points="52,22 96,58 140,26 190,62 240,30 300,64 300,90 0,90 0,52" fill="#8a6a3e" opacity="0.35"/><polyline points="18,76 44,76 52,62 62,84 70,70 80,76 128,76 136,60 146,84 154,72 162,76 210,76 218,64 226,82 234,72 242,76 282,76" stroke="#a31d21" stroke-width="2.4" fill="none"/><rect x="248" y="66" width="34" height="24" fill="#f6f1e5" stroke="#a31d21"/><polygon points="246,66 265,54 284,66" fill="#a31d21"/><rect x="258" y="74" width="8" height="12" fill="#1d2a44"/><rect x="18" y="66" width="86" height="10" fill="#1d2a44"/><text x="61" y="73.5" font-size="7" font-weight="bold" text-anchor="middle" font-family="Arial" fill="#fff">FELT IN LIMA</text>`);
    case "kryvyi": return sky("#e8dcc0", `<rect x="16" y="34" width="30" height="56" fill="#8a7a5c"/><rect x="54" y="48" width="42" height="42" fill="#6b5f45"/><rect x="104" y="26" width="26" height="64" fill="#8a7a5c"/><rect x="138" y="52" width="48" height="38" fill="#6b5f45"/><polygon points="212,90 212,44 232,30 252,44 252,90" fill="#8a7a5c"/><circle cx="240" cy="22" r="9" fill="#a31d21"/><polygon points="240,12 242,19 250,19 244,24 246,31 240,27 234,31 236,24 230,19 238,19" fill="#f5d76e"/><rect x="200" y="70" width="80" height="8" fill="#c9b489"/><text x="230" y="86" font-size="9" font-weight="bold" font-family="Arial" fill="#a31d21">2 DEAD · 42 HURT</text>`);
    case "gaza": return sky("#e9d9a8", `<rect x="14" y="44" width="34" height="46" fill="#9a8a68"/><rect x="56" y="30" width="28" height="60" fill="#7a6a4c"/><rect x="92" y="50" width="40" height="40" fill="#9a8a68"/><rect x="140" y="36" width="30" height="54" fill="#7a6a4c"/><circle cx="70" cy="22" r="10" fill="#c9c2a8"/><circle cx="86" cy="16" r="7" fill="#c9c2a8"/><circle cx="150" cy="18" r="9" fill="#c9c2a8"/><rect x="200" y="60" width="84" height="30" fill="#c9b489"/><text x="242" y="80" font-size="9" font-weight="bold" font-family="Arial" fill="#1d2a44">CEASEFIRE HOLDS</text>`);
    case "hormuz": return sky("#bcd6e8", `<ellipse cx="150" cy="46" rx="58" ry="12" fill="#eef3f6"/><rect x="146" y="40" width="8" height="26" fill="#1d2a44"/><circle cx="150" cy="34" r="7" fill="#1d2a44"/><circle cx="150" cy="34" r="3" fill="#e8543a"/><text x="150" y="82" font-size="10" font-weight="bold" font-family="Arial" text-anchor="middle" fill="#1d2a44">58TH MQ-9</text><path d="M0 74 Q40 68 80 74 T160 74 T240 74 T300 74" stroke="#2e5f8a" stroke-width="2" fill="none"/><path d="M0 82 Q50 77 100 82 T200 82 T300 82" stroke="#2e5f8a" stroke-width="1.5" fill="none"/>`);
    case "uranium": return sky("#1d4d2e", `<ellipse cx="150" cy="45" rx="52" ry="16" fill="none" stroke="#f5d76e" stroke-width="2.4" transform="rotate(-28 150 45)"/><ellipse cx="150" cy="45" rx="52" ry="16" fill="none" stroke="#f5d76e" stroke-width="2.4" transform="rotate(28 150 45)"/><ellipse cx="150" cy="45" rx="52" ry="16" fill="none" stroke="#f5d76e" stroke-width="2.4"/><circle cx="150" cy="45" r="9" fill="#f5d76e"/><text x="150" y="86" font-size="9" font-weight="bold" font-family="Arial" text-anchor="middle" fill="#fff">STAYS IN IRAN</text>`);
    case "aitax": return sky("#24344f", `<rect x="26" y="20" width="52" height="56" fill="#1d2a44" stroke="#4a5a75"/><rect x="86" y="20" width="52" height="56" fill="#1d2a44" stroke="#4a5a75"/><rect x="146" y="20" width="52" height="56" fill="#1d2a44" stroke="#4a5a75"/><g fill="#4ade80">${[30, 46, 62, 90, 106, 122, 150, 166, 182].map((x) => `<rect x="${x}" y="28" width="12" height="3"/>`).join("")}</g><g fill="#4a5a75">${[30, 46, 62, 90, 106, 122, 150, 166, 182].map((x) => `<rect x="${x}" y="40" width="12" height="3"/>`).join("")}</g><circle cx="252" cy="45" r="24" fill="#a31d21"/><text x="252" y="52" font-size="20" font-weight="bold" text-anchor="middle" font-family="Arial" fill="#fff">%</text>`);
    case "chinajapan": return sky("#e8dcc0", `<rect x="16" y="16" width="120" height="58" fill="#de2910"/><circle cx="52" cy="34" r="7" fill="#ffde00"/><circle cx="76" cy="28" r="3" fill="#ffde00"/><circle cx="84" cy="40" r="3" fill="#ffde00"/><circle cx="76" cy="50" r="3" fill="#ffde00"/><rect x="164" y="16" width="120" height="58" fill="#fff" stroke="#999"/><circle cx="224" cy="45" r="15" fill="#bc002d"/><text x="150" y="86" font-size="9" font-weight="bold" font-family="Arial" text-anchor="middle" fill="#1d2a44">"CORRECT IT"</text>`);
    case "davao": return sky("#bcd6e8", `<path d="M150 44 L196 30 L214 36 L186 44 L196 50 L150 50 Z" fill="#eef3f6"/><path d="M150 44 L120 34 L108 40 L138 48 Z" fill="#dfe8ee"/><path d="M168 46 L158 62 L168 48 Z" fill="#dfe8ee"/><path d="M0 76 Q60 70 120 76 T240 76 T300 76" stroke="#2e5f8a" stroke-width="2" fill="none"/><text x="252" y="30" font-size="11" font-weight="bold" font-family="Arial" fill="#1d2a44">146 SAFE</text><circle cx="52" cy="18" r="7" fill="#f5d76e"/><circle cx="250" cy="14" r="5" fill="#fff"/>`);
    case "canberra": return sky("#d8e6f2", `<rect x="30" y="18" width="34" height="20" fill="#00247d"/><circle cx="40" cy="24" r="2" fill="#fff"/><circle cx="48" cy="30" r="2" fill="#fff"/><circle cx="56" cy="24" r="2" fill="#fff"/><polygon points="90,74 160,26 230,74" fill="#8a6a3e"/><rect x="150" y="56" width="20" height="18" fill="#f6f1e5" stroke="#8a6a3e"/><text x="252" y="40" font-size="13" font-weight="bold" font-family="Arial" fill="#1d2a44">AI</text><text x="252" y="56" font-size="8" font-family="Arial" fill="#5a5148">TALKS</text><rect x="20" y="74" width="260" height="6" fill="#7fb069"/>`);
    case "bitcoin": return sky("#f0a500", `<circle cx="70" cy="45" r="26" fill="#fff"/><text x="70" y="56" font-size="32" font-weight="bold" text-anchor="middle" font-family="Arial" fill="#f7931a">₿</text><polyline points="130,66 168,46 196,54 232,28 268,38" stroke="#1d2a44" stroke-width="3" fill="none"/><circle cx="232" cy="28" r="4" fill="#a31d21"/><text x="200" y="86" font-size="9" font-weight="bold" font-family="Arial" text-anchor="middle" fill="#1d2a44">DOWN 5.1%</text>`);
    case "f1": return sky("#e8dcc0", `<path d="M30 62 Q80 52 130 58 L200 46 Q250 40 272 52 L268 66 L40 72 Z" fill="#d62828"/><circle cx="86" cy="68" r="11" fill="#1d2a44"/><circle cx="86" cy="68" r="5" fill="#c9c2a8"/><circle cx="222" cy="64" r="11" fill="#1d2a44"/><circle cx="222" cy="64" r="5" fill="#c9c2a8"/><rect x="196" y="34" width="34" height="14" fill="#1d2a44"/><text x="150" y="26" font-size="11" font-weight="bold" font-family="Arial" text-anchor="middle" fill="#1d2a44">POLE · VERSTAPPEN</text>`);
    case "cricket": return sky("#7fb069", `<rect x="60" y="20" width="10" height="58" fill="#d9b380" transform="rotate(24 65 50)"/><rect x="196" y="26" width="6" height="34" fill="#f6f1e5"/><rect x="208" y="26" width="6" height="34" fill="#f6f1e5"/><rect x="220" y="26" width="6" height="34" fill="#f6f1e5"/><rect x="192" y="22" width="42" height="5" fill="#f6f1e5"/><circle cx="248" cy="66" r="7" fill="#a31d21"/><rect x="20" y="74" width="260" height="6" fill="#5a8a4a"/><text x="120" y="40" font-size="12" font-weight="bold" font-family="Arial" fill="#1d2a44">136</text>`);
    case "robot": return sky("#e8e0cc", `<rect x="128" y="18" width="44" height="36" rx="8" fill="#eef3f6" stroke="#1d2a44" stroke-width="2"/><circle cx="142" cy="34" r="5" fill="#1d2a44"/><circle cx="158" cy="34" r="5" fill="#1d2a44"/><rect x="146" y="46" width="8" height="4" fill="#1d2a44"/><rect x="112" y="26" width="14" height="6" fill="#1d2a44"/><rect x="174" y="26" width="14" height="6" fill="#1d2a44"/><rect x="140" y="58" width="20" height="22" fill="#1d2a44"/><text x="70" y="40" font-size="12" font-weight="bold" font-family="Arial" fill="#1d2a44">2028</text><text x="234" y="40" font-size="12" font-weight="bold" font-family="Arial" fill="#1d2a44">128</text><text x="150" y="86" font-size="8" font-family="Arial" text-anchor="middle" fill="#5a5148">STATES TALK</text>`);
    default: return sky("#d8cdb2", "");
  }
}

// ---------- world map (coarse continent polygons, equirectangular, lat -60..85) ----------
const LAND = [
  [[-168, 66], [-140, 70], [-125, 72], [-110, 68], [-95, 69], [-85, 66], [-76, 62], [-65, 60], [-55, 47], [-60, 45], [-70, 42], [-75, 35], [-80, 32], [-81, 26], [-84, 30], [-90, 21], [-97, 26], [-105, 20], [-97, 16], [-92, 14], [-83, 9], [-79, 9], [-83, 15], [-90, 14], [-97, 16], [-105, 20], [-110, 23], [-117, 33], [-122, 37], [-124, 48], [-130, 55], [-145, 60], [-158, 58], [-168, 66]],
  [[-170, -52], [-65, -55], [-70, -40], [-75, -30], [-80, -18], [-77, -12], [-80, -3], [-81, 1], [-77, 4], [-72, 12], [-60, 9], [-52, 5], [-50, 0], [-44, -3], [-38, -5], [-35, -9], [-40, -20], [-48, -28], [-57, -38], [-65, -45], [-68, -52], [-170, -52]],
  [[-10, 37], [-9, 43], [-2, 48], [-4, 50], [0, 51], [3, 53], [8, 57], [10, 59], [18, 56], [21, 55], [24, 59], [30, 60], [28, 71], [40, 68], [32, 70], [45, 68], [50, 69], [60, 69], [68, 73], [80, 73], [90, 75], [100, 77], [110, 74], [120, 73], [130, 72], [140, 72], [150, 70], [160, 70], [170, 67], [178, 65], [170, 60], [162, 60], [158, 53], [142, 50], [140, 40], [135, 43], [130, 33], [127, 40], [120, 35], [122, 30], [110, 20], [105, 10], [100, 8], [97, 16], [94, 17], [90, 22], [86, 20], [80, 13], [77, 8], [75, 15], [72, 20], [66, 25], [60, 25], [57, 26], [52, 26], [50, 29], [48, 30], [44, 29], [40, 31], [36, 36], [33, 31], [36, 36], [30, 36], [27, 37], [23, 36], [19, 42], [12, 44], [8, 44], [3, 43], [-2, 37], [-9, 37], [-10, 37]],
  [[-17, 15], [-16, 21], [-13, 27], [-9, 31], [-6, 34], [-10, 37], [0, 36], [10, 37], [11, 34], [20, 32], [30, 31], [32, 31], [35, 28], [37, 22], [40, 15], [43, 11], [48, 11], [51, 12], [44, 13], [40, 15], [42, 1], [40, -5], [39, -10], [36, -18], [33, -26], [28, -33], [20, -35], [17, -32], [15, -27], [12, -18], [9, -1], [9, 4], [6, 4], [-8, 4], [-13, 8], [-17, 15]],
  [[113, -22], [114, -30], [115, -35], [124, -33], [129, -32], [134, -33], [140, -38], [145, -38], [150, -37], [153, -27], [150, -22], [146, -19], [142, -11], [137, -12], [132, -11], [130, -13], [126, -14], [122, -17], [117, -20], [113, -22]],
];
function mapSvg(W, H) {
  const X = (lon) => ((lon + 180) / 360) * W;
  const Y = (lat) => ((85 - lat) / 145) * H;
  const polys = LAND.map((p) => `<polygon points="${p.map(([lo, la]) => `${X(lo).toFixed(1)},${Y(la).toFixed(1)}`).join(" ")}" fill="#e3d3ae" stroke="#c9b489" stroke-width="0.7"/>`).join("");
  const grid = [60, 30, 0, -30, -60].map((la) => `<line x1="0" y1="${Y(la)}" x2="${W}" y2="${Y(la)}" stroke="#d8cdb2" stroke-width="0.5"/>`).join("");
  const all = [...d.leads, ...d.features, ...d.briefs];
  const pins = all.filter((s) => s.lat != null).map((s) => {
    const cls = s.n <= 3 ? "pin-lead" : s.n <= 15 ? "pin-feat" : "pin-brief";
    return `<g class="${cls}"><circle cx="${X(s.lon).toFixed(1)}" cy="${Y(s.lat).toFixed(1)}" r="7"/><text x="${X(s.lon).toFixed(1)}" y="${(Y(s.lat) + 2.5).toFixed(1)}">${s.n}</text></g>`;
  }).join("");
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f2ead2"/>${grid}${polys}${pins}</svg>`;
}

// ---------- page ----------
const regions = ["Europe", "Asia", "Middle East", "Africa", "Americas", "Oceania", "Global"];
const counts = Object.fromEntries(regions.map((r) => [r, 0]));
[...d.leads, ...d.features, ...d.briefs].forEach((s) => { counts[s.region] = (counts[s.region] || 0) + 1; });
const dots = { Europe: "#a31d21", Asia: "#b5892e", "Middle East": "#8a6a3e", Africa: "#2e7d4f", Americas: "#1d2a44", Oceania: "#6a4a8a", Global: "#5a5148" };
const chipColor = { CONFIRMED: GREEN, OFFICIAL: NAVY, REPORTED: GOLD, CLAIM: "#8a6a3e" };
const stats = d.meta.stats.map(([v, l]) => `<div class="stat"><div class="stat-v">${esc(v)}</div><div class="stat-l">${esc(l)}</div></div>`).join("");
const topics = d.meta.topics.map(([t, n]) => `<span class="topic"><b>${esc(t)}</b> ${n}</span>`).join("");
const regionBar = regions.map((r) => `<span class="region"><i style="background:${dots[r]}"></i>${r.toUpperCase()} ${counts[r]}</span>`).join("");
const leads = d.leads.map((s) => `
  <article class="lead">
    <div class="lead-art">${art(s.art, 306, 72)}</div>
    <div class="banner"><span>${esc(s.banner)}</span><span class="banner2">${esc(s.banner2)}</span></div>
    <div class="lead-meta"><span class="num">${s.n}</span> ${esc(s.place)} · ${esc(s.topic)} <span class="chip" style="background:${chipColor[s.chip]}">${s.chip}</span></div>
    <div class="lead-head">${esc(s.headline)}</div>
    <div class="lead-deck">${esc(s.deck)}</div>
    <div class="lead-src">${esc(s.src_note === s.source ? s.source : s.src_note + " · " + s.source)}</div>
  </article>`).join("");
const features = d.features.map((s) => `
  <article class="feat">
    <div class="feat-art">${art(s.art, 232, 40)}</div>
    <div class="feat-flags">${s.flags.map((f) => flag(f)).join("")}</div>
    <div class="banner"><span>${esc(s.banner)}</span></div>
    <div class="feat-meta"><span class="num">${s.n}</span> ${esc(s.place)} <span class="chip" style="background:${chipColor[s.chip]}">${s.chip}</span></div>
    <div class="feat-head">${esc(s.headline)}</div>
    <div class="feat-deck">${esc(s.deck)}</div>
    <div class="feat-src">${esc(s.src_note)}</div>
  </article>`).join("");
const leftBriefs = d.briefs.filter((_, i) => i % 2 === 0).map((s) => `<div class="brief"><span class="num">${s.n}</span> <b>${esc(s.place)}</b> ${esc(s.text)} <span class="bsrc">(${esc(s.source)})</span></div>`).join("");
const rightBriefs = d.briefs.filter((_, i) => i % 2 === 1).map((s) => `<div class="brief"><span class="num">${s.n}</span> <b>${esc(s.place)}</b> ${esc(s.text)} <span class="bsrc">(${esc(s.source)})</span></div>`).join("");

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1024px;height:1024px;background:${CREAM};color:${INK};font-family:Georgia,serif}
.topbar{display:flex;justify-content:space-between;padding:7px 26px 5px;border-bottom:2.5px solid ${RED};font-family:Arial,sans-serif;font-size:11px;letter-spacing:.12em;color:${RED};font-weight:bold}
.topbar .corner{color:#3a332c;letter-spacing:.02em;font-size:10px}
.masthead{text-align:center;padding:3px 26px 0}
.masthead h1{font-size:38px;line-height:1.02;letter-spacing:-.01em}
.masthead .strap{font-family:Arial,sans-serif;font-size:12px;font-style:italic;color:#5a5148;margin-top:1px}
.stats{display:flex;border-top:1.5px solid #c9b489;border-bottom:1.5px solid #c9b489;margin:4px 26px 0}
.stat{flex:1;text-align:center;padding:3px 2px}
.stat + .stat{border-left:1px solid #d8cdb2}
.stat-v{font-size:19px;font-weight:bold;color:${RED};line-height:1}
.stat-l{font-family:Arial,sans-serif;font-size:9px;color:#5a5148;margin-top:1px}
.topics{display:flex;align-items:center;gap:6px;padding:4px 26px 0;font-family:Arial,sans-serif;font-size:10px}
.topics .tlabel{color:${RED};font-weight:bold;letter-spacing:.04em}
.topic{border:1px solid #c9b489;background:#efe6cf;padding:1px 5px}
.topic b{color:${RED}}
.regions{display:flex;gap:12px;padding:3px 26px 0;font-family:Arial,sans-serif;font-size:9px;color:#3a332c}
.region i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:3px}
.leads{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:5px 26px 0}
.lead{border:1px solid #c9b489;background:#fbf7ec}
.lead-art svg{display:block;width:100%;height:72px}
.banner{background:${NAVY};color:#fff;font-family:Arial,sans-serif;font-size:10.5px;font-weight:bold;letter-spacing:.04em;padding:2px 7px;display:flex;justify-content:space-between}
.banner2{color:#ffd76e}
.lead-meta{font-family:Arial,sans-serif;font-size:9px;color:#5a5148;padding:3px 7px 0}
.num{display:inline-block;min-width:12px;height:12px;line-height:12px;text-align:center;border-radius:50%;background:${RED};color:#fff;font-size:8px;font-weight:bold}
.chip{color:#fff;font-size:7.5px;font-weight:bold;padding:1px 4px;border-radius:2px;letter-spacing:.04em}
.lead-head{font-size:15.5px;line-height:1.12;font-weight:bold;padding:2px 7px 0}
.lead-deck{font-size:10.5px;line-height:1.3;color:#3a332c;padding:2px 7px 0}
.lead-src{font-family:Arial,sans-serif;font-size:8px;color:#6b6259;padding:2px 7px 3px}
.features{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:5px 26px 0}
.feat{border:1px solid #c9b489;background:#fbf7ec}
.feat-art svg{display:block;width:100%;height:40px}
.feat-flags{display:flex;gap:4px;padding:1px 6px 0}
.feat-flags svg{width:30px;height:18px}
.feat-meta{font-family:Arial,sans-serif;font-size:8.5px;color:#5a5148;padding:2px 6px 0}
.feat-head{font-size:12px;line-height:1.12;font-weight:bold;padding:1px 6px 0}
.feat-deck{font-size:9.5px;line-height:1.15;color:#3a332c;padding:1px 6px 0}
.feat-src{font-family:Arial,sans-serif;font-size:7.5px;color:#6b6259;padding:1px 6px 2px}
.bottom{display:flex;gap:10px;padding:4px 26px 0}
.bottom h3{font-family:Arial,sans-serif;font-size:10px;letter-spacing:.08em;color:${RED};padding-bottom:2px}
.mapbox{flex:0 0 322px}
.mapbox svg{display:block;width:322px;height:96px;border:1px solid #d8cdb2}
.mapnote{font-family:Arial,sans-serif;font-size:8px;color:#6b6259;padding-top:2px}
.pin-lead circle{fill:${RED};stroke:#fff;stroke-width:1}
.pin-feat circle{fill:${NAVY};stroke:#fff;stroke-width:1}
.pin-brief circle{fill:#fff;stroke:${NAVY};stroke-width:1.2}
.pin-lead text,.pin-feat text{fill:#fff;font-family:Arial,sans-serif;font-size:7.5px;font-weight:bold;text-anchor:middle}
.pin-brief text{fill:${NAVY};font-family:Arial,sans-serif;font-size:7.5px;font-weight:bold;text-anchor:middle}
.briefsbox{flex:1}
.briefs-cols{display:flex;gap:12px}
.brief-col{flex:1}
.brief{font-family:Arial,sans-serif;font-size:9.5px;line-height:1.2;padding:1px 0;border-bottom:1px dotted #d8cdb2}
.brief .num{background:${NAVY}}
.brief .bsrc{color:#6b6259;font-size:8.5px}
.datecheck{margin:3px 26px 0;border:1.5px solid ${RED};padding:4px 9px;font-size:9.5px;line-height:1.3}
.datecheck b{color:${RED}}
.footer{margin:2px 26px 0;font-family:Arial,sans-serif;font-size:8.5px;color:#6b6259;line-height:1.4}
.footer .f2{font-weight:bold;color:#3a332c}
</style></head><body>
<div class="topbar" id="sec-masthead"><span>${esc(d.meta.kicker)}</span><span class="corner">${esc(d.meta.corner)}</span></div>
<div class="masthead"><h1>${esc(d.meta.title)}</h1><div class="strap">${esc(d.meta.strap)}</div></div>
<div class="stats" id="sec-stats">${stats}</div>
<div class="topics" id="sec-topics"><span class="tlabel">MOST-REPORTED TOPICS →</span>${topics}</div>
<div class="regions" id="sec-regions">${regionBar}</div>
<div class="leads" id="sec-leads">${leads}</div>
<div class="features" id="sec-features">${features}</div>
<div class="bottom" id="sec-bottom">
  <div class="mapbox"><h3>WHERE IT HAPPENED</h3>${mapSvg(322, 96)}<div class="mapnote">Every dot is a place in Saturday's news. No. 36, Mercury, is not on Earth.</div></div>
  <div class="briefsbox"><h3>ALSO ON SATURDAY 21 NOVEMBER 2026 — 23 MORE STORIES</h3><div class="briefs-cols"><div class="brief-col">${leftBriefs}</div><div class="brief-col">${rightBriefs}</div></div></div>
</div>
<div class="datecheck" id="sec-datecheck"><b>DATE CHECK</b> ${esc(d.meta.datecheck)}</div>
<div class="footer" id="sec-footer">${esc(d.meta.footer)}<br><span class="f2">${esc(d.meta.footer2)}</span></div>
</body></html>`;

writeFileSync(join(dir, "poster.html"), html);
console.log("poster.html bytes:", Buffer.byteLength(html));
