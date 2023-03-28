const API_KEY = "g2ce5MMwazgQen7fufPPY8UWPsNW5nc1AgjAgZqc";
const RUTA = "https://api.nasa.gov/planetary/apod?api_key=";
const RUTA_NEOWS =
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=";

export class Api {
  constructor() {
    this.API_KEY = API_KEY;
    this.RUTA = RUTA;
    this.RUTA_NEOWS = RUTA_NEOWS;
  }
}

const api = new Api();
export default api;
