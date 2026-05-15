import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", variant, asChild = false }) {
  const variantClass =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
      : "text-white";

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${variantClass} inline-flex items-center justify-center font-medium transition-colors ${className} ${
        children.props.className || ""
      }`,
    });
  }

  return (
    <button
      className={`${variantClass} inline-flex items-center justify-center font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

const PAPER_URL = "https://arxiv.org/abs/2507.15774";
const CODE_URL = "https://github.com/ARBrachet/PRO-DYN";

const ALL_FAMILIES = "All TSF families";
const ALL_CONFIGS = "All model configurations";
const ALL_DYNAMICS = "All dynamics";

const modelPaperUrls = {
  DUET: "https://dl.acm.org/doi/10.1145/3711896.3737184",
  PDF: "https://openreview.net/forum?id=dp27P5HBBt",
  Pathformer: "https://openreview.net/forum?id=lJkOCMP2aW",
  iTransformer: "https://openreview.net/forum?id=JePfAI8fah",
  PatchTST: "https://openreview.net/forum?id=Jbdc0vTOcol",
  Crossformer: "https://openreview.net/forum?id=vSVLM2j9eie",
  TimeMixer: "https://openreview.net/forum?id=7oLshfEIC2",
  NLinear: "https://ojs.aaai.org/index.php/AAAI/article/view/26317",
  FITS: "https://openreview.net/forum?id=bWcnvZ3qMb",
  TimesNet: "https://openreview.net/forum?id=ju_Uqw384Oq",
  Triformer: "https://doi.org/10.24963/ijcai.2022/277",
  FEDformer: "https://proceedings.mlr.press/v162/zhou22g.html",
  MICN: "https://openreview.net/forum?id=zt53IDUR1U",
  "NS Transformer": "https://openreview.net/forum?id=ucNDIDRNjjv",
  FiLM: "https://openreview.net/forum?id=zTQdHSQUQWc",
  Informer: "https://doi.org/10.1609/aaai.v35i12.17325",
  TiDE: "https://openreview.net/forum?id=pCbC3aQB5W",
  Pyraformer: "https://openreview.net/forum?id=0EXmFzUn5I",
  Autoformer:
    "https://proceedings.neurips.cc/paper_files/paper/2021/file/bcc0d400288793e8bdcd7c19a8ac0c2b-Paper.pdf",
  PSformer: "https://arxiv.org/abs/2411.01419",
  EDformer: "https://arxiv.org/abs/2412.12227",
  Sensoformer: "https://arxiv.org/abs/2501.03284",
  FourierGNN: "https://openreview.net/forum?id=bGs1qWQ1Fx",
  TimeFilter: "https://openreview.net/forum?id=490VcNtjh7",
  TCN: "https://arxiv.org/abs/1803.01271",
  RNN: "https://doi.org/10.1207/s15516709cog1402_1",
  TimeGrad: "https://proceedings.mlr.press/v139/rasul21a.html",
  Chronos: "https://openreview.net/forum?id=gerNCVqqtR",
  Moment: "https://openreview.net/forum?id=FVvf69a5rx",
  "Lag-Llama": "https://openreview.net/forum?id=jYluzCLFDM",
  Toto: "https://openreview.net/forum?id=1jDAYXfcS2",
  Moirai: "https://proceedings.mlr.press/v235/woo24a.html",
  TTMs: "https://openreview.net/forum?id=3O5YCEWETq",
  ROSE: "https://openreview.net/forum?id=6J9tJKK4YI",
  Attraos: "https://openreview.net/forum?id=fEYHZzN7kX",
  DeepEDM: "https://openreview.net/forum?id=LLk1qYQatJ",
  Koopa: "https://openreview.net/forum?id=A4zzxu82a7",
  KNF: "https://openreview.net/forum?id=kUmdmHxK5N",
  "MZ-AE": "https://arxiv.org/abs/2310.10745",
  K2VAE: "https://openreview.net/forum?id=71Mm8GDGYd",
  SpaceTime: "https://arxiv.org/abs/2303.09489",
  DYffusion: "https://openreview.net/forum?id=WRGldGm5Hz",
  DyDiff: "https://openreview.net/forum?id=c5JZEPyFUE",
};

const models = [
  { family: "Pattern-based", model: "DUET", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Qiu et al., 2025", status: "above NLinear" },
  { family: "Pattern-based", model: "PDF", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer + CNN", reference: "Dai et al., 2024", status: "above NLinear" },
  { family: "Pattern-based", model: "Pathformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Chen et al., 2024", status: "above NLinear" },
  { family: "Pattern-based", model: "iTransformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Liu et al., 2024", status: "above NLinear" },
  { family: "Pattern-based", model: "PatchTST", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Nie et al., 2023", status: "above NLinear" },
  { family: "Pattern-based", model: "Crossformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Zhang & Yan, 2023", status: "above NLinear" },
  { family: "Pattern-based", model: "TimeMixer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "MLP", reference: "Wang et al., 2024", status: "above NLinear" },
  { family: "Pattern-based", model: "NLinear", learnable: true, config: "DYN", dyn: "Linear", backbone: "None", reference: "Zeng et al., 2023", status: "reference" },
  { family: "Pattern-based", model: "FITS", learnable: false, config: "PRE-DYN", dyn: "Linear + 0-padding", backbone: "Filtering", reference: "Xu et al., 2024", status: "below NLinear" },
  { family: "Pattern-based", model: "TimesNet", learnable: true, config: "PRE-DYN-POST", dyn: "Linear", backbone: "CNN", reference: "Wu et al., 2023", status: "below NLinear" },
  { family: "Pattern-based", model: "FEDformer", learnable: false, config: "PRE-DYN-POST", dyn: "Mean + 0-padding", backbone: "Transformer", reference: "Zhou et al., 2022", status: "below NLinear" },
  { family: "Pattern-based", model: "MICN", learnable: false, config: "PRE-DYN-POST", dyn: "Linear + 0-padding", backbone: "CNN", reference: "Wang et al., 2023", status: "below NLinear" },
  { family: "Pattern-based", model: "FiLM", learnable: false, config: "PRE-DYN-POST", dyn: "Legendre discretization", backbone: "SSM", reference: "Zhou et al., 2022", status: "below NLinear" },
  { family: "Pattern-based", model: "Informer", learnable: false, config: "PRE-DYN-POST", dyn: "0-padding", backbone: "Transformer", reference: "Zhou et al., 2021", status: "below NLinear" },

  { family: "Pattern-based", model: "TiDE", learnable: true, config: "PRE-DYN-POST", dyn: "Linear", backbone: "MLP", reference: "Das et al., 2023", status: "additional pattern-based" },
  { family: "Pattern-based", model: "Pyraformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Liu et al., 2022", status: "additional pattern-based" },
  { family: "Pattern-based", model: "Autoformer", learnable: true, config: "PRE-DYN-POST", dyn: "Linear", backbone: "Transformer", reference: "Wu et al., 2021", status: "additional pattern-based" },
  { family: "Pattern-based", model: "PSformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Wang et al., 2025", status: "additional pattern-based" },
  { family: "Pattern-based", model: "EDformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Chakraborty et al., 2024", status: "additional pattern-based" },
  { family: "Pattern-based", model: "Sensoformer", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Qin et al., 2025", status: "additional pattern-based" },
  { family: "Pattern-based", model: "FourierGNN", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "GNN", reference: "Yi et al., 2023", status: "additional pattern-based" },
  { family: "Pattern-based", model: "TimeFilter", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "GNN", reference: "Hu et al., 2025", status: "additional pattern-based" },
  { family: "Pattern-based", model: "TCN", learnable: true, config: "PRE-DYN", dyn: "AR", backbone: "CNN", reference: "Bai et al., 2018", status: "additional pattern-based" },
  { family: "Pattern-based", model: "RNN", learnable: true, config: "PRE-DYN-POST", dyn: "AR", backbone: "MLP", reference: "Elman, 1990", status: "additional pattern-based" },
  { family: "Pattern-based", model: "TimeGrad", learnable: false, config: "PRE-DYN-POST", dyn: "Sampling", backbone: "RNN + Diffusion", reference: "Rasul et al., 2021", status: "additional pattern-based" },

  { family: "Foundation", model: "Chronos", learnable: true, config: "PRE-DYN", dyn: "AR sampling", backbone: "Transformer", reference: "Ansari et al., 2024", status: "foundation" },
  { family: "Foundation", model: "Moment", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Goswami et al., 2024", status: "foundation" },
  { family: "Foundation", model: "Lag-Llama", learnable: true, config: "PRE-DYN", dyn: "AR sampling", backbone: "Transformer", reference: "Rasul et al., 2023", status: "foundation" },
  { family: "Foundation", model: "Toto", learnable: true, config: "PRE-DYN", dyn: "AR sampling", backbone: "Transformer", reference: "Cohen et al., 2025", status: "foundation" },
  { family: "Foundation", model: "Moirai", learnable: true, config: "PRE-DYN", dyn: "Parallel sampling", backbone: "Transformer", reference: "Woo et al., 2024", status: "foundation" },
  { family: "Foundation", model: "TTMs", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "MLP", reference: "Ekambaram et al., 2024", status: "foundation" },
  { family: "Foundation", model: "ROSE", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "Transformer", reference: "Wang et al., 2025", status: "foundation" },

  { family: "Dynamics-based", model: "Attraos", learnable: true, config: "PRE-DYN", dyn: "Linear", backbone: "SSM", reference: "Hu et al., 2024", status: "dynamics-based" },
  { family: "Dynamics-based", model: "DeepEDM", learnable: true, config: "DYN-POST", dyn: "Linear", backbone: "MLP", reference: "Majeedi et al., 2025", status: "dynamics-based" },
  { family: "Dynamics-based", model: "Koopa", learnable: true, config: "PRE-DYN-POST", dyn: "Linear + AR", backbone: "MLP", reference: "Liu et al., 2023", status: "dynamics-based" },
  { family: "Dynamics-based", model: "KNF", learnable: true, config: "PRE-DYN-POST", dyn: "AR", backbone: "MLP", reference: "Wang et al., 2023", status: "dynamics-based" },
  { family: "Dynamics-based", model: "K2VAE", learnable: true, config: "PRE-DYN-POST", dyn: "AR", backbone: "MLP + Kalman filter", reference: "Wu et al., 2025", status: "dynamics-based" },
  { family: "Dynamics-based", model: "SpaceTime", learnable: true, config: "PRE-DYN-POST", dyn: "AR", backbone: "SSM", reference: "Zhang et al., 2023", status: "dynamics-based" },
  { family: "Dynamics-based", model: "DYffusion", learnable: true, config: "DYN-POST", dyn: "Diffusion", backbone: "CNN", reference: "Cachay et al., 2023", status: "dynamics-based" },
  { family: "Dynamics-based", model: "DyDiff", learnable: false, config: "DYN-POST", dyn: "Diffusion", backbone: "Diffusion", reference: "Guo et al., 2025", status: "dynamics-based" },
  { family: "Dynamics-based", model: "MZ-AE", learnable: true, config: "PRE-DYN-POST", dyn: "AR", backbone: "MLP + LSTM", reference: "Gupta et al., 2024", status: "dynamics-based" },
];

const rq1 = [
  { name: "Informer", better: 77, iso: 2, worse: 21, p: "MSE & MAE" },
  { name: "FiLM", better: 85, iso: 5, worse: 10, p: "MSE & MAE" },
  { name: "MICN", better: 51, iso: 15, worse: 34, p: "MSE" },
  { name: "FEDformer", better: 57, iso: 10, worse: 33, p: "MSE & MAE" },
];

const rq2 = [
  { name: "iTransformer", worse: 49, iso: 8, better: 43, p: "MAE" },
  { name: "PatchTST", worse: 66, iso: 4, better: 30, p: "MSE & MAE" },
  { name: "Crossformer", worse: 67, iso: 1, better: 32, p: "MSE & MAE" },
];

const chipClass = {
  "PRE-DYN": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  DYN: "bg-orange-50 text-orange-700 ring-orange-200",
  "DYN-POST": "bg-amber-50 text-amber-700 ring-amber-200",
  "PRE-DYN-POST": "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
};

function runDataTests() {
  const errors = [];
  const knownConfigs = new Set(Object.keys(chipClass));
  const names = new Set();

  models.forEach((m) => {
    if (!m.family || !m.model || !m.config || !m.dyn || !m.backbone || !m.reference) {
      errors.push(`Missing field on model: ${JSON.stringify(m)}`);
    }

    if (names.has(m.model)) {
      errors.push(`Duplicate model name: ${m.model}`);
    }

    names.add(m.model);

    if (!knownConfigs.has(m.config)) {
      errors.push(`Unknown config for ${m.model}: ${m.config}`);
    }

    if (!modelPaperUrls[m.model]) {
      errors.push(`Missing reference URL for ${m.model}`);
    }
  });

  [...rq1, ...rq2].forEach((item) => {
    const total = item.better + item.iso + item.worse;
    if (total !== 100) {
      errors.push(`Result percentages for ${item.name} should sum to 100, got ${total}`);
    }
  });

  console.assert(models.length >= 20, "Expected at least 20 models in the taxonomy.");
  console.assert(models.some((m) => m.model === "PatchTST" && m.config === "PRE-DYN"), "PatchTST should be classified as PRE-DYN.");
  console.assert(models.some((m) => m.model === "Autoformer" && m.config === "PRE-DYN-POST"), "Autoformer should be included from Table 5.");
  console.assert(models.some((m) => m.model === "FourierGNN" && m.backbone === "GNN"), "FourierGNN should be included with a GNN backbone.");
  console.assert(models.some((m) => m.model === "TimeGrad" && m.learnable === false), "TimeGrad should be included as partial / non-learnable dynamics.");
  console.assert(models.some((m) => m.family === "Foundation"), "Expected at least one foundation model.");
  console.assert(models.some((m) => m.family === "Dynamics-based"), "Expected at least one dynamics-based model.");
  console.assert(modelPaperUrls.Autoformer.includes("neurips"), "Autoformer should link to its paper.");
  console.assert(modelPaperUrls.PatchTST.includes("openreview"), "PatchTST should link to its paper.");

  if (errors.length > 0) {
    throw new Error(`PRO-DYN data validation failed:\n${errors.join("\n")}`);
  }
}

runDataTests();

function ReferenceLink({ model }) {
  const url = modelPaperUrls[model.model];

  if (!url) {
    return <span>{model.reference}</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950 hover:decoration-slate-700"
      title={`Open ${model.model} reference`}
    >
      {model.reference}
    </a>
  );
}

function Icon({ name, className = "" }) {
  const icons = {
    arrow: "→",
    check: "✓",
    cross: "×",
    search: "⌕",
    table: "▦",
    sparkle: "✦",
    github: "⌘",
    file: "PDF",
    chart: "▥",
  };

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
    >
      {icons[name] || "•"}
    </span>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur">
      <div className="text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function ResultBar({ item, mode }) {
  const left = mode === "rq1" ? item.better : item.worse;
  const mid = item.iso;
  const right = mode === "rq1" ? item.worse : item.better;
  const leftLabel = mode === "rq1" ? "better" : "vanilla better";
  const rightLabel = mode === "rq1" ? "worse" : "post better";

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold text-slate-950">{item.name}</div>
        <Pill className="bg-slate-50 text-slate-700 ring-slate-200">
          significant: {item.p}
        </Pill>
      </div>

      <div
        className="flex h-3 overflow-hidden rounded-full bg-slate-100"
        aria-label={`${item.name} result distribution`}
      >
        <div className="bg-slate-900" style={{ width: `${left}%` }} />
        <div className="bg-slate-300" style={{ width: `${mid}%` }} />
        <div className="bg-slate-100" style={{ width: `${right}%` }} />
      </div>

      <div className="flex justify-between gap-3 text-xs text-slate-500">
        <span>
          {left}% {leftLabel}
        </span>
        <span>{mid}% iso</span>
        <span>
          {right}% {rightLabel}
        </span>
      </div>
    </div>
  );
}

export default function ProdynCompanionSite() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState(ALL_FAMILIES);
  const [config, setConfig] = useState(ALL_CONFIGS);
  const [learnable, setLearnable] = useState(ALL_DYNAMICS);

  const families = useMemo(
    () => [ALL_FAMILIES, ...Array.from(new Set(models.map((m) => m.family)))],
    []
  );

  const configs = useMemo(
    () => [ALL_CONFIGS, ...Array.from(new Set(models.map((m) => m.config)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return models.filter((m) => {
      const searchableText = [
        m.model,
        m.family,
        m.config,
        m.dyn,
        m.backbone,
        m.reference,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !q || searchableText.includes(q);
      const matchesFamily = family === ALL_FAMILIES || m.family === family;
      const matchesConfig = config === ALL_CONFIGS || m.config === config;
      const matchesLearnable =
        learnable === ALL_DYNAMICS || String(m.learnable) === learnable;

      return matchesQuery && matchesFamily && matchesConfig && matchesLearnable;
    });
  }, [query, family, config, learnable]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef6ff,transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_60%,#eef2f7_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="flex h-8 w-24 items-center justify-center rounded-xl bg-slate-950 text-white">
              ICML 2026
            </div>
            <span>TSF Through the Lens of Dynamics</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#idea" className="hover:text-slate-950">
              Idea
            </a>
            <a href="#taxonomy" className="hover:text-slate-950">
              PRO-DYN
            </a>
            <a href="#results" className="hover:text-slate-950">
              Results
            </a>
          </nav>

          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl" asChild>
              <a href={PAPER_URL} target="_blank" rel="noreferrer">
                <Icon
                  name="file"
                  className="mr-4 h-8 min-w-4 text-[10px] font-bold"
                />{" "}
                Paper
              </a>
            </Button>

            <Button className="rounded-xl bg-slate-950 hover:bg-slate-800" asChild>
              <a href={CODE_URL} target="_blank" rel="noreferrer">
                <Icon name="github" className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            Time Series Forecasting Through the Lens of Dynamics
          </h1>

<div className="mt-5 flex flex-wrap items-center gap-2 text-base text-slate-600">
  <a
    href="https://github.com/ARBrachet"
    target="_blank"
    rel="noreferrer"
    className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
  >
    Alexis-Raja Brachet
  </a>
  <sup>1,2</sup>
  <span className="text-slate-400">•</span>
  <span>Pierre-Yves Richard</span>
  <sup>2</sup>
  <span className="text-slate-400">•</span>
  <span>Céline Hudelot</span>
  <sup>1</sup>
</div>

<div className="mt-2 text-sm leading-6 text-slate-500">
  <div>
    <sup>1</sup> MICS, CentraleSupélec, Université Paris-Saclay, France
  </div>
  <div>
    <sup>2</sup> CentraleSupélec, IETR UMR CNRS 6164, France
  </div>
</div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A compact, interactive version of the paper: the PRO-DYN
            nomenclature identifies the computing units moving along the time
            axis. We study the importance of these specific computing units, defining the model dynamics.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="rounded-xl bg-slate-950 px-5 py-6 text-base hover:bg-slate-800"
              asChild
            >
              <a href="#taxonomy">
                Explore PRO-DYN{" "}
                <Icon name="arrow" className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              className="rounded-xl px-5 py-6 text-base"
              asChild
            >
              <a href="#results">
                See key results <Icon name="chart" className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Stat value="3" label="model families identified based on dynamics" />
            <Stat value="40+" label="TSF models classified currently" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex items-center"
        >
          <Card className="w-full rounded-3xl border-slate-200 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur">
            <CardContent className="p-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3">
                <div className="mb-2 px-2 text-sm font-medium text-slate-500">
                  PRO-DYN decomposition from the paper
                </div>

                <img
                  src={`${import.meta.env.BASE_URL}assets/DYN_PRO_graphic.png`}
                  alt="DYN-PRO decomposition diagram from the paper"
                  className="w-full rounded-2xl object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section id="idea" className="mx-auto max-w-7xl px-5 py-8">
<Card className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.6fr] md:items-center">
            <div>
              <Pill className="mb-3 bg-orange-50 text-orange-700 ring-orange-200">
                Core hypothesis
              </Pill>

              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Why dynamics in TSF ?
              </h2>
            </div>

            <div className="text-base leading-7 text-slate-600">
              <p>
                Generative models should replicate the mechanism generating the data. TSF models are generative models.
              </p>

              <p className="mt-3">
                We hypothesize that time series are governed by an {" "}
                <strong className="text-slate-950">
                  underlying physical dynamics
                </strong>{" "}
                modeled by a temporal evolution law.
              </p>

              <p className="mt-3">
                TSF models should be able to {" "}
                <strong className="text-slate-950">
                  learn such dynamics.
                </strong>{" "}
                modeled by a temporal evolution law.
              </p>

            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.6fr] md:items-center">
            <div>
              <Pill className="mb-3 bg-orange-50 text-orange-700 ring-orange-200">
                Core definition
              </Pill>

              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                What are model dynamics?
              </h2>
            </div>

            <div className="text-base leading-7 text-slate-600">
              <p>
                In time series forecasting,{" "}
                <strong className="text-slate-950">model dynamics</strong>{" "}
                refers to the mechanism by which a model propagates past
                observations into future predictions.
              </p>

              <p className="mt-3">
                A model has{" "}
                <strong className="text-slate-950">
                  learning dynamics capabilities
                </strong>{" "}
                when this mechanism is learnable and directly maps past data
                points to future ones. It lacks such capabilities when the
                propagation is indirect, fixed, or only partially learnable.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "1",
              "TSF is not text generation",
              "Time series forecasting is a past-to-future propagation problem, not only a sequence-to-sequence pattern matching problem. Explains why simple linear models challenge transformer-based ones.",
            ],
            [
              "2",
              "Model dynamics should be learnable",
              "PRO-DYN asks where the model actually learns the mechanism that maps observations to forecasts.",
            ],
            [
              "3",
              "Placement matters",
              "Strong TSF models tend to pre-process the past first, then apply the dynamics block at the end: PRE-DYN.",
            ],
          ].map(([n, title, text]) => (
            <Card
              key={n}
              className="rounded-3xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  {n}
                </div>

                <h3 className="text-lg font-semibold text-slate-950">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="taxonomy" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Pill className="mb-3 bg-white text-slate-700 ring-slate-200">
              <Icon name="table" className="mr-1.5 h-3.5 w-3.5" /> Interactive
              nomenclature
            </Pill>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              TSF models through the PRO-DYN nomenclature
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Filter by model family, configuration, or dynamics learning capability.
            </p>
          </div>

          <Pill className="bg-slate-950 text-white ring-slate-950">
            {filtered.length} models shown
          </Pill>
        </div>

        <div className="mb-5 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search model, backbone, DYN function..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none ring-slate-950/10 focus:ring-4"
            />
          </div>

          <select
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-slate-950/10 focus:ring-4"
          >
            {families.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>

          <select
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-slate-950/10 focus:ring-4"
          >
            {configs.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={learnable}
            onChange={(e) => setLearnable(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-slate-950/10 focus:ring-4"
          >
            <option value={ALL_DYNAMICS}>{ALL_DYNAMICS}</option>
            <option value="true">Complete learnable</option>
            <option value="false">Partial / non-learnable</option>
          </select>
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Model</th>
                <th className="px-5 py-4">Family</th>
                <th className="px-5 py-4">Dynamics</th>
                <th className="px-5 py-4">Config</th>
                <th className="px-5 py-4">DYN function</th>
                <th className="px-5 py-4">PRO backbone</th>
                <th className="px-5 py-4">Reference</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={`${m.family}-${m.model}`} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-semibold text-slate-950">
                    {m.model}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{m.family}</td>
                  <td className="px-5 py-4">
                    {m.learnable ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700">
                        <Icon name="check" className="h-4 w-4" /> complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-rose-700">
                        <Icon name="cross" className="h-4 w-4" /> partial
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <Pill
                      className={
                        chipClass[m.config] ||
                        "bg-slate-50 text-slate-700 ring-slate-200"
                      }
                    >
                      {m.config}
                    </Pill>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{m.dyn}</td>
                  <td className="px-5 py-4 text-slate-600">{m.backbone}</td>
                  <td className="px-5 py-4 text-slate-500">
                    <ReferenceLink model={m} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:hidden">
          {filtered.map((m) => (
            <Card
              key={`${m.family}-${m.model}-card`}
              className="rounded-3xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-950">
                      {m.model}
                    </div>
                    <div className="text-sm text-slate-500">{m.family}</div>
                  </div>

                  <Pill
                    className={
                      chipClass[m.config] ||
                      "bg-slate-50 text-slate-700 ring-slate-200"
                    }
                  >
                    {m.config}
                  </Pill>
                </div>

                <div className="grid gap-2 text-sm text-slate-600">
                  <div>
                    <strong className="text-slate-900">Dynamics:</strong>{" "}
                    {m.learnable ? "complete learnable" : "partial / non-learnable"}
                  </div>

                  <div>
                    <strong className="text-slate-900">DYN:</strong> {m.dyn}
                  </div>

                  <div>
                    <strong className="text-slate-900">PRO backbone:</strong>{" "}
                    {m.backbone}
                  </div>

                  <div>
                    <strong className="text-slate-900">Reference:</strong>{" "}
                    <ReferenceLink model={m} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="results" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 max-w-3xl">
          <Pill className="mb-3 bg-white text-slate-700 ring-slate-200">
            <Icon name="chart" className="mr-1.5 h-3.5 w-3.5" /> Key results
          </Pill>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Two research questions to study dynamics impact on performance
          </h2>

	 <p className="mt-2 text-sm leading-6 text-slate-600">
                We first consider pattern-based models. Models are evaluated on 25 datasets, 4 prediction horizons for each. We report MSE and MAE. We count the number of cases one model is better, iso, or worse than its other version.
              </p>


        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-950">
                RQ1 : Adding learnable linear dynamics to underperforming models improves performance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Modified models are compared to their vanilla version.
              </p>

              <div className="mt-5 space-y-3">
                {rq1.map((item) => (
                  <ResultBar key={item.name} item={item} mode="rq1" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-950">
                RQ2 : PRE-DYN configuration is better than DYN-POST
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Moving strong PRE-DYN models toward a DYN-POST setup tends to
                degrade performance.
              </p>

              <div className="mt-5 space-y-3">
                {rq2.map((item) => (
                  <ResultBar key={item.name} item={item} mode="rq2" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
    </main>
  );
}