import React, { useEffect } from "react";
import About from "./About";
import Loading from "./components/Loading";
import Home from "./Home";

import "./style.scss";

function App() {
  useEffect(() => {
    Loading.toggle(true);

    setTimeout(() => {
      Loading.toggle(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Home />
      <About />
    </div>
  );
}

export default App;
