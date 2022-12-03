/**
 * 建立连接
 * @param {*} userlist 
 * @param {*} socket 
 */
const startLink = (userlist, socket) => {
  userlist.push(socket.id);
  socket.on("msg", (arg) => {
    userlist
      .filter((i) => i != socket.id)
      .forEach((item) => {
        socket.to(item).emit("sendmsg", arg);
      });
  });
};
module.exports = {
  startLink,
};
