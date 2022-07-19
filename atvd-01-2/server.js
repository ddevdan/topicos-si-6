const net = require('net');
const { onEndConnection, broadcastMessage } = require("../utils");

const users = {}

const server = net.createServer((socket) => {
  console.log('Um usuário se conectou');

  const isNewConnection = !users.hasOwnProperty(socket.remotePort);

  if (isNewConnection) users[socket.remotePort] = socket

  onEndConnection(socket)

  broadcastMessage(socket, users)

});


server.listen(8080, () => {
  console.log('server is listening');
});