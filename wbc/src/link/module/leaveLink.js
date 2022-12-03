/**
 * 断开连接
 * @param {*} socket
 * @param {*} roomList
 * @param {*} userlist
 */
const leaveLink = (socket, roomList, userlist) => {
  socket.on("disconnect", (res) => {
    
    
    
    
    
    
    userlist = userlist.filter((i) => i != socket.id);




    Object.keys(roomList).forEach((id) => {
      roomList[id] = roomList[id].filter((i) => i != socket.id);
      if (roomList[id].length === 0) {
        delete roomList[id];
      }
    });
    console.log(roomList);
    userlist.forEach(i=>socket.to(i).emit("getroom", roomList))
  });
};

module.exports = {
  leaveLink,
};
