export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  name: { en: string; pl: string };
  category: string;
  description?: { en: string; pl: string };
  body?: { en: string; pl: string };
  tech?: string[];
  links?: ProjectLink[];
  status?: "active" | "archived" | "wip";
};

export const categoryNames: Record<string, { en: string; pl: string }> = {
  products: { en: "Products", pl: "Produkty" },
  "open-source": { en: "Open Source", pl: "Open Source" },
  teaching: { en: "Teaching", pl: "Nauczanie" },
  diversions: { en: "Diversions", pl: "Rozrywki" },
};

export const projects: Project[] = [
  // ── Products ────────────────────────────────────────────────

  {
    name: { en: "zanlib.dev", pl: "zanlib.dev" },
    category: "products",
    body: {
      en: "My blog and the largest personal project I maintain. Built with Astro, bilingual in English and Polish with custom i18n routing. Features a custom remark plugin for margin notes, an OKLCH-based color system with dark mode, and EB Garamond / League Spartan / League Mono typography. Content is structured as articles (polished, evergreen essays), notes (book notes, structured thinking), and jots (drafts, short-form). Syntax highlighting via Shiki.",
      pl: "Mój blog i największy osobisty projekt, który utrzymuję. Zbudowany w Astro, dwujęzyczny (polski/angielski) z własnym routingiem i18n. Zawiera własny plugin remark do notatek marginalnych, system kolorów oparty na OKLCH z trybem ciemnym oraz typografię EB Garamond / League Spartan / League Mono. Treści zorganizowane jako artykuły (dopracowane eseje), notatki (notatki z książek, uporządkowane myśli) i szkice (wersje robocze, krótkie formy). Podświetlanie składni przez Shiki.",
    },
    tech: ["Astro", "MDX", "TypeScript"],
    links: [{ label: "zanlib.dev", url: "https://zanlib.dev" }],
    status: "active",
  },

  {
    name: { en: "Vlvbione", pl: "Vlvbione" },
    category: "products",
    body: {
      en: "A review-collection SaaS that allows small businesses to reward customers for feedback. Businesses collect reviews via QR codes and automatically generate coupons for reviewers. Multi-tenant system with billing, authentication, and transactional email.",
      pl: "SaaS do zbierania opinii, który pozwala małym firmom nagradzać klientów za recenzje. Firmy zbierają opinie za pomocą kodów QR i automatycznie generują kupony dla recenzentów. System wielodostępowy z rozliczeniami, uwierzytelnianiem i e-mailami transakcyjnymi.",
    },
    tech: ["React Router", "Elixir Phoenix", "Docker"],
    links: [{ label: "vlvbione.pl", url: "https://vlvbione.pl" }],
    status: "active",
  },

  // ── Open Source ─────────────────────────────────────────────

  {
    name: { en: "Isolisp", pl: "Isolisp" },
    category: "open-source",
    body: {
      en: "An isomorphic Lisp for backend-driven frontend logic — the DSL-over-the-wire pattern. A monorepo with frontend and backend packages. Use cases include form validation, configurable business rules, and feature flags. Evolved from earlier toy Lisp experiments and serves as the basis for a planned conference talk on code as data.",
      pl: "Izomorficzny Lisp do logiki frontendowej sterowanej z backendu — wzorzec DSL-over-the-wire. Monorepo z paczkami frontendowymi i backendowymi. Zastosowania obejmują walidację formularzy, konfigurowalne reguły biznesowe i flagi funkcji. Wyewoluował z wcześniejszych eksperymentów z Lispem i stanowi podstawę planowanego wystąpienia konferencyjnego o kodzie jako danych.",
    },
    tech: ["TypeScript"],
    links: [
      { label: "GitHub", url: "https://github.com/zanlib0/isolisp" },
    ],
  },

  {
    name: { en: "Rolex", pl: "Rolex" },
    category: "open-source",
    description: {
      en: "Elixir library",
      pl: "Biblioteka Elixir",
    },
    tech: ["Elixir"],
    links: [{ label: "GitHub", url: "https://github.com/zanlib0/rolex" }],
  },

  {
    name: { en: "Formuj", pl: "Formuj" },
    category: "open-source",
    description: {
      en: "React form library built on Formik — a mini-framework showcase with some production usage, built while working at Brainhub on a project for PwC",
      pl: "Biblioteka formularzy React zbudowana na Formiku — prezentacja mini-frameworka z pewnym użyciem produkcyjnym, powstała podczas pracy w Brainhub nad projektem dla PwC",
    },
    tech: ["React", "Formik"],
    links: [{ label: "GitHub", url: "https://github.com/zanlib0/formuj" }],
  },

  {
    name: { en: "lispex", pl: "lispex" },
    category: "open-source",
    description: {
      en: "Toy Lisp evaluator in Elixir",
      pl: "Ewaluator Lispa w Elixirze",
    },
    links: [{ label: "GitHub", url: "https://github.com/zanlib0/lispex" }],
  },

  {
    name: { en: "evalexpr", pl: "evalexpr" },
    category: "open-source",
    description: {
      en: "Toy Lisp evaluator in Node.js — companion to the blog article on building a Lisp in 66 lines",
      pl: "Ewaluator Lispa w Node.js — towarzyszący artykułowi na blogu o budowie Lispa w 66 liniach",
    },
    links: [{ label: "GitHub", url: "https://github.com/zanlib0/evalexpr" }],
  },

  // ── Teaching ────────────────────────────────────────────────

  {
    name: { en: "Workshops", pl: "Warsztaty" },
    category: "teaching",
    body: {
      en: "I have led several programming workshops over the years. In December 2024, I taught the frontend track of a two-week intensive recruiting workshop for junior developers at Brainhub, covering React, React Router, React Query, Formik, Cypress, and TypeScript. I also ran an eight-hour Saturday workshop introducing Elixir to colleagues — IEx, pattern matching, OTP concurrency, and a practical session building a primitive order book with Phoenix LiveView. The earliest was a small Vue.js workshop around 2017, an early dare from a colleague where four of us built Hangman together.",
      pl: "Przez lata prowadziłem kilka warsztatów programistycznych. W grudniu 2024 prowadziłem ścieżkę frontendową dwutygodniowego intensywnego warsztatu rekrutacyjnego dla juniorów w Brainhub, obejmującego React, React Router, React Query, Formik, Cypress i TypeScript. Przeprowadziłem też ośmiogodzinne sobotnie warsztaty wprowadzające kolegów z pracy w Elixira — IEx, pattern matching, współbieżność OTP i praktyczną sesję budowania prymitywnej księgi zleceń z Phoenix LiveView. Najwcześniejsze były małe warsztaty Vue.js około 2017 roku, zakład z kolegą, gdzie we czwórkę zbudowaliśmy grę w wisielca.",
    },
  },

  {
    name: {
      en: "Catholic Programmers Discord",
      pl: "Katoliccy Programiści Discord",
    },
    category: "teaching",
    description: {
      en: "Polish-language Discord community for Catholic software developers — I serve as an admin",
      pl: "Polskojęzyczna społeczność Discord dla katolickich programistów — jestem adminem",
    },
  },

  // ── Diversions ──────────────────────────────────────────────

  {
    name: { en: "Advent of Code", pl: "Advent of Code" },
    category: "diversions",
    description: {
      en: "Annual December ritual",
      pl: "Coroczny grudniowy rytuał",
    },
    links: [
      { label: "2025", url: "https://github.com/zanlib0/aoc2025" },
      {
        label: "2024 (Clojure)",
        url: "https://github.com/zanlib0/aoc2024",
      },
      { label: "2022", url: "https://github.com/zanlib0/aoc2022" },
      { label: "2020", url: "https://github.com/zanlib0/aoc2020" },
    ],
  },

  {
    name: { en: "wouldn't you rather", pl: "wouldn't you rather" },
    category: "diversions",
    description: {
      en: "A small game",
      pl: "Mała gra",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/zanlib0/wouldnt-you-rather",
      },
    ],
  },

  {
    name: { en: "Rosary Café", pl: "Rosary Café" },
    category: "diversions",
    description: {
      en: "Frontend-only rosary visualiser, built in an ancient version of Svelte",
      pl: "Wizualizator różańca (frontend-only), zbudowany w starej wersji Svelte",
    },
    status: "wip",
    links: [
      {
        label: "rosarycafe.intercaetera.com",
        url: "https://rosarycafe.intercaetera.com/",
      },
    ],
  },
];
