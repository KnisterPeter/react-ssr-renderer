const React = require("react");
const ReactDOM = require("react-dom");

const App = () => React.createElement(React.Fragment, {}, "Hello World");

ReactDOM.render(React.createElement(App, {}), document.getElementById("app"));
