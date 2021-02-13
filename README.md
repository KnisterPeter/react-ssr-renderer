# react-ssr-renderer

This project aims to do a server side rendering of a react application.

The difference to [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) is the usage of [jsdom](https://github.com/jsdom/jsdom) to do a full render including data-fetching and other asynchronous operations without special apis.

## How it works

The crucial part of the rendering is to decide when we are ready to send the html to the client.

This is done by rendering a node.js `vm` environment with a few wrapped global variables like `Promises`.
We do track all asynchronous work and when nothing is left to do, we return the current rendered state.
