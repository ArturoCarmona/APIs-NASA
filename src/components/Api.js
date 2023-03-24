const API_KEY = "g2ce5MMwazgQen7fufPPY8UWPsNW5nc1AgjAgZqc";
const RUTA = "https://api.nasa.gov/planetary/apod?api_key=";

export class Api {
  constructor() {
    this.API_KEY = API_KEY;
    this.RUTA = RUTA;
  }
}

const api = new Api();
export default api;
