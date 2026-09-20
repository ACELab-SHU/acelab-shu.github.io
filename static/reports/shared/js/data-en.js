// English overrides · loaded after data.js on EN pages (document lang = en)
(function () {
  const R = window.RPT;
  R.fft.forEach(r => {
    const m = {
      "Xeon 6434": "General CPU · 2.9 GHz · Intel 7",
      "ARM A76": "ARM server core",
      "RTX 2080Ti": "General GPU",
      "Venus v2": "ACELab · RISC-V fusion baseband",
    };
    r.note = m[r.name] || r.note;
  });
  R.idle.forEach(r => {
    const m = {
      "Venus v2": "Single-Tile measured basis",
      "RK3588": "ARM SoC",
      "ACC100": "ASIC reference",
      "RTX 4090": "GPU",
      "AMD 9950X": "Desktop CPU",
      "Xeon 6434": "Server CPU",
    };
    r.note = m[r.name] || r.note;
  });
  R.venus_spec = [
    ["Process node", "40 nm", "Backend implementation, silicon-measured"],
    ["Clock", "300 MHz", "Sustained real-time processing"],
    ["Die area", "31 mm²", "For sensing-communication integration & multi-mode"],
    ["Compute cores", "10", "Compute clusters gated per task"],
    ["Peak power", "0.763 W", "Always-on domain keeps fast wakeup"],
    ["Power domains", "4", "Sleep / standby / front-end / compute"],
  ];
  R.cascade = [
    { stage: "Coarse trigger", dev: "PIR / Mic / IMU", power: "µW – 100s µW", w_lo: 1e-6, w_hi: 1e-4,
      gist: "ultra-low-power check for motion / sound / vibration." },
    { stage: "Semantic confirm", dev: "Kuiloong Always-on NPU", power: "mW-level", w_lo: 1e-3, w_hi: 5e-3,
      gist: "recognizes person / pet / vehicle / package, filters shadows and lighting, detects keywords." },
    { stage: "On-demand takeover", dev: "Main SoC / radio", power: "100s mW – W", w_lo: 1e-1, w_hi: 2,
      gist: "recording, HD recognition and wireless transfer start only after confirmation." },
  ];
  R.kuiloong_metrics = [
    { v: "150", k: "GOPS/mm² area efficiency (GF 40nm, in smart-home control chip)" },
    { v: "mW-level", k: "Average power, sleep / standby modes" },
    { v: "INT8/4", k: "Pruning + PTQ, end-to-end compiled deployment" },
    { v: "5–10×", k: "Main-SoC wakeup reduction target in customer co-creation (6–12 mo)" },
  ];
  R.kxp_flow = [
    { name: "External DDR + GPU compute", mib: 10240, label: "≈ 10 GiB / token", note: "All historical KV hauled back to the GPU every token" },
    { name: "KXP near-memory compute", mib: 2.5, label: "≈ 2–3 MiB / token", note: "Only Query, new K/V and Attention results cross the link", hero: true },
  ];
  R.kv_quant[2].note = "Effective context capacity ×4";
  R.proof = [
    ["Top venues", "TCAS · TCAD · DAC · DATE", "Top conferences & journals in silicon"],
    ["Tape-outs", "Multiple · 40nm / 28nm", "Complete evidence chain from architecture to silicon"],
    ["Full stack", "4 layers", "Processor · system · software · silicon"],
    ["Technical lines", "2", "Fusion baseband · sensing NPU / KV extension"],
  ];
  R.t = {
    fftTitle: "FFT efficiency: Venus v2 at 33.4× general-purpose platforms",
    fftSub: "28NM-NORMALIZED EFFICIENCY · MSPS/W · CLICK ANY ROW FOR BASIS & SOURCE",
    fftSrc: "In-house · Venus v2 measured & normalized (K1) · 2026-09",
    fftDrillTitle: r => `FFT efficiency · ${r.name}`,
    fftDrillSub: r => `28nm normalization (throughput ∝ linewidth, efficiency ∝ linewidth²) · vs Xeon 6434. ${r.note}`,
    fftDrillSrc: "ACELab Venus v2 measured & normalized · 2026-09 (K1)",
    idleTitle: "Idle power decides deployment energy: Venus 0.027W, two orders below rivals",
    idleSub: "IDLE POWER PER PLATFORM (W) · LOG SCALE · CLICK A ROW FOR BASIS",
    idleSrc: "In-house · Venus v2 measured (K3) · 2026-09",
    idleDrillTitle: r => `Idle power · ${r.name}`,
    idleDrillSub: r => `${r.note}. Total power at the 99% load threshold: Venus ≈4.36W vs ACC100 ≥19.2W (≈4.4× lower); Venus beats ACC100 below 2.06 Gbps throughput demand.`,
    idleDrillSrc: "ACELab Venus v2 measured · 2026-09 (K3)",
    kxpTitle: "From hauling all history KV back, to sending only Query & results: 3–4 orders less cross-link traffic",
    kxpSub: "CROSS-LINK DATA PER TOKEN (MIB, LOG SCALE) · 70B-CLASS GQA · 32K CONTEXT · BF16 KV",
    kxpSrc: "In-house design estimate · KXP technical proposal (K6) · 2026-07-25",
    kxpDrillTitle: r => `Cross-link traffic · ${r.name}`,
    kxpDrillSub: r => `${r.note}. Cross-link complexity falls from O(L·d), growing with context, to roughly fixed O(d). KXP does not remove standard Attention's need to read history KV — local DDR still scans it all.`,
    kxpDrillSrc: "KXP technical proposal p16–p17 · 2026-07-25 (K6)",
    kvTitle: "INT4 quantization: capacity & DDR bandwidth demand both drop to 25%, effective context ×4",
    kvSub: "RELATIVE CAPACITY / BANDWIDTH DEMAND PER KV FORMAT (%) · READ IN PAIRS · CLICK A BAR FOR DESIGN NOTES",
    kvSrc: "In-house design estimate · KXP technical proposal (K7) · 2026-07-25",
    kvLegendCap: "Rel. capacity",
    kvLegendBw: "Rel. bandwidth",
    kvDrillValue: r => `Capacity ${r.cap}% · Bandwidth ${r.bw}%`,
    kvDrillTitle: r => `KV quantization · ${r.fmt}`,
    kvDrillSub: "Quantization wins twice: capacity falls and bytes hauled per scan fall with it. Hot KV in high precision, cold KV in low; precision chosen per layer, Head or Token Block — no full BF16 intermediate buffer.",
    kvDrillSrc: "KXP technical proposal p14 · 2026-07-25 (K7)",
    casTitle: "Three-level power gating: µW coarse trigger → mW semantic confirm → on-demand main system",
    casSub: "POWER RANGE PER LEVEL (W, LOG SCALE) · RAW DATA NEVER LEAVES; THE NPU EMITS ONLY LABELS & CONFIDENCE",
    casSrc: "ACELab-NPU brief (K5) · 2026",
    casDrillTitle: (i, r) => `Gating level ${i + 1} · ${r.stage}`,
    casDrillSub: r => `${r.dev}: ${r.gist} Design rule: raw data never leaves; the NPU emits only labels, confidence, simple boxes or state; the main system wakes only after confirmation.`,
    casDrillSrc: "ACELab-NPU brief · team deck p26 (K5) · 2026",
  };
})();
