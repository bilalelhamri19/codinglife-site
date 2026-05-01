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

  const LANG_LABELS = { en: "EN", ar: "AR" };
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
    refreshPageContent(); 
    
    if (TRANSLATIONS[lang].dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  function refreshPageContent() {
    document.querySelectorAll('[data-cl-lang]').forEach(el => {
      if (el.getAttribute('data-cl-lang') === currentLang) {
        el.classList.add('cl-active-lang');
      } else {
        el.classList.remove('cl-active-lang');
      }
    });
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
              <span>${currentLang.toUpperCase()}</span>
              <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;"></i>
            </button>
            <div class="cl-lang-dropdown" id="cl-lang-dropdown">
              <button class="cl-lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">English</button>
              <button class="cl-lang-option ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar">العربية</button>
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
          <div class="social-links" style="margin-top: 24px;">
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
      <div style="text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem;">
        &copy; 2026 ${CONFIG.brandName}. ${tr.copy}
      </div>
    `;
  }

  function bindFooterEvents() {
    const form = document.getElementById("cl-newsletter-form");
    const status = document.getElementById("newsletter-status");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      status.style.display = "block";
      status.style.color = "var(--cl-brand)";
      status.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Subscribing...';

      try {
        const response = await fetch("https://formsubmit.co/ajax/codinglife06@gmail.com", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ email: email, _subject: "New Subscriber - Coding Life", message: "New subscriber: " + email })
        });
        const result = await response.json();
        if (result.success === "true" || result.success === true) {
          status.style.color = "var(--cl-success)";
          status.innerHTML = '<i class="fa-solid fa-check-circle"></i> Thank you! You are subscribed.';
          form.reset();
          setTimeout(() => { status.style.display = "none"; }, 5000);
        } else {
          throw new Error();
        }
      } catch (err) {
        status.style.color = "var(--cl-error)";
        status.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! Something went wrong.';
      }
    });
  }

  function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "cl-footer";
    footer.id = "cl-main-footer";
    footer.innerHTML = buildFooterHTML();
    document.body.appendChild(footer);
    bindFooterEvents();
  }

  function refreshFooter() {
    const footer = document.getElementById("cl-main-footer");
    if (footer) {
      footer.innerHTML = buildFooterHTML();
      bindFooterEvents();
    }
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
        { t: "HTML5 Masterclass", t_ar: "احتراف HTML5", d: "Foundation of web development.", d_ar: "أساسيات تطوير الويب.", h: "html.html" },
        { t: "CSS3 Styling", t_ar: "تصميم CSS3", d: "Responsive design, Flexbox, Grid.", d_ar: "تصميم متجاوب، فليكس بوكس، وجريد.", h: "css.html" },
        { t: "JavaScript Deep Dive", t_ar: "تعمق في JavaScript", d: "Modern JS and async logic.", d_ar: "جافا سكريبت الحديثة والمنطق غير المتزامن.", h: "javascript.html" },
        { t: "React Modern", t_ar: "React الحديث", d: "Component-based architecture.", d_ar: "هندسة المكونات المعاصرة.", h: "react.html" },
        { t: "PHP Backend", t_ar: "احتراف PHP", d: "Server-side programming.", d_ar: "برمجة السيرفرات.", h: "php.html" },
        { t: "Node.js Scalable", t_ar: "Node.js المتقدم", d: "High-performance backend.", d_ar: "خوادم عالية الأداء.", h: "nodejs.html" },
        { t: "SQL Databases", t_ar: "قواعد بيانات SQL", d: "Relational data management.", d_ar: "إدارة البيانات العلائقية.", h: "sql.html" },
        { t: "Python Expert", t_ar: "خبير بايثون", d: "Automation and data science.", d_ar: "الأتمتة وعلوم البيانات.", h: "python.html" },
        { t: "C# & .NET", t_ar: "C# و .NET", d: "Enterprise logic and Unity.", d_ar: "برمجة الشركات ومحرك Unity.", h: "csharp.html" },
        { t: "Java Enterprise", t_ar: "جافا للمؤسسات", d: "Spring Boot backend.", d_ar: "تطوير الأنظمة بـ Spring Boot.", h: "java.html" },
        { t: "Git Expert", t_ar: "خبير Git", d: "Version control and collaboration.", d_ar: "إدارة النسخ والتعاون.", h: "git.html" },
        { t: "Flutter Mobile", t_ar: "تطوير تطبيقات Flutter", d: "Multi-platform mobile apps.", d_ar: "تطبيقات الموبايل لكافة المنصات.", h: "flutter.html" },
        { t: "CSS Unit Converter", t_ar: "محول وحدات CSS", d: "PX, REM, EM, VW conversion.", d_ar: "تحويل البكسل والريم وغيرها.", h: "css-converter.html" },
        { t: "Palette Generator", t_ar: "مولد الألوان", d: "Color scheme creator.", d_ar: "إنشاء مجموعات ألوان متناسقة.", h: "colors.html" },
        { t: "Code Playground", t_ar: "مختبر الكود", d: "Live editor for practice.", d_ar: "محرر مباشر للتجربة.", h: "playground.html" },
        { t: "Productivity Tips", t_ar: "نصائح الإنتاجية", d: "Increase your daily output.", d_ar: "زيادة إنتاجيتك اليومية.", h: "productivity.html" },
        { t: "Mental Health", t_ar: "صحة العقل والجسد", d: "Well-being for developers.", d_ar: "الصحة النفسية للمبرمجين.", h: "mental_health.html" },
        { t: "Blog", t_ar: "المدونة", d: "Articles and tips.", d_ar: "مقالات ونصائح تقنية.", h: "blog.html" },
        { t: "Workshops", t_ar: "ورشات العمل", d: "Live coding workshops.", d_ar: "ورشات عمل مباشرة.", h: "workshops.html" },
        { t: "About", t_ar: "من نحن", d: "Our mission.", d_ar: "مهمتنا ورؤيتنا.", h: "about.html" },
        { t: "Contact", t_ar: "تواصل معنا", d: "Support or collaborations.", d_ar: "الدعم والتعاون المهني.", h: "contact.html" }
      ];

      const filtered = pages.filter(p => 
        p.t.toLowerCase().includes(q) || p.d.toLowerCase().includes(q) ||
        (p.t_ar && p.t_ar.includes(q)) || (p.d_ar && p.d_ar.includes(q))
      );

      const lang = currentLang;
      results.innerHTML = filtered.length > 0 
        ? filtered.map(p => {
          const title = lang === 'ar' ? (p.t_ar || p.t) : p.t;
          const desc = lang === 'ar' ? (p.d_ar || p.d) : p.d;
          return `
            <a href="${p.h}" style="padding:16px; background:rgba(30,41,59,0.8); border-radius:8px; color:white; text-decoration:none; display:block; transition:0.2s; border:1px solid #1e293b; text-align:${lang === 'ar' ? 'right' : 'left'};">
              <div style="font-weight:bold; color:#2dd4bf; margin-bottom:4px;">${title}</div>
              <div style="font-size:0.85rem; color:#94a3b8;">${desc}</div>
            </a>
          `;
        }).join("")
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

  function initProgressTracking() {
    const chapters = document.querySelectorAll(".chapter");
    if (chapters.length === 0) return;

    const pageId = window.location.pathname.split("/").pop() || "home";
    let progress = JSON.parse(localStorage.getItem("cl_progress") || "{}");

    // Create Progress Bar UI
    const container = document.querySelector(".course-container");
    if (container) {
      const progressBarContainer = document.createElement("div");
      progressBarContainer.className = "cl-course-progress-bar-container";
      progressBarContainer.innerHTML = `
        <div class="cl-progress-info">
          <span>Course Progress</span>
          <span id="cl-progress-percent">0%</span>
        </div>
        <div class="cl-progress-track">
          <div id="cl-progress-fill" class="cl-progress-fill"></div>
        </div>
      `;
      container.insertBefore(progressBarContainer, container.querySelector(".chapters"));
    }

    function updateProgressBar() {
      const finishedCount = Array.from(chapters).filter((_, i) => progress[`${pageId}_ch${i}`]).length;
      const percent = Math.round((finishedCount / chapters.length) * 100);
      const fill = document.getElementById("cl-progress-fill");
      const text = document.getElementById("cl-progress-percent");
      if (fill) fill.style.width = `${percent}%`;
      if (text) text.innerText = `${percent}%`;
    }

    chapters.forEach((chapter, index) => {
      const chapterId = `${pageId}_ch${index}`;
      const isFinished = progress[chapterId];

      const btn = document.createElement("button");
      btn.className = `cl-progress-btn ${isFinished ? 'finished' : ''}`;
      btn.innerHTML = isFinished ? '<i class="fa-solid fa-check"></i> Finished' : 'Mark as Finished';
      
      chapter.appendChild(btn);

      btn.addEventListener("click", () => {
        progress = JSON.parse(localStorage.getItem("cl_progress") || "{}");
        if (progress[chapterId]) {
          delete progress[chapterId];
          btn.classList.remove("finished");
          btn.innerHTML = "Mark as Finished";
        } else {
          progress[chapterId] = true;
          btn.classList.add("finished");
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Finished';
          confetti();
        }
        localStorage.setItem("cl_progress", JSON.stringify(progress));
        updateProgressBar();
      });
    });

    updateProgressBar();

    function confetti() {
      const colors = ['#2dd4bf', '#a855f7', '#3b82f6'];
      for (let i = 0; i < 20; i++) {
        const div = document.createElement("div");
        div.style = `position:fixed; left:${Math.random()*100}%; top:-10px; width:10px; height:10px; background:${colors[Math.floor(Math.random()*3)]}; z-index:10000; border-radius:50%;`;
        document.body.appendChild(div);
        const anim = div.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(720deg)`, opacity: 0 }
        ], { duration: 1000 + Math.random()*2000, easing: 'ease-out' });
        anim.onfinish = () => div.remove();
      }
    }
  }

  function injectSchema() {
    const currentUrl = window.location.href;
    const pageTitle = document.title;
    
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Coding Life",
        "url": "https://codinglife1.vercel.app/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://codinglife1.vercel.app/dorous-albarmaja.html?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Coding Life",
        "url": "https://codinglife1.vercel.app/",
        "logo": "https://codinglife1.vercel.app/logo.png",
        "description": "Premium programming courses and career-focused workshops.",
        "sameAs": [
            "https://github.com/bilalelhamri19"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://codinglife1.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageTitle,
            "item": currentUrl
          }
        ]
      }
    ];

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
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
    injectSchema();
    polishCodeBlocks();
    initAnimations();
    bindFooterEvents();
    refreshPageContent();

    const btt = document.createElement("button");
    btt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btt.style = "position:fixed; bottom:30px; right:30px; width:50px; height:50px; border-radius:50%; background:#2dd4bf; border:none; color:white; cursor:pointer; display:none; z-index:100; box-shadow:0 10px 20px rgba(0,0,0,0.2);";
    document.body.appendChild(btt);
    window.addEventListener("scroll", () => { btt.style.display = window.scrollY > 500 ? "block" : "none"; });
    btt.addEventListener("click", () => window.scrollTo({top: 0, behavior: 'smooth'}));
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); } else { boot(); }
})();
