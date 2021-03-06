const CACHE_NAME = "site-static-v3.2";
let staticAssets = [
  "/",
  "/styles.css",
  "/1.styles.css",
  "/main.js",
  "/vendors~main.js",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246223/FootballStats/Icons/juggle-72x72_vcok59.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246223/FootballStats/Icons/juggle-96x96_ueyfhp.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-128x128_qvntqj.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-144x144_dwpb3x.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-152x152_j1c8rz.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-192x192_jbowkw.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/premierleague.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/laliga.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/seriea.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/bundesliga.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/ligueun.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243801/FootballStats/background_egtbrw.webp",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243890/FootballStats/background_mobile_hlw9ao.webp",
];

// handle "caching" here
self.addEventListener("install", (event) => {
  console.log("installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(staticAssets))
  );
  self.skipWaiting(); // makes the new service-worker take effect immediately
});

self.addEventListener("activate", (event) => {
  console.log("is activated");
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME, "api");

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { host, href, pathname } = new URL(request.url);
  const fetchAndCache = [/:\/\/crests/, /fonts.(googleapis|gstatic)/];

  return event.respondWith(
    caches
      .match(request)
      .then(function (response) {
        if (response) {
          console.log("returning from cache ", pathname);
          return response;
        }
        if (fetchAndCache.some((regex) => regex.test(href))) {
          console.log("about to fetch and cache");
          return caches
            .open("api")
            .then((cache) => {
              return fetch(request)
                .then((response) => {
                  console.log("fetching and caching " + href);
                  cache.put(request, response.clone());
                  return response;
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }

        console.log("actually fetching... " + href);
        return fetch(request);
      })
      .catch((err) => console.log(err))
  );
});
