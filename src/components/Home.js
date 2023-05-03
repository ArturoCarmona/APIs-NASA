import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1>API´s NASA</h1>
      <div className="img">
        <img
          id="img-nasa"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png"
          alt="nasa-img"
        />
      </div>
      <div>
        <h3>A brief implementation of the APIs NASA</h3>
      </div>
      <div>
        <ul className="list-home">
          APIs available:
          <li>
            <a href="/APOD" id="item-list-home">
              🚀 Astronomy Picture of the Day 🚀{" "}
            </a>
          </li>
          <li>
            <a href="/NeoWs" id="item-list-home">
              🚀 Asteroids - NeoWs 🚀{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
