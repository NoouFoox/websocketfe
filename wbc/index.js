const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cros = require("@koa/cors");
const { main } = require("./src/main.js");
const app = new Koa();
app.use(cros);
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// 主程序
main(io);
httpServer.listen(3001);
