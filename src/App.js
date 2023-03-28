import "./App.css";
import "./components/APOD.js";
import "./components/NeoWs.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/APOD"
            element={<apod-component></apod-component>}
          ></Route>
          <Route
            path="/NeoWs"
            element={<neows-component></neows-component>}
          ></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
