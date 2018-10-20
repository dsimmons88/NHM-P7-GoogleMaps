
export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyBl4QyHMxlZar0aVUVaJmEbqYV8TioCQLM';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}


export function load_places() {
  /*let urlPrams{
     near: "Raleigh,NC"
     query: "Brewery"
     limit: "20"
     radius: "10000"

  }

  // where you will put the parameter for the api
  static urlCreator(urlPrams) {
    if(!urlPrams) {
      return "";
    }
    return Object.keys(urlPrams)
    .map(key => `${key}=${urlPrams[key]}`)
    .join('&');
  }
  */
  let apiURL = "https://api.foursquare.com/v2/venues/search?ll=35.780400,-78.639100&intent=browse&radius=10000&query=brewery&client_id=MJ5O3Y24ZSBNLGHJKUDKCYKXYCBGLZZKRZHEYXGHLRS1BNC3&client_secret=T3EHZUG0FSQZP2555JAOZBXLXEQC43544OUMILBH41051KBO&v=20181007";
return fetch(apiURL).then(resp => resp.json());
}
