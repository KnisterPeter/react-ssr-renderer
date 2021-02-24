import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/knisterpeter/react-ssr-renderer")
      .then(() => setState(1))
      .catch(() => setState(2));
  }, []);

  return <p>{state}</p>;
};

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(<App />, app);
