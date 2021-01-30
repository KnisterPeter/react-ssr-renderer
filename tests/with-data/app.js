const React = require("react");
const ReactDOM = require("react-dom");
const { QueryClient, QueryClientProvider, useQuery } = require("react-query");

const Example = () => {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, data.name),
    React.createElement("p", {}, data.description),
    React.createElement("strong", {}, "👀 ", data.subscribers_count, " "),
    React.createElement("strong", {}, "✨ ", data.stargazers_count, " "),
    React.createElement("strong", {}, "🍴 ", data.forks_count),
    React.createElement("div", {}, isFetching ? "Updating..." : "")
  );
};

const queryClient = new QueryClient();

const App = () => {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(Example, {})
  );
};

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(React.createElement(App, {}), app);
