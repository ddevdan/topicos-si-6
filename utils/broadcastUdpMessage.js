const broadcastUdpMessage = ({ users, server, msg, rinfo }) => {
  Object.values(users).forEach((udpUser) => {
    // thank you olga :D
    const currentUserPort = udpUser.port ?? udpUser.rinfo.port
    const isNotCurrentUser = currentUserPort !== rinfo.port
    if (isNotCurrentUser) {
      return server.send(msg, currentUserPort)
    }
  });
}

module.exports = broadcastUdpMessage