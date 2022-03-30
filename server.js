const express = require("express");
const path = require("path");
const fs = require("fs");
const { render } = require("./server/ssr");

const app = express();

app.use(express.static(path.resolve(__dirname, "client")));

// 读取index.html文件
const template = fs.readFileSync(path.resolve(__dirname,'client/index.html'), {encoding:'utf-8'});

app.get("*", (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(404).end();
    return;
    // return next(new Error(404));
  }
  const context = {};
  const htmlString = render(req.url, context);
  // console.log(context);

  // 用渲染内容替换占位字符
  res.send(template.replace("<!-- placeholder -->", htmlString));
});

app.listen(3000);
