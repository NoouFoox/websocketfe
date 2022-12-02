const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cros = require("@koa/cors");
const app = new Koa();
app.use(cros);
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// 在线人数数组
let userlist = [];
io.on("connection", (socket) => {
  userlist.push(socket.id);
  // 链接
  socket.on("msg", (arg) => {
    userlist
      .filter((i) => i != socket.id)
      .forEach((item) => {
        socket.to(item).emit("sendmsg", arg);
      });
  });
  // 断开链接
  socket.on("disconnect", (res) => {
    userlist = userlist.filter((i) => i != socket.id);
  });
});
httpServer.listen(3001);
