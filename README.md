I am Dwaine Simmons. This project is for the Grow with Google Nanodegree. This is Project 7, which is make neighborhood map. I choose to make an map of breweries in the Raleigh area. This project uses Google Maps and Foursquare API for the creation of the map.

To run this app:

1.download or clone git
2.npm install into directory of your choice
3.cd into the directory of the Project
4.npm start 

https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once/7832086










### Offline-First Considerations

If you do decide to opt-in to service worker registration, please take the
following into account:

1. After the initial caching is done, the [service worker lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
controls when updated content ends up being shown to users. In order to guard against
[race conditions with lazy-loaded content](https://github.com/facebook/create-react-app/issues/3613#issuecomment-353467430),
the default behavior is to conservatively keep the updated service worker in the "[waiting](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#waiting)"
state. This means that users will end up seeing older content until they close (reloading is not
enough) their existing, open tabs. See [this blog post](https://jeffy.info/2018/10/10/sw-in-c-r-a.html)
for more details about this behavior.

1. Users aren't always familiar with offline-first web apps. It can be useful to
   [let the user know](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)
   when the service worker has finished populating your caches (showing a "This web
   app works offline!" message) and also let them know when the service worker has
   fetched the latest updates that will be available the next time they load the
   page (showing a "New content is available once existing tabs are closed." message). Showing
   this messages is currently left as an exercise to the developer, but as a
   starting point, you can make use of the logic included in [`src/serviceWorker.js`](src/serviceWorker.js), which
   demonstrates which service worker lifecycle events to listen for to detect each
   scenario, and which as a default, just logs appropriate messages to the
   JavaScript console.

1. Service workers [require HTTPS](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https),
   although to facilitate local testing, that policy
   [does not apply to `localhost`](http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385).
   If your production web server does not support HTTPS, then the service worker
   registration will fail, but the rest of your web app will remain functional.

1. The service worker is only enabled in the [production environment](#deployment),
   e.g. the output of `npm run build`. It's recommended that you do not enable an
   offline-first service worker in a development environment, as it can lead to
   frustration when previously cached assets are used and do not include the latest
   changes you've made locally.

1. If you _need_ to test your offline-first service worker locally, build
   the application (using `npm run build`) and run a simple http server from your
   build directory. After running the build script, `create-react-app` will give
   instructions for one way to test your production build locally and the [deployment instructions](#deployment) have
   instructions for using other methods. _Be sure to always use an
   incognito window to avoid complications with your browser cache._

1. By default, the generated service worker file will not intercept or cache any
   cross-origin traffic, like HTTP [API requests](#integrating-with-an-api-backend),
   images, or embeds loaded from a different domain.
