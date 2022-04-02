# React SSR

### Todo List

- [x] 配置 webpack，正确编译 React 和 CSS
- [x] 同时构建 client 代码和 ssr 代码
- [x] 利用 nodemon 实现每次编译之后自动重启 server
- [x] 实现 react-router 同构
- [x] 使用 redux 管理全局状态，并在 server 运行时向 html 注入初始 state
- [x] 直接用 client 构建输出的 html 入口文件作为 server response 模板，不需要手动管理 js/css 等资源的引入
- [x] 为页面组件增加 ssrHook 静态异步方法，供 server 端执行时调用，用于异步数据请求并更新 store
- [ ] 页面组件动态加载