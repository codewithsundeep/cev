let assets = [
    ".",
    "./js/csv.js",
    "./js/excel.js",
    "./js/choosefile.js",
    "./js/pagination.js",
    "./style.css",
    "./sw.js",
    "./site.webmanifest",
    "./assets/csv.svg",
    "./assets/xlsx.svg",
    "./assets/favicon/android-chrome-192x192.png",
    "./assets/favicon/android-chrome-512x512.png",
    "./assets/favicon/favicon.ico",
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
]
self.addEventListener('install', (e) => {
    e.waitUntil(
        (async() => {
            let cache = await caches.open("static")
            await cache.addAll(assets)

        })()
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async() => {
            let req = await e.request;
            let r = await caches.match(req);
            if (r) { return r }
            let res = await fetch(req);
            let cache = await caches.open("static");
            let p = await cache.put(req, res.clone());
            return res;
        })()
    )
})