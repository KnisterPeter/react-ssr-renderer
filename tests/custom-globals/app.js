const React = require("react");
const ReactDOM = require("react-dom");

const App = () => React.createElement(React.Fragment, {}, message);

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(React.createElement(App, {}), app);
