(function () {
  "use strict";

  const CONFIG = {
    brandName: "Coding Life",
    logoPath: "logo.png",
    socialLinks: [
      { href: "https://facebook.com", icon: "fab fa-facebook-f" },
      { href: "https://youtube.com", icon: "fab fa-youtube" },
      { href: "https://instagram.com", icon: "fab fa-instagram" },
      { href: "https://linkedin.com", icon: "fab fa-linkedin-in" }
    ]
  };

  const TRANSLATIONS = {
    en: {
      dir: "ltr",
      nav: { home: "Home", courses: "Courses", blog: "Blog", contact: "Contact" },
      footer: {
        tagline: "Premium programming education designed to take you from zero to professional.",
        platform: "Platform",
        support: "Support",
        home: "Home",
        allCourses: "All Courses",
        workshops: "Workshops",
        blog: "Blog",
        contactUs: "Contact Us",
        about: "About",
        privacy: "Privacy Policy",
        copy: "Built with passion for learners."
      },
      search: {
        placeholder: "Search courses, lessons, topics...",
        noResults: "No results found for"
      }
    },
    fr: {
      dir: "ltr",
      nav: { home: "Accueil", courses: "Cours", blog: "Blog", contact: "Contact" },
      footer: {
        tagline: "Formation premium en programmation pour passer de zéro à professionnel.",
        platform: "Plateforme",
        support: "Support",
        home: "Accueil",
        allCourses: "Tous les cours",
        workshops: "Ateliers",
        blog: "Blog",
        contactUs: "Contactez-nous",
        about: "À propos",
        privacy: "Politique de confidentialité",
        copy: "Construit avec passion pour les apprenants."
      },
      search: {
        placeholder: "Rechercher des cours, leçons, sujets...",
        noResults: "Aucun résultat pour"
      }
    },
    ar: {
      dir: "rtl",
      nav: { home: "الرئيسية", courses: "الدروس", blog: "المدونة", contact: "التواصل" },
      footer: {
        tagline: "تعليم برمجة احترافي يأخذك من الصفر إلى الاحتراف.",
        platform: "المنصة",
        support: "الدعم",
        home: "الرئيسية",
        allCourses: "جميع الدروس",
        workshops: "ورشات العمل",
        blog: "المدونة",
        contactUs: "تواصل معنا",
        about: "من نحن",
        privacy: "سياسة الخصوصية",
        copy: "مبني بشغف للمتعلمين."
      },
      search: {
        placeholder: "ابحث عن دروس، مواضيع...",
        noResults: "لا توجد نتائج لـ"
      }
    }
  };

  const LANG_LABELS = { en: "🇬🇧 EN", fr: "🇫🇷 FR", ar: "🇲🇦 AR" };
  let currentLang = localStorage.getItem("cl-lang") || "en";

  function t() { return TRANSLATIONS[currentLang]; }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem("cl-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", TRANSLATIONS[lang].dir);
    
    // Refresh UI elements
    refreshHeader();
    refreshFooter();
    updateSearchPlaceholder();
    
    // Update body class for RTL specific styling if needed
    if (TRANSLATIONS[lang].dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  function navItems() {
    const tr = t().nav;
    return [
      { href: "index.html", icon: "fa-house", label: tr.home },
      { href: "dorous-albarmaja.html", icon: "fa-code", label: tr.courses },
      { href: "blog.html", icon: "fa-newspaper", label: tr.blog },
      { href: "contact.html", icon: "fa-envelope", label: tr.contact }
    ];
  }

  const currentFile = location.pathname.split("/").pop() || "index.html";

  function buildHeaderHTML() {
    const items = navItems();
    return `
      <div class="cl-header-inner">
        <a href="index.html" class="cl-brand">
          <img src="${CONFIG.logoPath}" alt="Logo">
          <span>${CONFIG.brandName}</span>
        </a>
        <nav class="cl-nav">
          ${items.map(item => `
            <a href="${item.href}" class="${currentFile === item.href ? 'active' : ''}">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="cl-lang-switcher">
            <button class="cl-lang-btn" id="cl-lang-btn">
              <i class="fa-solid fa-globe"></i>
              <span>${LANG_LABELS[currentLang]}</span>
              <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;"></i>
            </button>
            <div class="cl-lang-dropdown" id="cl-lang-dropdown">
              <button class="cl-lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">🇬🇧 English</button>
              <button class="cl-lang-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">🇫🇷 Français</button>
              <button class="cl-lang-option ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar">🇲🇦 العربية</button>
            </div>
          </div>
          <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode">
            <i class="fa-solid fa-moon"></i>
          </button>
          <button class="theme-toggle" id="searchToggle" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    `;
  }

  function createHeader() {
    const header = document.createElement("header");
    header.className = "cl-site-header";
    header.id = "cl-main-header";
    header.innerHTML = buildHeaderHTML();
    document.body.prepend(header);
    bindHeaderEvents();
  }

  function refreshHeader() {
    const header = document.getElementById("cl-main-header");
    if (header) {
      header.innerHTML = buildHeaderHTML();
      bindHeaderEvents();
    }
  }

  function bindHeaderEvents() {
    const themeBtn = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener("click", () => {
      const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });

    const searchToggle = document.getElementById("searchToggle");
    searchToggle.addEventListener("click", () => {
      const overlay = document.getElementById("searchOverlay");
      overlay.style.display = "flex";
      document.getElementById("searchInput").focus();
    });

    const langBtn = document.getElementById("cl-lang-btn");
    const langDropdown = document.getElementById("cl-lang-dropdown");
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("open");
    });

    document.addEventListener("click", () => langDropdown.classList.remove("open"));

    document.querySelectorAll(".cl-lang-option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        applyLang(btn.dataset.lang);
        langDropdown.classList.remove("open");
      });
    });
  }

  function updateThemeIcon(theme) {
    const icon = document.querySelector("#themeToggle i");
    if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  function buildFooterHTML() {
    const tr = t().footer;
    return `
      <div class="footer-inner">
        <div>
          <span class="footer-brand">${CONFIG.brandName}</span>
          <p>${tr.tagline}</p>
          <div class="social-links">
            ${CONFIG.socialLinks.map(s => `<a href="${s.href}"><i class="${s.icon}"></i></a>`).join('')}
          </div>
        </div>
        <div class="footer-links">
          <h4>${tr.platform}</h4>
          <a href="index.html">${tr.home}</a>
          <a href="dorous-albarmaja.html">${tr.allCourses}</a>
          <a href="workshops.html">${tr.workshops}</a>
          <a href="blog.html">${tr.blog}</a>
        </div>
        <div class="footer-links">
          <h4>${tr.support}</h4>
          <a href="contact.html">${tr.contactUs}</a>
          <a href="about.html">${tr.about}</a>
          <a href="privacy.html">${tr.privacy}</a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem;">
        &copy; 2026 ${CONFIG.brandName}. ${tr.copy}
      </div>
    `;
  }

  function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "cl-footer";
    footer.id = "cl-main-footer";
    footer.innerHTML = buildFooterHTML();
    document.body.appendChild(footer);
  }

  function refreshFooter() {
    const footer = document.getElementById("cl-main-footer");
    if (footer) footer.innerHTML = buildFooterHTML();
  }

  function initSearch() {
    const overlay = document.createElement("div");
    overlay.id = "searchOverlay";
    overlay.style = "position:fixed; inset:0; background:rgba(2,6,23,0.95); z-index:2000; display:none; flex-direction:column; align-items:center; padding-top:100px; backdrop-filter:blur(8px);";
    overlay.innerHTML = `
      <div style="width:min(600px, 90%); position:relative;">
        <input type="text" id="searchInput" placeholder="${t().search.placeholder}" 
               style="width:100%; padding:20px; border-radius:12px; border:1px solid #1e293b; background:#0f172a; color:white; font-size:1.2rem; outline:none; box-shadow:0 0 30px rgba(45,212,191,0.2);">
        <div id="searchResults" style="margin-top:20px; max-height:400px; overflow-y:auto; display:flex; flex-direction:column; gap:12px;"></div>
        <button id="closeSearch" style="position:absolute; right:-60px; top:0; background:none; border:none; color:white; font-size:2rem; cursor:pointer;">&times;</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("searchInput");
    const close = document.getElementById("closeSearch");
    close.addEventListener("click", () => overlay.style.display = "none");
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.style.display = "none"; });

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const results = document.getElementById("searchResults");
      if (!q) { results.innerHTML = ""; return; }
      
      const pages = [
        { t: "HTML5 Masterclass", d: "Foundation of web development.", h: "html.html" },
        { t: "CSS3 Styling", d: "Responsive design, Flexbox, Grid.", h: "css.html" },
        { t: "JavaScript Deep Dive", d: "Modern JS and async logic.", h: "javascript.html" },
        { t: "React Modern", d: "Component-based architecture.", h: "react.html" },
        { t: "PHP Backend", d: "Server-side programming.", h: "php.html" },
        { t: "Node.js Scalable", d: "High-performance backend.", h: "nodejs.html" },
        { t: "SQL Databases", d: "Relational data management.", h: "sql.html" },
        { t: "Python Expert", d: "Automation and data science.", h: "python.html" },
        { t: "C# & .NET", d: "Enterprise logic and Unity.", h: "csharp.html" },
        { t: "Java Enterprise", d: "Spring Boot backend.", h: "java.html" },
        { t: "Git Expert", d: "Version control and collaboration.", h: "git.html" },
        { t: "Flutter Mobile", d: "Multi-platform mobile apps.", h: "flutter.html" },
        { t: "CSS Unit Converter", d: "PX, REM, EM, VW conversion.", h: "css-converter.html" },
        { t: "Palette Generator", d: "Color scheme creator.", h: "colors.html" },
        { t: "Code Playground", d: "Live editor for practice.", h: "playground.html" },
        { t: "Blog", d: "Articles and tips.", h: "blog.html" },
        { t: "Workshops", d: "Live coding workshops.", h: "workshops.html" },
        { t: "About", d: "Our mission.", h: "about.html" },
        { t: "Contact", d: "Support or collaborations.", h: "contact.html" }
      ];

      const filtered = pages.filter(p => p.t.toLowerCase().includes(q) || p.d.toLowerCase().includes(q));
      results.innerHTML = filtered.length > 0 
        ? filtered.map(p => `
          <a href="${p.h}" style="padding:16px; background:rgba(30,41,59,0.8); border-radius:8px; color:white; text-decoration:none; display:block; transition:0.2s; border:1px solid #1e293b;">
            <div style="font-weight:bold; color:#2dd4bf; margin-bottom:4px;">${p.t}</div>
            <div style="font-size:0.85rem; color:#94a3b8;">${p.d}</div>
          </a>
        `).join("")
        : `<div style="color:#94a3b8; text-align:center; padding:20px;">${t().search.noResults} "${q}"</div>`;
    });
  }

  function updateSearchPlaceholder() {
    const input = document.getElementById("searchInput");
    if (input) input.placeholder = t().search.placeholder;
  }

  function polishCodeBlocks() {
    document.querySelectorAll(".code-example").forEach(block => {
      if (block.querySelector(".code-header")) return;
      const lang = block.getAttribute("data-lang") || "code";
      const pre = block.querySelector("pre");
      const code = pre.innerText;
      const header = document.createElement("div");
      header.className = "code-header";
      header.innerHTML = `<span><i class="fa-solid fa-code"></i> ${lang}</span><button class="code-copy">Copy</button>`;
      block.prepend(header);
      header.querySelector(".code-copy").addEventListener("click", (e) => {
        navigator.clipboard.writeText(code);
        e.target.innerText = "Copied!";
        setTimeout(() => e.target.innerText = "Copy", 2000);
      });
    });
  }

  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("active"); });
    }, { threshold: 0.1 });
    document.querySelectorAll("section, .chapter, .card, .reveal").forEach(el => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
      observer.observe(el);
    });
  }

  function boot() {
    applyLang(currentLang);
    document.querySelectorAll("header, footer").forEach(el => {
      if (!el.classList.contains("cl-site-header") && !el.classList.contains("cl-footer")) el.remove();
    });
    createHeader();
    createFooter();
    initSearch();
    polishCodeBlocks();
    initAnimations();

    const btt = document.createElement("button");
    btt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btt.style = "position:fixed; bottom:30px; right:30px; width:50px; height:50px; border-radius:50%; background:#2dd4bf; border:none; color:white; cursor:pointer; display:none; z-index:100; box-shadow:0 10px 20px rgba(0,0,0,0.2);";
    document.body.appendChild(btt);
    window.addEventListener("scroll", () => { btt.style.display = window.scrollY > 500 ? "block" : "none"; });
    btt.addEventListener("click", () => window.scrollTo({top: 0, behavior: 'smooth'}));
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); } else { boot(); }
})();
