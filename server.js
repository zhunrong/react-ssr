const express = require("express");
const path = require("path");
const { render } = require("./server/ssr");

const app = express();

app.use(express.static(path.resolve(__dirname, "client")));

app.get("/", (req, res, next) => {
  const html = render();
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/client.js"></script>
    </body>
  </html>
  `);
});

app.listen(3000);
