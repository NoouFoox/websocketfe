/**
 * 房间
 * @param {*} socket
 */
const addRoom = (socket, roomList, userlist) => {
  socket.on("getRoomList", (d) => {
    if (roomList[d] == undefined) {
      roomList[d] = [socket.id];
    } else {
      if (!roomList[d].includes(socket.id)) {
        roomList[d].push(socket.id);
      }
    }
    console.log(roomList);
    socket.emit("getroom", roomList);
    userlist.forEach((i) => socket.to(i).emit("getroom", roomList));
  });
  socket.on("uproomliet", () => {
    socket.emit("getroom", roomList);
  });
};
module.exports = {
  addRoom,
};
