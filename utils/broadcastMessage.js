const broadcastMessages = (socketInstance, users) => {
  socketInstance.on('data', (data) => {
    console.log(data.toString())
    Object.values(users).forEach((userSocket) => {
      if (userSocket.remotePort !== socketInstance.remotePort) {
        userSocket.write(data)
      }
    })
  });
}

module.exports = broadcastMessages