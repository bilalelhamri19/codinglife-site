(function () {
  "use strict";

  const CONFIG = {
    brandName: "Coding Life",
    logoPath: "logo.png",
    navItems: [
      { href: "index.html", icon: "fa-house", label: "Home" },
      { href: "dorous-albarmaja.html", icon: "fa-code", label: "Courses" },
      { href: "blog.html", icon: "fa-newspaper", label: "Blog" },
      { href: "contact.html", icon: "fa-envelope", label: "Contact" }
    ],
    socialLinks: [
      { href: "https://facebook.com", icon: "fab fa-facebook-f" },
      { href: "https://youtube.com", icon: "fab fa-youtube" },
      { href: "https://instagram.com", icon: "fab fa-instagram" },
      { href: "https://linkedin.com", icon: "fab fa-linkedin-in" }
    ]
  };

  const currentFile = location.pathname.split("/").pop() || "index.html";

  // --- UI Components ---

  function createHeader() {
    const header = document.createElement("header");
    header.className = "cl-site-header";
    header.innerHTML = `
      <div class="cl-header-inner">
        <a href="index.html" class="cl-brand">
          <img src="${CONFIG.logoPath}" alt="Logo">
          <span>${CONFIG.brandName}</span>
        </a>
        <nav class="cl-nav">
          ${CONFIG.navItems.map(item => `
            <a href="${item.href}" class="${currentFile === item.href ? 'active' : ''}">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>
        <div style="display: flex; gap: 12px; align-items: center;">
          <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode">
            <i class="fa-solid fa-moon"></i>
          </button>
          <button class="theme-toggle" id="searchToggle" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    `;
    document.body.prepend(header);
    
    // Theme logic
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
  }

  function updateThemeIcon(theme) {
    const icon = document.querySelector("#themeToggle i");
    if (!icon) return;
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "cl-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <span class="footer-brand">${CONFIG.brandName}</span>
          <p>Premium programming education designed to take you from zero to professional. Clear roadmaps, deep dives, and practical building.</p>
          <div class="social-links">
            ${CONFIG.socialLinks.map(s => `<a href="${s.href}"><i class="${s.icon}"></i></a>`).join('')}
          </div>
        </div>
        <div class="footer-links">
          <h4>Platform</h4>
          <a href="index.html">Home</a>
          <a href="dorous-albarmaja.html">All Courses</a>
          <a href="workshops.html">Workshops</a>
          <a href="blog.html">Blog</a>
        </div>
        <div class="footer-links">
          <h4>Support</h4>
          <a href="contact.html">Contact Us</a>
          <a href="about.html">About</a>
          <a href="privacy.html">Privacy Policy</a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: none; font-size: 0.85rem;">
        &copy; 2026 ${CONFIG.brandName}. Built with passion for learners.
      </div>
    `;
    document.body.appendChild(footer);
  }

  // --- Search System ---

  function initSearch() {
    const overlay = document.createElement("div");
    overlay.id = "searchOverlay";
    overlay.style = "position:fixed; inset:0; background:rgba(2,6,23,0.95); z-index:2000; display:none; flex-direction:column; align-items:center; padding-top:100px; backdrop-filter:blur(8px);";
    overlay.innerHTML = `
      <div style="width:min(600px, 90%); position:relative;">
        <input type="text" id="searchInput" placeholder="Search courses, lessons, topics..." 
               style="width:100%; padding:20px; border-radius:12px; border:1px solid #1e293b; background:#0f172a; color:white; font-size:1.2rem; outline:none; box-shadow:0 0 30px rgba(45,212,191,0.2);">
        <div id="searchResults" style="margin-top:20px; max-height:400px; overflow-y:auto; display:flex; flex-direction:column; gap:12px;"></div>
        <button id="closeSearch" style="position:absolute; right:-60px; top:0; background:none; border:none; color:white; font-size:2rem; cursor:pointer;">&times;</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const toggle = document.getElementById("searchToggle");
    const input = document.getElementById("searchInput");
    const close = document.getElementById("closeSearch");

    toggle.addEventListener("click", () => {
      overlay.style.display = "flex";
      input.focus();
    });

    close.addEventListener("click", () => overlay.style.display = "none");
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.style.display = "none"; });

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const results = document.getElementById("searchResults");
      if (!q) { results.innerHTML = ""; return; }
      
      // Complete site index for global search
      const pages = [
        // Courses
        { t: "HTML5 Masterclass", d: "Foundation of web development, semantic tags, and SEO.", h: "html.html" },
        { t: "CSS3 Styling", d: "Responsive design, Flexbox, Grid, and animations.", h: "css.html" },
        { t: "JavaScript Deep Dive", d: "Modern JS, async logic, and interactive features.", h: "javascript.html" },
        { t: "React Modern", d: "Component-based architecture and React hooks.", h: "react.html" },
        { t: "PHP Backend", d: "Server-side programming and secure database logic.", h: "php.html" },
        { t: "Node.js Scalable", d: "High-performance backend with JavaScript.", h: "nodejs.html" },
        { t: "SQL Databases", d: "Relational data management and complex queries.", h: "sql.html" },
        { t: "Python Expert", d: "Automation, scripting, and data science foundations.", h: "python.html" },
        { t: "C# & .NET", d: "Enterprise logic and Unity game development.", h: "csharp.html" },
        { t: "Java Enterprise", d: "Enterprise engineering and Spring Boot backend.", h: "java.html" },
        { t: "Git Expert", d: "Version control, branching, and team collaboration.", h: "git.html" },
        { t: "Flutter Mobile", d: "Multi-platform mobile apps with beautiful UI.", h: "flutter.html" },
        
        // Tools
        { t: "CSS Unit Converter", d: "Professional tool for PX, REM, EM, VW, and VH conversion.", h: "css-converter.html" },
        { t: "Palette Generator", d: "Create harmonious color schemes for your designs.", h: "colors.html" },
        { t: "Code Playground", d: "Live editor to practice HTML, CSS, and JS with instant preview.", h: "playground.html" },
        
        // Articles & Content
        { t: "Blog", d: "Technical articles, coding tips, and industry news.", h: "blog.html" },
        { t: "Motivation", d: "Stay inspired on your coding journey.", h: "motivation.html" },
        { t: "How to Start Coding", d: "A complete roadmap for beginners.", h: "coding.html" },
        { t: "Productivity Tips", d: "How to code faster and stay focused.", h: "productivity.html" },
        
        // General
        { t: "Workshops", d: "Live coding workshops and practical building sessions.", h: "workshops.html" },
        { t: "About Us", d: "The mission and story of Coding Life.", h: "about.html" },
        { t: "Contact", d: "Get in touch for support or collaborations.", h: "contact.html" }
      ];

      const filtered = pages.filter(p => 
        p.t.toLowerCase().includes(q) || 
        p.d.toLowerCase().includes(q)
      );

      results.innerHTML = filtered.length > 0 
        ? filtered.map(p => `
          <a href="${p.h}" style="padding:16px; background:rgba(30,41,59,0.8); border-radius:8px; color:white; text-decoration:none; display:block; transition:0.2s; border:1px solid #1e293b;">
            <div style="font-weight:bold; color:#2dd4bf; margin-bottom:4px;">${p.t}</div>
            <div style="font-size:0.85rem; color:#94a3b8;">${p.d}</div>
          </a>
        `).join("")
        : `<div style="color:#94a3b8; text-align:center; padding:20px;">No results found for "${q}"</div>`;
    });
  }

  // --- Content Enhancements ---

  function polishCodeBlocks() {
    document.querySelectorAll(".code-example").forEach(block => {
      if (block.querySelector(".code-header")) return;
      
      const lang = block.getAttribute("data-lang") || "code";
      const pre = block.querySelector("pre");
      const code = pre.innerText;

      const header = document.createElement("div");
      header.className = "code-header";
      header.innerHTML = `
        <span><i class="fa-solid fa-code"></i> ${lang}</span>
        <button class="code-copy">Copy</button>
      `;
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
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.1 });

    // Target elements that need animations
    const targets = document.querySelectorAll("section, .chapter, .card, .reveal");
    targets.forEach(el => {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
      }
      observer.observe(el);
    });
  }

  // --- Boot ---

  function boot() {
    // Remove existing headers/footers to avoid duplicates
    document.querySelectorAll("header, footer").forEach(el => {
      if (!el.classList.contains("cl-site-header") && !el.classList.contains("cl-footer")) {
        el.remove();
      }
    });

    createHeader();
    createFooter();
    initSearch();
    polishCodeBlocks();
    initAnimations();
    
    // Add "Back to Top"
    const btt = document.createElement("button");
    btt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btt.style = "position:fixed; bottom:30px; right:30px; width:50px; height:50px; border-radius:50%; background:#2dd4bf; border:none; color:white; cursor:pointer; display:none; z-index:100; box-shadow:0 10px 20px rgba(0,0,0,0.2);";
    document.body.appendChild(btt);

    window.addEventListener("scroll", () => {
      btt.style.display = window.scrollY > 500 ? "block" : "none";
    });
    btt.addEventListener("click", () => window.scrollTo({top: 0, behavior: 'smooth'}));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
