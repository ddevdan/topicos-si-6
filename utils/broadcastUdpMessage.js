const broadcastUdpMessage = ({ users, server, msg, rinfo }) => {
  Object.values(users).forEach((udpUser) => {
    if (udpUser.port !== rinfo.port) {
      server.send(msg, udpUser.port)
    }
  });
}

module.exports = broadcastUdpMessage