import {
  LitElement,
  html,
} from "https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module";
import api from "./Api.js";

export class Apod extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      inactive: { type: Boolean },
      date: { type: String },
      available: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.data = {};
    this.inactive = true;
    this.date = "";
    this.available = false;
  }

  getDataAPOD() {
    let URL = "";
    if (this.date === "") URL = api.RUTA + api.API_KEY;
    else {
      URL = api.RUTA + api.API_KEY + "&date=" + this.date;
    }
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          response.json().then((dataResponse) => {
            this.data = dataResponse;
            this.inactive = false;
            this.available = true;
            this.requestUpdate();
          });
        } else if (response.status === 400) {
          this.data = {
            title: "No available!",
            url: "",
            explanation: "Please try to other date",
          };
          this.available = false;
          this.inactive = false;
          this.requestUpdate();
        }
      })
      .catch((error) => console.log("error: ", error));

    /* fetch(URL)
      .then((response) => {response.json()})
      .then((dataResponse) => {
        
        this.data = dataResponse;
        this.inactive = false;
        this.available = true;
        this.requestUpdate();
      })
      .catch((error) => console.log("error: ", error)); */
  }

  doChange(e) {
    this.date = e.target.value;
    this.requestUpdate();
  }

  render() {
    return html`
      <style>
        .container {
          text-align: center;
          justify-content: center;
        }
        h1 {
          color: red;
        }
        h2 {
          color: blue;
        }
        h6 {
          color: black;
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
        /* === img API === */
        @media (max-width: 576px) {
          #img-active {
            width: 250px;
            height: 240px;
            box-shadow: 0px 0px 10px 1px black;
          }
        }
        @media (min-width: 577px) {
          #img-active {
            width: 500px;
            height: 400px;
            box-shadow: 0px 0px 10px 1px black;
          }
        }

        p {
          text-align: justify;
          padding-right: 15%;
          padding-left: 15%;
          font-family: sans-serif;
        }
      </style>
      <div class="container">
        <h1>Astronomy Picture of the Day</h1>
        <input type="date" id="date" @change="${this.doChange}" />
        <button @click=${this.getDataAPOD}>Search</button>
        ${this.inactive
          ? html` <div>
              <p>
                One of the most popular websites at NASA is the
                <strong>Astronomy Picture of the Day.</strong> In fact, this
                website is one of the most popular websites across all federal
                agencies. It has the popular appeal of a Justin Bieber video.
                This endpoint structures the APOD imagery and associated
                metadata so that it can be repurposed for other applications.
              </p>
              <img
                id="img-nasa"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png"
              />
            </div>`
          : this.available
          ? html` <div>
              <h2>${this.data.title}</h2>
              <img id="img-active" src="${this.data.url}" />
              <p>${this.data.explanation}</p>
              <h6>Credits by ${this.data.copyright}, ${this.data.date}</h6>
            </div>`
          : html`<h2>${this.data.title}</h2>
              <img
                id="img-active"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNedFeE1rT-OjsaJlULB1ZNjv3oiDQwKvCfEdTDcZYBoPYakpmDqIAw7D3zBSZFZDolA&usqp=CAU"
              />
              <h3>${this.data.explanation}</h3>`}
      </div>
    `;
  }
}
customElements.get("apod-component") ||
  customElements.define("apod-component", Apod);
