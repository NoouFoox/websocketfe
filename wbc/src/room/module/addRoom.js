/**
 * 增加房间
 * @param {*} socket
 */
 const addRoom = (socket, roomList) => {
  socket.on("getRoomList", (d) => {
    if (roomList[d] == undefined) {
      roomList[d] = [socket.id];
    } else {
      if (!roomList[d].includes(socket.id)) {
        roomList[d].push(socket.id);
      }
    }
    console.log(roomList);
  });
};
module.exports = {
  addRoom,
};
