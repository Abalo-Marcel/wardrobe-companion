const STORAGE_KEY = "wardrobe-companion-state";
const DEFAULT_FILTERS = {
  query: "",
  section: "all",
  category: "all",
  priority: "all",
  size: "all"
};

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneChecklistTemplate() {
  return DEFAULT_CHECKLIST.map((item) => ({ ...item, id: makeId() }));
}

const DEFAULT_CHECKLIST = [
  {
    id: makeId(),
    name: "T-shirt blanc epais",
    category: "Hauts",
    priority: "Haute",
    budget: 35,
    color: "Blanc",
    material: "Coton epais",
    notes: "Base du dressing. Coupe nette, col solide.",
    checked: false
  },
  {
    id: makeId(),
    name: "Polo navy",
    category: "Hauts",
    priority: "Moyenne",
    budget: 55,
    color: "Bleu marine",
    material: "Pique de coton",
    notes: "Pour remplacer un t-shirt quand il faut monter d'un niveau.",
    checked: false
  },
  {
    id: makeId(),
    name: "Chemise Oxford bleu clair",
    category: "Hauts",
    priority: "Haute",
    budget: 80,
    color: "Bleu clair",
    material: "Oxford coton",
    notes: "A porter ouverte ou sous une veste.",
    checked: false
  },
  {
    id: makeId(),
    name: "Surchemise kaki",
    category: "Vestes",
    priority: "Moyenne",
    budget: 90,
    color: "Kaki",
    material: "Laine legere / coton",
    notes: "Piece de mi-saison facile a superposer.",
    checked: false
  },
  {
    id: makeId(),
    name: "Jean brut droit",
    category: "Bas",
    priority: "Haute",
    budget: 120,
    color: "Indigo brut",
    material: "Denim selvedge",
    notes: "Le plus polyvalent pour un style smart casual.",
    checked: false
  },
  {
    id: makeId(),
    name: "Chino beige",
    category: "Bas",
    priority: "Haute",
    budget: 90,
    color: "Beige",
    material: "Coton serge",
    notes: "Alternative plus nette au jean.",
    checked: false
  },
  {
    id: makeId(),
    name: "Pantalon habille gris",
    category: "Bas",
    priority: "Moyenne",
    budget: 130,
    color: "Gris anthracite",
    material: "Laine froide",
    notes: "Pour le bureau et les occasions plus propres.",
    checked: false
  },
  {
    id: makeId(),
    name: "Bomber noir",
    category: "Vestes",
    priority: "Moyenne",
    budget: 140,
    color: "Noir",
    material: "Nylon ou laine",
    notes: "Silhouette simple et compacte.",
    checked: false
  },
  {
    id: makeId(),
    name: "Sneakers blanches",
    category: "Chaussures",
    priority: "Haute",
    budget: 110,
    color: "Blanc casse",
    material: "Cuir lisse",
    notes: "La paire la plus utile du dressing.",
    checked: false
  },
  {
    id: makeId(),
    name: "Chelsea boots noires",
    category: "Chaussures",
    priority: "Moyenne",
    budget: 180,
    color: "Noir",
    material: "Cuir ou suede",
    notes: "A porter avec jean brut ou pantalon habille.",
    checked: false
  }
];

const GUIDE_DATA = {
  tops: {
    label: "Hauts",
    description: "Pieces fondatrices pour construire une base solide.",
    items: [
      {
        title: "T-shirts",
        why: "Ils assurent la base la plus frequente du dressing et permettent de rester simple.",
        materials: ["Coton epais", "Coton Supima", "Jersey dense"],
        colors: ["Blanc", "Noir", "Gris", "Navy"],
        count: "5 a 8 pieces"
      },
      {
        title: "Polos",
        why: "Ils montent d'un cran sans devenir trop formels.",
        materials: ["Pique de coton", "Coton mercerise"],
        colors: ["Navy", "Vert fonce", "Blanc casse"],
        count: "2 a 4 pieces"
      },
      {
        title: "Chemises Oxford",
        why: "Le meilleur compromis entre propre, facile et polyvalent.",
        materials: ["Oxford coton", "Flanelle legere"],
        colors: ["Bleu clair", "Blanc", "Rayures discretes"],
        count: "2 a 4 pieces"
      },
      {
        title: "Surchemises",
        why: "Parfaites pour superposer quand la temperature baisse.",
        materials: ["Laine legere", "Coton brosse", "Twill"],
        colors: ["Kaki", "Beige", "Navy"],
        count: "1 a 3 pieces"
      }
    ]
  },
  bottoms: {
    label: "Bas",
    description: "Trois lignes suffisent pour couvrir presque tout.",
    items: [
      {
        title: "Jeans",
        why: "La piece la plus simple pour une silhouette nette et quotidienne.",
        materials: ["Denim brut", "Denim 12 oz"],
        colors: ["Indigo brut", "Bleu moyen"],
        count: "1 a 2 pieces"
      },
      {
        title: "Chinos",
        why: "Ils donnent tout de suite un ton plus propre qu'un jean.",
        materials: ["Coton serge", "Coton elastique"],
        colors: ["Beige", "Olive", "Navy"],
        count: "2 a 3 pieces"
      },
      {
        title: "Pantalon habille",
        why: "Pour le bureau, les rendez-vous et les looks plus nets.",
        materials: ["Laine froide", "Laine melee"],
        colors: ["Gris", "Charbon", "Navy"],
        count: "1 a 2 pieces"
      }
    ]
  },
  jackets: {
    label: "Vestes",
    description: "Des couches utilitaires avec une vraie presence visuelle.",
    items: [
      {
        title: "Bomber",
        why: "Bon volume, silhouette courte, look moderne.",
        materials: ["Nylon", "Laine", "Coton lourd"],
        colors: ["Noir", "Navy", "Kaki"],
        count: "1 piece"
      },
      {
        title: "Harrington",
        why: "La veste d'entre-saison la plus facile a porter.",
        materials: ["Coton", "Gabardine"],
        colors: ["Beige", "Navy", "Sable"],
        count: "1 piece"
      },
      {
        title: "Veste en laine",
        why: "Pour le bureau et les silhouettes plus sophistiquees.",
        materials: ["Laine", "Laine vierge", "Cachemire melee"],
        colors: ["Gris", "Navy", "Marron fonce"],
        count: "1 piece"
      }
    ]
  },
  shoes: {
    label: "Chaussures",
    description: "La chaussure change la lecture du look plus vite que tout le reste.",
    items: [
      {
        title: "Sneakers blanches",
        why: "La solution la plus polyvalente avec un jean, un chino ou un pantalon propre.",
        materials: ["Cuir lisse", "Cuir grainé"],
        colors: ["Blanc casse"],
        count: "1 paire"
      },
      {
        title: "Sneakers noires",
        why: "Plus sobres, plus urbaines, pratiques en hiver.",
        materials: ["Cuir", "Suede traite"],
        colors: ["Noir", "Anthracite"],
        count: "1 paire"
      },
      {
        title: "Chelsea boots",
        why: "Parfaites quand il faut garder une ligne propre sans trop formaliser.",
        materials: ["Cuir", "Suede"],
        colors: ["Noir", "Marron fonce"],
        count: "1 paire"
      },
      {
        title: "Chaussures de ville",
        why: "A reserver pour les contextes les plus habilles.",
        materials: ["Cuir lisse"],
        colors: ["Noir", "Marron fonce"],
        count: "1 paire"
      }
    ]
  },
  materials: {
    label: "Matieres",
    description: "Connaître les matieres evite d'acheter deux fois la meme erreur.",
    items: [
      {
        title: "Oxford",
        pros: "Resistant, texturé, facile a vivre.",
        cons: "Moins fluide qu'une popeline.",
        care: "Lavage doux, repassage leger, sechage a l'air libre."
      },
      {
        title: "Coton epais",
        pros: "Bonne tenue, meilleur tombé, plus durable.",
        cons: "Peut etre plus chaud et plus lourd.",
        care: "Lavage a basse temperature, eviter le sechage agressif."
      },
      {
        title: "Coton Supima",
        pros: "Toucher plus fin, belle tenue dans le temps.",
        cons: "Prix plus eleve.",
        care: "Lavage delicat, pas de surchauffe au sechoir."
      },
      {
        title: "Lin",
        pros: "Fraicheur, texture vivante, ideal l'ete.",
        cons: "Se froisse facilement.",
        care: "Lavage doux, repassage leger quand encore humide."
      },
      {
        title: "Laine merinos",
        pros: "Regule bien la temperature, confortable.",
        cons: "Demande un peu plus d'attention.",
        care: "Aerer entre les ports, lavage laine si necessaire."
      },
      {
        title: "Laine vierge",
        pros: "Bonne tenue, tombé propre, polyvalente.",
        cons: "Plus fragile qu'un tissu technique.",
        care: "Nettoyage peu frequent, brosse douce, pressing si besoin."
      },
      {
        title: "Cuir",
        pros: "Dure longtemps, se patine bien.",
        cons: "Necessite entretien regulier.",
        care: "Nourrir avec creme, proteger de l'eau, laisser respirer."
      },
      {
        title: "Suede",
        pros: "Aspect riche et plus doux visuellement.",
        cons: "Sensible aux taches et a la pluie.",
        care: "Brosse suede, spray impermeabilisant, pas de trempage."
      }
    ]
  }
};

// DOM references are cached once because the layout is static.
const dom = {};
let state = loadData();
let activeSelectShell = null;
let toastTimer = null;
let photoLightboxTrigger = null;

function createDefaultState() {
  return {
    wardrobe: [],
    wishlist: [],
    purchased: [],
    notes: "",
    settings: {
      theme: "light",
      uiMode: "new",
      purchasedRetentionDays: 30,
      filters: { ...DEFAULT_FILTERS }
    },
    stats: {
      checklist: cloneChecklistTemplate(),
      completedChecklistCount: 0
    }
  };
}

function normalizeFilters(filters) {
  return {
    ...DEFAULT_FILTERS,
    ...(filters || {})
  };
}

function normalizeWardrobeItem(item) {
  return {
    id: item.id || makeId(),
    name: item.name || "Piece",
    size: item.size || "",
    category: item.category || "General",
    color: item.color || "",
    material: item.material || "",
    brand: item.brand || "",
    season: item.season || "",
    cost: Number(item.cost) || 0,
    photo: item.photo || "",
    wearCount: Number(item.wearCount) || 0,
    lastWornAt: item.lastWornAt || "",
    purchaseDate: item.purchaseDate || ""
  };
}

function normalizeWishlistItem(item) {
  return {
    id: item.id || makeId(),
    name: item.name || "Article",
    category: item.category || "General",
    price: Number(item.price) || 0,
    store: item.store || "",
    link: item.link || "",
    size: item.size || "",
    priority: item.priority || "Moyenne",
    photo: item.photo || ""
  };
}

function normalizeChecklist(items) {
  if (!Array.isArray(items)) {
    return cloneChecklistTemplate();
  }

  return items.map((item) => ({
    id: item.id || makeId(),
    name: item.name || "Article",
    category: item.category || "General",
    priority: item.priority || "Moyenne",
    budget: Number(item.budget) || 0,
    color: item.color || "",
    material: item.material || "",
    notes: item.notes || "",
    photo: item.photo || "",
    checked: Boolean(item.checked)
  }));
}

function normalizeRetentionDays(value) {
  const days = Number(value);
  if (!Number.isFinite(days)) return 30;
  return Math.min(60, Math.max(30, Math.round(days / 5) * 5));
}

function normalizePurchasedItem(item) {
  return {
    id: item.id || makeId(),
    name: item.name || "Article",
    category: item.category || "General",
    size: item.size || "",
    budget: Number(item.budget) || 0,
    color: item.color || "",
    material: item.material || "",
    notes: item.notes || "",
    photo: item.photo || "",
    purchasedAt: item.purchasedAt || getTodayIsoDate()
  };
}

function normalizePurchased(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizePurchasedItem);
}

function addDaysToIsoDate(value, days) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function isPurchasedExpired(item, retentionDays, today = getTodayIsoDate()) {
  const expiryDate = addDaysToIsoDate(item.purchasedAt, retentionDays);
  return Boolean(expiryDate && expiryDate <= today);
}

function prunePurchasedItems(items, retentionDays) {
  return items.filter((item) => !isPurchasedExpired(item, retentionDays));
}

function migrateCheckedChecklistItems(targetState) {
  const checkedItems = targetState.stats.checklist.filter((item) => item.checked);
  if (!checkedItems.length) return;

  const existingIds = new Set(targetState.purchased.map((item) => item.id));
  const newPurchasedItems = checkedItems
    .filter((item) => !existingIds.has(item.id))
    .map(normalizePurchasedItem);

  targetState.purchased.unshift(...newPurchasedItems);
  targetState.stats.checklist = targetState.stats.checklist.filter((item) => !item.checked);
  targetState.stats.completedChecklistCount = Number(targetState.stats.completedChecklistCount) || 0;
  targetState.stats.completedChecklistCount += newPurchasedItems.length;
}

function normalizeWardrobe(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizeWardrobeItem);
}

function normalizeWishlist(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizeWishlistItem);
}

function loadData() {
  const baseline = createDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return baseline;
    }

    const parsed = JSON.parse(raw);
    const merged = {
      ...baseline,
      ...parsed,
      settings: {
        ...baseline.settings,
        ...(parsed.settings || {}),
        filters: normalizeFilters(parsed.settings && parsed.settings.filters)
      },
      stats: {
        ...baseline.stats,
        ...(parsed.stats || {})
      }
    };

    merged.wardrobe = normalizeWardrobe(parsed.wardrobe);
    merged.wishlist = normalizeWishlist(parsed.wishlist);
    merged.purchased = normalizePurchased(parsed.purchased);
    merged.notes = typeof parsed.notes === "string" ? parsed.notes : baseline.notes;
    merged.settings.purchasedRetentionDays = normalizeRetentionDays(merged.settings.purchasedRetentionDays);
    merged.stats.checklist = normalizeChecklist(parsed.stats && parsed.stats.checklist);
    merged.stats.completedChecklistCount = Number(merged.stats.completedChecklistCount) || 0;
    migrateCheckedChecklistItems(merged);
    merged.purchased = prunePurchasedItems(merged.purchased, merged.settings.purchasedRetentionDays);
    return merged;
  } catch (error) {
    console.error("Unable to load saved data", error);
    return baseline;
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  const toast = document.getElementById("app-toast");
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => { toast.hidden = true; }, 180);
  }, 2200);
}

function getActiveFilters() {
  return normalizeFilters(state.settings.filters);
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function itemSearchBlob(item) {
  return normalizeSearchText([
    item.name,
    item.category,
    item.priority,
    item.color,
    item.material,
    item.notes,
    item.size,
    item.brand,
    item.season,
    item.store,
    item.link,
    item.budget,
    item.price,
    item.cost
  ].filter(Boolean).join(" "));
}

function matchesItemFilters(item, section, filters) {
  if (filters.section !== "all" && filters.section !== section) {
    return false;
  }

  if (filters.category !== "all" && normalizeSearchText(item.category) !== normalizeSearchText(filters.category)) {
    return false;
  }

  if (filters.priority !== "all" && normalizeSearchText(item.priority) !== normalizeSearchText(filters.priority)) {
    return false;
  }

  if (filters.size !== "all") {
    const hasSize = normalizeSearchText(item.size).length > 0;
    if (filters.size === "filled" && !hasSize) {
      return false;
    }
    if (filters.size === "missing" && hasSize) {
      return false;
    }
  }

  const query = normalizeSearchText(filters.query);
  if (query && !itemSearchBlob(item).includes(query)) {
    return false;
  }

  return true;
}

function filterCollection(section, items) {
  const filters = getActiveFilters();
  return items.filter((item) => matchesItemFilters(item, section, filters));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getSafeExternalLink(value) {
  try {
    const url = new URL(String(value || ""), window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) {
    return "Jamais";
  }

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Jamais";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getWardrobeUsageSummary() {
  const totalWearCount = state.wardrobe.reduce((sum, item) => sum + (Number(item.wearCount) || 0), 0);
  const pricedItems = state.wardrobe.filter((item) => Number(item.cost) > 0);
  const totalCostPerWear = pricedItems.reduce((sum, item) => {
    const wearCount = Number(item.wearCount) || 0;
    if (wearCount <= 0) {
      return sum + Number(item.cost || 0);
    }

    return sum + ((Number(item.cost) || 0) / wearCount);
  }, 0);

  const averageCostPerWear = pricedItems.length > 0 ? Math.round(totalCostPerWear / pricedItems.length) : 0;

  return {
    totalWearCount,
    averageCostPerWear
  };
}

function updateTheme() {
  document.documentElement.dataset.theme = state.settings.theme;
  const themeColor = state.settings.theme === "dark" ? "#111214" : "#f4efe7";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
}

function getBudgetSummary() {
  const plannedFromChecklist = state.stats.checklist.reduce((sum, item) => sum + (Number(item.budget) || 0), 0);
  const plannedFromWishlist = state.wishlist.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const plannedFromPurchased = state.purchased.reduce((sum, item) => sum + (Number(item.budget) || 0), 0);
  const spentInWardrobe = state.wardrobe.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
  const spent = plannedFromPurchased + spentInWardrobe;
  const planned = plannedFromChecklist + plannedFromWishlist + plannedFromPurchased + spentInWardrobe;
  const remaining = Math.max(planned - spent, 0);
  const completedChecklist = Number(state.stats.completedChecklistCount) || 0;
  const totalChecklist = state.stats.checklist.length + completedChecklist || 1;
  const progress = Math.round((completedChecklist / totalChecklist) * 100);
  const remainingCount = state.stats.checklist.filter((item) => !item.checked).length + state.wishlist.length;

  return {
    planned,
    spent,
    remaining,
    progress,
    wardrobeCount: state.wardrobe.length,
    remainingCount,
    purchasedCount: state.purchased.length
  };
}

function updateDashboard() {
  const summary = getBudgetSummary();
  const usage = getWardrobeUsageSummary();
  const setMetric = (name, value) => {
    document.querySelectorAll(`[data-metric="${name}"]`).forEach((element) => {
      element.textContent = value;
    });
  };

  setMetric("wardrobe-count", summary.wardrobeCount);
  setMetric("wardrobe-count-large", summary.wardrobeCount);
  setMetric("remaining-count", summary.remainingCount);
  setMetric("purchased-count", summary.purchasedCount);
  setMetric("progress-label", `${summary.progress}%`);
  setMetric("budget-planned", formatCurrency(summary.planned));
  setMetric("budget-spent", formatCurrency(summary.spent));
  setMetric("budget-remaining", formatCurrency(summary.remaining));
  setMetric("wardrobe-wears", usage.totalWearCount);
  setMetric("cost-per-wear", formatCurrency(usage.averageCostPerWear));

  const progressBar = document.querySelector('[data-metric="progress-bar"]');
  if (progressBar) {
    progressBar.style.width = `${summary.progress}%`;
  }
}

function createInputField({ field, label, type = "text", value = "", section, placeholder = "", step, min, list }) {
  const safeValue = value ?? "";
  const valueAttribute = type === "number"
    ? `value="${Number.isFinite(Number(safeValue)) ? Number(safeValue) : ""}"`
    : `value="${escapeHtml(safeValue)}"`;
  const attributes = [
    `data-section="${section}"`,
    `data-field="${field}"`,
    `name="${field}"`,
    `type="${type}"`,
    `placeholder="${escapeHtml(placeholder || label)}"`
  ];

  if (step !== undefined) {
    attributes.push(`step="${step}"`);
  }

  if (min !== undefined) {
    attributes.push(`min="${min}"`);
  }

  if (list) {
    attributes.push(`list="${list}"`);
  }

  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input class="item-input" ${attributes.join(" ")} ${valueAttribute}>
    </label>
  `;
}

function createSelectField({ field, label, value = "", section, options = [] }) {
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      ${createSelectControl({ field, value, section, options })}
    </label>
  `;
}

function createSelectControl({ field, value = "", section, options = [] }) {
  const normalizedOptions = options.map((option) => (
    typeof option === "string" ? { value: option, label: option } : option
  ));
  const selectedOption = normalizedOptions.find((option) => option.value === value) || normalizedOptions[0] || { value, label: value };
  const optionMarkup = normalizedOptions
    .map((option) => `
      <button type="button" class="select-option ${option.value === selectedOption.value ? "is-selected" : ""}" data-select-option data-value="${escapeHtml(option.value)}" aria-selected="${option.value === selectedOption.value ? "true" : "false"}">
        ${escapeHtml(option.label)}
      </button>
    `)
    .join("");

  return `
    <div class="select-shell" data-select data-section="${section}" data-field="${field}" data-value="${escapeHtml(selectedOption.value)}">
      <button type="button" class="select-trigger" data-select-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="select-label" data-select-label>${escapeHtml(selectedOption.label || "Choisir")}</span>
        <span class="select-caret" aria-hidden="true">⌄</span>
      </button>
      <div class="select-menu" role="listbox" hidden>${optionMarkup}</div>
    </div>
  `;
}

function createTextAreaField({ field, label, value = "", section, placeholder = "" }) {
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <textarea class="item-textarea" data-section="${section}" data-field="${field}" name="${field}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>
    </label>
  `;
}

function createTag(text, tone = "") {
  return `<span class="tag ${tone}">${escapeHtml(text)}</span>`;
}

function createDetailsSummary(label, open = false) {
  return `<details class="item-details" ${open ? "open" : ""}><summary>${escapeHtml(label)}</summary>`;
}

function updateWardrobeUsage(item, delta = 1) {
  item.wearCount = Math.max(0, (Number(item.wearCount) || 0) + delta);
  item.lastWornAt = getTodayIsoDate();
}

// Checklist cards are editable inline so autosave stays immediate.
function renderChecklist() {
  const container = document.getElementById("checklist-content");
  if (!container) return;

  const items = filterCollection("checklist", state.stats.checklist);

  if (state.stats.checklist.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucun article dans la checklist pour le moment.</p>`;
    return;
  }

  if (items.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucun résultat avec ces filtres.</p>`;
    return;
  }

  container.innerHTML = items
    .map((item) => `
      <article class="item-card" data-section="checklist" data-item-id="${item.id}">
        <div class="item-card-body compact-card">
          <div class="item-head">
            <div class="item-title-wrap">
              <label class="item-title">
                <input class="item-check" type="checkbox" data-section="checklist" data-field="checked" ${item.checked ? "checked" : ""}>
                <span>${escapeHtml(item.name)}</span>
              </label>
              <div class="tag-row">
                ${createTag(item.category)}
                ${createTag(item.priority, `tone-${String(item.priority).toLowerCase()}`)}
                ${createTag(formatCurrency(item.budget), "tone-budget")}
                ${createTag(item.size || "Taille a definir", "tone-neutral")}
              </div>
            </div>
            <button class="item-action danger" type="button" data-action="remove-checklist">Supprimer</button>
          </div>
          ${createDetailsSummary("Afficher les champs")}
            <div class="item-grid item-grid-condensed">
              ${createInputField({ field: "name", label: "Nom", value: item.name, section: "checklist", placeholder: "Piece a acheter" })}
              ${createInputField({ field: "size", label: "Taille", value: item.size, section: "checklist", placeholder: "M, 40, 42..." })}
              ${createSelectField({ field: "priority", label: "Priorite", value: item.priority, section: "checklist", options: ["Haute", "Moyenne", "Basse"] })}
              ${createInputField({ field: "budget", label: "Budget conseille", type: "number", value: item.budget, section: "checklist", placeholder: "0", step: "1", min: "0" })}
              ${createInputField({ field: "color", label: "Couleur recommandee", value: item.color, section: "checklist" })}
              ${createInputField({ field: "material", label: "Matiere recommandee", value: item.material, section: "checklist" })}
              ${createInputField({ field: "category", label: "Categorie", value: item.category, section: "checklist" })}
              ${createTextAreaField({ field: "notes", label: "Notes", value: item.notes, section: "checklist", placeholder: "Conseils, details, ajustements..." })}
            </div>
          </details>
        </div>
      </article>
    `)
    .join("");
}

// Dressing cards include a base64 photo picker and simple metadata.
function renderWardrobe() {
  const container = document.getElementById("wardrobe-content");
  if (!container) return;

  const items = filterCollection("wardrobe", state.wardrobe);

  if (state.wardrobe.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucune piece enregistre pour le moment. Ajoute une piece ou transfere un article depuis la wishlist.</p>`;
    return;
  }

  if (items.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucun resultat avec ces filtres.</p>`;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const photoMarkup = item.photo
        ? `<img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.name)}">`
        : `<div class="picture-placeholder">Photo locale Base64<br><small>${escapeHtml(item.category || "Aucune categorie")}</small></div>`;

      return `
        <article class="item-card" data-section="wardrobe" data-item-id="${item.id}">
          <div class="item-card-body wardrobe-card">
            <div class="item-side">
              <div class="picture">${photoMarkup}</div>
            </div>
            <div class="stack">
              <div class="item-head">
                <div class="item-title-wrap">
                  <div class="item-title">${escapeHtml(item.name)}</div>
                  <div class="tag-row">
                    ${createTag(item.category)}
                    ${createTag(item.color || "Couleur a definir", "tone-neutral")}
                    ${createTag(item.size || "Taille a definir", "tone-neutral")}
                    ${createTag(`${Number(item.wearCount) || 0} ports`, "tone-budget")}
                  </div>
                </div>
                ${createTag(formatCurrency(item.cost), "tone-budget")}
              </div>
              <div class="preview-line">${escapeHtml(item.material || "Matiere non indiquee")} ? ${escapeHtml(item.brand || "Marque non indiquee")} ? ${escapeHtml(item.season || "Saison libre")}</div>
              <div class="preview-line">Dernier port: ${escapeHtml(formatDate(item.lastWornAt))} ? Cout / port: ${escapeHtml(formatCurrency((Number(item.wearCount) || 0) > 0 ? Number(item.cost || 0) / (Number(item.wearCount) || 1) : Number(item.cost || 0)))}</div>
              <div class="item-actions">
                <button class="item-action" type="button" data-action="mark-worn">Porte aujourd'hui</button>
                <button class="item-action danger" type="button" data-action="remove-wardrobe">Supprimer</button>
              </div>
              ${createDetailsSummary("Editer la piece")}
                <label class="field upload-field">
                  <span>Photo</span>
                  <input class="item-input" type="file" accept="image/*" data-section="wardrobe" data-field="photo">
                </label>
                <div class="item-grid item-grid-condensed">
                  ${createInputField({ field: "name", label: "Nom", value: item.name, section: "wardrobe" })}
                  ${createInputField({ field: "category", label: "Categorie", value: item.category, section: "wardrobe" })}
                  ${createInputField({ field: "color", label: "Couleur", value: item.color, section: "wardrobe" })}
                  ${createInputField({ field: "material", label: "Matiere", value: item.material, section: "wardrobe" })}
                  ${createInputField({ field: "size", label: "Taille", value: item.size, section: "wardrobe" })}
                  ${createInputField({ field: "brand", label: "Marque", value: item.brand, section: "wardrobe" })}
                  ${createInputField({ field: "season", label: "Saison", value: item.season, section: "wardrobe" })}
                  ${createInputField({ field: "cost", label: "Cout", type: "number", value: item.cost || 0, section: "wardrobe", placeholder: "0", step: "1", min: "0" })}
                  ${createInputField({ field: "wearCount", label: "Nombre de ports", type: "number", value: item.wearCount || 0, section: "wardrobe", placeholder: "0", step: "1", min: "0" })}
                  ${createInputField({ field: "lastWornAt", label: "Dernier port", type: "date", value: item.lastWornAt || "", section: "wardrobe" })}
                </div>
              </details>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Wishlist items remain separate until the user confirms the move.
function renderWishlist() {
  const container = document.getElementById("wishlist-content");
  if (!container) return;

  const items = filterCollection("wishlist", state.wishlist);

  if (state.wishlist.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucun article dans la wishlist.</p>`;
    return;
  }

  if (items.length === 0) {
    container.innerHTML = `<p class="item-muted">Aucun resultat avec ces filtres.</p>`;
    return;
  }

  container.innerHTML = items
    .map((item) => `
      <article class="item-card" data-section="wishlist" data-item-id="${item.id}">
        <div class="item-card-body compact-card">
          <div class="item-head">
            <div class="item-title-wrap">
              <div class="item-title">${escapeHtml(item.name)}</div>
              <div class="tag-row">
                ${createTag(formatCurrency(item.price), "tone-budget")}
                ${createTag(item.priority, `tone-${String(item.priority).toLowerCase()}`)}
                ${createTag(item.store || "Magasin libre", "tone-neutral")}
                ${createTag(item.size || "Taille a definir", "tone-neutral")}
              </div>
            </div>
            <div class="item-actions">
              <button class="item-action" type="button" data-action="move-to-wardrobe">Deplacer dans le dressing</button>
              <button class="item-action danger" type="button" data-action="remove-wishlist">Supprimer</button>
            </div>
          </div>
          <div class="preview-line">${escapeHtml(item.category || "Categorie libre")} · ${escapeHtml(item.link || "Lien a ajouter")}</div>
          ${createDetailsSummary("Editer la wishlist")}
            <div class="item-grid item-grid-condensed">
              ${createInputField({ field: "name", label: "Nom", value: item.name, section: "wishlist" })}
              ${createInputField({ field: "category", label: "Categorie", value: item.category, section: "wishlist" })}
              ${createInputField({ field: "size", label: "Taille", value: item.size, section: "wishlist", placeholder: "M, 40, 42..." })}
              ${createInputField({ field: "price", label: "Prix", type: "number", value: item.price, section: "wishlist", placeholder: "0", step: "1", min: "0" })}
              ${createInputField({ field: "store", label: "Magasin", value: item.store, section: "wishlist" })}
              ${createInputField({ field: "link", label: "Lien", value: item.link, section: "wishlist", placeholder: "https://..." })}
              ${createSelectField({ field: "priority", label: "Priorite", value: item.priority, section: "wishlist", options: ["Haute", "Moyenne", "Basse"] })}
            </div>
          </details>
        </div>
      </article>
    `)
    .join("");
}

function renderNotes() {
  const field = document.getElementById("notes-field");
  if (field) {
    field.value = state.notes;
  }
}

function renderSettings() {
  const host = document.getElementById("theme-select");
  if (host) {
    host.innerHTML = createSelectControl({
      field: "theme",
      value: state.settings.theme,
      section: "settings",
      options: [
        { value: "light", label: "Clair" },
        { value: "dark", label: "Sombre" }
      ]
    });
  }
  const retentionHost = document.getElementById("purchased-retention-select");
  if (retentionHost) {
    retentionHost.innerHTML = createSelectControl({
      field: "purchasedRetentionDays",
      value: String(state.settings.purchasedRetentionDays),
      section: "settings",
      options: [30, 35, 40, 45, 50, 55, 60].map((days) => ({ value: String(days), label: `${days} jours` }))
    });
  }
}

function renderFilters() {
  const filters = getActiveFilters();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = filters.query;
  }

  const bindings = [
    { id: "scope-filter", field: "section", value: filters.section, options: [
      { value: "all", label: "Toutes" },
      { value: "checklist", label: "Checklist" },
      { value: "wardrobe", label: "Dressing" },
      { value: "wishlist", label: "Wishlist" }
    ] },
    { id: "category-filter", field: "category", value: filters.category, options: [
      { value: "all", label: "Toutes" },
      { value: "General", label: "General" },
      { value: "Hauts", label: "Hauts" },
      { value: "Bas", label: "Bas" },
      { value: "Vestes", label: "Vestes" },
      { value: "Chaussures", label: "Chaussures" }
    ] },
    { id: "priority-filter", field: "priority", value: filters.priority, options: [
      { value: "all", label: "Toutes" },
      { value: "Haute", label: "Haute" },
      { value: "Moyenne", label: "Moyenne" },
      { value: "Basse", label: "Basse" }
    ] },
    { id: "size-filter", field: "size", value: filters.size, options: [
      { value: "all", label: "Toutes" },
      { value: "filled", label: "Renseignée" },
      { value: "missing", label: "Manquante" }
    ] }
  ];

  bindings.forEach(({ id, field, value, options }) => {
    const host = document.getElementById(id);
    if (!host) return;

    host.innerHTML = createSelectControl({
      field,
      value,
      section: "filters",
      options: options.map((option) => {
        if (id === "size-filter") {
          if (option === "filled") return "Renseignée";
          if (option === "missing") return "Manquante";
          return "Toutes";
        }
        if (id === "scope-filter") {
          if (option === "checklist") return "Checklist";
          if (option === "wardrobe") return "Dressing";
          if (option === "wishlist") return "Wishlist";
          return "Toutes";
        }
        if (id === "category-filter") {
          if (option === "all") return "Toutes";
          return option;
        }
        if (id === "priority-filter") {
          if (option === "all") return "Toutes";
          return option;
        }
        return option;
      })
    });
  });
}

function closeSelectMenus(exceptShell = null) {
  document.querySelectorAll("[data-select][data-open='true']").forEach((shell) => {
    if (exceptShell && shell === exceptShell) return;

    shell.dataset.open = "false";
    const trigger = shell.querySelector("[data-select-trigger]");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
  const portal = document.querySelector("[data-select-portal]");
  if (portal) {
    portal.remove();
  }
  activeSelectShell = null;
}

function getSelectPortal() {
  let portal = document.querySelector("[data-select-portal]");
  if (!portal) {
    portal = document.createElement("div");
    portal.className = "select-portal";
    portal.dataset.selectPortal = "true";
    portal.innerHTML = '<div class="select-menu select-portal-menu card"></div>';
    document.body.appendChild(portal);
  }
  return portal;
}

function positionSelectPortal(shell, menuElement) {
  const trigger = shell.querySelector("[data-select-trigger]");
  if (!trigger || !menuElement) return;

  const triggerBox = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const width = Math.min(Math.max(triggerBox.width, 180), viewportWidth - 16);
  const left = Math.max(8, Math.min(triggerBox.left, viewportWidth - width - 8));
  const estimatedHeight = Math.min(320, Math.max(180, menuElement.scrollHeight || 0));
  const spaceBelow = viewportHeight - triggerBox.bottom;
  const spaceAbove = triggerBox.top;
  const openUpward = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
  const maxHeight = Math.max(180, Math.min(320, openUpward ? spaceAbove - 12 : spaceBelow - 12));
  const top = openUpward
    ? Math.max(8, triggerBox.top - maxHeight - 6)
    : Math.min(triggerBox.bottom + 6, viewportHeight - 8);

  menuElement.style.position = "fixed";
  menuElement.style.left = `${left}px`;
  menuElement.style.width = `${width}px`;
  menuElement.style.top = `${top}px`;
  menuElement.style.bottom = "auto";
  menuElement.style.maxHeight = `${maxHeight}px`;
  menuElement.dataset.placement = openUpward ? "top" : "bottom";
}

function toggleSelectMenu(shell) {
  const willOpen = shell.dataset.open !== "true";
  closeSelectMenus(shell);
  shell.dataset.open = willOpen ? "true" : "false";
  const trigger = shell.querySelector("[data-select-trigger]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
  }
  if (willOpen) {
    activeSelectShell = shell;
    const portal = getSelectPortal();
    const menuElement = portal.querySelector(".select-portal-menu");
    const template = shell.querySelector(".select-menu");
    if (menuElement && template) {
      menuElement.innerHTML = template.innerHTML;
      menuElement.hidden = false;
      positionSelectPortal(shell, menuElement);
    }
  }
}

function setCustomSelectValue(shell, value) {
  shell.dataset.value = value;
  const label = shell.querySelector("[data-select-label]");
  const option = shell.querySelector(`[data-select-option][data-value="${CSS.escape(value)}"]`);
  if (label) {
    label.textContent = option ? option.textContent : value;
  }
  shell.querySelectorAll("[data-select-option]").forEach((button) => {
    const isSelected = button.dataset.value === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
}

function applyCustomSelectValue(shell, value) {
  const section = shell.dataset.section;
  const field = shell.dataset.field;

  if (section === "filters") {
    state.settings.filters = normalizeFilters(state.settings.filters);
    state.settings.filters[field] = value;
    saveData();
    renderFilters();
    renderChecklist();
    renderWardrobe();
    renderWishlist();
    return;
  }

  if (section === "settings" && field === "theme") {
    state.settings.theme = value;
    updateTheme();
    saveData();
    renderSettings();
    return;
  }

  if (section === "settings" && field === "purchasedRetentionDays") {
    state.settings.purchasedRetentionDays = normalizeRetentionDays(value);
    state.purchased = prunePurchasedItems(state.purchased, state.settings.purchasedRetentionDays);
    saveData();
    renderSettings();
    renderPurchased();
    updateDashboard();
    return;
  }

  if (section) {
    const card = shell.closest("[data-item-id]");
    if (!card) return;

    updateItem(section, card.dataset.itemId, field, value);
    if (section === "checklist") {
      renderChecklist();
    } else if (section === "wardrobe") {
      renderWardrobe();
    } else if (section === "wishlist") {
      renderWishlist();
    }
  }
}

// The add forms are bound once and keep the workflow "save on change".
function wireAddForms() {
  const checklistForm = document.getElementById("checklist-add-form");
  const wardrobeForm = document.getElementById("wardrobe-add-form");
  const wishlistForm = document.getElementById("wishlist-add-form");

  checklistForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(checklistForm);
    const name = String(formData.get("name") || "").trim();
    const size = String(formData.get("size") || "").trim();
    if (!name) return;

    state.stats.checklist.unshift({
      id: makeId(),
      name,
      category: "General",
      priority: "Moyenne",
      budget: 0,
      color: "",
      material: "",
      notes: "",
      size,
      checked: false
    });

    saveData();
    renderChecklist();
    updateDashboard();
    checklistForm.reset();
  });

  wardrobeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(wardrobeForm);
    const name = String(formData.get("name") || "").trim();
    const size = String(formData.get("size") || "").trim();
    if (!name) return;

    state.wardrobe.unshift({
      id: makeId(),
      name,
      size,
      category: "General",
      color: "",
      material: "",
      brand: "",
      season: "",
      cost: 0,
      photo: "",
      wearCount: 0,
      lastWornAt: "",
      purchaseDate: ""
    });

    saveData();
    renderWardrobe();
    updateDashboard();
    wardrobeForm.reset();
  });

  wishlistForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(wishlistForm);
    const name = String(formData.get("name") || "").trim();
    const size = String(formData.get("size") || "").trim();
    if (!name) return;

    state.wishlist.unshift({
      id: makeId(),
      name,
      category: "General",
      price: 0,
      store: "",
      link: "",
      size,
      priority: "Moyenne"
    });

    saveData();
    renderWishlist();
    updateDashboard();
    wishlistForm.reset();
  });
}

function addWardrobeFromWishlist(item) {
  state.wardrobe.unshift({
    id: makeId(),
    name: item.name,
    size: item.size || "",
    category: item.category || "General",
    color: "",
    material: "",
    brand: "",
    season: "",
    cost: Number(item.price) || 0,
    photo: "",
    wearCount: 0,
    lastWornAt: "",
    purchaseDate: ""
  });
}

function updateItem(section, id, field, value) {
  const collection = section === "checklist" ? state.stats.checklist : section === "wardrobe" ? state.wardrobe : state.wishlist;
  const item = collection.find((entry) => entry.id === id);
  if (!item) return;

  if (field === "budget" || field === "price" || field === "cost") {
    item[field] = Number(value) || 0;
  } else if (field === "wearCount") {
    item.wearCount = Math.max(0, Number(value) || 0);
  } else if (field === "checked") {
    item.checked = Boolean(value);
  } else {
    item[field] = value;
  }

  saveData();
  updateDashboard();
}

function removeItem(section, id) {
  if (section === "checklist") {
    state.stats.checklist = state.stats.checklist.filter((item) => item.id !== id);
    renderChecklist();
  } else if (section === "wardrobe") {
    state.wardrobe = state.wardrobe.filter((item) => item.id !== id);
    renderWardrobe();
  } else if (section === "wishlist") {
    state.wishlist = state.wishlist.filter((item) => item.id !== id);
    renderWishlist();
  }

  saveData();
  updateDashboard();
}

function moveWishlistItemToWardrobe(id) {
  const index = state.wishlist.findIndex((item) => item.id === id);
  if (index === -1) return;

  const [item] = state.wishlist.splice(index, 1);
  addWardrobeFromWishlist(item);
  saveData();
  renderWishlist();
  renderWardrobe();
  updateDashboard();
}

function handleFileUpload(fileInput) {
  const card = fileInput.closest("[data-item-id]");
  if (!card) return;

  const section = card.dataset.section;
  const id = card.dataset.itemId;
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    updateItem(section, id, "photo", String(reader.result || ""));
    renderWardrobe();
  };
  reader.readAsDataURL(file);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wardrobe-companion-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function importData(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const fresh = createDefaultState();
  state = {
    ...fresh,
    ...parsed,
    settings: {
      ...fresh.settings,
      ...(parsed.settings || {})
    },
    stats: {
      ...fresh.stats,
      ...(parsed.stats || {})
    }
  };
  state.wardrobe = normalizeWardrobe(parsed.wardrobe);
  state.wishlist = normalizeWishlist(parsed.wishlist);
  state.purchased = normalizePurchased(parsed.purchased);
  state.notes = typeof parsed.notes === "string" ? parsed.notes : "";
  state.settings.purchasedRetentionDays = normalizeRetentionDays(state.settings.purchasedRetentionDays);
  state.settings.filters = normalizeFilters(parsed.settings && parsed.settings.filters);
  state.stats.checklist = normalizeChecklist(parsed.stats && parsed.stats.checklist);
  state.stats.completedChecklistCount = Number(state.stats.completedChecklistCount) || 0;
  migrateCheckedChecklistItems(state);
  state.purchased = prunePurchasedItems(state.purchased, state.settings.purchasedRetentionDays);
  updateTheme();
  saveData();
  renderAll();
}

function resetApplication() {
  const confirmed = window.confirm("Reinitialiser l'application et effacer toutes les donnees locales ?");
  if (!confirmed) return;

  state = createDefaultState();
  saveData();
  updateTheme();
  renderAll();
}

function renderAll() {
  renderFilters();
  renderChecklist();
  renderWardrobe();
  renderWishlist();
  renderNotes();
  renderSettings();
  updateDashboard();
}

function handleClick(event) {
  const selectTrigger = event.target.closest("[data-select-trigger]");
  const selectOption = event.target.closest("[data-select-option]");
  const selectShell = event.target.closest("[data-select]");

  if (selectOption) {
    event.preventDefault();
    const shell = selectShell || activeSelectShell;
    if (!shell) return;
    const value = selectOption.dataset.value;
    setCustomSelectValue(shell, value);
    closeSelectMenus();
    applyCustomSelectValue(shell, value);
    return;
  }

  if (selectTrigger) {
    event.preventDefault();
    const shell = selectShell || selectTrigger.closest("[data-select]");
    if (!shell) return;
    toggleSelectMenu(shell);
    return;
  }

  if (!selectShell) {
    closeSelectMenus();
  }

  const button = event.target.closest("[data-action], [data-scroll-target]");
  if (!button) return;

  if (button.dataset.scrollTarget) {
    document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll(".nav-pill").forEach((navButton) => {
      navButton.classList.toggle("is-active", navButton === button);
    });
    return;
  }

  const card = button.closest("[data-item-id]");
  if (!card) return;

  const section = card.dataset.section;
  const id = card.dataset.itemId;

  switch (button.dataset.action) {
    case "remove-checklist":
    case "remove-wardrobe":
    case "remove-wishlist":
      removeItem(section, id);
      break;
    case "move-to-wardrobe":
      moveWishlistItemToWardrobe(id);
      break;
    case "mark-worn":
      {
        const item = state.wardrobe.find((entry) => entry.id === id);
        if (!item) break;
        updateWardrobeUsage(item, 1);
        saveData();
        renderWardrobe();
        updateDashboard();
      }
      break;
    default:
      break;
  }
}

function handleInput(event) {
  const target = event.target;

  if (target.id === "notes-field") {
    state.notes = target.value;
    saveData();
    return;
  }

  if (target.id === "theme-select") {
    state.settings.theme = target.value;
    updateTheme();
    saveData();
    return;
  }

  if (["search-input", "scope-filter", "category-filter", "priority-filter", "size-filter"].includes(target.id)) {
    state.settings.filters = normalizeFilters(state.settings.filters);
    if (target.id === "search-input") state.settings.filters.query = target.value;
    if (target.id === "scope-filter") state.settings.filters.section = target.value;
    if (target.id === "category-filter") state.settings.filters.category = target.value;
    if (target.id === "priority-filter") state.settings.filters.priority = target.value;
    if (target.id === "size-filter") state.settings.filters.size = target.value;
    saveData();
    renderChecklist();
    renderWardrobe();
    renderWishlist();
    return;
  }

  const card = target.closest("[data-item-id]");
  if (!card) return;

  const section = card.dataset.section;
  const id = card.dataset.itemId;
  const field = target.dataset.field;
  if (!field) return;

  if (target.type === "file") {
    handleFileUpload(target);
    return;
  }

  if (target.type === "checkbox") {
    updateItem(section, id, field, target.checked);
    return;
  }

  updateItem(section, id, field, target.value);
}

function wireSettings() {
  document.getElementById("export-button")?.addEventListener("click", exportData);

  document.getElementById("import-button")?.addEventListener("click", () => {
    document.getElementById("import-input")?.click();
  });

  document.getElementById("import-input")?.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
      await importData(file);
    } catch (error) {
      console.error("Import failed", error);
      window.alert("Import impossible: le fichier JSON est invalide.");
    } finally {
      event.target.value = "";
    }
  });

  document.getElementById("reset-button")?.addEventListener("click", resetApplication);

  document.getElementById("filters-reset-button")?.addEventListener("click", () => {
    state.settings.filters = { ...DEFAULT_FILTERS };
    saveData();
    renderFilters();
    renderChecklist();
    renderWardrobe();
    renderWishlist();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  });
}

function getSectionItems(section) {
  const collections = {
    checklist: state.stats.checklist,
    wardrobe: state.wardrobe,
    wishlist: state.wishlist,
    purchased: state.purchased
  };
  const query = normalizeSearchText(getActiveFilters().query);
  return (collections[section] || []).filter((item) => !query || itemSearchBlob(item).includes(query));
}

function renderEmptyState(container, title, detail) {
  container.innerHTML = `<div class="empty-state"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div>`;
}

function renderPhotoPreview(item, showPlaceholder = true) {
  if (!item.photo) {
    return showPlaceholder ? `<div class="card-photo-placeholder">Photo à ajouter</div>` : "";
  }

  const name = escapeHtml(item.name || "Article");
  const photo = escapeHtml(item.photo);
  return `<button class="photo-preview" type="button" data-action="open-photo" aria-label="Voir la photo de ${name} en grand">
    <img class="photo-preview-backdrop" src="${photo}" alt="" aria-hidden="true">
    <img class="photo-preview-image" src="${photo}" alt="${name}">
    <span class="photo-preview-hint">Voir en grand</span>
  </button>`;
}

function openPhotoLightbox(src, alt) {
  const lightbox = document.getElementById("photo-lightbox");
  const image = document.getElementById("photo-lightbox-image");
  const caption = document.getElementById("photo-lightbox-caption");
  if (!lightbox || !image || !caption || !src) return;

  photoLightboxTrigger = document.activeElement;
  image.src = src;
  image.alt = alt || "Photo de l’article";
  caption.textContent = alt || "Photo de l’article";
  lightbox.hidden = false;
  document.body.classList.add("photo-lightbox-open");
  lightbox.querySelector("[data-close-photo-lightbox]")?.focus();
}

function closePhotoLightbox() {
  const lightbox = document.getElementById("photo-lightbox");
  const image = document.getElementById("photo-lightbox-image");
  const caption = document.getElementById("photo-lightbox-caption");
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.classList.remove("photo-lightbox-open");
  if (image) {
    image.src = "";
    image.alt = "";
  }
  if (caption) caption.textContent = "";
  photoLightboxTrigger?.focus?.();
  photoLightboxTrigger = null;
}

function renderChecklist() {
  const container = document.getElementById("checklist-content");
  if (!container) return;
  const items = getSectionItems("checklist");
  if (!state.stats.checklist.length) {
    renderEmptyState(container, "Aucun article à acheter.", "Ajoutez votre première pièce avec +.");
    return;
  }
  if (!items.length) {
    renderEmptyState(container, "Aucun résultat.", "Essayez une autre recherche.");
    return;
  }
  container.innerHTML = items.map((item) => `
    <article class="item-card checklist-card" data-section="checklist" data-item-id="${item.id}">
      <label class="check-control" aria-label="${item.checked ? "Article acheté" : "Marquer comme acheté"}"><input type="checkbox" data-card-check ${item.checked ? "checked" : ""}><span></span></label>
      ${renderPhotoPreview(item, false)}
      <button class="card-open-button" type="button" data-action="open-editor">
        <div class="item-head"><div class="item-title-wrap"><div class="item-title">${escapeHtml(item.name)}</div><div class="item-meta"><span>${escapeHtml(item.category || "Catégorie libre")}</span><span>${formatCurrency(item.budget)}</span><span>Taille : <strong>${escapeHtml(item.size || "à définir")}</strong></span></div></div><span class="card-chevron">↗</span></div>
      </button>
    </article>`).join("");
}

function renderWardrobe() {
  const container = document.getElementById("wardrobe-content");
  if (!container) return;
  const items = getSectionItems("wardrobe");
  if (!state.wardrobe.length) {
    renderEmptyState(container, "Votre garde-robe est vide.", "Ajoutez une pièce avec +.");
    return;
  }
  if (!items.length) {
    renderEmptyState(container, "Aucun résultat.", "Essayez une autre recherche.");
    return;
  }
  container.innerHTML = items.map((item) => `
    <article class="item-card" data-section="wardrobe" data-item-id="${item.id}">
      ${renderPhotoPreview(item)}
      <button class="card-open-button" type="button" data-action="open-editor">
        <div class="item-head"><div class="item-title-wrap"><div class="item-title">${escapeHtml(item.name)}</div><div class="item-meta"><span>${escapeHtml(item.category || "Catégorie libre")}</span><span>${escapeHtml(item.color || "Couleur à définir")}</span><span>${escapeHtml(item.size || "Taille à définir")}</span><span>${escapeHtml(item.brand || "Marque à définir")}</span></div></div><span class="card-chevron">↗</span></div>
      </button>
    </article>`).join("");
}

function renderWishlist() {
  const container = document.getElementById("wishlist-content");
  if (!container) return;
  const items = getSectionItems("wishlist");
  if (!state.wishlist.length) {
    renderEmptyState(container, "Votre wishlist est vide.", "Ajoutez quelque chose avec +.");
    return;
  }
  if (!items.length) {
    renderEmptyState(container, "Aucun résultat.", "Essayez une autre recherche.");
    return;
  }
  container.innerHTML = items.map((item) => {
    const safeLink = getSafeExternalLink(item.link);
    return `
      <article class="item-card" data-section="wishlist" data-item-id="${item.id}">
        ${renderPhotoPreview(item)}
        <button class="card-open-button" type="button" data-action="open-editor">
          <div class="item-head"><div class="item-title-wrap"><div class="item-title">${escapeHtml(item.name)}</div><div class="item-meta"><span>${escapeHtml(item.category || "Catégorie libre")}</span><span>${formatCurrency(item.price)}</span><span>Taille : <strong>${escapeHtml(item.size || "à définir")}</strong></span><span>${escapeHtml(item.store || "Magasin à définir")}</span></div></div><span class="card-chevron">↗</span></div>
        </button>
        <div class="item-card-reference">
          <span class="preview-line">${escapeHtml(item.category || "Catégorie libre")}</span>
          ${safeLink ? `<a class="card-link" href="${escapeHtml(safeLink)}" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le lien de ${escapeHtml(item.name)}">Lien</a>` : ""}
        </div>
        <div class="item-actions"><button class="item-action" type="button" data-action="move-to-checklist">Déplacer dans la checklist</button></div>
      </article>`;
  }).join("");
}

function getPurchasedDaysRemaining(item) {
  const expiryDate = addDaysToIsoDate(item.purchasedAt, state.settings.purchasedRetentionDays);
  if (!expiryDate) return state.settings.purchasedRetentionDays;
  const today = new Date(`${getTodayIsoDate()}T12:00:00`);
  const expiry = new Date(`${expiryDate}T12:00:00`);
  return Math.max(0, Math.ceil((expiry - today) / 86400000));
}

function renderPurchased() {
  const container = document.getElementById("purchased-content");
  if (!container) return;
  const items = getSectionItems("purchased");
  if (!state.purchased.length) {
    renderEmptyState(container, "Aucun article acheté en attente.", "Les articles cochés dans la checklist apparaîtront ici.");
    return;
  }
  if (!items.length) {
    renderEmptyState(container, "Aucun résultat.", "Essayez une autre recherche.");
    return;
  }
  container.innerHTML = items.map((item) => `
    <article class="item-card purchased-card" data-section="purchased" data-item-id="${item.id}">
      <div class="purchased-card-body">
        ${item.photo ? renderPhotoPreview(item) : ""}
        <div class="item-head"><div class="item-title-wrap"><div class="item-title">${escapeHtml(item.name)}</div><div class="item-meta"><span>${escapeHtml(item.category || "Catégorie libre")}</span><span>${formatCurrency(item.budget)}</span><span>Taille : <strong>${escapeHtml(item.size || "à définir")}</strong></span></div></div><span class="card-chevron">✓</span></div>
        <p class="purchased-expiry">Acheté le ${formatDate(item.purchasedAt)} · Nettoyage dans ${getPurchasedDaysRemaining(item)} j</p>
        <div class="item-actions"><button class="item-action" type="button" data-action="move-purchased-to-wardrobe">Ajouter au dressing</button><button class="item-action danger" type="button" data-action="remove-purchased">Supprimer</button></div>
      </div>
    </article>`).join("");
}

function updateDashboard() {
  const summary = getBudgetSummary();
  const setMetric = (name, value) => document.querySelectorAll(`[data-metric="${name}"]`).forEach((element) => { element.textContent = value; });
  setMetric("progress-label", `${summary.progress}%`);
  setMetric("budget-planned", formatCurrency(summary.planned));
  setMetric("budget-spent", formatCurrency(summary.spent));
  setMetric("budget-remaining", formatCurrency(summary.remaining));
  setMetric("checklist-count", state.stats.checklist.length);
  setMetric("purchased-count", state.purchased.length);
  setMetric("wardrobe-count-large", state.wardrobe.length);
  setMetric("wishlist-count", state.wishlist.length);
  const progressBar = document.querySelector('[data-metric="progress-bar"]');
  if (progressBar) progressBar.style.width = `${summary.progress}%`;
}

function showScreen(screen) {
  const shell = document.querySelector(".app-shell");
  closeSelectMenus();
  document.querySelectorAll("[data-screen]").forEach((element) => {
    element.hidden = shell?.dataset.uiMode !== "classic" && element.dataset.screen !== screen;
  });
  document.querySelectorAll("[data-search-box]").forEach((box) => {
    if (box.dataset.searchBox !== screen) box.hidden = true;
  });
  document.querySelector("[data-app-menu]")?.setAttribute("hidden", "");
  document.querySelector("[data-action='toggle-menu']")?.setAttribute("aria-expanded", "false");
  if (screen !== "home") document.getElementById(screen)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateUiModeControls() {
  const isClassic = state.settings.uiMode === "classic";
  const label = isClassic ? "Passer à l’affichage compact" : "Passer à l’affichage classique";
  document.querySelectorAll('[data-action="toggle-ui-mode"]').forEach((button) => {
    button.textContent = label;
    button.setAttribute("aria-label", label);
  });
  const settingDescription = document.querySelector('[data-action="toggle-ui-mode"]')?.closest(".setting-card")?.querySelector("small");
  if (settingDescription) {
    settingDescription.textContent = isClassic ? "Revenir aux cartes empilées" : "Afficher toutes les sections";
  }
}

function setUiMode(mode) {
  state.settings.uiMode = mode === "classic" ? "classic" : "new";
  document.querySelector(".app-shell")?.setAttribute("data-ui-mode", state.settings.uiMode);
  updateUiModeControls();
  saveData();
  showScreen("home");
}

function editorField(field, label, value = "", type = "text", extra = "") {
  return `<label class="field"><span>${escapeHtml(label)}</span><input name="${field}" type="${type}" value="${type === "number" ? Number(value) || "" : escapeHtml(value)}" ${extra}></label>`;
}

function editorTextarea(field, label, value = "") {
  return `<label class="field field-wide"><span>${escapeHtml(label)}</span><textarea name="${field}">${escapeHtml(value)}</textarea></label>`;
}

function openEditor(section, id = "") {
  const collection = section === "checklist" ? state.stats.checklist : section === "wardrobe" ? state.wardrobe : state.wishlist;
  const item = collection.find((entry) => entry.id === id) || {};
  const title = id ? "Modifier" : "Ajouter";
  const names = { checklist: "la checklist", wardrobe: "mes vêtements", wishlist: "la wishlist" };
  const form = document.getElementById("item-editor-form");
  const modal = document.getElementById("editor-modal");
  if (!form || !modal) return;
  form.dataset.section = section;
  form.dataset.itemId = id;
  form.dataset.photo = "";
  document.getElementById("editor-kicker").textContent = id ? "Modifier un article" : "Nouvel article";
  document.getElementById("editor-title").textContent = `${title} dans ${names[section]}`;
  let fields = "";
  if (section === "checklist") {
    fields = `${editorField("name", "Nom", item.name)}${editorField("category", "Catégorie", item.category)}${editorField("size", "Taille", item.size)}${editorField("budget", "Budget conseillé", item.budget, "number", "min=\"0\" step=\"1\"")}${editorField("color", "Couleur recommandée", item.color)}${editorField("material", "Matière recommandée", item.material)}${editorTextarea("notes", "Notes", item.notes)}<label class="field field-wide"><span>Photo</span><input name="photo" type="file" accept="image/*" data-editor-photo>${item.photo ? `<small>Une photo est déjà enregistrée.</small>` : ""}</label>`;
  } else if (section === "wardrobe") {
    fields = `${editorField("name", "Nom", item.name)}${editorField("category", "Catégorie", item.category)}${editorField("color", "Couleur", item.color)}${editorField("material", "Matière", item.material)}${editorField("size", "Taille", item.size)}${editorField("brand", "Marque", item.brand)}${editorField("season", "Saison", item.season)}<label class="field field-wide"><span>Photo</span><input name="photo" type="file" accept="image/*" data-editor-photo>${item.photo ? `<small>Une photo est déjà enregistrée.</small>` : ""}</label>`;
  } else {
    fields = `${editorField("name", "Nom", item.name)}${editorField("category", "Catégorie", item.category)}${editorField("size", "Taille", item.size)}${editorField("price", "Prix", item.price, "number", "min=\"0\" step=\"1\"")}${editorField("store", "Magasin", item.store)}${editorField("link", "Lien", item.link, "url", "placeholder=\"https://...\"")}<label class="field field-wide"><span>Photo</span><input name="photo" type="file" accept="image/*" data-editor-photo>${item.photo ? `<small>Une photo est déjà enregistrée.</small>` : ""}</label>`;
  }
  form.innerHTML = `<div class="editor-fields">${fields}</div><button class="editor-submit" type="submit">${id ? "Enregistrer les modifications" : "Ajouter"}</button>${id ? `<div class="editor-secondary-actions"><button type="button" data-editor-delete>Supprimer</button>${section === "wishlist" ? `<button type="button" data-editor-move>Déplacer dans la checklist</button>` : ""}</div>` : ""}`;
  modal.hidden = false;
  modal.querySelector("input, textarea")?.focus();
}

function closeEditor() {
  const modal = document.getElementById("editor-modal");
  if (modal) modal.hidden = true;
}

function moveWishlistItemToChecklist(id) {
  const index = state.wishlist.findIndex((item) => item.id === id);
  if (index === -1) return;
  const [item] = state.wishlist.splice(index, 1);
  state.stats.checklist.unshift({ id: makeId(), name: item.name, category: item.category || "General", size: item.size || "", budget: Number(item.price) || 0, color: "", material: "", notes: item.store ? `Magasin : ${item.store}` : "", photo: item.photo || "", checked: false });
  saveData(); closeEditor(); renderChecklist(); renderWishlist(); updateDashboard(); showScreen("checklist");
}

function moveChecklistItemToPurchased(id) {
  const index = state.stats.checklist.findIndex((item) => item.id === id);
  if (index === -1) return;

  const [item] = state.stats.checklist.splice(index, 1);
  state.purchased.unshift(normalizePurchasedItem({ ...item, purchasedAt: getTodayIsoDate() }));
  state.stats.completedChecklistCount = (Number(state.stats.completedChecklistCount) || 0) + 1;
  saveData();
  renderChecklist();
  renderPurchased();
  updateDashboard();
}

function addWardrobeFromPurchased(item) {
  state.wardrobe.unshift({
    id: makeId(),
    name: item.name,
    size: item.size || "",
    category: item.category || "General",
    color: item.color || "",
    material: item.material || "",
    brand: "",
    season: "",
    cost: Number(item.budget) || 0,
    photo: item.photo || "",
    wearCount: 0,
    lastWornAt: "",
    purchaseDate: item.purchasedAt || getTodayIsoDate()
  });
}

function movePurchasedItemToWardrobe(id) {
  const index = state.purchased.findIndex((item) => item.id === id);
  if (index === -1) return;

  const [item] = state.purchased.splice(index, 1);
  addWardrobeFromPurchased(item);
  saveData();
  renderPurchased();
  renderWardrobe();
  updateDashboard();
  showToast("Article ajouté à votre dressing");
}

function removePurchasedItem(id) {
  state.purchased = state.purchased.filter((item) => item.id !== id);
  saveData();
  renderPurchased();
  updateDashboard();
}

function pruneExpiredPurchasedItems() {
  const before = state.purchased.length;
  state.purchased = prunePurchasedItems(state.purchased, state.settings.purchasedRetentionDays);
  return state.purchased.length !== before;
}

function wireEditor() {
  document.getElementById("item-editor-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveEditor(event.currentTarget);
  });
}

function handleEditorAction(action) {
  const form = document.getElementById("item-editor-form");
  if (!form) return;
  const section = form.dataset.section;
  const id = form.dataset.itemId;
  if (action === "move") { moveWishlistItemToChecklist(id); return; }
  if (action === "delete" && window.confirm("Supprimer cet article ?")) { removeItem(section, id); closeEditor(); }
}

function handleClick(event) {
  const selectOption = event.target.closest("[data-select-option]");
  const selectTrigger = event.target.closest("[data-select-trigger]");
  const selectShell = event.target.closest("[data-select]");
  if (selectOption) {
    event.preventDefault();
    const shell = selectShell || activeSelectShell;
    if (shell) { const value = selectOption.dataset.value; setCustomSelectValue(shell, value); closeSelectMenus(); applyCustomSelectValue(shell, value); }
    return;
  }
  if (selectTrigger) { event.preventDefault(); toggleSelectMenu(selectShell); return; }
  const screenTarget = event.target.closest("[data-screen-target]");
  if (screenTarget) { event.preventDefault(); showScreen(screenTarget.dataset.screenTarget); return; }
  if (event.target.id === "photo-lightbox") { closePhotoLightbox(); return; }
  const button = event.target.closest("[data-action], [data-open-create], [data-search-target], [data-clear-search], [data-close-modal], [data-close-photo-lightbox], [data-editor-delete], [data-editor-move]");
  if (!button) { if (!event.target.closest("[data-select]")) closeSelectMenus(); return; }
  const action = button.dataset.action;
  if (action === "toggle-menu") { const menu = document.querySelector("[data-app-menu]"); const open = menu.hidden; menu.hidden = !open; button.setAttribute("aria-expanded", String(open)); return; }
  if (action === "toggle-ui-mode") { setUiMode(state.settings.uiMode === "classic" ? "new" : "classic"); return; }
  if (button.dataset.openCreate) { openEditor(button.dataset.openCreate); return; }
  if (button.dataset.searchTarget) { const box = document.querySelector(`[data-search-box="${button.dataset.searchTarget}"]`); if (box) { box.hidden = !box.hidden; if (!box.hidden) box.querySelector("input")?.focus(); } return; }
  if (button.dataset.clearSearch) { const input = document.querySelector(`[data-section-search="${button.dataset.clearSearch}"]`); if (input) { input.value = ""; state.settings.filters.query = ""; saveData(); renderChecklist(); renderWardrobe(); renderWishlist(); renderPurchased(); input.focus(); } return; }
  if (button.hasAttribute("data-close-modal")) { closeEditor(); return; }
  if (button.hasAttribute("data-close-photo-lightbox")) { closePhotoLightbox(); return; }
  if (button.hasAttribute("data-editor-delete")) { handleEditorAction("delete"); return; }
  if (button.hasAttribute("data-editor-move")) { handleEditorAction("move"); return; }
  if (event.target.id === "editor-modal") { closeEditor(); return; }
  const card = button.closest("[data-item-id]");
  if (!card) return;
  if (action === "open-photo") {
    const image = button.querySelector(".photo-preview-image");
    if (image) openPhotoLightbox(image.currentSrc || image.src, image.alt);
    return;
  }
  if (action === "move-purchased-to-wardrobe") { movePurchasedItemToWardrobe(card.dataset.itemId); return; }
  if (action === "remove-purchased") { removePurchasedItem(card.dataset.itemId); return; }
  if (action === "open-editor") { openEditor(card.dataset.section, card.dataset.itemId); return; }
  if (action === "move-to-checklist") { moveWishlistItemToChecklist(card.dataset.itemId); }
}

function handleInput(event) {
  const target = event.target;
  if (target.id === "notes-field") { state.notes = target.value; saveData(); return; }
  if (target.matches("[data-section-search]")) { state.settings.filters.query = target.value; saveData(); renderChecklist(); renderWardrobe(); renderWishlist(); renderPurchased(); return; }
  if (target.matches("[data-card-check]")) {
    const card = target.closest("[data-item-id]");
    if (card && target.checked) { moveChecklistItemToPurchased(card.dataset.itemId); }
    return;
  }
  if (target.matches("[data-editor-photo]")) {
    const file = target.files && target.files[0];
    if (!file) return;
    const form = target.closest("form");
    const section = form.dataset.section;
    const reader = new FileReader();
    reader.onload = () => { form.dataset.photo = String(reader.result || ""); };
    reader.readAsDataURL(file);
    return;
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Photo illisible"));
    reader.readAsDataURL(file);
  });
}

async function saveEditor(form) {
  const section = form.dataset.section;
  const id = form.dataset.itemId;
  const data = Object.fromEntries(new FormData(form).entries());
  const collection = section === "checklist" ? state.stats.checklist : section === "wardrobe" ? state.wardrobe : state.wishlist;
  const item = collection.find((entry) => entry.id === id);
  const target = item || { id: makeId() };
  Object.entries(data).forEach(([field, value]) => {
    if (field === "photo") return;
    target[field] = ["budget", "price"].includes(field) ? Number(value) || 0 : value;
  });
  const photoInput = form.querySelector("[data-editor-photo]");
  const photoFile = photoInput?.files?.[0];
  if (photoFile) {
    target.photo = await readFileAsDataUrl(photoFile);
  } else if (form.dataset.photo) {
    target.photo = form.dataset.photo;
  }
  if (section === "checklist") { target.checked = Boolean(target.checked); target.priority = target.priority || "Moyenne"; }
  if (section === "wardrobe") { target.wearCount = Number(target.wearCount) || 0; target.lastWornAt = target.lastWornAt || ""; target.cost = Number(target.cost) || 0; }
  if (!item) collection.unshift(target);
  saveData(); closeEditor(); renderChecklist(); renderWardrobe(); renderWishlist(); updateDashboard();
}

function renderAll() {
  renderFilters(); renderChecklist(); renderWardrobe(); renderWishlist(); renderPurchased(); renderNotes(); renderSettings(); updateDashboard();
  document.querySelectorAll("[data-section-search]").forEach((input) => { input.value = getActiveFilters().query; });
  setUiMode(state.settings.uiMode || "new");
}

const AppBlocks = Object.freeze({
  data: Object.freeze({
    createDefaultState,
    loadData,
    saveData,
    normalizeChecklist,
    updateTheme
  }),
  catalog: Object.freeze({
    DEFAULT_CHECKLIST,
  }),
  filters: Object.freeze({
    renderFilters,
    filterCollection,
    matchesItemFilters,
    getActiveFilters
  }),
  usage: Object.freeze({
    formatDate,
    getTodayIsoDate,
    getWardrobeUsageSummary,
    updateWardrobeUsage
  }),
  views: Object.freeze({
    renderChecklist,
    renderWardrobe,
    renderWishlist,
    renderPurchased,
    renderNotes,
    renderSettings,
    renderAll
  }),
  actions: Object.freeze({
    updateItem,
    removeItem,
    moveWishlistItemToWardrobe,
    moveChecklistItemToPurchased,
    movePurchasedItemToWardrobe,
    removePurchasedItem,
    handleFileUpload,
    exportData,
    importData,
    resetApplication
  }),
  events: Object.freeze({
    handleClick,
    handleInput,
    wireAddForms,
    wireSettings
  }),
  bootstrap: Object.freeze({
    registerServiceWorker,
    init
  })
});

window.WardrobeCompanion = AppBlocks;

function init() {
  state.settings.purchasedRetentionDays = normalizeRetentionDays(state.settings.purchasedRetentionDays);
  pruneExpiredPurchasedItems();
  saveData();
  updateTheme();
  renderAll();
  wireAddForms();
  wireSettings();
  wireEditor();
  registerServiceWorker();
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleInput);
  window.addEventListener("resize", closeSelectMenus);
  window.addEventListener("scroll", closeSelectMenus);
  window.addEventListener("blur", closeSelectMenus);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSelectMenus();
      closePhotoLightbox();
      closeEditor();
    }
  });
}

init();
