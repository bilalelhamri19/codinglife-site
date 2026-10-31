/**
 * CODING LIFE — DOCUMENTATION PORTAL ENGINE (docs.js)
 * Transforms course pages into professional documentation layout matching codinglife.in
 */

(function () {
  "use strict";

  function initDocsLayout() {

  const COURSE_MODULES = {
    'python': [
      { en: 'Python Fundamentals', ar: 'أساسيات لغة بايثون', fr: 'Fondamentaux de Python' },
      { en: 'Control Flow & Logic', ar: 'التحكم والمنطق البرمجي', fr: 'Contrôle de Flux & Logique' },
      { en: 'Data Structures & Collections', ar: 'هياكل البيانات والقوائم', fr: 'Structures de Données' },
      { en: 'Functions & Modular Code', ar: 'الدوال والبرمجة المجزأة', fr: 'Fonctions & Modularité' },
      { en: 'Object-Oriented Programming (OOP)', ar: 'البرمجة كائنية التوجه (OOP)', fr: 'Programmation Orientée Objet' }
    ],
    'javascript': [
      { en: 'JavaScript Fundamentals', ar: 'أساسيات جافاسكريبت', fr: 'Fondamentaux JavaScript' },
      { en: 'Control Flow & Modern Loops', ar: 'التحكم وحلقات التكرار', fr: 'Contrôle & Boucles' },
      { en: 'Functions, Scope & Closures', ar: 'الدوال والنطاقات والـ Closures', fr: 'Fonctions & Closures' },
      { en: 'Objects, Arrays & ES6+', ar: 'الكائنات والمصفوفات و ES6+', fr: 'Objets, Tableaux & ES6+' },
      { en: 'DOM Manipulation & Events', ar: 'التحكم في المتصفح والـ DOM', fr: 'Manipulation du DOM' }
    ],
    'html': [
      { en: 'HTML5 Fundamentals', ar: 'أساسيات لغة HTML5', fr: 'Fondamentaux HTML5' },
      { en: 'Text, Formatting & Links', ar: 'النصوص والتنسيق والروابط', fr: 'Textes, Formatage & Liens' },
      { en: 'Images, Audio & Video', ar: 'الوسائط المتعددة والصور', fr: 'Médias & Multimédia' },
      { en: 'Tables & Semantic Elements', ar: 'الجداول والعناصر الدلالية', fr: 'Tableaux & Sémantique' },
      { en: 'Modern Web Forms & Input', ar: 'نماذج الإدخال الحديثة', fr: 'Formulaires Modernes' }
    ],
    'css': [
      { en: 'CSS3 Foundations & Cascade', ar: 'أساسيات CSS3 والتعاقب', fr: 'Fondations CSS3 & Cascade' },
      { en: 'The Box Model & Typography', ar: 'نموذج الصندوق والخطوط', fr: 'Box Model & Typographie' },
      { en: 'Colors, Gradients & Shadows', ar: 'الألوان والتدرجات والظلال', fr: 'Couleurs & Dégradés' },
      { en: 'Flexbox Layout Engine', ar: 'نظام التخطيط المرن Flexbox', fr: 'Mise en page Flexbox' },
      { en: 'CSS Grid & Responsive Systems', ar: 'نظام الشبكة والتصميم المتجاوب', fr: 'CSS Grid & Responsive' }
    ],
    'react': [
      { en: 'React Core & JSX', ar: 'أساسيات ريآكت وصيغة JSX', fr: 'Fondamentaux React & JSX' },
      { en: 'Components, Props & State', ar: 'المكونات والخصائص والحالة', fr: 'Composants & État' },
      { en: 'Events & Conditional Rendering', ar: 'الأحداث والعرض الشرطي', fr: 'Événements & Rendu' },
      { en: 'Lists, Keys & Forms', ar: 'القوائم والنماذج في ريآكت', fr: 'Listes & Formulaires' },
      { en: 'Hooks Deep Dive (useEffect, Custom)', ar: 'دوال Hooks بالتفصيل', fr: 'Hooks Avancés' }
    ],
    'typescript': [
      { en: 'TypeScript Foundations', ar: 'أساسيات تايب سكريبت', fr: 'Fondamentaux TypeScript' },
      { en: 'Primitive & Literal Types', ar: 'الأنواع الأولية والثابتة', fr: 'Types Primitifs & Littéraux' },
      { en: 'Interfaces & Type Aliases', ar: 'الواجهات والأسماء المستعارة', fr: 'Interfaces & Alias' },
      { en: 'Functions & Type Narrowing', ar: 'الدوال وتضييق الأنواع', fr: 'Fonctions & Type Narrowing' },
      { en: 'Generics & Utility Types', ar: 'الأنواع العامة والأنواع المساعدة', fr: 'Génériques & Utilitaires' },
      { en: 'Classes & Enterprise Setup', ar: 'الكائنات ومشاريع المؤسسات', fr: 'Classes & Projets Entreprise' }
    ],
    'nextjs': [
      { en: 'Next.js 14 & App Router Architecture', ar: 'بنية Next.js 14 ونظام App Router', fr: 'Architecture App Router' },
      { en: 'Nested Layouts & Dynamic Routes', ar: 'التخطيطات المتداخلة والتوجيه الديناميكي', fr: 'Layouts Imbriqués & Routes' },
      { en: 'Server Actions & Data Fetching (ISR)', ar: 'دوال السيرفر وجلب البيانات والتخزين', fr: 'Actions Serveur & Cache' },
      { en: 'Route Handlers, Images & SEO', ar: 'واجهات API وتحسين الصور والسيو', fr: 'Route Handlers & SEO' },
      { en: 'Middleware, Security & Vercel Deployment', ar: 'الوسطاء وتأمين التطبيقات والنشر', fr: 'Middleware & Déploiement' }
    ],
    'tailwind': [
      { en: 'Utility-First Fundamentals', ar: 'فلسفة كلاسات الـ Utility والتصميم', fr: 'Approche Utility-First' },
      { en: 'Mobile-First Responsive Design', ar: 'التصميم المتجاوب للشاشات', fr: 'Design Responsive Mobile-First' },
      { en: 'Pseudo-States (Hover, Focus, Group)', ar: 'الحالات التفاعلية والتأثيرات', fr: 'États Interactifs & Hover' },
      { en: 'Dark Mode & Custom Themes', ar: 'الوضع الليلي وتخصيص الألوان والسمات', fr: 'Mode Sombre & Thèmes' },
      { en: 'Flexbox, Grid & Production Build', ar: 'تنسيق الواجهات وضغط ملفات الإنتاج', fr: 'Flexbox, Grid & Build' }
    ],
    'mongodb': [
      { en: 'NoSQL Document Model & mongosh CRUD', ar: 'نموذج وثائق NoSQL وعمليات CRUD', fr: 'Modèle Document & CRUD' },
      { en: 'Advanced Querying & Comparison Operators', ar: 'الاستعلامات المتقدمة وفلاتر المقارنة', fr: 'Requêtes Avancées & Filtres' },
      { en: 'Indexes & Performance Tuning', ar: 'إنشاء الفهارس وتسريع أداء الاستعلامات', fr: 'Indexation & Performances' },
      { en: 'Aggregation Pipeline Mastery', ar: 'معالجة وتجميع البيانات عبر Aggregation', fr: 'Pipeline d\'Agrégation' },
      { en: 'Mongoose ODM, Transactions & Atlas Cloud', ar: 'ربط Mongoose والمعاملات وسحابة Atlas', fr: 'Mongoose, Transactions & Atlas' }
    ],
    'algorithms': [
      { en: 'Big-O Complexity & Array Manipulation', ar: 'تحليل التعقيد الزمني ومعالجة المصفوفات', fr: 'Complexité Big-O & Tableaux' },
      { en: 'Hash Maps & Two Pointers Patterns', ar: 'جداول التجزئة وتقنيات المؤشرين', fr: 'Tables de Hachage & Pointeurs' },
      { en: 'Linked Lists, Stacks & Queues', ar: 'القوائم المتصلة والأكوام والطوابير', fr: 'Listes Chaînées & Piles' },
      { en: 'Binary Search & Tree Traversals', ar: 'البحث الثنائي وهياكل الأشجار الثنائية', fr: 'Recherche Binaire & Arbres' },
      { en: 'Sorting Algorithms & Dynamic Programming', ar: 'خوارزميات الترتيب والبرمجة الديناميكية', fr: 'Algorithmes de Tri & DP' }
    ],
    'cybersecurity': [
      { en: 'Security Fundamentals & OWASP Top 10', ar: 'أساسيات الأمان وأهم 10 ثغرات ويب', fr: 'Fondamentaux & Top 10 OWASP' },
      { en: 'SQL Injection (SQLi) & XSS Prevention', ar: 'الوقاية من ثغرات SQLi و XSS', fr: 'Injections SQL & Failles XSS' },
      { en: 'CSRF Defense & Secure Password Hashing', ar: 'الحماية من CSRF والتشفير القوي بـ Bcrypt', fr: 'Protection CSRF & Hachage' },
      { en: 'JWT Token Management & TLS 1.3 Encryption', ar: 'تأمين رموز JWT والتشفير أثناء النقل', fr: 'Tokens JWT & Chiffrement TLS' },
      { en: 'API Rate Limiting & Penetration Testing', ar: 'حماية الـ APIs واختبار الاختراق الأخلاقي', fr: 'Rate Limiting & Pen Testing' }
    ],
    'kotlin': [
      { en: 'Kotlin Fundamentals & Null Safety', ar: 'أساسيات لغة كوتلن والحماية من الـ Null', fr: 'Fondamentaux & Null Safety' },
      { en: 'Data Classes & Extension Functions', ar: 'كائنات البيانات ودوال التوسيع', fr: 'Data Classes & Extensions' },
      { en: 'Collections & Functional Pipelines', ar: 'المجموعات والبرمجة الوظيفية', fr: 'Collections & Fonctions' },
      { en: 'Coroutines & Reactive Flows', ar: 'الكوروتين والبرمجة غير المتزامنة', fr: 'Coroutines & Flux Réactifs' },
      { en: 'Jetpack Compose & Multiplatform (KMP)', ar: 'بناء واجهات أندرويد والتطوير المتقاطع', fr: 'Jetpack Compose & KMP' }
    ],
    'vue': [
      { en: 'Vue 3 & Composition API Paradigm', ar: 'أساسيات Vue 3 ونظام Composition API', fr: 'Vue 3 & Composition API' },
      { en: 'Reactivity Core (ref, reactive) & Directives', ar: 'إدارة الحالة التفاعلية والتوجيهات', fr: 'Réactivité & Directives' },
      { en: 'Computed Properties, Watchers & Components', ar: 'القيم المحسوبة والمكونات والـ Props', fr: 'Computed, Watch & Composants' },
      { en: 'Custom Composables & Pinia State', ar: 'دوال Composables وإدارة الحالة بـ Pinia', fr: 'Composables & Pinia' },
      { en: 'Vue Router, Transitions & Vite Tooling', ar: 'التوجيه والحركات وأدوات Vite للإنتاج', fr: 'Vue Router & Déploiement' }
    ],
    'freelance': [
      { en: 'Defining Your High-Value Tech Niche', ar: 'تحديد مجالك البرمجي المربح ونقاط قوتك', fr: 'Définir sa Niche Technique' },
      { en: 'High-Converting Developer Portfolios', ar: 'تصميم معرض أعمال احترافي يجلب العقود', fr: 'Portfolio qui Convertit' },
      { en: 'Proposals, Upwork & Outreach Strategies', ar: 'كتابة عروض العمل والمراسلة المباشرة', fr: 'Propositions & Prospection' },
      { en: 'Pricing Models, Contracts & Invoicing', ar: 'استراتيجيات التسعير وصياغة العقود والفواتير', fr: 'Tarification & Contrats' },
      { en: 'Time Management & Scaling to an Agency', ar: 'تنظيم الوقت وتجنب الإرهاق والتوسع', fr: 'Gestion du Temps & Agence' }
    ],
    'docker': [
      { en: 'Containers & Architecture', ar: 'الحاويات البرمجية والمعمارية', fr: 'Conteneurs & Architecture' },
      { en: 'Production Dockerfiles', ar: 'بناء ملفات Dockerfile للإنتاج', fr: 'Dockerfiles de Production' },
      { en: 'Compose & Multi-Services', ar: 'إدارة الخدمات عبر Compose', fr: 'Docker Compose' },
      { en: 'Volumes & Networking', ar: 'التخزين والشبكات الافتراضية', fr: 'Volumes & Réseaux' },
      { en: 'Optimization & Multi-Stage', ar: 'تحسين الأداء وتقليص الأحجام', fr: 'Optimisation & Multi-Stage' }
    ],
    'linux': [
      { en: 'Terminal Navigation & Commands', ar: 'الطرفية والتنقل الأساسي', fr: 'Terminal & Navigation' },
      { en: 'File System & Permissions (chmod/chown)', ar: 'نظام الملفات والصلاحيات', fr: 'Système & Permissions' },
      { en: 'Processes & Packages', ar: 'إدارة العمليات والحزم', fr: 'Processus & Paquets' },
      { en: 'Text Processing (grep, sed, awk)', ar: 'معالجة النصوص وتصفية السجلات', fr: 'Traitement de Texte' },
      { en: 'Bash Scripting & SSH Security', ar: 'برمجة سكربتات باش وتأمين السيرفرات', fr: 'Scripts Bash & Sécurité' }
    ],
    'sql': [
      { en: 'Relational Database Foundations', ar: 'أساسيات قواعد البيانات العلائقية', fr: 'Bases Relationnelles' },
      { en: 'CRUD Operations & Filtering', ar: 'عمليات الاستعلام والتصفية', fr: 'CRUD & Filtrage' },
      { en: 'Aggregation & Grouping', ar: 'دوال التجميع والتحليل الإحصائي', fr: 'Agrégation & Group By' },
      { en: 'Joins & Multi-Table Relationships', ar: 'ربط الجداول وعلاقات البيانات', fr: 'Jointures & Relations' },
      { en: 'Indexes, Transactions & Performance', ar: 'الفهارس والعمليات الآمنة (ACID)', fr: 'Index & Performances' }
    ],
    'git': [
      { en: 'Version Control Foundations', ar: 'أساسيات نظام التحكم في الإصدار', fr: 'Fondamentaux Git' },
      { en: 'Commits & Staging Area', ar: 'تسجيل التعديلات ومنطقة التجهيز', fr: 'Commits & Staging' },
      { en: 'Branching & Merging', ar: 'الفروع ودمج المسارات البرمجية', fr: 'Branches & Fusions' },
      { en: 'Remote Repositories & GitHub', ar: 'المستودعات البعيدة ومنصة GitHub', fr: 'Dépôts Distants & GitHub' },
      { en: 'Rebase, Reset & Conflict Resolution', ar: 'حل التعارضات وأوامر التراجع', fr: 'Rebase, Reset & Conflits' }
    ],
    'nodejs': [
      { en: 'Node.js Runtime & Architecture', ar: 'بيئة تشغيل نود جي اس والمعمارية', fr: 'Architecture Node.js' },
      { en: 'Modules & Package Management', ar: 'نظام الحزم والموديولات (NPM)', fr: 'Modules & NPM' },
      { en: 'Event Loop & File System Operations', ar: 'العمليات غير المتزامنة ونظام الملفات', fr: 'Event Loop & Fichiers' },
      { en: 'HTTP Servers & Express.js', ar: 'بناء خوادم الويب عبر Express', fr: 'Serveurs HTTP & Express' },
      { en: 'REST APIs & Production Middleware', ar: 'واجهات REST والربط بقواعد البيانات', fr: 'APIs REST & BDD' }
    ],
    'php': [
      { en: 'PHP Fundamentals & Syntax', ar: 'أساسيات لغة PHP والبنية', fr: 'Fondamentaux PHP' },
      { en: 'Arrays & Functions', ar: 'المصفوفات والدوال في PHP', fr: 'Tableaux & Fonctions' },
      { en: 'Form Handling & Superglobals', ar: 'معالجة النماذج والمتغيرات العامة', fr: 'Formulaires & Superglobales' },
      { en: 'Database PDO & Security', ar: 'الاتصال بقواعد البيانات عبر PDO', fr: 'Bases de Données & PDO' },
      { en: 'Object-Oriented PHP & Modern Features', ar: 'البرمجة الكائنية في PHP الحديثة', fr: 'PHP Orienté Objet' }
    ],
    'csharp': [
      { en: 'C# Foundations & .NET Ecosystem', ar: 'أساسيات لغة سي شارب ومنصة دوت نت', fr: 'Fondamentaux C# & .NET' },
      { en: 'Control Flow & Methods', ar: 'التحكم في التدفق والدوال', fr: 'Contrôle & Méthodes' },
      { en: 'Object-Oriented Programming (OOP)', ar: 'البرمجة كائنية التوجه في سي شارب', fr: 'Programmation Orientée Objet' },
      { en: 'Collections & LINQ Queries', ar: 'المجموعات واستعلامات LINQ', fr: 'Collections & LINQ' },
      { en: 'Async/Await & Modern C# Features', ar: 'البرمجة غير المتزامنة وميزات C# الحديثة', fr: 'Asynchronisme & C# Moderne' }
    ],
    'flutter': [
      { en: 'Dart Language & Flutter Architecture', ar: 'لغة دارت ومعمارية فلاتر', fr: 'Langage Dart & Architecture' },
      { en: 'Core Widgets & Layouts', ar: 'عناصر الواجهة وتخطيط الشاشات', fr: 'Widgets & Mises en Page' },
      { en: 'State Management (Stateful & Providers)', ar: 'إدارة الحالة في التطبيقات', fr: 'Gestion d\'État' },
      { en: 'Navigation, Routing & Assets', ar: 'التنقل بين الشاشات والوسائط', fr: 'Navigation & Ressources' },
      { en: 'REST APIs, Animations & Production', ar: 'واجهات API والحركات والنشر', fr: 'APIs & Production' }
    ]
  };

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

    const currentLang = localStorage.getItem('cl-lang') || localStorage.getItem('cl_lang') || 'en';

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
      card.style.scrollMarginTop = '120px';

      return { id, titleEn, titleAr, titleFr, iconClass, card, index: idx };
    });

    // Partition into modules (2 lessons per module to create lots of rich modules)
    const total = lessonsData.length;
    const partSize = 2;

    // Build Docs Layout Container (No top parts bar!)
    const layout = document.createElement('div');
    layout.className = 'docs-layout-container';

    // 1. Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'docs-sidebar';
    sidebar.id = 'docsSidebar';

    let modulesHtml = '';
    // Determine course key from URL
    const pagePath = window.location.pathname.toLowerCase();
    const courseKey = Object.keys(COURSE_MODULES).find(k => pagePath.includes(k)) || 'default';
    const courseModulesList = COURSE_MODULES[courseKey] || [];

    const partNames = courseModulesList.length > 0 ? courseModulesList : [
      { en: 'Module 1: Foundations', ar: 'الوحدة 1: الأساسيات', fr: 'Module 1: Fondations' },
      { en: 'Module 2: Core Syntax & Types', ar: 'الوحدة 2: البنية والأنواع', fr: 'Module 2: Syntaxe & Types' },
      { en: 'Module 3: Control & Functions', ar: 'الوحدة 3: التحكم والدوال', fr: 'Module 3: Contrôle & Fonctions' },
      { en: 'Module 4: Architecture & OOP', ar: 'الوحدة 4: الهيكلة والكائنات', fr: 'Module 4: Architecture & POO' },
      { en: 'Module 5: Advanced Engineering', ar: 'الوحدة 5: مفاهيم متقدمة', fr: 'Module 5: Ingénierie Avancée' },
      { en: 'Module 6: Enterprise & APIs', ar: 'الوحدة 6: مشاريع المؤسسات', fr: 'Module 6: Entreprise & APIs' },
      { en: 'Module 7: Production & Roadmap', ar: 'الوحدة 7: الإنتاج والمسار', fr: 'Module 7: Production & Roadmap' },
      { en: 'Module 8: Mastery & Best Practices', ar: 'الوحدة 8: الاحتراف والتطوير', fr: 'Module 8: Maîtrise' }
    ];

    const numModules = Math.ceil(total / partSize);
    for (let p = 1; p <= numModules; p++) {
      const startIdx = (p - 1) * partSize;
      const endIdx = Math.min(total, p * partSize);
      const partLessons = lessonsData.slice(startIdx, endIdx);
      if (partLessons.length === 0) continue;

      const pName = partNames[p - 1] || { en: `Module ${p}: Advanced Topics`, ar: `الوحدة ${p}: مواضيع متقدمة`, fr: `Module ${p}: Sujets Avancés` };
      modulesHtml += `
        <div class="docs-sidebar-module ${p === 1 ? '' : 'collapsed'}" data-part-group="${p}">
          <div class="docs-module-header" onclick="this.closest('.docs-sidebar-module').classList.toggle('collapsed')">
            <span class="docs-module-title-span">
              <span data-cl-lang="en" class="${currentLang === 'en' ? 'cl-active-lang' : ''}">${pName.en}</span>
              <span data-cl-lang="ar" class="${currentLang === 'ar' ? 'cl-active-lang' : ''}">${pName.ar}</span>
              <span data-cl-lang="fr" class="${currentLang === 'fr' ? 'cl-active-lang' : ''}">${pName.fr}</span>
            </span>
            <i class="fa-solid fa-chevron-down docs-chevron"></i>
          </div>
          <ul class="docs-lesson-list">
            ${partLessons.map(l => `
              <li>
                <a href="#${l.id}" class="docs-lesson-link ${l.index === 0 ? 'active' : ''}" onclick="window.CL_DOCS.activateLink(this)">
                  <span data-cl-lang="en" class="${currentLang === 'en' ? 'cl-active-lang' : ''}">${escapeHtml(cleanTitle(l.titleEn))}</span>
                  <span data-cl-lang="ar" class="${currentLang === 'ar' ? 'cl-active-lang' : ''}">${escapeHtml(cleanTitle(l.titleAr || l.titleEn))}</span>
                  <span data-cl-lang="fr" class="${currentLang === 'fr' ? 'cl-active-lang' : ''}">${escapeHtml(cleanTitle(l.titleFr || l.titleEn))}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    sidebar.innerHTML = modulesHtml;

    // 2. Main Content
    const main = document.createElement('main');
    main.className = 'docs-main-content';

    // Utilities Bar (Breadcrumbs + PDF Download)
    const utilBar = document.createElement('div');
    utilBar.className = 'docs-top-utilities';
    utilBar.innerHTML = `
      <div class="docs-breadcrumbs">
        <a href="index.html" class="docs-breadcrumb-home" title="Home"><i class="fa-solid fa-house"></i></a>
        <span class="docs-breadcrumb-sep"><i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i></span>
        <span class="docs-breadcrumb-pill">${escapeHtml(cleanTitle(courseTitle))}</span>
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
        <h2>What You'll Learn</h2>
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

    

    // Put into layout (Sidebar + Main Content only, no duplicate right TOC)
    layout.appendChild(sidebar);
    layout.appendChild(main);

    // Replace contents in body or course-container
    courseContainer.parentNode.insertBefore(layout, courseContainer);
    courseContainer.remove();

    // Sync language visibility for newly inserted elements
    const activeLang = localStorage.getItem('cl-lang') || localStorage.getItem('cl_lang') || 'en';
    layout.querySelectorAll('[data-cl-lang]').forEach(el => {
      if (el.getAttribute('data-cl-lang') === activeLang) {
        el.classList.add('cl-active-lang');
      } else {
        el.classList.remove('cl-active-lang');
      }
    });

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

  function cleanTitle(s) {
    if (!s) return '';
    return s.replace(/^\d+[\.\:\-\s]+/, '').trim();
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

    function updatePager() {}

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
      const scrollPos = window.scrollY + 140;

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

        updatePager();
      }
    });

    // Expose global helpers
    window.CL_DOCS = {
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
