import React from "react";
import ReactDOM from "react-dom";

const App = () => <>Hello World</>;

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(<App />, app);
