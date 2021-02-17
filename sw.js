const nombreCache = "apv-v54";
const archivos = [
  "/",
  "/index.html",
  "/css/bootstrap.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/apv.js",
  "/manifest.json",
  "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js",
];
self.addEventListener("install", (e) => {
  //   console.log("Instalado correctamente");
  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      //   console.log("cacheando");
      cache.addAll(archivos);
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (e) => {
  //   console.log("Activado correctamente");
  e.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== nombreCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // console.log(e.request.url);
  // console.log(e.request.url.includes);

  if (e.request.url.includes("/todos")) {
    // response to API requests, Cache Update Refresh strategy

    // e.respondWith(caches.match(e.request));
    // // console.log(e.respondWith(caches.match(e.request)));
    // fetch(e.request.url)
    //   .then((res) => {
    //     caches.open(nombreCache).then(function (cache) {
    //       cache.put(e.request, res.clone());
    //     });
    //   })
    //   .then(() => {
    //     response;
    //   });

    // e.waitUntil(update(e.request).then(refresh));

    e.respondWith(
      caches.open(nombreCache).then(function (cache) {
        return cache.match(e.request).then(function (response) {
          return (
            response ||
            fetch(e.request).then(function (response) {
              console.log(response);
              cache.put(e.request, response.clone());
              return response;
            })
          );
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((respuestaCache) => {
        return respuestaCache;
      })
    );
  }
});
