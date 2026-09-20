// Data layer · window.RPT — every number traces to js/sources.js (K anchors)
window.RPT = {
  // K1 · FFT energy efficiency, 28nm-normalized, vs Xeon 6434 = 1.0×
  fft: [
    { name: "Xeon 6434",  mspsw: 7.7,   ratio: 1.0,  note: "通用 CPU · 2.9 GHz · Intel 7" },
    { name: "ARM A76",    mspsw: 9.7,   ratio: 1.26, note: "ARM 服务器核" },
    { name: "RTX 2080Ti", mspsw: 8.6,   ratio: 1.12, note: "通用 GPU" },
    { name: "Venus v2",   mspsw: 256.0, ratio: 33.4, note: "ACELab · RISC-V 融合基带", hero: true },
  ],
  // K2 · LDPC decoding, CS4 · rate 340/1024 · block 25443
  ldpc: [
    { name: "Xeon 6434", freq: "2.9 GHz", node: "Intel 7", tput: 59.4, energy: 834.9 },
    { name: "AMD 9950X", freq: "2.9 GHz", node: "4 nm",    tput: 57.4, energy: 1914.9 },
    { name: "ARM A76",   freq: "2.304 GHz", node: "8 nm",  tput: 15.9, energy: 350.4 },
    { name: "ARM A55",   freq: "1.8 GHz", node: "8 nm",    tput: 3.5,  energy: 401.8 },
    { name: "GPU 4090",  freq: "1.515 GHz", node: "4 nm",  tput: 13.2, energy: 754.6 },
    { name: "Venus v2",  freq: "0.5 GHz", node: "28 nm",   tput: 52.8, energy: 4.15, hero: true },
  ],
  // K3 · idle power (W, lower is better)
  idle: [
    { name: "Venus v2",   w: 0.027, note: "单 Tile 实测口径", hero: true },
    { name: "RK3588",     w: 2.67,  note: "ARM SoC" },
    { name: "ACC100",     w: 18.0,  note: "ASIC 参考" },
    { name: "RTX 4090",   w: 38.27, note: "GPU" },
    { name: "AMD 9950X",  w: 46.33, note: "桌面 CPU" },
    { name: "Xeon 6434",  w: 68.67, note: "服务器 CPU" },
  ],
  // K4 · Venus v2 silicon specs
  venus_spec: [
    ["工艺节点", "40 nm", "后端实现与实测"],
    ["主频", "300 MHz", "持续实时处理"],
    ["芯片面积", "31 mm²", "面向通感一体与多制式"],
    ["计算核心", "10 核", "计算簇按任务启停"],
    ["峰值功耗", "0.763 W", "常开域维持快速唤醒"],
    ["电源域", "4 域", "睡眠 / 待机 / 前端 / 计算"],
  ],
  // K5 · Kuiloong cascade power gating (W)
  cascade: [
    { stage: "粗触发", dev: "PIR / 麦克风 / IMU", power: "µW – 百µW", w_lo: 1e-6, w_hi: 1e-4,
      gist: "极低功耗判断「有动静 / 有声音 / 有振动」。" },
    { stage: "语义确认", dev: "Kuiloong Always-on NPU", power: "mW 级", w_lo: 1e-3, w_hi: 5e-3,
      gist: "识别人 / 宠物 / 车 / 包裹，过滤树影与光照，识别关键词。" },
    { stage: "按需接管", dev: "主 SoC / 无线模块", power: "百mW – W", w_lo: 1e-1, w_hi: 2,
      gist: "录像、高清识别、无线传输，仅在确认后启动。" },
  ],
  kuiloong_metrics: [
    { v: "150", k: "GOPS/mm² 面积效率（GF 40nm，集成于智能家电控制芯片）" },
    { v: "mW 级", k: "平均功耗，支持睡眠 / 待机模式" },
    { v: "INT8/4", k: "剪枝 + PTQ 量化，端到端编译部署" },
    { v: "5–10×", k: "客户共创阶段主 SoC 唤醒下降目标（6–12 月）" },
  ],
  // K6 · KXP cross-link traffic per token (MiB), 70B GQA · 32K ctx · BF16
  kxp_flow: [
    { name: "外部 DDR 存储 + GPU 计算", mib: 10240, label: "≈ 10 GiB / token", note: "全部历史 KV 逐 Token 搬回 GPU" },
    { name: "KXP 近存计算", mib: 2.5, label: "≈ 2–3 MiB / token", note: "只传 Query、新 K/V 与 Attention 结果", hero: true },
  ],
  kxp_ratio: { lo: 3000, hi: 4000 },
  // K7 · KV quantization: relative capacity & bandwidth demand (%)
  kv_quant: [
    { fmt: "BF16", cap: 100, bw: 100 },
    { fmt: "INT8", cap: 50,  bw: 50 },
    { fmt: "INT4", cap: 25,  bw: 25,  note: "等效上下文容量 ×4" },
  ],
  // K8 · KV cache footprint, 70B-class GQA, BF16, single request
  kv_growth: [
    ["8K", "≈ 2.5 GiB"], ["32K", "≈ 10 GiB"], ["128K", "≈ 40 GiB"], ["1M", "≈ 312 GiB"],
  ],
  // K9 · track record
  proof: [
    ["顶会 / 顶刊", "TCAS · TCAD · DAC · DATE", "芯片领域顶级会议与期刊"],
    ["成功流片", "多款 · 40nm / 28nm", "从架构到硅片的完整证据链"],
    ["全栈能力", "4 层", "处理器 · 系统 · 软件 · 芯片"],
    ["技术主线", "2 条", "融合基带 · 感知 NPU / KV 扩展"],
  ],
  // UI strings (zh) — EN pages load data-en.js after this file to override
  t: {
    fftTitle: "FFT 能效：Venus v2 达通用平台的 33.4 倍",
    fftSub: "28NM 归一化能效 · MSPS/W · 点击任意一行查看口径与来源",
    fftSrc: "团队自测 · Venus v2 实测归一化（K1）· 2026-09",
    fftDrillTitle: r => `FFT 能效 · ${r.name}`,
    fftDrillSub: r => `28nm 归一化（吞吐 ∝ 线宽，能效 ∝ 线宽²）· 相对 Xeon 6434。${r.note}`,
    fftDrillSrc: "ACELab Venus v2 实测归一化 · 2026-09（K1）",
    idleTitle: "idle 功耗决定部署能耗：Venus 0.027W，低竞品两个数量级",
    idleSub: "各平台 IDLE 功耗（W）· 对数坐标 · 点击行查看口径",
    idleSrc: "团队自测 · Venus v2 实测（K3）· 2026-09",
    idleDrillTitle: r => `idle 功耗 · ${r.name}`,
    idleDrillSub: r => `${r.note}。99% 负载阈值下总功耗 Venus ≈4.36W vs ACC100 ≥19.2W（≈4.4× 更低）；吞吐 <2.06 Gbps 时 Venus 比 ACC100 更节能。`,
    idleDrillSrc: "ACELab Venus v2 实测 · 2026-09（K3）",
    kxpTitle: "从搬回全部历史 KV，到只传 Query 与结果：跨链路流量降 3–4 个数量级",
    kxpSub: "每 TOKEN 跨链路数据量（MIB，对数坐标）· 70B 类 GQA · 32K 上下文 · BF16 KV",
    kxpSrc: "团队方案测算 · KXP 技术方案汇报（K6）· 2026-07-25",
    kxpDrillTitle: r => `跨链路流量 · ${r.name}`,
    kxpDrillSub: r => `${r.note}。跨链路复杂度从随上下文增长的 O(L·d) 降为近似固定的 O(d)。KXP 未消除标准 Attention 对历史 KV 的读取需求——本地 DDR 仍需扫描全部历史 KV。`,
    kxpDrillSrc: "KXP 技术方案汇报 p16–p17 · 2026-07-25（K6）",
    kvTitle: "INT4 量化：容量与 DDR 带宽需求同降至 25%，等效上下文 ×4",
    kvSub: "KV 格式的相对容量 / 相对带宽需求（%）· 成对读取 · 点击柱子查看设计要点",
    kvSrc: "团队方案测算 · KXP 技术方案汇报（K7）· 2026-07-25",
    kvLegendCap: "相对容量",
    kvLegendBw: "相对带宽",
    kvDrillValue: r => `容量 ${r.cap}% · 带宽 ${r.bw}%`,
    kvDrillTitle: r => `KV 量化 · ${r.fmt}`,
    kvDrillSub: "量化双重收益：容量下降的同时，每次扫描搬运的字节数同比下降。热 KV 高精度、冷 KV 低精度；按层、按 Head 或按 Token Block 分别选择精度，不产生完整 BF16 中间缓存。",
    kvDrillSrc: "KXP 技术方案汇报 p14 · 2026-07-25（K7）",
    casTitle: "三级功耗门控：粗触发 µW → 语义确认 mW → 主系统按需接管",
    casSub: "每级功耗区间（W，对数坐标）· 原始数据不外流，NPU 只输出标签与置信度",
    casSrc: "ACELab-NPU 简介（K5）· 2026",
    casDrillTitle: (i, r) => `门控第 ${i + 1} 级 · ${r.stage}`,
    casDrillSub: r => `${r.dev}：${r.gist} 系统设计规则：原始数据不外流，NPU 只输出标签、置信度、简单框或状态；确认后再唤醒主系统。`,
    casDrillSrc: "ACELab-NPU 简介 · 团队介绍 deck p26（K5）· 2026",
  },
};
