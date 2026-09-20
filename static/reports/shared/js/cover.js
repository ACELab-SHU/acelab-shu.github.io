// Cover · Variant A — infinite die recursion (the object itself recurses: die → wafer of dies)
(function () {
  const canvas = document.getElementById("cover-canvas");
  if (!canvas) return;
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAL = U.PAL;
  const B = U.bindCanvas(canvas);
  let vw = 0, vh = 0;
  const rng = U.makeRng(20260920);

  // Pre-render interior trace textures (circuit routing) — the chip's real interior
  const tiles = [];
  for (let i = 0; i < 8; i++) {
    const t = document.createElement("canvas");
    t.width = t.height = 96;
    const c = t.getContext("2d");
    c.strokeStyle = PAL.inkLo; c.lineWidth = 1; c.globalAlpha = 0.5;
    for (let j = 0; j < 9; j++) {
      // manhattan routing: h-v segments with pads
      let x = rng() * 96, y = rng() * 96;
      c.beginPath(); c.moveTo(x, y);
      for (let k = 0; k < 3; k++) {
        if (rng() > 0.5) x = rng() * 96; else y = rng() * 96;
        c.lineTo(x, y);
      }
      c.stroke();
      c.beginPath(); c.arc(x, y, 1.6, 0, U.TAU); c.stroke();
    }
    // one memory-block array hint
    c.globalAlpha = 0.35;
    const bx = rng() * 48, by = rng() * 48;
    for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++)
      c.strokeRect(bx + q * 9, by + r * 7, 7, 5);
    tiles.push(t);
  }

  // One recognizable die: package + edge pins + die + texture + corner marker
  function drawDie(ctx, x, y, s, alpha, flash) {
    if (alpha <= 0.01 || s < 2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    // package
    ctx.fillStyle = "#0d2c44";
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1, s * 0.012);
    ctx.fillRect(x, y, s, s); ctx.strokeRect(x, y, s, s);
    // pins on four edges
    if (s > 14) {
      const n = Math.max(3, Math.floor(s / 9)), pw = s * 0.028, pl = s * 0.075;
      ctx.fillStyle = "#c8cfda";
      for (let i = 0; i < n; i++) {
        const p = x + s * 0.08 + (s * 0.84) * (i / (n - 1)) - pw / 2;
        ctx.fillRect(p, y - pl, pw, pl); ctx.fillRect(p, y + s, pw, pl);
        const q = y + s * 0.08 + (s * 0.84) * (i / (n - 1)) - pw / 2;
        ctx.fillRect(x - pl, q, pl, pw); ctx.fillRect(x + s, q, pl, pw);
      }
    }
    // die
    const d = s * 0.62, dx = x + (s - d) / 2, dy = y + (s - d) / 2;
    ctx.fillStyle = "#dfe7f0"; ctx.fillRect(dx, dy, d, d);
    ctx.strokeStyle = PAL.inkMd; ctx.lineWidth = 1; ctx.strokeRect(dx, dy, d, d);
    if (s > 26) {
      const ti = Math.abs((x * 7 + y * 13) | 0) % tiles.length;
      ctx.save(); ctx.beginPath(); ctx.rect(dx, dy, d, d); ctx.clip();
      ctx.drawImage(tiles[ti], dx, dy, d, d); ctx.restore();
    }
    // corner marker
    ctx.fillStyle = PAL.inkMd;
    ctx.beginPath(); ctx.arc(x + s * 0.12, y + s * 0.12, Math.max(1, s * 0.03), 0, U.TAU); ctx.fill();
    if (flash > 0) { // birth flash — electric blue
      ctx.globalAlpha = alpha * flash * 0.9;
      ctx.strokeStyle = PAL.red; ctx.lineWidth = Math.max(1.5, s * 0.03);
      ctx.strokeRect(x + 1, y + 1, s - 2, s - 2);
    }
    ctx.restore();
  }

  // Level ℓ: 3×3 block, center cell replaced by level ℓ−1
  const LEVELS = 3;
  function drawLevel(ctx, l, cx, cy, pitch, t) {
    const a = l === 0 ? 1 : U.clamp((t - (l - 1) * 0.42 - 0.18) / 0.22, 0, 1);
    const endFade = l === LEVELS - 1 ? 1 - U.smooth(U.clamp((t - 0.9) / 0.1, 0, 1)) : 1;
    const ringAlpha = a * endFade;
    const flash = a > 0 && a < 0.85 ? 1 - a : 0;
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const x = cx + i * pitch - pitch / 2, y = cy + j * pitch - pitch / 2;
      if (i === 0 && j === 0) {
        // center cell: always recurse — inner levels stay visible even when this ring is hidden
        if (l > 0) drawLevel(ctx, l - 1, cx, cy, pitch / 3, t);
        else drawDie(ctx, x, y, pitch, 1, 0);
      } else if (ringAlpha > 0.01) {
        drawDie(ctx, x, y, pitch, ringAlpha, flash);
      }
    }
  }

  const T = 12; // seconds per recursion layer
  let t0 = null;

  function frame(ts) {
    if (t0 == null) t0 = ts;
    const t = REDUCE ? 0.999 : (((ts - t0) / 1000 / T) % 1);
    const { w, h, cx, cy } = B.fit();
    if (w !== vw || h !== vh) { vw = w; vh = h; }
    const ctx = B.ctx;
    ctx.clearRect(0, 0, w, h);

    const z = Math.pow(3, t);             // content zooms out by 1/z
    const u = Math.min(w, h) * 0.18 / z;  // level-0 pitch (kept small: chips must not swamp the text column)
    // anchor right of the text column
    const ax = w * (w > 900 ? 0.8 : 0.5), ay = h * 0.5;
    drawLevel(ctx, LEVELS - 1, ax, ay, u * Math.pow(3, LEVELS - 1), t);

    // blue viewfinder on the current atom (level-0 cell), fades with phase
    const vf = (1 - t) * 0.9;
    if (vf > 0.02) {
      const s = u, x = ax - s / 2, y = ay - s / 2, L = s * 0.18;
      ctx.save(); ctx.globalAlpha = vf; ctx.strokeStyle = PAL.red; ctx.lineWidth = 2;
      [[x, y, 1, 1], [x + s, y, -1, 1], [x, y + s, 1, -1], [x + s, y + s, -1, -1]].forEach(([px, py, sx, sy]) => {
        ctx.beginPath(); ctx.moveTo(px + sx * L, py); ctx.lineTo(px, py); ctx.lineTo(px, py + sy * L); ctx.stroke();
      });
      ctx.restore();
    }

    // left wash for text legibility — solid plate over the text column, then a soft fade
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.fillRect(0, 0, w * 0.5, h);
    const g = ctx.createLinearGradient(w * 0.5, 0, w * 0.78, 0);
    g.addColorStop(0, "rgba(255,255,255,0.94)"); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.fillRect(w * 0.5, 0, w * 0.28, h);

    if (!REDUCE) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  addEventListener("resize", () => B.fit());
})();
