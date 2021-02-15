import React from "react";
import { render } from "react-dom";

const LazyMessage = React.lazy(async () => import("./chunk"));

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyMessage />
  </React.Suspense>
);

render(<App />, document.getElementById("app"));
