require("@testing-library/jest-dom/extend-expect");
const { ResourceLoader } = require("jsdom");
const { createFsFromVolume, Volume } = require("memfs");
const webpack = require("webpack");

async function runWebpack(entry) {
  const compiler = webpack({
    mode: "development",
    stats: "none",
    target: "web",
    entry,
    output: {
      // require to define public path with webpack 5.
      // the default "auto" does not work, since we don't add the script to
      // the server rendered html as a script tag
      publicPath: "",
      path: "/",
      filename: "app.js",
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
  const fs = createFsFromVolume(new Volume());

  await new Promise((resolve, reject) => {
    compiler.outputFileSystem = fs;
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      resolve(stats);
    });
  });

  return fs;
}

class TestResourceLoader extends ResourceLoader {
  constructor(host, fs) {
    super();

    this.host = host;
    this.fs = fs;
  }

  async fetch(url) {
    if (url.startsWith(this.host)) {
      return Buffer.from(this.fs.readFileSync(url.substr(this.host.length)));
    }
    throw new Error(`Unexpected request to '${url}`);
  }
}

/**
 * @param {import('memfs').IFs} fs
 * @param {string} host
 */
function resourceLoader(fs, host) {
  /**
   * @param {string} url
   */
  const fn = async (url) => {
    if (url.startsWith(host)) {
      return fs.readFileSync(url.substr(host.length));
    }
    throw new Error(`Unexpected request to '${url}`);
  };
  return fn;
}

module.exports = {
  runWebpack,
  TestResourceLoader,
  resourceLoader,
};
