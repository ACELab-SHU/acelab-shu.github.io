// Source register · K anchors, each dated and graded · bilingual (zh default, *_en for English pages)
window.SRCS = [
  { id: "K1", cat: "company", fact: "Venus v2 FFT 能效 256.0 MSps/W（28nm 归一化），为 Xeon 6434（7.7 MSps/W）的 33.4×；ARM A76 9.7、RTX 2080Ti 8.6 MSps/W。归一化口径：吞吐 ∝ 线宽，能效 ∝ 线宽²。",
    cite: "ACELab · Venus v2 实测归一化 · 团队介绍 deck p21 · 2026-09",
    fact_en: "Venus v2 FFT energy efficiency 256.0 MSps/W (28nm-normalized), 33.4× the Xeon 6434 (7.7 MSps/W); ARM A76 9.7, RTX 2080Ti 8.6 MSps/W. Normalization: throughput ∝ linewidth, efficiency ∝ linewidth².",
    cite_en: "ACELab · Venus v2 measured & normalized · team deck p21 · 2026-09" },
  { id: "K2", cat: "company", fact: "LDPC 译码（CS4 · 码率 340/1024 · 码块 25443 · CPU 单核吞吐；吞吐线性、能效平方工艺归一化）：Venus v2 52.8 Mbps、4.15 nJ/bit/iter @0.5GHz 28nm，吞吐约为 Xeon 的 89%，能耗比 ARM A76 低 84.4×、比 GPU 4090 低 181.8×；ASIC ACC100（0.179）为参考下界。",
    cite: "ACELab · Venus v2 实测 · 团队介绍 deck p22 · 2026-09",
    fact_en: "LDPC decoding (CS4 · rate 340/1024 · block 25443 · single-core CPU throughput; linear throughput / quadratic energy process normalization): Venus v2 52.8 Mbps, 4.15 nJ/bit/iter @0.5GHz 28nm — ~89% of Xeon throughput at 84.4× lower energy than ARM A76 and 181.8× lower than GPU 4090; ASIC ACC100 (0.179) as reference floor.",
    cite_en: "ACELab · Venus v2 measured · team deck p22 · 2026-09" },
  { id: "K3", cat: "company", fact: "idle 功耗（越低越好）：Venus v2 0.027W（单 Tile 口径）、RK3588 2.67W、ACC100 18.0W、RTX 4090 38.27W、AMD 9950X 46.33W、Xeon 6434 68.67W。99% 负载阈值下总功耗 Venus ≈4.36W vs ACC100 ≥19.2W；吞吐需求 <2.06 Gbps 时 Venus 更节能。",
    cite: "ACELab · Venus v2 实测 · 团队介绍 deck p23 · 2026-09",
    fact_en: "Idle power (lower is better): Venus v2 0.027W (single-Tile basis), RK3588 2.67W, ACC100 18.0W, RTX 4090 38.27W, AMD 9950X 46.33W, Xeon 6434 68.67W. Total power at the 99% load threshold: Venus ≈4.36W vs ACC100 ≥19.2W; Venus is more energy-efficient below 2.06 Gbps throughput demand.",
    cite_en: "ACELab · Venus v2 measured · team deck p23 · 2026-09" },
  { id: "K4", cat: "company", fact: "Venus v2 SoC：40nm · 300MHz · 31mm² · 10 核 · 峰值功耗 0.763W · 4 电源域（睡眠/待机/数字前端/计算），MBIST 与故障覆盖保证工业级可测。",
    cite: "ACELab · Venus v2 流片实测 · 团队介绍 deck p24 · 2026-09",
    fact_en: "Venus v2 SoC: 40nm · 300MHz · 31mm² · 10 cores · 0.763W peak power · 4 power domains (sleep / standby / digital front-end / compute); MBIST and fault coverage for industrial-grade testability.",
    cite_en: "ACELab · Venus v2 tape-out measurements · team deck p24 · 2026-09" },
  { id: "K5", cat: "company", fact: "Kuiloong / LPNPU：150 GOPS/mm²（GF 40nm）面积效率、mW 级平均功耗、支持睡眠/待机；头部智能家居厂家控制芯片 IP 处于客户导入（集成验证）阶段——「将集成」不等同于已量产。多级功耗门控：粗触发 µW–百µW → 语义确认 mW 级 → 主系统百mW–W。",
    cite: "ACELab-NPU 简介 · 团队介绍 deck p25–p31 · 2026",
    fact_en: "Kuiloong / LPNPU: 150 GOPS/mm² (GF 40nm) area efficiency, mW-level average power, sleep/standby support; the IP is in customer integration (verification) with a leading smart-home chip maker — 'to be integrated' does not mean mass production. Multi-level power gating: coarse trigger µW–100s µW → semantic confirm mW → main system 100s mW–W.",
    cite_en: "ACELab-NPU brief · team deck p25–p31 · 2026" },
  { id: "K6", cat: "company", fact: "KXP（KV Extension Processor，拟研发）：70B 类 GQA · 32K 上下文 · BF16 口径下，每 Token 跨链路数据量从外部存储方案的 ≈10 GiB 降至 ≈2–3 MiB，跨链路流量降低约 3,000–4,000×；只卸载 Decode Attention 核心，模型主体权重留在 GPU。",
    cite: "ACELab · KXP 技术方案汇报 p10–p17 · 2026-07-25",
    fact_en: "KXP (KV Extension Processor, pre-development): 70B-class GQA · 32K context · BF16 — per-token cross-link traffic drops from ≈10 GiB (external-storage scheme) to ≈2–3 MiB, a ≈3,000–4,000× reduction; only the Decode Attention core is offloaded, model weights stay on the GPU.",
    cite_en: "ACELab · KXP technical proposal p10–p17 · 2026-07-25" },
  { id: "K7", cat: "company", fact: "KXP KV 量化双重收益：INT8 → 容量与 DDR 带宽需求降至 50%，INT4 → 降至 25%，同一片 DDR 可承载 4× 上下文；热 KV 高精度、冷 KV 低精度，按层/Head/Token Block 分别选精度。",
    cite: "ACELab · KXP 技术方案汇报 p14 · 2026-07-25",
    fact_en: "KXP KV quantization double win: INT8 → 50% capacity and DDR bandwidth demand, INT4 → 25%, so one DDR carries 4× context; hot KV in high precision, cold KV in low precision, chosen per layer / Head / Token Block.",
    cite_en: "ACELab · KXP technical proposal p14 · 2026-07-25" },
  { id: "K8", cat: "company", fact: "KV Cache 实测量级（70B 类 GQA · BF16 · 单请求）：8K ≈2.5 GiB、32K ≈10 GiB、128K ≈40 GiB、1M ≈312 GiB——已超过任何单张 GPU 的 HBM 容量。容量随并发数与上下文长度线性增长。",
    cite: "ACELab · KXP 技术方案汇报 p5 · 2026-07-25",
    fact_en: "KV cache measured footprint (70B-class GQA · BF16 · single request): 8K ≈2.5 GiB, 32K ≈10 GiB, 128K ≈40 GiB, 1M ≈312 GiB — beyond any single GPU's HBM. Capacity grows linearly with concurrency and context length.",
    cite_en: "ACELab · KXP technical proposal p5 · 2026-07-25" },
  { id: "K9", cat: "company", fact: "成果实力：TCAS / TCAD / DAC / DATE 等芯片领域顶会顶刊论文；多款芯片成功流片，覆盖 40nm / 28nm；处理器·系统·软件·芯片 4 层全栈能力。",
    cite: "ACELab · 团队介绍 deck p7 · 2026-09",
    fact_en: "Track record: papers at TCAS / TCAD / DAC / DATE and other top venues; multiple successful tape-outs at 40nm / 28nm; full-stack capability across processor · system · software · silicon.",
    cite_en: "ACELab · team deck p7 · 2026-09" },
  { id: "K10", cat: "kimi", fact: "KXP 竞争格局（GPU/CXL 控制器/内存模组/DPU/近存计算）为公开资料整理，KXP 为拟研发产品定位；相邻竞争：Marvell Structera A · SK hynix CMM-Ax。本页不构成投资或采购建议。",
    cite: "公开资料整理 [推演标注] · 依 KXP 技术方案汇报 p8 · 2026-07-25",
    fact_en: "KXP competitive landscape (GPU / CXL controllers / memory modules / DPU / near-memory compute) is compiled from public sources; KXP is a pre-development product; adjacent competition: Marvell Structera A · SK hynix CMM-Ax. This page is not investment or procurement advice.",
    cite_en: "Public-source compilation [marked as inferred] · per KXP technical proposal p8 · 2026-07-25" },
];

// renderer for #source-list — when window.RPT_SOURCE_IDS is set, render only those IDs
(function () {
  const host = document.getElementById("source-list");
  if (!host) return;
  const EN = document.documentElement.lang === "en";
  const CAT = EN
    ? { company: "In-house", industry: "Industry public", broker: "Third-party", kimi: "Compiled/inferred" }
    : { company: "团队自测", industry: "行业公开", broker: "第三方转述", kimi: "整理推演" };
  const only = Array.isArray(window.RPT_SOURCE_IDS) ? new Set(window.RPT_SOURCE_IDS) : null;
  window.SRCS.filter(s => !only || only.has(s.id)).forEach(s => {
    const row = document.createElement("div");
    row.className = "src-row";
    row.innerHTML = `<span class="s-fact"><b>${s.id}</b> · <span class="src-cat ${s.cat}">${CAT[s.cat] || s.cat}</span> ${EN ? s.fact_en : s.fact}</span>
      <span class="s-cite">${EN ? s.cite_en : s.cite}</span>`;
    host.appendChild(row);
  });
})();
