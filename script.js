/*
let data = [];
let activeTags = [];

const TAG_CATEGORIES = {
  "🌿 Nature": ["forest", "jungle", "garden", "nature"],
  "🏙️ Urban": ["city", "village", "town", "port", "urban"],
  "🏰 Dungeon": ["dungeon", "cave", "lair", "crypt", "tomb"],
  "🔥 Combat": ["battle", "attack", "combat"],
  "✨ Magic": ["magic", "wizard", "druid"],
  "💀 Undead": ["undead", "graveyard", "spooky"],
  "🌊 Water": ["water", "river", "lake", "sea", "waterfall"],
  "🔥 Fire": ["fire", "lava", "volcano"],
  "🏗️ Structure": ["bridge", "road", "path"],
  "🏠 Buildings": ["building", "inn", "shop", "tower"]
};

// 🔤 ordenar categorias (já deixa pronto pra futura sidebar)
const SORTED_CATEGORIES = Object.keys(TAG_CATEGORIES)
  .sort((a, b) => a.localeCompare(b));

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderTags();
    renderGallery([]); // começa vazio
  });

function renderTags() {
  const tagsDiv = document.getElementById("tags");
  const allTags = new Set();

  data.forEach(item => {
    item.tags.forEach(tag => allTags.add(tag));
  });

  // 🔤 ordenar tags alfabeticamente
  const sortedTags = Array.from(allTags).sort((a, b) => a.localeCompare(b));

  sortedTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.innerText = tag;

    btn.onclick = () => {
      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
        btn.style.background = "";
      } else {
        activeTags.push(tag);
        btn.style.background = "green";
      }
      filter();
    };

    tagsDiv.appendChild(btn);
  });
}

function renderGallery(list) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  // 🚫 mensagem quando não há filtro
  if (activeTags.length === 0 && document.getElementById("search").value === "") {
    gallery.innerHTML = "<p>🔍 Selecione uma tag ou digite algo para começar</p>";
    return;
  }

  // 🚫 mensagem quando filtro não encontrou nada
  if (list.length === 0) {
    gallery.innerHTML = "<p>❌ Nenhum resultado encontrado</p>";
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "images/" + item.file;

    img.onclick = () => openModal(img.src);

    // nome formatado
const name = item.file
  .split("/")        // remove subpastas
  .pop()             // pega só o arquivo
  .replace(/\.[^/.]+$/, "") // remove extensão
  .replace(/_/g, " ");      // troca _ por espaço

const caption = document.createElement("p");
caption.innerText = name;
caption.className = "caption";

div.appendChild(img);
div.appendChild(caption);
gallery.appendChild(div);
  });
}

function filter() {
  const search = document.getElementById("search").value.toLowerCase();

  // 🚫 não mostra nada se não houver filtro
  if (activeTags.length === 0 && search === "") {
    renderGallery([]);
    return;
  }

  let filtered = data.filter(item => {

    const matchesSearch =
      item.tags.some(tag => tag.includes(search)) ||
      item.file.toLowerCase().includes(search);

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every(tag => item.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  renderGallery(filtered);
}

document.getElementById("search").addEventListener("input", filter);

function openModal(src) {
  document.getElementById("modal-img").src = src;
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("close").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};
*/
let data = [];
let activeTags = [];
let currentList = [];
let itemsPerLoad = 30;
let currentIndex = 0;



function normalizeTags(item) {
  if (!item.tags || item.tags.length === 0) {
    return ["untagged"];
  }

  const validTags = item.tags.filter(tag => CATEGORY_TAGS.has(tag));

  // 🔥 se nenhuma tag válida → vira untagged
  if (validTags.length === 0) {
    return ["untagged"];
  }

  return item.tags;
}

const TAG_CATEGORIES = {

  "🌿 Nature": [
    "forest", "jungle", "garden", "nature", "tree", "vines", "treetop",
    "hill", "wild", "cliffs", "canyon", "beach", "island", "rift"
  ],

  "🏙️ Urban": [
    "city", "village", "town", "port", "urban", "market", "place",
    "outpost", "barracks", "palace"
  ],

  "🏰 Dungeon": [
    "dungeon", "cave", "lair", "crypt", "tomb", "underdark",
    "underground", "maze", "den", "barrow"
  ],

  "🔥 Combat": [
    "battle", "attack", "combat", "fighting", "interrogation"
  ],

  "✨ Magic": [
    "magic", "wizard", "druid", "magical",
    "astral", "ethereal", "fey", "ouroboros", "yin",
    "purgatory"
  ],

  "💀 Undead": [
    "undead", "graveyard", "spooky", "skeleton", "dead"
  ],

  "🌊 Water": [
    "water", "river", "lake", "sea", "waterfall", "bay", "cove",
    "pool", "coast", "fishing"
  ],

  "🔥 Fire": [
    "fire", "lava", "volcano", "forge"
  ],

  "❄️ Cold": [
    "cold", "ice", "frozen"
  ],

  "🏗️ Structure": [
    "bridge", "road", "path", "railway", "walkway",
    "junction", "route", "door"
  ],

  "🏠 Buildings": [
    "building", "inn", "shop", "tower", "hotel", "home",
    "lighthouse", "ampitheater"
  ],

  "🏛️ Religious": [
    "temple", "religious", "shrine"
  ],

  "🐉 Creatures": [
    "dragon", "dragons", "goblin", "harpy", "giant",
    "tarrasque", "lizardfolk", "remorhaz", "creature"
  ],

  "🚢 Transport & Vehicles": [
    "ship", "longship", "barge", "shipwreck", "flying"
  ],

  "🏰 Castle & Imperial": [
    "castle", "imperial", "comm", "roof", "floor", "basement",
    "ground", "second", "third", "fourth", "room", "throne"
  ],

  "🏕️ Camps & Settlements": [
    "camp", "commune", "hideout"
  ],

  "🧭 Locations & Features": [
    "entrance", "exit", "marker", "equator", "pass",
    "chasm", "climb", "footprint", "ruins"
  ],

  "🧪 Misc (temas únicos)": [
    "greed", "lust", "sloth", "wrath", "envy", "pride",
    "gluttony", "impact", "mishap", "subject", "test",
    "colour", "extractor", "ryb", "star", "top", "moon",
    "life", "time", "immortal", "prisoner", "horror", "abandoned"
  ],

  "🎭 Nomes próprios / especiais": [
    "hespirides", "fizzlenozzles",
    "cainhurst", "therosmappack", "therosroll20", "bloodborn", "castleravenloft", "eldenring"
  ],
  "📦 Geral": ["all", "untagged"]
};
const CATEGORY_TAGS = new Set(
  Object.values(TAG_CATEGORIES).flat()
);

// carregar dados
/*V1
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderSidebar();
    renderGallery([]);
  });
*/
data = DATA;

renderSidebar();
renderGallery([]);

// SIDEBAR
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  Object.keys(TAG_CATEGORIES)
    .sort((a, b) => a.localeCompare(b))
    .forEach(category => {

      const div = document.createElement("div");
      div.className = "category";

      const title = document.createElement("h3");
      title.innerText = category;
      div.appendChild(title);

      TAG_CATEGORIES[category]
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .forEach(tag => {

          const btn = document.createElement("button");
          btn.innerText = tag;

          btn.onclick = () => {

  // remove destaque de TODOS os botões
  document.querySelectorAll("#sidebar button")
    .forEach(b => b.classList.remove("active"));

  // se já estiver selecionado → desmarca tudo
  if (activeTags[0] === tag) {
    activeTags = [];
  } else {
    activeTags = [tag];
    btn.classList.add("active");
  }

  filter();
};

          div.appendChild(btn);
        });

      sidebar.appendChild(div);
    });
}

// GALERIA
function renderGallery(list) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  const search = document.getElementById("search").value;

  if (activeTags.length === 0 && search === "") {
    gallery.innerHTML = "<p>🔍 Selecione uma categoria ou digite algo</p>";
    return;
  }

  if (list.length === 0) {
    gallery.innerHTML = "<p>❌ Nenhum resultado encontrado</p>";
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "images/" + item.file;
    img.loading = "lazy";
    img.onclick = () => openModal(img.src);

    // legenda
    const name = item.file
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    const caption = document.createElement("p");
    caption.innerText = name;
    caption.className = "caption";

    div.appendChild(img);
    div.appendChild(caption);
    gallery.appendChild(div);
  });
}
function renderNextBatch() {
    if (currentIndex >= currentList.length) return;
  const gallery = document.getElementById("gallery");

  const nextItems = currentList.slice(
    currentIndex,
    currentIndex + itemsPerLoad
  );

  nextItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "images/" + item.file;
    img.onclick = () => openModal(img.src);

    const name = item.file
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    const caption = document.createElement("p");
    caption.innerText = name;
    caption.className = "caption";

    div.appendChild(img);
    div.appendChild(caption);
    gallery.appendChild(div);
  });

  currentIndex += itemsPerLoad;
}

// FILTRO
function filter() {
    document.getElementById("gallery").innerHTML = "";
  const search = document.getElementById("search").value.toLowerCase();

  let filtered = [];

  if (activeTags.includes("all")) {
    filtered = [...data];
  } else {
    filtered = data.filter(item => {

const itemTags = normalizeTags(item);

      const matchesSearch =
        itemTags.some(tag => tag.includes(search)) ||
        item.file.toLowerCase().includes(search);

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.some(tag =>
          itemTags.some(t => t.includes(tag))
        );

      return matchesSearch && matchesTags;
    });
  }

  // 🔤 ordena alfabeticamente pelo nome do arquivo
  filtered.sort((a, b) =>
    a.file.localeCompare(b.file)
  );

  // prepara lazy loading
  currentList = filtered;
  currentIndex = 0;

  renderNextBatch();
}

document.getElementById("search").addEventListener("input", filter);

// MODAL

function openModal(src) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-img").src = src;
  modal.classList.add("active");
}
// botão fechar
document.getElementById("close").onclick = () => {
  document.getElementById("modal").classList.remove("active");
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
  ) {
    renderNextBatch();
  }
});

document.getElementById("modal").onclick = (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.remove("active");
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("modal").classList.remove("active");
  }
});