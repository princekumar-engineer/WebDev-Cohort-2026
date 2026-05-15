const pollSocket = (io, socket) => {
  console.log(`Poll Socket Connected: ${socket.id}`);

  socket.on("join_poll_room", (pollId) => {
    socket.join(pollId);

    console.log(`Socket joined poll room: ${pollId}`);
  });

  socket.on("leave_poll_room", (pollId) => {
    socket.leave(pollId);

    console.log(`Socket left poll room: ${pollId}`);
  });
};

export default pollSocket;