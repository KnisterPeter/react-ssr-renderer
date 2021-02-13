import React from "react";
import ReactDOM from "react-dom";

// note: message is global here
const App = () => <>{message}</>;

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(<App />, app);
