const net = require('net');
const { onEndConnection, broadcastMessage, calcBroadcastMessage } = require("../../utils");

const users = {}

const server = net.createServer((socket) => {
  console.log('Um usuário se conectou');

  const isNewConnection = !users.hasOwnProperty(socket.remotePort);

  if (isNewConnection) users[socket.remotePort] = { socket,  operationParams: []}


  onEndConnection(socket)

  calcBroadcastMessage(socket, users)

});


server.listen(8080, () => {
  console.log('server is listening');
});