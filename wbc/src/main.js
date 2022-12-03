// 连接模块
const Link = require("./link");
// 房间模块
const Room = require("./room");
const main = (io) => {
  let userlist = [];
  const roomList = {};
  io.on("connection", (socket) => {
    // 建立连接
    Link.startLink(userlist, socket);
    // 增加房间
    Room.addRoom(socket, roomList);
    // 断开链接
    Link.leaveLink(socket, roomList, userlist);
  });
};
module.exports = {
  main,
};
