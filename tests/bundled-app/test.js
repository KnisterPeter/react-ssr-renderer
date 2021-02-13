const got = require("got");
const { JSDOM, ResourceLoader } = require("jsdom");
const webpack = require("webpack");
const DevServer = require("webpack-dev-server");

const { render } = require("../test-helper");

test("Render app which is downloading additional chunks", async () => {
  const port = 7654;
  const filename = "app.js";

  const compiler = webpack({
    mode: "development",
    stats: "none",
    target: "web",
    entry: require.resolve("./app.jsx"),
    output: {
      // require to define public path with webpack 5.
      // the default "auto" does not work, since we don't add the script to
      // the server rendered html as a script tag
      publicPath: "",
      filename,
      chunkFilename: "chunk.js",
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: "production",
      }),
    ],
  });

  const server = new DevServer(compiler, {
    writeToDisk: false,
    noInfo: true,
    injectClient: false,
  });

  try {
    server.listen(port);

    const response = await got(`http://localhost:${port}/${filename}`, {
      responseType: "text",
    });

    const {
      window: { document },
    } = await render({
      code: response.body,
      dom: new JSDOM(
        `<!DOCTYPE html>
        <html>
        <body>
          <div id="app"></div>
        </body>
        </html>
        `,
        {
          url: `http://localhost:${port}`,
          runScripts: "dangerously",
          resources: "usable",
        }
      ),
    });

    expect(document.querySelector("#app")).toHaveTextContent("Hello World");
  } finally {
    await new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  }
});
