(function () {
  "use strict";

  const CONFIG = {
    brandName: "Coding Life",
    logoPath: "logo.png",
    adsensePublisherId: "ca-pub-0000000000000000", // Replace with your approved AdSense Publisher ID
    socialLinks: [
      { href: "https://www.facebook.com/profile.php?id=100087855939787", icon: "fab fa-facebook-f" },
      { href: "https://www.instagram.com/codinglife_1?igsh=eXU4ZHZ4MWY5dXR6", icon: "fab fa-instagram" },
      { href: "https://youtube.com/@codinglife-d2l1g?si=MyyMZK9QRau3E9jk", icon: "fab fa-youtube" },
      { href: "https://www.linkedin.com/in/coding-life-965996397?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "fab fa-linkedin-in" }
    ]
  };

  const TRANSLATIONS = {
    en: {
      dir: "ltr",
      nav: { home: "Home", courses: "Courses", workshops: "Workshops", tools: "Tools", quiz: "Quiz", blog: "Blog", contact: "Contact" },
      footer: {
        tagline: "Premium programming education designed to take you from zero to professional.",
        platform: "Platform",
        support: "Support",
        home: "Home",
        allCourses: "All Courses",
        workshops: "Workshops",
        quiz: "Skills Quiz",
        blog: "Blog",
        contactUs: "Contact Us",
        about: "About",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        copy: "Built with passion for learners."
      },
      search: {
        placeholder: "Search courses, lessons, topics... (Ctrl + K)",
        noResults: "No results found for"
      },
      code: {
        copy: "Copy",
        copied: "Copied!",
        playground: "Playground",
        copiedToast: "Code copied to clipboard!"
      },
      cookies: {
        title: "Cookie Consent & Privacy",
        desc: "We and third-party advertising partners (such as Google AdSense) use cookies to personalize content and ads, analyze traffic, and ensure a secure experience. You can manage your preferences or accept all cookies.",
        accept: "Accept All",
        decline: "Essential Only",
        privacy: "Privacy Policy",
        adNotice: "Advertisement"
      }
    },
    ar: {
      dir: "rtl",
      nav: { home: "الرئيسية", courses: "الدروس", workshops: "الورشات", tools: "الأدوات", quiz: "الاختبارات", blog: "المدونة", contact: "التواصل" },
      footer: {
        tagline: "تعليم برمجة احترافي يأخذك من الصفر إلى الاحتراف.",
        platform: "المنصة",
        support: "الدعم",
        home: "الرئيسية",
        allCourses: "جميع الدروس",
        workshops: "ورشات العمل",
        quiz: "اختبارات المهارات",
        blog: "المدونة",
        contactUs: "تواصل معنا",
        about: "من نحن",
        privacy: "سياسة الخصوصية",
        terms: "شروط الاستخدام",
        copy: "مبني بشغف للمتعلمين."
      },
      search: {
        placeholder: "ابحث عن دروس، مواضيع... (Ctrl + K)",
        noResults: "لا توجد نتائج لـ"
      },
      code: {
        copy: "نسخ",
        copied: "تم النسخ!",
        playground: "تجربة الكود",
        copiedToast: "تم نسخ الكود إلى الحافظة!"
      },
      cookies: {
        title: "ملفات تعريف الارتباط والخصوصية",
        desc: "نستخدم نحن وشركاء الإعلانات (مثل Google AdSense) ملفات تعريف الارتباط لتخصيص المحتوى والإعلانات وتحليل حركة المرور. يمكنك قبول الكل أو استخدام الملفات الضرورية فقط وفقاً لسياسة الخصوصية.",
        accept: "قبول الكل",
        decline: "الضرورية فقط",
        privacy: "سياسة الخصوصية",
        adNotice: "إعلان"
      }
    },
    fr: {
      dir: "ltr",
      nav: { home: "Accueil", courses: "Cours", workshops: "Ateliers", tools: "Outils", quiz: "Quiz", blog: "Blog", contact: "Contact" },
      footer: {
        tagline: "Formation de programmation d'élite conçue pour vous mener de zéro à professionnel.",
        platform: "Plateforme",
        support: "Support",
        home: "Accueil",
        allCourses: "Tous les Cours",
        workshops: "Ateliers",
        quiz: "Quiz de Compétences",
        blog: "Blog",
        contactUs: "Contactez-nous",
        about: "À propos",
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
        copy: "Conçu avec passion pour les apprenants."
      },
      search: {
        placeholder: "Rechercher des cours, leçons, sujets... (Ctrl + K)",
        noResults: "Aucun résultat trouvé pour"
      },
      code: {
        copy: "Copier",
        copied: "Copié !",
        playground: "Bac à sable",
        copiedToast: "Code copié dans le presse-papiers !"
      },
      cookies: {
        title: "Consentement aux Cookies & Confidentialité",
        desc: "Nous et nos partenaires publicitaires tiers (tels que Google AdSense) utilisons des cookies pour personnaliser le contenu et les publicités, analyser le trafic et garantir une expérience sécurisée. Vous pouvez gérer vos préférences ou accepter tous les cookies.",
        accept: "Tout Accepter",
        decline: "Essentiels Seulement",
        privacy: "Politique de Confidentialité",
        adNotice: "Publicité"
      }
    }
  };

  const LANG_LABELS = { en: "EN", ar: "AR", fr: "FR" };
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
    refreshMobileDrawer();
    updateSearchPlaceholder();
    refreshPageContent(); 
    
    if (TRANSLATIONS[lang].dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  function refreshPageContent() {
    const elements = document.querySelectorAll('[data-cl-lang]');
    elements.forEach(el => {
      if (el.getAttribute('data-cl-lang') === currentLang) {
        el.classList.add('cl-active-lang');
      } else {
        el.classList.remove('cl-active-lang');
      }
    });

    if (currentLang === 'fr') {
      const parents = new Set();
      elements.forEach(el => { if (el.parentElement) parents.add(el.parentElement); });
      parents.forEach(parent => {
        const hasActive = parent.querySelector(':scope > .cl-active-lang');
        if (!hasActive) {
          const fallback = parent.querySelector(':scope > [data-cl-lang="en"]') || parent.querySelector(':scope > [data-cl-lang="ar"]');
          if (fallback) fallback.classList.add('cl-active-lang');
        }
      });
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

  function mobileNavItems() {
    const tr = t().nav;
    return [
      { href: "index.html", icon: "fa-house", label: tr.home },
      { href: "dorous-albarmaja.html", icon: "fa-code", label: tr.courses },
      { href: "quiz.html", icon: "fa-circle-question", label: tr.quiz },
      { href: "tools.html", icon: "fa-toolbox", label: tr.tools },
      { href: "workshops.html", icon: "fa-laptop-code", label: tr.workshops },
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
        <div style="display:flex; gap:10px; align-items:center;">
          <div class="cl-lang-switcher">
            <button class="cl-lang-btn" id="cl-lang-btn" aria-label="Change language">
              <i class="fa-solid fa-globe"></i>
              <span>${currentLang.toUpperCase()}</span>
              <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;"></i>
            </button>
            <div class="cl-lang-dropdown" id="cl-lang-dropdown">
              <button class="cl-lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">English</button>
              <button class="cl-lang-option ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar">العربية</button>
              <button class="cl-lang-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">Français</button>
            </div>
          </div>
          <button class="theme-toggle" id="themeToggle" title="Toggle Theme" aria-label="Toggle Theme">
            <i class="fa-solid fa-moon"></i>
          </button>
          <button class="theme-toggle" id="searchToggle" title="Search (Ctrl + K)" aria-label="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button class="cl-mobile-menu-btn" id="clMobileMenuBtn" title="Menu" aria-label="Toggle Navigation">
            <i class="fa-solid fa-bars"></i>
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
    createMobileDrawer();
  }

  function refreshHeader() {
    const header = document.getElementById("cl-main-header");
    if (header) {
      header.innerHTML = buildHeaderHTML();
      bindHeaderEvents();
    }
  }

  function createMobileDrawer() {
    let overlay = document.getElementById("clMobileOverlay");
    let drawer = document.getElementById("clMobileDrawer");
    if (overlay) overlay.remove();
    if (drawer) drawer.remove();

    overlay = document.createElement("div");
    overlay.className = "cl-mobile-overlay";
    overlay.id = "clMobileOverlay";

    drawer = document.createElement("div");
    drawer.className = "cl-mobile-drawer";
    drawer.id = "clMobileDrawer";

    const items = mobileNavItems();
    drawer.innerHTML = `
      <div class="cl-mobile-drawer-header">
        <a href="index.html" class="cl-brand" style="font-size:1.4rem;">
          <img src="${CONFIG.logoPath}" alt="Logo" style="height:40px; width:40px; border-radius:50%; object-fit:cover;">
          <span>${CONFIG.brandName}</span>
        </a>
        <button class="cl-mobile-drawer-close" id="clMobileDrawerClose" aria-label="Close menu">&times;</button>
      </div>
      <div class="cl-mobile-nav-links">
        ${items.map(item => `
          <a href="${item.href}" class="${currentFile === item.href ? 'active' : ''}">
            <i class="fa-solid ${item.icon}" style="width:20px; text-align:center; color:var(--cl-brand);"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </div>
      <div class="cl-mobile-drawer-footer">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div style="display:flex; gap:8px;">
            <button class="cl-lang-btn ${currentLang === 'en' ? 'active' : ''}" style="padding:6px 12px; font-size:0.85rem;" data-action-lang="en">EN</button>
            <button class="cl-lang-btn ${currentLang === 'ar' ? 'active' : ''}" style="padding:6px 12px; font-size:0.85rem;" data-action-lang="ar">عربي</button>
            <button class="cl-lang-btn ${currentLang === 'fr' ? 'active' : ''}" style="padding:6px 12px; font-size:0.85rem;" data-action-lang="fr">FR</button>
          </div>
          <button class="theme-toggle" id="mobileDrawerThemeToggle" title="Toggle Theme" aria-label="Toggle Theme">
            <i class="fa-solid fa-moon"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    bindMobileDrawerEvents();
  }

  function refreshMobileDrawer() {
    createMobileDrawer();
  }

  function bindMobileDrawerEvents() {
    const overlay = document.getElementById("clMobileOverlay");
    const drawer = document.getElementById("clMobileDrawer");
    const closeBtn = document.getElementById("clMobileDrawerClose");
    const mobileThemeToggle = document.getElementById("mobileDrawerThemeToggle");

    function closeDrawer() {
      if (drawer) drawer.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    if (mobileThemeToggle) {
      const currentTheme = localStorage.getItem("theme") || "dark";
      const icon = mobileThemeToggle.querySelector("i");
      if (icon) icon.className = currentTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
      mobileThemeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }

    document.querySelectorAll("[data-action-lang]").forEach(btn => {
      btn.addEventListener("click", () => {
        applyLang(btn.getAttribute("data-action-lang"));
        closeDrawer();
      });
    });
  }

  function bindHeaderEvents() {
    const themeBtn = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }

    const searchToggle = document.getElementById("searchToggle");
    if (searchToggle) {
      searchToggle.addEventListener("click", () => {
        const overlay = document.getElementById("searchOverlay");
        if (overlay) {
          overlay.style.display = "flex";
          document.getElementById("searchInput").focus();
        }
      });
    }

    const mobileMenuBtn = document.getElementById("clMobileMenuBtn");
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        const drawer = document.getElementById("clMobileDrawer");
        const overlay = document.getElementById("clMobileOverlay");
        if (drawer) drawer.classList.add("active");
        if (overlay) overlay.classList.add("active");
      });
    }

    const langBtn = document.getElementById("cl-lang-btn");
    const langDropdown = document.getElementById("cl-lang-dropdown");
    if (langBtn && langDropdown) {
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
  }

  function updateThemeIcon(theme) {
    document.querySelectorAll("#themeToggle i, #mobileDrawerThemeToggle i").forEach(icon => {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
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
          <a href="quiz.html">${tr.quiz}</a>
          <a href="workshops.html">${tr.workshops}</a>
          <a href="tools.html">${t().nav.tools}</a>
          <a href="blog.html">${tr.blog}</a>
        </div>
        <div class="footer-links">
          <h4>${tr.support}</h4>
          <a href="contact.html">${tr.contactUs}</a>
          <a href="about.html">${tr.about}</a>
          <a href="privacy.html">${tr.privacy}</a>
          <a href="terms.html">${tr.terms}</a>
          <!-- AdSense compliant ad unit with clear labeling -->
          <div class="ad-unit-container" style="margin-top:24px;">
            <span class="ad-notice-badge">${t().cookies ? t().cookies.adNotice : 'Advertisement'}</span>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${CONFIG.adsensePublisherId}"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
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
          body: JSON.stringify({ email: email, _subject: "New Subscriber - Coding Life", message: "New subscriber: " + email, _captcha: "false" })
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
    
    function closeSearch() {
      overlay.style.display = "none";
      input.value = "";
      document.getElementById("searchResults").innerHTML = "";
    }

    function openSearch() {
      overlay.style.display = "flex";
      setTimeout(() => input.focus(), 50);
    }

    close.addEventListener("click", closeSearch);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSearch(); });

    // Keyboard Shortcuts (Ctrl + K / Cmd + K / ESC)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (overlay.style.display === "flex") {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === "Escape" && overlay.style.display === "flex") {
        closeSearch();
      }
    });

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
        { t: "Developer Skills Quiz", t_ar: "اختبارات المهارات البرمجية", d: "Interactive developer skill quizzes and assessments.", d_ar: "اختبارات وتقييمات تفاعلية لمهارات المبرمج.", h: "quiz.html" },
        { t: "Tools Dashboard", t_ar: "مركز الأدوات", d: "Developer utilities and interactive tools.", d_ar: "أدوات ومساعدات برمجية ذكية.", h: "tools.html" },
        { t: "Developer Cheatsheets Hub", t_ar: "مركز ملخصات الأكواد السريعة", d: "Fast syntax reference for Git, CSS, JS, Python, SQL, Linux, and Regex.", d_ar: "ملخصات سريعة لأهم أوامر وأكواد Git و CSS و JS و Python و SQL.", h: "cheatsheets.html" },
        { t: "Code Formatter & Minifier", t_ar: "منسق وضواغط الأكواد", d: "Format, beautify, validate, and minify JSON, HTML, CSS, and JS.", d_ar: "تنسيق وتجميل وضغط أكواد JSON و HTML و CSS و JavaScript.", h: "formatter.html" },
        { t: "Code Typing Speed Test", t_ar: "اختبار سرعة كتابة الكود", d: "Developer typing speed challenge for code syntax and WPM.", d_ar: "تحدي واختبار سرعة كتابة الأكواد البرمجية والدقة.", h: "typing-test.html" },
        { t: "Scientific & Developer Calculator", t_ar: "آلة حاسبة علمية وبرمجية", d: "Scientific, programmer bitwise, base conversions, and aspect ratio.", d_ar: "حاسبة علمية متطورة، تحويل الأنظمة العددية، ونسب الشاشات.", h: "calculator.html" },
        { t: "Courses Catalog", t_ar: "فهرس ومسارات الدروس", d: "Complete catalog of programming tutorials.", d_ar: "دليل وفهرس شامل لجميع الدروس البرمجية.", h: "dorous-albarmaja.html" },
        { t: "Productivity Tips", t_ar: "نصائح الإنتاجية", d: "Increase your daily output.", d_ar: "زيادة إنتاجيتك اليومية.", h: "productivity.html" },
        { t: "Mental Health", t_ar: "صحة العقل والجسد", d: "Well-being for developers.", d_ar: "الصحة النفسية للمبرمجين.", h: "mental_health.html" },
        { t: "Motivation", t_ar: "التحفيز والاستمرارية", d: "Overcome burnout and stay focused.", d_ar: "تجاوز الإحباط ومواصلة التطور.", h: "motivation.html" },
        { t: "Soft Skills", t_ar: "المهارات الناعمة", d: "Communication and team collaboration.", d_ar: "التواصل والعمل الجماعي.", h: "soft-skills.html" },
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
              <div style="font-weight:bold; color:#38bdf8; margin-bottom:4px;">${title}</div>
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

  // Toast Notification Engine
  window.clToast = function (message, type = "info") {
    let container = document.getElementById("clToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "clToastContainer";
      container.className = "cl-toast-container";
      document.body.appendChild(container);
    }
    const icon = type === "success" ? "fa-circle-check" : "fa-circle-info";
    const toast = document.createElement("div");
    toast.className = `cl-toast cl-toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  function polishCodeBlocks() {
    document.querySelectorAll(".code-example").forEach(block => {
      if (block.querySelector(".code-header")) return;
      const lang = (block.getAttribute("data-lang") || "code").toLowerCase();
      const pre = block.querySelector("pre");
      if (!pre) return;
      const code = pre.innerText;
      const trCode = t().code;

      const header = document.createElement("div");
      header.className = "code-header";

      const showPlayground = ["html", "css", "javascript", "js"].includes(lang) || /<[a-z][\s\S]*>/i.test(code);

      header.innerHTML = `
        <span><i class="fa-solid fa-code"></i> ${lang.toUpperCase()}</span>
        <div class="code-actions-group">
          ${showPlayground ? `
            <button class="code-action-btn cl-run-btn" title="Open in Live Playground">
              <i class="fa-solid fa-play"></i> <span>${trCode.playground}</span>
            </button>
          ` : ''}
          <button class="code-action-btn cl-download-btn" title="Download snippet"><i class="fa-solid fa-download"></i> <span>Download</span></button>
          <button class="code-action-btn cl-copy-btn" title="Copy code to clipboard">
            <i class="fa-regular fa-copy"></i> <span>${trCode.copy}</span>
          </button>
        </div>
      `;
      block.prepend(header);

      const copyBtn = header.querySelector(".cl-copy-btn");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(code).then(() => {
            const span = copyBtn.querySelector("span");
            const icon = copyBtn.querySelector("i");
            if (span) span.innerText = trCode.copied;
            if (icon) icon.className = "fa-solid fa-check";
            window.clToast(trCode.copiedToast, "success");
            setTimeout(() => {
              if (span) span.innerText = trCode.copy;
              if (icon) icon.className = "fa-regular fa-copy";
            }, 2000);
          });
        });
      }

      const downloadBtn = header.querySelector(".cl-download-btn");
      if (downloadBtn) {
        const extMap = { html: "index.html", css: "style.css", javascript: "script.js", js: "script.js", python: "main.py", py: "main.py", java: "Main.java", csharp: "Program.cs", cs: "Program.cs", php: "index.php", sql: "query.sql", git: "script.sh" };
        const fileName = extMap[lang] || `snippet.${lang || 'txt'}`;
        downloadBtn.addEventListener("click", () => {
          const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          window.clToast(currentLang === 'ar' ? 'تم تنزيل ملف الكود بنجاح!' : 'Code file downloaded!', 'success');
        });
      }
      const runBtn = header.querySelector(".cl-run-btn");
      if (runBtn) {
        runBtn.addEventListener("click", () => {
          localStorage.setItem("cl-playground-preload", code);
          window.location.href = "playground.html";
        });
      }
    });
  }

  function initScrollProgress() {
    let bar = document.getElementById("cl-scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "cl-scroll-progress";
      document.body.prepend(bar);
    }
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  function initBackToTop() {
    let btt = document.getElementById("clBackToTop");
    if (!btt) {
      btt = document.createElement("button");
      btt.id = "clBackToTop";
      btt.className = "cl-back-to-top";
      btt.setAttribute("aria-label", "Back to top");
      btt.title = "Back to top";
      btt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
      document.body.appendChild(btt);
      btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btt.classList.add("visible");
      } else {
        btt.classList.remove("visible");
      }
    }, { passive: true });
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
        "sameAs": ["https://github.com/bilalelhamri19"]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://codinglife1.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": pageTitle, "item": currentUrl }
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

  function initReadingTime() {
    const container = document.querySelector(".course-container") || document.querySelector("article");
    if (!container || document.querySelector(".cl-reading-time")) return;
    const header = container.querySelector(".course-header") || container.querySelector("h1")?.parentElement;
    if (!header) return;
    const text = container.innerText || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words < 120) return;
    const mins = Math.max(1, Math.round(words / 180));
    const isAr = currentLang === "ar";
    const badge = document.createElement("div");
    badge.className = "cl-reading-time";
    badge.style = "display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border-radius:99px; background:rgba(45,212,191,0.15); border:1px solid rgba(45,212,191,0.3); color:var(--cl-brand); font-size:0.85rem; font-weight:700; margin-top:14px;";
    badge.innerHTML = `<i class="fa-regular fa-clock"></i> <span>${mins} ${isAr ? 'دقائق قراءة' : 'min read'}</span>`;
    header.appendChild(badge);
  }

  function initCookieConsent() {
    if (localStorage.getItem('cl-cookie-consent')) return;
    const tr = t().cookies;
    if (!tr) return;
    const banner = document.createElement('div');
    banner.id = 'clCookieBanner';
    banner.className = 'cl-cookie-banner';
    banner.innerHTML = `
      <div class="cl-cookie-banner-title">
        <i class="fa-solid fa-cookie-bite" style="color:var(--cl-brand);"></i>
        <span>${tr.title}</span>
      </div>
      <p>${tr.desc} <a href="privacy.html">${tr.privacy}</a></p>
      <div class="cl-cookie-actions">
        <button class="cl-cookie-btn cl-cookie-decline" id="clCookieDecline">${tr.decline}</button>
        <button class="cl-cookie-btn cl-cookie-accept" id="clCookieAccept">${tr.accept}</button>
      </div>
    `;
    document.body.appendChild(banner);

    const acceptBtn = document.getElementById('clCookieAccept');
    const declineBtn = document.getElementById('clCookieDecline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cl-cookie-consent', 'accepted');
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        banner.style.transition = '0.3s ease';
        setTimeout(() => banner.remove(), 300);
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cl-cookie-consent', 'essential');
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        banner.style.transition = '0.3s ease';
        setTimeout(() => banner.remove(), 300);
      });
    }
  }

  function initCourseProgress() {
    const lessonCards = document.querySelectorAll(".lesson-card");
    if (!lessonCards || lessonCards.length === 0) return;

    const pageId = window.location.pathname.split("/").pop().replace(".html", "") || "course";
    const isAr = currentLang === "ar";
    const txtTitle = isAr ? "مؤشر إنجاز المسار التدريبي" : "Course Progress";
    const txtDone = isAr ? "مكتمل" : "Completed";
    const txtMark = isAr ? "تحديد كمكتمل" : "Mark as Completed";
    const txtCelebration = isAr ? "🎉 مبروك! لقد أتممت جميع دروس هذا المسار بنجاح!" : "🎉 Congratulations! You completed all lessons in this course!";

    const getDoneCount = () => {
      let count = 0;
      lessonCards.forEach((_, i) => {
        if (localStorage.getItem(`cl_prog_${pageId}_${i}`) === "true") count++;
      });
      return count;
    };

    const card = document.createElement("div");
    card.className = "cl-course-progress-card reveal";
    card.innerHTML = `
      <div class="cl-progress-header">
        <div class="cl-progress-title">
          <i class="fa-solid fa-graduation-cap" style="color:var(--cl-brand);"></i>
          <span>${txtTitle}</span>
        </div>
        <div class="cl-progress-stats" id="clProgressStats">0 / ${lessonCards.length} (0%)</div>
      </div>
      <div class="cl-progress-bar-bg">
        <div class="cl-progress-bar-fill" id="clProgressBarFill" style="width: 0%;"></div>
      </div>
    `;

    const targetHeader = document.querySelector(".course-header");
    if (targetHeader && targetHeader.nextElementSibling) {
      targetHeader.parentNode.insertBefore(card, targetHeader.nextElementSibling);
    } else if (lessonCards[0]) {
      lessonCards[0].parentNode.insertBefore(card, lessonCards[0]);
    }

    const updateStats = () => {
      const done = getDoneCount();
      const total = lessonCards.length;
      const pct = Math.round((done / total) * 100);
      const statsEl = document.getElementById("clProgressStats");
      const barEl = document.getElementById("clProgressBarFill");
      if (statsEl) statsEl.innerText = `${done} / ${total} (${pct}%)`;
      if (barEl) barEl.style.width = `${pct}%`;
      if (done === total && total > 0) {
        if (typeof window.clToast === "function") window.clToast(txtCelebration, "success");
      }
    };

    lessonCards.forEach((lCard, idx) => {
      const isDone = localStorage.getItem(`cl_prog_${pageId}_${idx}`) === "true";
      if (isDone) lCard.classList.add("cl-completed");

      const footer = document.createElement("div");
      footer.className = "cl-lesson-footer";
      footer.innerHTML = `
        <button class="cl-lesson-toggle-btn ${isDone ? 'completed' : ''}" type="button">
          <i class="fa-${isDone ? 'solid' : 'regular'} fa-circle-check"></i>
          <span>${isDone ? txtDone : txtMark}</span>
        </button>
      `;
      lCard.appendChild(footer);

      const btn = footer.querySelector(".cl-lesson-toggle-btn");
      btn.addEventListener("click", () => {
        const currentlyDone = lCard.classList.contains("cl-completed");
        if (currentlyDone) {
          lCard.classList.remove("cl-completed");
          btn.classList.remove("completed");
          btn.querySelector("i").className = "fa-regular fa-circle-check";
          btn.querySelector("span").innerText = txtMark;
          localStorage.removeItem(`cl_prog_${pageId}_${idx}`);
        } else {
          lCard.classList.add("cl-completed");
          btn.classList.add("completed");
          btn.querySelector("i").className = "fa-solid fa-circle-check";
          btn.querySelector("span").innerText = txtDone;
          localStorage.setItem(`cl_prog_${pageId}_${idx}`, "true");
        }
        updateStats();
      });
    });

    updateStats();
  }

  function initDailyDevTip() {
    const path = window.location.pathname.toLowerCase();
    const isHome = path.endsWith("/") || path.endsWith("/index.html") || path === "" || path.endsWith("tools.html");
    if (!isHome || document.getElementById("clDailyTipBanner")) return;

    const tips = [
      {
        en: "Clean Code: Functions should do one thing, do it well, and do it only.",
        ar: "كود نظيف: يجب على كل دالة برمجية أن تؤدي مهمة واحدة فقط وتتقنها تماماً."
      },
      {
        en: "Git Pro Tip: Use 'git commit --amend' to quickly fix your most recent commit without creating a new one.",
        ar: "احتراف Git: استخدم 'git commit --amend' لتعديل آخر كوميت دون إنشاء كوميت جديد."
      },
      {
        en: "CSS Modern: Prefer 'clamp(min, preferred, max)' for truly responsive fluid typography without media queries.",
        ar: "تصميم CSS حديث: استخدم 'clamp()' لتحقيق نصوص مرنة تتكيف مع كل الشاشات بدون كتابة استعلامات وسائط متعددة."
      },
      {
        en: "JS Tip: Use console.table(data) instead of console.log for clean visualization of arrays and objects.",
        ar: "نصيحة JavaScript: استعمل console.table(data) بدلاً من console.log لعرض المصفوفات والكائنات في جدول مرتب."
      },
      {
        en: "Performance: Always add loading='lazy' to images below the fold to speed up initial page rendering.",
        ar: "أداء الويب: أضف دائماً loading='lazy' للصور في أسفل الصفحة لتسريع فتح الموقع فوراً."
      },
      {
        en: "Dev Well-being: Follow the 20-20-20 rule: every 20 mins, look at something 20 feet away for 20 seconds.",
        ar: "صحة المبرمج: اتبع قاعدة 20-20-20 لحماية عينيك: كل 20 دقيقة، انظر لشيء يبعد 6 أمتار لمدة 20 ثانية."
      },
      {
        en: "Python Zen: Explicit is better than implicit. Simple is better than complex.",
        ar: "فلسفة بايثون: الوضوح والصراحة أفضل من الغموض، والبساطة دائماً أفضل من التعقيد."
      }
    ];

    const dayIndex = Math.floor(Date.now() / 86400000) % tips.length;
    const currentTip = tips[dayIndex];
    const text = currentLang === 'ar' ? currentTip.ar : currentTip.en;

    const banner = document.createElement("div");
    banner.id = "clDailyTipBanner";
    banner.className = "cl-daily-tip-banner reveal";
    banner.innerHTML = `
      <div class="cl-tip-badge">
        <i class="fa-solid fa-lightbulb"></i>
        <span>${currentLang === 'ar' ? 'نصيحة اليوم' : 'Daily Tip'}</span>
      </div>
      <div class="cl-tip-text">${text}</div>
    `;

    const target = document.querySelector(".hero-premium") || document.querySelector(".tools-hub-grid") || document.querySelector("main") || document.body.firstChild;
    if (target && target.nextElementSibling) {
      target.parentNode.insertBefore(banner, target.nextElementSibling);
    } else {
      document.body.prepend(banner);
    }
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
    initScrollProgress();
    initReadingTime();
    initBackToTop();
    initAnimations();
    bindFooterEvents();
    refreshPageContent();
    initCookieConsent();
    initCourseProgress();
    initDailyDevTip();

    // Register PWA Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); } else { boot(); }
})();
