/**
 * CODING LIFE — DOCUMENTATION PORTAL ENGINE (docs.js)
 * Transforms all course pages into professional documentation layout matching codinglife.in
 */

(function () {
  "use strict";

  function initDocsLayout() {
    // Check if this page has course lessons
    let lessonCards = Array.from(document.querySelectorAll('.docs-lesson-card, .lesson-card'));
    if (lessonCards.length === 0) return;

    // If docs layout already manually created in HTML (like custom java.html), just init events
    if (document.querySelector('.docs-layout-container')) {
      setupInteractiveDocs();
      return;
    }

    // Auto-transform pages with .course-container and .lesson-card into Docs Layout!
    const courseContainer = document.querySelector('.course-container');
    if (!courseContainer) return;

    const courseHeader = document.querySelector('.course-header');
    let courseTitle = 'Course';
    let courseLead = '';
    let metaHtml = '';

    if (courseHeader) {
      const h1 = courseHeader.querySelector('h1');
      if (h1) courseTitle = h1.textContent.trim();
      const p = courseHeader.querySelector('p');
      if (p) courseLead = p.textContent.trim();
      const meta = courseHeader.querySelector('.course-meta');
      if (meta) metaHtml = meta.outerHTML;
    }

    // Hide old toc if exists
    const oldToc = document.querySelector('.toc');
    if (oldToc) oldToc.style.display = 'none';

    // Collect lesson metadata
    const lessonsData = lessonCards.map((card, idx) => {
      let id = card.id || ('lesson-' + (idx + 1));
      card.id = id;

      // Find title
      let titleEn = '', titleAr = '', titleFr = '';
      const enEl = card.querySelector('[data-cl-lang="en"] h3, [data-cl-lang="en"] h2');
      const arEl = card.querySelector('[data-cl-lang="ar"] h3, [data-cl-lang="ar"] h2');
      const frEl = card.querySelector('[data-cl-lang="fr"] h3, [data-cl-lang="fr"] h2');
      const genericH = card.querySelector('h3, h2');

      titleEn = enEl ? enEl.textContent.trim() : (genericH ? genericH.textContent.trim() : `Lesson ${idx + 1}`);
      titleAr = arEl ? arEl.textContent.trim() : titleEn;
      titleFr = frEl ? frEl.textContent.trim() : titleEn;

      // Icon
      const iconEl = card.querySelector('.lesson-icon i');
      const iconClass = iconEl ? iconEl.className : 'fa-solid fa-code';

      // Assign card class
      card.classList.add('docs-lesson-card');
      card.style.scrollMarginTop = '160px';

      return { id, titleEn, titleAr, titleFr, iconClass, card, index: idx };
    });

    // Partition into 4 parts
    const total = lessonsData.length;
    const partSize = Math.max(1, Math.ceil(total / 4));

    // 1. Build Top Parts Bar
    const partsBar = document.createElement('nav');
    partsBar.className = 'docs-parts-bar';
    partsBar.setAttribute('aria-label', 'Course Parts');
    partsBar.innerHTML = `
      <div class="docs-parts-inner">
        <button class="docs-part-btn active" data-part="1" onclick="window.CL_DOCS.switchPart(1)">
          <i class="fa-solid fa-cube"></i>
          <span data-cl-lang="en">Part 1: Core Basics</span>
          <span data-cl-lang="ar">الجزء 1: الأساسيات</span>
          <span data-cl-lang="fr">Partie 1: Fondations</span>
        </button>
        <button class="docs-part-btn" data-part="2" onclick="window.CL_DOCS.switchPart(2)">
          <i class="fa-solid fa-code-branch"></i>
          <span data-cl-lang="en">Part 2: Advanced Core</span>
          <span data-cl-lang="ar">الجزء 2: التحكم والمنطق</span>
          <span data-cl-lang="fr">Partie 2: Logique & Fonctions</span>
        </button>
        <button class="docs-part-btn" data-part="3" onclick="window.CL_DOCS.switchPart(3)">
          <i class="fa-solid fa-layer-group"></i>
          <span data-cl-lang="en">Part 3: Modern & Enterprise</span>
          <span data-cl-lang="ar">الجزء 3: المعايير والمشاريع</span>
          <span data-cl-lang="fr">Partie 3: Entreprise & POO</span>
        </button>
        <button class="docs-part-btn" data-part="4" onclick="window.CL_DOCS.switchPart(4)">
          <i class="fa-solid fa-rocket"></i>
          <span data-cl-lang="en">Part 4: Design & Practice</span>
          <span data-cl-lang="ar">الجزء 4: التطبيق وخارطة الطريق</span>
          <span data-cl-lang="fr">Partie 4: Pratique & Roadmap</span>
        </button>
      </div>
    `;

    // 2. Build Docs Layout Container
    const layout = document.createElement('div');
    layout.className = 'docs-layout-container';

    // 2a. Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'docs-sidebar';
    sidebar.id = 'docsSidebar';

    let modulesHtml = '';
    const partNames = [
      { en: 'Module 1: Foundations', ar: 'الوحدة 1: الأساسيات', fr: 'Module 1: Fondations' },
      { en: 'Module 2: Core Logic', ar: 'الوحدة 2: التحكم والمنطق', fr: 'Module 2: Logique' },
      { en: 'Module 3: Advanced Concepts', ar: 'الوحدة 3: مفاهيم متقدمة', fr: 'Module 3: Avancé' },
      { en: 'Module 4: Mastery & Practice', ar: 'الوحدة 4: الاحتراف والتطبيق', fr: 'Module 4: Maîtrise' }
    ];

    for (let p = 1; p <= 4; p++) {
      const startIdx = (p - 1) * partSize;
      const endIdx = Math.min(total, p * partSize);
      const partLessons = lessonsData.slice(startIdx, endIdx);
      if (partLessons.length === 0) continue;

      const pName = partNames[p - 1];
      modulesHtml += `
        <div class="docs-sidebar-module" data-part-group="${p}">
          <div class="docs-module-header" onclick="this.closest('.docs-sidebar-module').classList.toggle('collapsed')">
            <span>
              <i class="fa-solid fa-book-open" style="color:var(--cl-brand);margin-right:8px;"></i>
              <span data-cl-lang="en">${pName.en}</span>
              <span data-cl-lang="ar">${pName.ar}</span>
              <span data-cl-lang="fr">${pName.fr}</span>
            </span>
            <i class="fa-solid fa-chevron-down docs-chevron"></i>
          </div>
          <ul class="docs-lesson-list">
            ${partLessons.map(l => `
              <li>
                <a href="#${l.id}" class="docs-lesson-link ${l.index === 0 ? 'active' : ''}" onclick="window.CL_DOCS.activateLink(this)">
                  <span class="docs-lesson-num">${String(l.index + 1).padStart(2, '0')}</span>
                  <span data-cl-lang="en">${escapeHtml(l.titleEn)}</span>
                  <span data-cl-lang="ar">${escapeHtml(l.titleAr)}</span>
                  <span data-cl-lang="fr">${escapeHtml(l.titleFr)}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    sidebar.innerHTML = modulesHtml;

    // 2b. Main Content
    const main = document.createElement('main');
    main.className = 'docs-main-content';

    // Utilities Bar (Breadcrumbs + PDF Download)
    const utilBar = document.createElement('div');
    utilBar.className = 'docs-top-utilities';
    utilBar.innerHTML = `
      <div class="docs-breadcrumbs">
        <a href="index.html" class="docs-breadcrumb-home" title="Home"><i class="fa-solid fa-house"></i></a>
        <span class="docs-breadcrumb-sep">/</span>
        <a href="dorous-albarmaja.html" style="color:var(--cl-muted);">Courses</a>
        <span class="docs-breadcrumb-sep">/</span>
        <span class="docs-breadcrumb-pill">${escapeHtml(courseTitle)}</span>
      </div>
      <button class="docs-pdf-btn" onclick="window.print()" title="Print or save as PDF">
        <i class="fa-solid fa-download"></i>
        <span>Download PDF</span>
      </button>
    `;
    main.appendChild(utilBar);

    // Module Header Area
    const heroArea = document.createElement('div');
    heroArea.className = 'docs-module-header-area';
    heroArea.innerHTML = `
      <h1 class="docs-module-title">${escapeHtml(courseTitle)}</h1>
      ${courseLead ? `<p class="docs-module-lead">${escapeHtml(courseLead)}</p>` : ''}
      ${metaHtml ? `<div style="margin-bottom:24px;">${metaHtml}</div>` : ''}
      <div class="docs-learn-card">
        <h3><i class="fa-solid fa-graduation-cap" style="color:var(--cl-brand);"></i> What You'll Learn</h3>
        <ul>
          <li>Comprehensive step-by-step masterclass from scratch</li>
          <li>Production-ready best practices and real-world architectures</li>
          <li>Interactive code samples and hands-on demonstrations</li>
          <li>Direct roadmap to professional programming competency</li>
        </ul>
      </div>
    `;
    main.appendChild(heroArea);

    // Lessons wrapper
    const lessonsWrap = document.createElement('div');
    lessonsWrap.id = 'docsLessonsWrap';
    lessonCards.forEach(c => lessonsWrap.appendChild(c));
    main.appendChild(lessonsWrap);

    // Bottom Pager Navigation
    const pager = document.createElement('div');
    pager.className = 'docs-nav-pager';
    pager.innerHTML = `
      <a href="#${lessonsData[0].id}" class="docs-pager-btn prev" id="pagerPrev" onclick="window.CL_DOCS.navigateLesson(-1)">
        <span class="docs-pager-label"><i class="fa-solid fa-arrow-left"></i> Previous Topic</span>
        <span class="docs-pager-title" id="pagerPrevTitle">Intro</span>
      </a>
      <a href="#${lessonsData[1] ? lessonsData[1].id : lessonsData[0].id}" class="docs-pager-btn next" id="pagerNext" onclick="window.CL_DOCS.navigateLesson(1)">
        <span class="docs-pager-label">Next Topic <i class="fa-solid fa-arrow-right"></i></span>
        <span class="docs-pager-title" id="pagerNextTitle">${lessonsData[1] ? escapeHtml(lessonsData[1].titleEn) : 'Next'}</span>
      </a>
    `;
    main.appendChild(pager);

    // 2c. Right TOC
    const toc = document.createElement('aside');
    toc.className = 'docs-toc';
    toc.innerHTML = `
      <div class="docs-toc-title">On this page</div>
      <ul class="docs-toc-list" id="docsTocList">
        ${lessonsData.map(l => `
          <li><a href="#${l.id}" class="docs-toc-link ${l.index === 0 ? 'active' : ''}">${escapeHtml(l.titleEn)}</a></li>
        `).join('')}
      </ul>
    `;

    // Put into layout
    layout.appendChild(sidebar);
    layout.appendChild(main);
    layout.appendChild(toc);

    // Replace contents in body or course-container
    courseContainer.parentNode.insertBefore(partsBar, courseContainer);
    courseContainer.parentNode.insertBefore(layout, courseContainer);
    courseContainer.remove();

    // Mobile Drawer Elements
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'docs-mobile-drawer-btn';
    mobileBtn.onclick = toggleSidebarDrawer;
    mobileBtn.innerHTML = `<i class="fa-solid fa-list-ul"></i><span>Topics</span>`;
    document.body.appendChild(mobileBtn);

    const backdrop = document.createElement('div');
    backdrop.className = 'docs-sidebar-backdrop';
    backdrop.id = 'sidebarBackdrop';
    backdrop.onclick = toggleSidebarDrawer;
    document.body.appendChild(backdrop);

    // Init scrollspy & pager
    setupInteractiveDocs();
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function toggleSidebarDrawer() {
    const sidebar = document.getElementById('docsSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar || !backdrop) return;
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('open');
  }

  function setupInteractiveDocs() {
    const lessonCards = Array.from(document.querySelectorAll('.docs-lesson-card, .lesson-card'));
    let currentLessonIdx = 0;

    function updatePager() {
      const prevBtn = document.getElementById('pagerPrev');
      const nextBtn = document.getElementById('pagerNext');
      const prevTitle = document.getElementById('pagerPrevTitle');
      const nextTitle = document.getElementById('pagerNextTitle');

      if (!prevBtn || !nextBtn) return;

      if (currentLessonIdx > 0) {
        prevBtn.style.visibility = 'visible';
        const prevCard = lessonCards[currentLessonIdx - 1];
        const h = prevCard.querySelector('h2, h3');
        if (prevTitle) prevTitle.textContent = h ? h.textContent.trim() : 'Previous';
        prevBtn.setAttribute('href', '#' + prevCard.id);
      } else {
        prevBtn.style.visibility = 'hidden';
      }

      if (currentLessonIdx < lessonCards.length - 1) {
        nextBtn.style.visibility = 'visible';
        const nextCard = lessonCards[currentLessonIdx + 1];
        const h = nextCard.querySelector('h2, h3');
        if (nextTitle) nextTitle.textContent = h ? h.textContent.trim() : 'Next';
        nextBtn.setAttribute('href', '#' + nextCard.id);
      } else {
        nextBtn.style.visibility = 'hidden';
      }
    }

    function navigateLesson(delta) {
      const newIdx = currentLessonIdx + delta;
      if (newIdx >= 0 && newIdx < lessonCards.length) {
        currentLessonIdx = newIdx;
        const target = lessonCards[newIdx];
        target.scrollIntoView({ behavior: 'smooth' });
        updatePager();
      }
    }

    function switchPart(partNumber) {
      document.querySelectorAll('.docs-part-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.getAttribute('data-part')) === partNumber);
      });

      const targetModule = document.querySelector(`.docs-sidebar-module[data-part-group="${partNumber}"]`);
      if (targetModule) {
        targetModule.classList.remove('collapsed');
        const firstLink = targetModule.querySelector('.docs-lesson-link');
        if (firstLink) {
          firstLink.click();
          const targetId = firstLink.getAttribute('href');
          const targetEl = document.querySelector(targetId);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    function activateLink(link) {
      document.querySelectorAll('.docs-lesson-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const sidebar = document.getElementById('docsSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
      }
    }

    // Scrollspy
    window.addEventListener('scroll', () => {
      let activeIndex = 0;
      const scrollPos = window.scrollY + 200;

      lessonCards.forEach((card, idx) => {
        if (card.offsetTop <= scrollPos) {
          activeIndex = idx;
        }
      });

      if (activeIndex !== currentLessonIdx) {
        currentLessonIdx = activeIndex;
        const currentId = lessonCards[activeIndex].id;

        document.querySelectorAll('.docs-lesson-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
        });

        document.querySelectorAll('.docs-toc-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
        });

        updatePager();
      }
    });

    // Expose global helpers
    window.CL_DOCS = {
      switchPart,
      activateLink,
      navigateLesson,
      toggleSidebarDrawer
    };

    updatePager();
  }

  // Run on page load with safe buffer for dynamic rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initDocsLayout, 40);
    });
  } else {
    setTimeout(initDocsLayout, 40);
  }

})();
