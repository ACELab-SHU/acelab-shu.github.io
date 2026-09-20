// Chart modules · one IIFE per chart, data from window.RPT, drill via U.showDrill
(function () {
  const PAL = U.PAL;
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MONO = 'Menlo, Consolas, "SF Mono", ui-monospace, monospace';
  const SERIF = '"et-book", Palatino, Georgia, serif';

  // shared entrance: fires once when visible, calls draw(p) with p 0→1
  function enter(host, draw) {
    if (REDUCE) { draw(1); return; }
    let done = false;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting || done) return;
        done = true; io.disconnect();
        const t0 = performance.now();
        const tick = now => {
          const p = U.clamp((now - t0) / 900, 0, 1);
          draw(1 - Math.pow(1 - p, 3));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.2 });
    io.observe(host);
  }

  function mkCanvas(body, hCss) {
    body.classList.add("chart-scroll");
    body.tabIndex = 0;
    body.setAttribute("role", "region");
    body.setAttribute("aria-label", document.documentElement.lang.startsWith("en") ? "Interactive chart, scroll horizontally" : "交互图表，可横向滚动");
    const cv = document.createElement("canvas");
    cv.style.width = "100%"; cv.style.height = hCss + "px"; cv.style.display = "block";
    body.appendChild(cv);
    return U.bindCanvas(cv);
  }
  const hits = new WeakMap(); // canvas → [{x,y,w,h,data}]
  function hit(canvas, list) { hits.set(canvas, list); }
  document.addEventListener("click", e => {
    const cv = e.target.closest && e.target.closest("canvas");
    if (!cv || !hits.has(cv)) return;
    const r = cv.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const h = hits.get(cv).find(z => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);
    if (h) U.showDrill({ ...h.data, x: e.clientX, y: e.clientY });
  });
  function haloText(ctx, s, x, y, align = "left") {
    ctx.textAlign = align;
    ctx.lineWidth = 4; ctx.strokeStyle = PAL.paper;
    ctx.strokeText(s, x, y); ctx.fillText(s, x, y);
  }

  /* ── §0 signature · FFT energy efficiency, 28nm-normalized ── */
  (function () {
    const host = document.getElementById("fft-chart");
    if (!host) return;
    const T = window.RPT.t;
    const body = U.frame(host, { title: T.fftTitle, sub: T.fftSub, src: T.fftSrc });
    const rows = U ? window.RPT.fft : [];
    const H = 62 * rows.length + 44;
    const cv = mkCanvas(body, H);
    const maxV = 260;
    function draw(p) {
      const { w } = cv.fit(); const ctx = cv.ctx;
      ctx.clearRect(0, 0, w, H);
      const x0 = 132, x1 = w - 96, bw = x1 - x0;
      const list = [];
      rows.forEach((r, i) => {
        const y = 18 + i * 62;
        const wBar = Math.max(2, (r.mspsw / maxV) * bw) * p;
        ctx.font = `700 12px ${MONO}`; ctx.fillStyle = PAL.ink;
        haloText(ctx, r.name.toUpperCase(), x0 - 12, y + 24, "right");
        ctx.font = `10px ${MONO}`; ctx.fillStyle = PAL.inkLo;
        haloText(ctx, r.note, x0 - 12, y + 40, "right");
        ctx.fillStyle = r.hero ? PAL.red : PAL.inkMd;
        ctx.fillRect(x0, y + 8, wBar, 26);
        if (wBar > 4) { ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(x0, y + 8, Math.min(3, wBar), 26); }
        // value label: inside the bar (white, right-aligned) when the bar reaches the ratio badge zone
        const valTxt = `${r.mspsw.toFixed(1)} MSps/W`;
        ctx.font = `700 14px ${MONO}`;
        const valW = ctx.measureText(valTxt).width;
        if (x0 + wBar + 10 + valW > w - 78 && wBar > valW + 24) {
          // inside the hero bar: plain white text, no paper halo
          ctx.fillStyle = "#fff"; ctx.textAlign = "right";
          ctx.fillText(valTxt, x0 + wBar - 10, y + 26);
        } else {
          ctx.fillStyle = r.hero ? PAL.red : PAL.ink;
          haloText(ctx, valTxt, x0 + wBar + 10, y + 26);
        }
        ctx.font = `700 15px ${MONO}`; ctx.fillStyle = r.hero ? PAL.red : PAL.inkLo;
        haloText(ctx, `${r.ratio}×`, w - 20, y + 26, "right");
        list.push({ x: 0, y: y, w: w, h: 52, data: {
          title: T.fftDrillTitle(r),
          value: `${r.mspsw.toFixed(1)} MSps/W · ${r.ratio}×`,
          sub: T.fftDrillSub(r),
          source: T.fftDrillSrc,
        }});
      });
      ctx.strokeStyle = PAL.line; ctx.beginPath(); ctx.moveTo(x0, H - 14); ctx.lineTo(x1, H - 14); ctx.stroke();
      hit(cv.canvas, list);
    }
    enter(host, draw);
    addEventListener("resize", () => draw(1));
  })();

  /* ── §1 · idle power, log scale ── */
  (function () {
    const host = document.getElementById("idle-chart");
    if (!host) return;
    const T = window.RPT.t;
    const body = U.frame(host, { title: T.idleTitle, sub: T.idleSub, src: T.idleSrc });
    const rows = window.RPT.idle;
    const H = 52 * rows.length + 56;
    const cv = mkCanvas(body, H);
    const LO = Math.log10(0.01), HI = Math.log10(100);
    function draw(p) {
      const { w } = cv.fit(); const ctx = cv.ctx;
      ctx.clearRect(0, 0, w, H);
      const x0 = 130, x1 = w - 120, bw = x1 - x0;
      // log gridlines
      ctx.font = `9.5px ${MONO}`; ctx.fillStyle = PAL.inkLo;
      [0.01, 0.1, 1, 10, 100].forEach(v => {
        const x = x0 + ((Math.log10(v) - LO) / (HI - LO)) * bw;
        ctx.strokeStyle = PAL.lineLo; ctx.beginPath(); ctx.moveTo(x, 8); ctx.lineTo(x, H - 34); ctx.stroke();
        haloText(ctx, v + "W", x, H - 18, "center");
      });
      const list = [];
      rows.forEach((r, i) => {
        const y = 12 + i * 52;
        const frac = (Math.log10(r.w) - LO) / (HI - LO);
        const wBar = Math.max(2, frac * bw) * p;
        ctx.font = `700 12px ${MONO}`; ctx.fillStyle = PAL.ink;
        haloText(ctx, r.name.toUpperCase(), x0 - 12, y + 20, "right");
        ctx.fillStyle = r.hero ? PAL.red : PAL.inkMd;
        ctx.fillRect(x0, y + 4, wBar, 22);
        ctx.font = `700 13px ${MONO}`; ctx.fillStyle = r.hero ? PAL.red : PAL.inkMd;
        haloText(ctx, r.w < 1 ? r.w + " W" : r.w.toFixed(1) + " W", x0 + wBar + 8, y + 21);
        list.push({ x: 0, y, w, h: 44, data: {
          title: T.idleDrillTitle(r),
          value: `${r.w} W`,
          sub: T.idleDrillSub(r),
          source: T.idleDrillSrc,
        }});
      });
      hit(cv.canvas, list);
    }
    enter(host, draw);
    addEventListener("resize", () => draw(1));
  })();

  /* ── §3 · KXP cross-link traffic per token, log scale ── */
  (function () {
    const host = document.getElementById("kxp-chart");
    if (!host) return;
    const T = window.RPT.t;
    const body = U.frame(host, { title: T.kxpTitle, sub: T.kxpSub, src: T.kxpSrc });
    const rows = window.RPT.kxp_flow;
    const H = 210;
    const cv = mkCanvas(body, H);
    const LO = Math.log10(1), HI = Math.log10(16384);
    function draw(p) {
      const { w } = cv.fit(); const ctx = cv.ctx;
      ctx.clearRect(0, 0, w, H);
      const y0 = 20, y1 = H - 58, bh = y1 - y0;
      ctx.font = `9.5px ${MONO}`; ctx.fillStyle = PAL.inkLo;
      [1, 16, 256, 4096, 16384].forEach(v => {
        const y = y1 - ((Math.log10(v) - LO) / (HI - LO)) * bh;
        ctx.strokeStyle = PAL.lineLo; ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(w - 30, y); ctx.stroke();
        haloText(ctx, v >= 1024 ? (v / 1024) + " GiB" : v + " MiB", 34, y - 4);
      });
      const list = [];
      const colW = (w - 120) / rows.length;
      rows.forEach((r, i) => {
        const cx = 60 + colW * i + colW / 2;
        const frac = (Math.log10(r.mib) - LO) / (HI - LO);
        const hBar = Math.max(3, frac * bh) * p;
        const bw2 = Math.min(150, colW * 0.52);
        ctx.fillStyle = r.hero ? PAL.red : PAL.inkMd;
        ctx.fillRect(cx - bw2 / 2, y1 - hBar, bw2, hBar);
        ctx.font = `700 15px ${MONO}`; ctx.fillStyle = r.hero ? PAL.red : PAL.ink;
        haloText(ctx, r.label, cx, y1 - hBar - 12, "center");
        ctx.font = `11px ${MONO}`; ctx.fillStyle = PAL.ink;
        haloText(ctx, r.name, cx, y1 + 20, "center");
        ctx.font = `9.5px ${MONO}`; ctx.fillStyle = PAL.inkLo;
        haloText(ctx, r.note, cx, y1 + 38, "center");
        list.push({ x: cx - bw2 / 2 - 12, y: y1 - hBar - 30, w: bw2 + 24, h: hBar + 34, data: {
          title: T.kxpDrillTitle(r),
          value: r.label,
          sub: T.kxpDrillSub(r),
          source: T.kxpDrillSrc,
        }});
      });
      // ratio badge
      ctx.font = `700 13px ${MONO}`; ctx.fillStyle = PAL.red;
      haloText(ctx, "≈ 3,000–4,000×", w / 2, 34, "center");
      ctx.strokeStyle = PAL.red; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(60 + colW / 2, 46); ctx.lineTo(60 + colW + colW / 2, 46); ctx.stroke();
      ctx.setLineDash([]);
      hit(cv.canvas, list);
    }
    enter(host, draw);
    addEventListener("resize", () => draw(1));
  })();

  /* ── §3 · KV quantization paired bars ── */
  (function () {
    const host = document.getElementById("kv-chart");
    if (!host) return;
    const T = window.RPT.t;
    const body = U.frame(host, { title: T.kvTitle, sub: T.kvSub, src: T.kvSrc });
    const rows = window.RPT.kv_quant;
    const H = 220;
    const cv = mkCanvas(body, H);
    function draw(p) {
      const { w } = cv.fit(); const ctx = cv.ctx;
      ctx.clearRect(0, 0, w, H);
      const y0 = 24, y1 = H - 52, bh = y1 - y0;
      const colW = (w - 80) / rows.length;
      const list = [];
      rows.forEach((r, i) => {
        const cx = 40 + colW * i + colW / 2;
        const bw = Math.min(46, colW * 0.2), gap = 8;
        const hCap = (r.cap / 100) * bh * p, hBw = (r.bw / 100) * bh * p;
        ctx.fillStyle = PAL.red; ctx.fillRect(cx - bw - gap / 2, y1 - hCap, bw, hCap);
        ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx + gap / 2, y1 - hBw, bw, hBw);
        ctx.fillStyle = "rgba(5,28,44,.12)"; ctx.fillRect(cx + gap / 2, y1 - hBw, bw, hBw);
        ctx.font = `700 12px ${MONO}`; ctx.fillStyle = PAL.red;
        haloText(ctx, r.cap + "%", cx - bw - gap / 2 + bw / 2, y1 - hCap - 8, "center");
        ctx.fillStyle = PAL.inkMd;
        haloText(ctx, r.bw + "%", cx + gap / 2 + bw / 2, y1 - hBw - 8, "center");
        ctx.font = `700 12px ${MONO}`; ctx.fillStyle = PAL.ink;
        haloText(ctx, r.fmt, cx, y1 + 20, "center");
        if (r.note) { ctx.font = `700 11px ${MONO}`; ctx.fillStyle = PAL.red; haloText(ctx, r.note, cx, y1 + 38, "center"); }
        list.push({ x: cx - bw - gap, y: y0, w: 2 * bw + 2 * gap, h: bh, data: {
          title: T.kvDrillTitle(r),
          value: T.kvDrillValue(r),
          sub: T.kvDrillSub,
          source: T.kvDrillSrc,
        }});
      });
      // legend — top-right, clear of the BF16 column's value labels
      ctx.font = `10px ${MONO}`;
      ctx.fillStyle = PAL.red; ctx.fillRect(w - 210, 6, 10, 10);
      ctx.fillStyle = PAL.inkMd; haloText(ctx, T.kvLegendCap, w - 194, 15);
      ctx.strokeStyle = PAL.ink; ctx.strokeRect(w - 120, 6, 10, 10);
      haloText(ctx, T.kvLegendBw, w - 104, 15);
      hit(cv.canvas, list);
    }
    enter(host, draw);
    addEventListener("resize", () => draw(1));
  })();

  /* ── §2 · Kuiloong cascade (power-gating ladder, real W units) ── */
  (function () {
    const host = document.getElementById("cascade-chart");
    if (!host) return;
    const T = window.RPT.t;
    const body = U.frame(host, { title: T.casTitle, sub: T.casSub, src: T.casSrc });
    const rows = window.RPT.cascade;
    const H = 190;
    const cv = mkCanvas(body, H);
    const LO = Math.log10(1e-6), HI = Math.log10(10);
    function draw(p) {
      const { w } = cv.fit(); const ctx = cv.ctx;
      ctx.clearRect(0, 0, w, H);
      const x0 = 20, x1 = w - 20, bw = x1 - x0;
      const axisY = 108;
      ctx.font = `9.5px ${MONO}`; ctx.fillStyle = PAL.inkLo;
      ["1µW", "100µW", "10mW", "1W", "10W"].forEach((s, i) => {
        const v = Math.pow(10, -6 + i * 2);
        const x = x0 + ((Math.log10(v) - LO) / (HI - LO)) * bw;
        ctx.strokeStyle = PAL.lineLo; ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x, axisY + 8); ctx.stroke();
        haloText(ctx, s, x, axisY + 24, "center");
      });
      ctx.strokeStyle = PAL.line; ctx.beginPath(); ctx.moveTo(x0, axisY); ctx.lineTo(x1, axisY); ctx.stroke();
      const list = [];
      rows.forEach((r, i) => {
        const xa = x0 + ((Math.log10(r.w_lo) - LO) / (HI - LO)) * bw;
        const xb = x0 + ((Math.log10(r.w_hi) - LO) / (HI - LO)) * bw;
        const xa2 = xa + (xb - xa) * (1 - p) / 2, xb2 = xb - (xb - xa) * (1 - p) / 2;
        const hero = i === 1;
        // stage band
        ctx.fillStyle = hero ? "rgba(34,81,255,.14)" : "rgba(5,28,44,.08)";
        ctx.fillRect(xa2, axisY - 26 * p - 6, (xb2 - xa2), 32);
        ctx.strokeStyle = hero ? PAL.red : PAL.inkMd; ctx.lineWidth = hero ? 2 : 1.2;
        ctx.strokeRect(xa2, axisY - 26 * p - 6, (xb2 - xa2), 32);
        // arrow to next stage
        if (i < rows.length - 1) {
          ctx.strokeStyle = PAL.inkLo; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(xb2 + 4, axisY - 10); ctx.lineTo(xb2 + 26, axisY - 10); ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.font = `700 14px ${SERIF}`; ctx.fillStyle = PAL.ink;
        haloText(ctx, `${i + 1} · ${r.stage}`, xa, 32);
        ctx.font = `10px ${MONO}`; ctx.fillStyle = hero ? PAL.red : PAL.inkMd;
        haloText(ctx, `${r.power} · ${r.dev}`, xa, 54);
        list.push({ x: xa - 4, y: 20, w: Math.max(70, xb - xa + 40), h: axisY - 8, data: {
          title: T.casDrillTitle(i, r),
          value: r.power,
          sub: T.casDrillSub(r),
          source: T.casDrillSrc,
        }});
      });
      hit(cv.canvas, list);
    }
    enter(host, draw);
    addEventListener("resize", () => draw(1));
  })();
})();
