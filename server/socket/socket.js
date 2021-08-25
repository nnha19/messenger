const socketIO = require("socket.io");

const socketSetUp = (server) => {
  return socketIO(server, {
    cors: {
      origin: "*",
    },
  });
};

module.exports = socketSetUp;
