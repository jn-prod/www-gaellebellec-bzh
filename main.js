// Gaël Le Bellec : carrousel avec pause, newsletter, et données lues dans Google Sheets.
const SHEET = "https://docs.google.com/spreadsheets/d/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/gviz/tq?tqx=out:csv";
const suffix = document.documentElement.lang === "en" ? "_en" : "";

// Lecture CSV : champs entre guillemets, virgules et retours à la ligne inclus.
const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
};

const read = async (sheet, firstRow) => {
  const res = await fetch(`${SHEET}&sheet=${sheet}&range=${firstRow}:1000`);
  if (!res.ok) return [];
  return parseCsv(await res.text()).filter((row) => row.some(Boolean));
};

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const icon = (name) => document.querySelector(`[data-icon="${name}"]`).content.cloneNode(true);

const withIcon = (name, text) => {
  const node = el("div", "meta");
  node.append(icon(name), text);
  return node;
};

function carousel(root) {
  const toggle = root.querySelector("[data-carousel-toggle]");
  let current = 1;
  let timer = null;
  const show = (n) => (root.dataset.slide = n);
  const play = () => {
    timer = setInterval(() => {
      current = current >= 5 ? 1 : current + 1;
      show(current);
    }, 4000);
    toggle.textContent = root.dataset.pause;
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
    toggle.textContent = root.dataset.play;
  };
  show(1);
  toggle.hidden = false;
  toggle.addEventListener("click", () => (timer ? stop() : play()));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) stop();
  else play();
}

function newsletter() {
  const dialog = document.querySelector("[data-newsletter]");
  if (!dialog) return;
  document
    .querySelectorAll("[data-newsletter-open]")
    .forEach((button) => button.addEventListener("click", () => dialog.showModal()));
  dialog.querySelector("[data-newsletter-close]").addEventListener("click", () => dialog.close());
}

// Une liste qui n'affiche que sa première entrée, jusqu'au bouton « voir + ».
function firstThenAll(root, button, items, render, keepButton) {
  const draw = (all) => root.replaceChildren(...(all ? items : items.slice(0, 1)).map(render));
  let all = false;
  draw(all);
  if (items.length < 2) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    all = !all;
    draw(all);
    if (!keepButton) button.hidden = true;
  });
}

function post(root) {
  return ([title, summary, content, link]) => {
    const article = el("article", "post");
    article.append(el("h3", "accent", title));
    const short = el("div", "post__summary");
    const full = el("p", "", content);
    full.hidden = true;
    const more = el("button", "button button--danger post__more", root.dataset.readMore);
    more.type = "button";
    more.addEventListener("click", () => {
      short.hidden = true;
      full.hidden = false;
    });
    short.append(el("p", "", summary), more);
    article.append(short, full);
    if (/^https?:\/\//.test(link ?? "")) {
      const a = el("a", "", root.dataset.followLink);
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      const p = el("p");
      p.append(a);
      article.append(p);
    }
    return article;
  };
}

const parseDate = (value) => {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day);
};

function event([date, title, city]) {
  const row = el("div", "row");
  const meta = el("div", "row__meta");
  meta.append(withIcon("calendar", date), withIcon("place", city));
  row.append(meta, el("h3", "accent row__title", title));
  return row;
}

function result([date, title, city, place]) {
  const row = el("div", "row");
  const rank = el("div", "row__rank rank");
  rank.append(icon("rank"), ` #${place}`);
  const meta = el("div", "row__meta");
  meta.append(withIcon("calendar", date), withIcon("place", city));
  row.append(rank, meta, el("h3", "accent row__title", title));
  return row;
}

async function sheets() {
  const posts = document.querySelector("[data-posts]");
  if (!posts) return;
  const [news, calendar, results] = await Promise.all([
    read(`posts${suffix}`, 2),
    read(`calendarOutput${suffix}`, 1),
    read(`resultsOutput${suffix}`, 1),
  ]);
  firstThenAll(posts, document.querySelector('[data-more="posts"]'), news.reverse(), post(posts), true);
  const upcoming = calendar.filter(([date]) => parseDate(date) > new Date()).reverse();
  if (upcoming.length) document.querySelector("[data-events]").replaceChildren(...upcoming.map(event));
  firstThenAll(document.querySelector("[data-results]"), document.querySelector('[data-more="results"]'), results, result, false);
}

const hero = document.querySelector("[data-carousel]");
if (hero) carousel(hero);
newsletter();
sheets().catch(() => {});
