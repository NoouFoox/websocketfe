const Link = require("./link");
const Room = require("./room");

const main = (io) => {
  let userlist = [];
  const roomList = {};
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("getroom", roomList);
    // 建立连接
    Link.startLink(userlist, socket, roomList);
    // 增加房间
    Room.addRoom(socket, roomList, userlist);
    // 断开链接
    Link.leaveLink(socket, roomList, userlist);
  });
};
module.exports = {
  main,
};
