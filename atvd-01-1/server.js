const net = require('net');
const { receiveData, onEndConnection, sendMessage } = require("../utils");


const server = net.createServer((socket) => {
  console.log('client connected, digite seu nome');

  sendMessage(socket)

  onEndConnection(socket)

  receiveData(socket)

  // pipe is used to forward the message to the user
  // socket.pipe(socket);
});

server.listen(8080, () => {
  console.log('server is listening');
});