const analyticsSocket = (io, socket) => {
  socket.on("analytics_update", (data) => {
    io.to(data.pollId).emit("receive_analytics_update", data);

    console.log("Analytics Updated");
  });
};

export default analyticsSocket;