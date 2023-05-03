import { LitElement, html } from "lit-element";
import api from "./Api.js";

export class NeoWs extends LitElement {
  static get properties() {
    return {
      _data: { type: Array },
      asteroid: { type: Array },
      active: { type: Boolean },
      date_ini: { type: String },
      date_fin: { type: String },
      error_date: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._data = [];
    this.asteroid = [];
    this.active = false;
    this.error_date = false;
    this.date_ini = "";
    this.date_fin = "";
  }

  getDataNeoWs() {
    let URL = "";
    if (this.date === "") URL = api.RUTA_NEOWS + api.API_KEY;
    else {
      URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.date_ini}&end_date=${this.date_fin}&api_key=${api.API_KEY}`;
    }
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          response.json().then((dataResponse) => {
            this._data = dataResponse.near_earth_objects;
            this.active = true;
            this.requestUpdate();
            this.getAsteroid(this._data);
          });
        } else if (response.status === 400) {
          console.log("Error 400");
          this.error_date = true;
          this.requestUpdate();
        }
      })
      .catch((error) => console.log("error: ", error));
  }

  getAsteroid(data) {
    Object.entries(data).forEach(([key, value]) => {
      value.forEach((item) => {
        this.asteroid.push(item);
      });
    });
    this.requestUpdate();
  }

  doChangeIni(e) {
    this.date_ini = e.target.value;
    this.requestUpdate();
  }
  doChangeFin(e) {
    this.date_fin = e.target.value;
    this.requestUpdate();
  }

  newSearch() {
    this.active = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <style>
        .container {
          text-align: center;
          justify-content: center;
          padding-bottom: 100px;
          min-height: calc(100%-80px);
        }
        @media (max-width: 667px) {
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            margin-left: 1%;
            margin-right: 1%;
            margin-top: 20px;
            margin-bottom: 20px;
          }
        }
        @media (min-width: 668px) {
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            margin-left: 15%;
            margin-right: 15%;
            margin-top: 20px;
            margin-bottom: 20px;
          }
        }
        td,
        th {
          border: 1px solid black;
          text-align: center;
          padding: 8px;
        }
        th {
          background-color: black;
          color: white;
        }
        tr:nth-child(even) {
          background-color: gray;
        }
        @media (max-width: 576px) {
          #img-nasa {
            width: 100px;
            height: 90px;
          }
        }
        @media (min-width: 577px) {
          #img-nasa {
            width: 500px;
            height: 400px;
          }
        }
        h1 {
          color: red;
        }
        h2 {
          color: blue;
        }
        p {
          text-align: justify;
          padding-right: 15%;
          padding-left: 15%;
          font-family: sans-serif;
        }
        .btn {
          font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
          border-radius: 6px;
          padding: 6px 14px;
          border: none;
          color: #fff;
          background: linear-gradient(180deg, #4b91f7 0%, #367af6 100%);
          background-origin: border-box;
        }
        .div-date,
        .div-btn {
          margin: 10px;
        }
      </style>
      <div class="container">
        <h1>Asteroids - NeoWs</h1>
        ${this.error_date
          ? html`<div>
              <h1>Error date</h1>
              <img
                id="img-active"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNedFeE1rT-OjsaJlULB1ZNjv3oiDQwKvCfEdTDcZYBoPYakpmDqIAw7D3zBSZFZDolA&usqp=CAU"
              />
              <h2>Search range no longer than 7 days</h2>
              <p>Example: 01-01-2000 to 07-01-2000</p>
            </div>`
          : this.active
          ? html`
              <div>
                <div class="div-btn">
                  <button class="btn" @click=${this.newSearch}>
                    New search
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Estimated Diameter Max [km]</th>
                      <th>Potentially Hazardous</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.asteroid.map((item) => {
                      return html`
                        <tr>
                          <td>${item.id}</td>
                          <td>${item.name}</td>
                          <td>
                            ${item.close_approach_data[0].close_approach_date}
                          </td>
                          <td>
                            ${item.estimated_diameter.kilometers
                              .estimated_diameter_max}
                            [Km]
                          </td>
                          <td>${item.is_potentially_hazardous_asteroid}</td>
                        </tr>
                      `;
                    })}
                  </tbody>
                </table>
              </div>
            `
          : html`<div>
              <p>
                NeoWs (Near Earth Object Web Service) is a RESTful web service
                for near earth Asteroid information. With NeoWs a user can:
                search for Asteroids based on their closest approach date to
                Earth, lookup a specific Asteroid with its NASA JPL small body
                id, as well as browse the overall data-set.
              </p>
              <img
                id="img-nasa"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png"
              />
              <div>
                <h6>Choose a range no longer than 7 days</h6>
              </div>
              <div class="div-date">
                <label>Start</label>
                <input
                  type="date"
                  id="date_ini"
                  @change="${this.doChangeIni}"
                />
              </div>
              <div class="div-date">
                <label>Finish</label>
                <input
                  type="date"
                  id="date_fin"
                  @change="${this.doChangeFin}"
                />
              </div>
              <div class="div-btn">
                <button class="btn" @click=${this.getDataNeoWs}>Search</button>
              </div>
            </div>`}
      </div>
    `;
  }
}

customElements.define("neows-component", NeoWs);
