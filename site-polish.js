(function () {
  "use strict";

  const CONFIG = {
    brandName: "Coding Life",
    logoPath: "logo-icon.png",
    adsensePublisherId: "", // e.g. "ca-pub-xxxxxxxxxxxxxxxx" after AdSense approval
    adsenseAdSlot: "",
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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isAdsConfigured() {
    const id = CONFIG.adsensePublisherId || "";
    const slot = CONFIG.adsenseAdSlot || "";
    return id.startsWith("ca-pub-") && !id.includes("000000") && slot.length > 0 && slot !== "1234567890";
  }

  function isAdsAllowed() {
    return isAdsConfigured() && localStorage.getItem("cl-cookie-consent") === "accepted";
  }

  function mountAds() {
    if (!isAdsAllowed()) return;
    const holder = document.getElementById("clFooterAd");
    if (!holder || holder.querySelector("ins")) return;

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", CONFIG.adsensePublisherId);
    ins.setAttribute("data-ad-slot", CONFIG.adsenseAdSlot);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    holder.appendChild(ins);

    const push = () => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    };

    if (!document.getElementById("cl-adsense-script")) {
      const script = document.createElement("script");
      script.id = "cl-adsense-script";
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(CONFIG.adsensePublisherId);
      script.crossOrigin = "anonymous";
      script.onload = push;
      document.head.appendChild(script);
    } else {
      push();
    }
  }

  const SEARCH_PAGES = [
    { t: "HTML5 Masterclass", t_ar: "احتراف HTML5", t_fr: "Maîtrise HTML5", d: "Foundation of web development.", d_ar: "أساسيات تطوير الويب.", d_fr: "Fondations du web.", h: "html.html" },
    { t: "CSS3 Styling", t_ar: "تصميم CSS3", t_fr: "Styles CSS3", d: "Responsive design, Flexbox, Grid.", d_ar: "تصميم متجاوب، فليكس بوكس، وجريد.", d_fr: "Design responsive, Flexbox et Grid.", h: "css.html" },
    { t: "JavaScript Deep Dive", t_ar: "تعمق في JavaScript", t_fr: "JavaScript en profondeur", d: "Modern JS and async logic.", d_ar: "جافا سكريبت الحديثة والمنطق غير المتزامن.", d_fr: "JavaScript moderne et asynchrone.", h: "javascript.html" },
    { t: "TypeScript", t_ar: "تايب سكريبت", t_fr: "TypeScript", d: "Typed JavaScript for large apps.", d_ar: "جافا سكريبت بأنواع للدعم المؤسسي.", d_fr: "JavaScript typé pour les grandes apps.", h: "typescript.html" },
    { t: "React", t_ar: "ريآكت", t_fr: "React", d: "Component-based UI architecture.", d_ar: "هندسة المكونات المعاصرة.", d_fr: "Interfaces par composants.", h: "react.html" },
    { t: "Vue 3", t_ar: "فيو 3", t_fr: "Vue 3", d: "Composition API and reactive UI.", d_ar: "Composition API والواجهات التفاعلية.", d_fr: "Composition API et UI réactive.", h: "vue.html" },
    { t: "Next.js", t_ar: "نكست جي إس", t_fr: "Next.js", d: "App Router, server actions, SEO.", d_ar: "App Router ودوال السيرفر والسيو.", d_fr: "App Router, actions serveur et SEO.", h: "nextjs.html" },
    { t: "Tailwind CSS", t_ar: "تيلويند", t_fr: "Tailwind CSS", d: "Utility-first styling system.", d_ar: "نظام تصميم بالكلاسات الجاهزة.", d_fr: "Design utility-first.", h: "tailwind.html" },
    { t: "Python", t_ar: "بايثون", t_fr: "Python", d: "Automation, scripting, and data.", d_ar: "الأتمتة وعلوم البيانات.", d_fr: "Automatisation et data.", h: "python.html" },
    { t: "Node.js", t_ar: "نود جي إس", t_fr: "Node.js", d: "High-performance JavaScript backend.", d_ar: "خوادم عالية الأداء.", d_fr: "Backend JavaScript performant.", h: "nodejs.html" },
    { t: "PHP", t_ar: "بي إتش بي", t_fr: "PHP", d: "Server-side web programming.", d_ar: "برمجة السيرفرات.", d_fr: "Programmation côté serveur.", h: "php.html" },
    { t: "Java", t_ar: "جافا", t_fr: "Java", d: "OOP, collections, and modern Java.", d_ar: "البرمجة كائنية التوجه وجافا الحديثة.", d_fr: "POO, collections et Java moderne.", h: "java.html" },
    { t: "C# & .NET", t_ar: "C# و .NET", t_fr: "C# et .NET", d: "Enterprise logic and Unity.", d_ar: "برمجة الشركات ومحرك Unity.", d_fr: "Logique entreprise et Unity.", h: "csharp.html" },
    { t: "SQL Databases", t_ar: "قواعد بيانات SQL", t_fr: "Bases SQL", d: "Relational data and queries.", d_ar: "إدارة البيانات العلائقية.", d_fr: "Données relationnelles et requêtes.", h: "sql.html" },
    { t: "MongoDB", t_ar: "مونغو دي بي", t_fr: "MongoDB", d: "NoSQL documents, indexes, aggregation.", d_ar: "وثائق NoSQL والفهارس والتجميع.", d_fr: "Documents NoSQL, index et agrégation.", h: "mongodb.html" },
    { t: "Docker", t_ar: "دوكر", t_fr: "Docker", d: "Containers, Compose, production images.", d_ar: "الحاويات و Compose وصور الإنتاج.", d_fr: "Conteneurs, Compose et images prod.", h: "docker.html" },
    { t: "Linux", t_ar: "لينكس", t_fr: "Linux", d: "Terminal, permissions, and bash.", d_ar: "الطرفية والصلاحيات وباش.", d_fr: "Terminal, permissions et bash.", h: "linux.html" },
    { t: "Git", t_ar: "جيت", t_fr: "Git", d: "Version control and collaboration.", d_ar: "إدارة النسخ والتعاون.", d_fr: "Contrôle de version et collaboration.", h: "git.html" },
    { t: "Algorithms", t_ar: "الخوارزميات", t_fr: "Algorithmes", d: "Big-O, trees, and interview patterns.", d_ar: "التعقيد الزمني وهياكل البيانات.", d_fr: "Complexité, arbres et patterns.", h: "algorithms.html" },
    { t: "Cybersecurity", t_ar: "الأمن السيبراني", t_fr: "Cybersécurité", d: "OWASP, XSS, SQLi, and secure APIs.", d_ar: "OWASP وثغرات الويب وتأمين الـ API.", d_fr: "OWASP, XSS, SQLi et APIs sûres.", h: "cybersecurity.html" },
    { t: "Flutter", t_ar: "فلاتر", t_fr: "Flutter", d: "Multi-platform mobile apps.", d_ar: "تطبيقات الموبايل لكافة المنصات.", d_fr: "Apps mobiles multiplateformes.", h: "flutter.html" },
    { t: "Kotlin", t_ar: "كوتلن", t_fr: "Kotlin", d: "Null safety, coroutines, Compose.", d_ar: "الحماية من Null والكوروتين.", d_fr: "Null safety, coroutines et Compose.", h: "kotlin.html" },
    { t: "Freelancing", t_ar: "العمل الحر", t_fr: "Freelance", d: "Niche, portfolio, pricing, clients.", d_ar: "التخصص والمعرض والتسعير والعملاء.", d_fr: "Niche, portfolio, tarifs et clients.", h: "freelance.html" },
    { t: "SQL Playground", t_ar: "مختبر SQL", t_fr: "Playground SQL", d: "Practice queries in the browser.", d_ar: "تمرن على الاستعلامات في المتصفح.", d_fr: "Pratiquez SQL dans le navigateur.", h: "sql-playground.html" },
    { t: "CSS Unit Converter", t_ar: "محول وحدات CSS", t_fr: "Convertisseur d'unités CSS", d: "PX, REM, EM, VW conversion.", d_ar: "تحويل البكسل والريم وغيرها.", d_fr: "Conversion PX, REM, EM, VW.", h: "css-converter.html" },
    { t: "Palette Generator", t_ar: "مولد الألوان", t_fr: "Générateur de palettes", d: "Color scheme creator.", d_ar: "إنشاء مجموعات ألوان متناسقة.", d_fr: "Créateur de palettes.", h: "colors.html" },
    { t: "Code Playground", t_ar: "مختبر الكود", t_fr: "Bac à sable", d: "Live HTML/CSS/JS editor.", d_ar: "محرر مباشر للتجربة.", d_fr: "Éditeur HTML/CSS/JS en direct.", h: "playground.html" },
    { t: "Developer Skills Quiz", t_ar: "اختبارات المهارات", t_fr: "Quiz développeur", d: "Interactive skill assessments.", d_ar: "اختبارات تفاعلية لمهارات المبرمج.", d_fr: "Évaluations interactives.", h: "quiz.html" },
    { t: "Tools Dashboard", t_ar: "مركز الأدوات", t_fr: "Outils", d: "Developer utilities hub.", d_ar: "أدوات ومساعدات برمجية.", d_fr: "Hub d'utilitaires développeur.", h: "tools.html" },
    { t: "Cheatsheets", t_ar: "ملخصات الأكواد", t_fr: "Aide-mémoires", d: "Fast syntax reference.", d_ar: "ملخصات سريعة للأوامر والأكواد.", d_fr: "Référence syntaxe rapide.", h: "cheatsheets.html" },
    { t: "Code Formatter", t_ar: "منسق الأكواد", t_fr: "Formateur de code", d: "Beautify and minify JSON, HTML, CSS, JS.", d_ar: "تنسيق وضغط JSON و HTML و CSS و JS.", d_fr: "Embellir et minifier le code.", h: "formatter.html" },
    { t: "Typing Speed Test", t_ar: "اختبار سرعة الكتابة", t_fr: "Test de frappe", d: "Code typing WPM challenge.", d_ar: "تحدي سرعة كتابة الأكواد.", d_fr: "Défi de vitesse de frappe.", h: "typing-test.html" },
    { t: "Calculator", t_ar: "آلة حاسبة", t_fr: "Calculatrice", d: "Scientific and programmer calculator.", d_ar: "حاسبة علمية وبرمجية.", d_fr: "Calculatrice scientifique et dev.", h: "calculator.html" },
    { t: "Learner Profile", t_ar: "ملف المتعلم", t_fr: "Profil apprenant", d: "Track your learning profile.", d_ar: "تتبع ملفك التعلمي.", d_fr: "Suivi de votre profil d'apprentissage.", h: "profile.html" },
    { t: "Courses Catalog", t_ar: "فهرس الدروس", t_fr: "Catalogue des cours", d: "All programming tracks.", d_ar: "دليل جميع الدروس البرمجية.", d_fr: "Tous les parcours de programmation.", h: "dorous-albarmaja.html" },
    { t: "Coding Roadmap", t_ar: "خارطة طريق البرمجة", t_fr: "Feuille de route", d: "What to learn and in which order.", d_ar: "ماذا تتعلم وبأي ترتيب.", d_fr: "Quoi apprendre et dans quel ordre.", h: "coding.html" },
    { t: "Productivity", t_ar: "الإنتاجية", t_fr: "Productivité", d: "Focus and deep work for developers.", d_ar: "التركيز والعمل العميق للمبرمجين.", d_fr: "Focus et deep work.", h: "productivity.html" },
    { t: "Mental Health", t_ar: "الصحة النفسية", t_fr: "Santé mentale", d: "Well-being for developers.", d_ar: "الصحة النفسية للمبرمجين.", d_fr: "Bien-être des développeurs.", h: "mental_health.html" },
    { t: "Motivation", t_ar: "التحفيز", t_fr: "Motivation", d: "Mindset and consistency.", d_ar: "العقلية والاستمرارية.", d_fr: "Mentalité et constance.", h: "motivation.html" },
    { t: "Soft Skills", t_ar: "المهارات الناعمة", t_fr: "Soft skills", d: "Communication and teamwork.", d_ar: "التواصل والعمل الجماعي.", d_fr: "Communication et travail d'équipe.", h: "soft-skills.html" },
    { t: "Blog", t_ar: "المدونة", t_fr: "Blog", d: "Engineering articles and guides.", d_ar: "مقالات ونصائح تقنية.", d_fr: "Articles et guides d'ingénierie.", h: "blog.html" },
    { t: "System Design", t_ar: "تصميم الأنظمة", t_fr: "System design", d: "Scalable architecture fundamentals.", d_ar: "أساسيات هندسة الأنظمة القابلة للتوسع.", d_fr: "Fondamentaux d'architecture scalable.", h: "system-design.html" },
    { t: "OWASP Web Security", t_ar: "أمن الويب OWASP", t_fr: "Sécurité web OWASP", d: "Top 10 web risks and defenses.", d_ar: "أهم ثغرات الويب وطرق الوقاية.", d_fr: "Top 10 web et défenses.", h: "web-security-owasp.html" },
    { t: "API Security", t_ar: "تأمين الـ API", t_fr: "Sécurité des APIs", d: "Auth, rate limits, and API threats.", d_ar: "المصادقة وتحديد المعدل وتهديدات الـ API.", d_fr: "Auth, rate limiting et menaces API.", h: "api-security.html" },
    { t: "Caching Strategies", t_ar: "استراتيجيات الكاش", t_fr: "Stratégies de cache", d: "TTL, CDN, and cache stampedes.", d_ar: "مدة الكاش والـ CDN وتهافت الكاش.", d_fr: "TTL, CDN et stampedes.", h: "caching-strategies.html" },
    { t: "SQL Optimization", t_ar: "تحسين SQL", t_fr: "Optimisation SQL", d: "Indexes, plans, and query tuning.", d_ar: "الفهارس وخطط التنفيذ وتحسين الاستعلامات.", d_fr: "Index, plans et tuning.", h: "sql-optimization.html" },
    { t: "Kafka Event-Driven", t_ar: "كافكا والأحداث", t_fr: "Kafka event-driven", d: "Streams, topics, and consumers.", d_ar: "التدفقات والموضوعات والمستهلكون.", d_fr: "Streams, topics et consumers.", h: "kafka-event-driven.html" },
    { t: "Cloud Native DevOps", t_ar: "الحوسبة السحابية و DevOps", t_fr: "Cloud native DevOps", d: "Containers, orchestration, delivery.", d_ar: "الحاويات والتنسيق والتسليم.", d_fr: "Conteneurs, orchestration et delivery.", h: "cloud-native-devops.html" },
    { t: "CI/CD Automation", t_ar: "أتمتة CI/CD", t_fr: "Automatisation CI/CD", d: "Pipelines, tests, and releases.", d_ar: "الأنابيب والاختبارات والإصدارات.", d_fr: "Pipelines, tests et releases.", h: "cicd-automation.html" },
    { t: "AI Engineering", t_ar: "هندسة الذكاء الاصطناعي", t_fr: "Ingénierie IA", d: "LLM workflows for developers.", d_ar: "مسارات نماذج اللغة للمطورين.", d_fr: "Workflows LLM pour développeurs.", h: "ai-engineering.html" },
    { t: "GraphQL, REST & gRPC", t_ar: "GraphQL و REST و gRPC", t_fr: "GraphQL, REST et gRPC", d: "API styles compared.", d_ar: "مقارنة أنماط واجهات البرمجة.", d_fr: "Comparaison des styles d'API.", h: "graphql-rest-grpc.html" },
    { t: "Modern Frontend State", t_ar: "حالة الواجهة الحديثة", t_fr: "État frontend moderne", d: "Client state, servers, and caches.", d_ar: "حالة العميل والسيرفر والكاش.", d_fr: "État client, serveur et caches.", h: "modern-frontend-state.html" },
    { t: "Full-Stack Roadmap", t_ar: "مسار فول ستاك", t_fr: "Roadmap full-stack", d: "Path from frontend to production.", d_ar: "المسار من الواجهة إلى الإنتاج.", d_fr: "Du frontend à la production.", h: "fullstack-roadmap.html" },
    { t: "Remote Work", t_ar: "العمل عن بعد", t_fr: "Télétravail", d: "Async teamwork for developers.", d_ar: "العمل غير المتزامن للفرق البرمجية.", d_fr: "Travail asynchrone en équipe.", h: "remote-work.html" },
    { t: "Workshops", t_ar: "ورشات العمل", t_fr: "Ateliers", d: "Live coding workshops.", d_ar: "ورشات عمل مباشرة.", d_fr: "Ateliers de live coding.", h: "workshops.html" },
    { t: "About", t_ar: "من نحن", t_fr: "À propos", d: "Mission and the person behind Coding Life.", d_ar: "المهمة والقائم على المنصة.", d_fr: "Mission et créateur.", h: "about.html" },
    { t: "Contact", t_ar: "تواصل معنا", t_fr: "Contact", d: "Support and collaborations.", d_ar: "الدعم والتعاون المهني.", d_fr: "Support et collaborations.", h: "contact.html" },
    { t: "Privacy Policy", t_ar: "سياسة الخصوصية", t_fr: "Politique de confidentialité", d: "How we handle your data and cookies.", d_ar: "كيف نتعامل مع بياناتك وملفات الكوكيز.", d_fr: "Gestion de vos données et cookies.", h: "privacy.html" },
    { t: "Terms of Use", t_ar: "شروط الاستخدام", t_fr: "Conditions d'utilisation", d: "Rules and terms for using the platform.", d_ar: "القواعد وشروط استخدام المنصة.", d_fr: "Règles et conditions d'utilisation.", h: "terms.html" }
  ];

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
          ${isAdsAllowed() ? `
          <div class="ad-unit-container" id="clFooterAd" style="margin-top:24px;">
            <span class="ad-notice-badge">${t().cookies ? t().cookies.adNotice : 'Advertisement'}</span>
          </div>` : ''}
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
      mountAds();
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
      
      const filtered = SEARCH_PAGES.filter(p =>
        [p.t, p.t_ar, p.t_fr, p.d, p.d_ar, p.d_fr].filter(Boolean).join(" ").toLowerCase().includes(q)
      );

      const lang = currentLang;
      results.innerHTML = filtered.length > 0
        ? filtered.map(p => {
          const title = lang === "ar" ? (p.t_ar || p.t) : lang === "fr" ? (p.t_fr || p.t) : p.t;
          const desc = lang === "ar" ? (p.d_ar || p.d) : lang === "fr" ? (p.d_fr || p.d) : p.d;
          return `
            <a href="${p.h}" style="padding:16px; background:rgba(30,41,59,0.8); border-radius:8px; color:white; text-decoration:none; display:block; transition:0.2s; border:1px solid #1e293b; text-align:${lang === "ar" ? "right" : "left"};">
              <div style="font-weight:bold; color:#38bdf8; margin-bottom:4px;">${escapeHtml(title)}</div>
              <div style="font-size:0.85rem; color:#94a3b8;">${escapeHtml(desc)}</div>
            </a>
          `;
        }).join("")
        : `<div style="color:#94a3b8; text-align:center; padding:20px;">${t().search.noResults} "${escapeHtml(q)}"</div>`;
    });
  }

  function updateSearchPlaceholder() {
    const input = document.getElementById("searchInput");
    if (input) input.placeholder = t().search.placeholder;
  }

  // Toast Notification Engine - Single active toast, never stacks
  let clToastTimer = null;
  window.clToast = function (message, type = "info") {
    let container = document.getElementById("clToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "clToastContainer";
      container.className = "cl-toast-container";
      document.body.appendChild(container);
    }
    // Always clear existing toasts so they never stack
    if (clToastTimer) clearTimeout(clToastTimer);
    container.innerHTML = "";

    const icon = type === "success" ? "fa-circle-check" : "fa-circle-info";
    const toast = document.createElement("div");
    toast.className = `cl-toast cl-toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    clToastTimer = setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 2000);
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
        "logo": "https://codinglife1.vercel.app/logo-icon.png",
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
    return;
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
        refreshFooter();
        mountAds();
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
    return; // Disabled Mark as Completed
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

  window.CL_POLISH = {
    applyLang: applyLang,
    refreshPageContent: refreshPageContent,
    getCurrentLang: function() { return currentLang; }
  };

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
    mountAds();
    initCourseProgress();
    initDailyDevTip();

    // Register PWA Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); } else { boot(); }
})();
