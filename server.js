const express = require("express");
const path = require("path");
const fs = require("fs");
const { render, createStore, invokeSsrHooks } = require("./server/ssr");

const app = express();

app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.static(path.resolve(__dirname, "public")));

// 读取index.html文件
const template = fs.readFileSync(path.resolve(__dirname, "client/template.html"), {
  encoding: "utf-8",
});

app.get("*", async (req, res, next) => {

  const store = createStore();

  await invokeSsrHooks(req, store.dispatch);

  const { content, context } = render(req.url, {}, store);
  // console.log(context, content);

  const state = `<script>window['INITIAL_STATE']=${JSON.stringify(
    store.getState()
  )};</script>`;

  // 用渲染内容替换占位字符
  const document = template
    .replace(`<div id="app"></div>`, `<div id="app">${content}</div>`)
    .replace(`<script id="state"></script>`, state);

  next(document);
});

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(500).send(err.message);
  }
  res.send(err);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
