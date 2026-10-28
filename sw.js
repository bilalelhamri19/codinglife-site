// Coding Life - Progressive Web App Service Worker (Complete Offline PWA)
const CACHE_NAME = 'codinglife-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './site-polish.css',
  './site-polish.js',
  './logo.png',
  './manifest.json',
  './404.html',
  // Interactive Tools & Hubs
  './tools.html',
  './calculator.html',
  './cheatsheets.html',
  './formatter.html',
  './typing-test.html',
  './sql-playground.html',
  './profile.html',
  './colors.html',
  './css-converter.html',
  './playground.html',
  './quiz.html',
  './workshops.html',
  // All Courses & Tutorials
  './dorous-albarmaja.html',
  './html.html',
  './css.html',
  './javascript.html',
  './python.html',
  './react.html',
  './nodejs.html',
  './php.html',
  './sql.html',
  './java.html',
  './csharp.html',
  './flutter.html',
  './vue.html',
  './nextjs.html',
  './tailwind.html',
  './typescript.html',
  './mongodb.html',
  './docker.html',
  './linux.html',
  './algorithms.html',
  './cybersecurity.html',
  './kotlin.html',
  './freelance.html',
  './git.html',
  './coding.html',
  // Community, Career & Soft Skills
  './blog.html',
  './productivity.html',
  './mental_health.html',
  './motivation.html',
  './soft-skills.html',
  './about.html',
  './contact.html',
  './privacy.html',
  './terms.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to cached index.html for page navigations when offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});
