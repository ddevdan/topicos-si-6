const dgram = require('dgram')
const { sendUdpMessage, broadcastUdpMessage, readLines } = require("../utils");
const server = dgram.createSocket('udp4');

const users = {}

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});


server.on('message', (msg, rinfo) => {
  const isNewConnection = !users.hasOwnProperty(rinfo.port);
  if (isNewConnection) users[rinfo.port] = { rinfo, operation: [] /* [firstNumber, secondNumber, Operator] */ }
  debugger
  const message = msg
  console.log(`${message}`)
  broadcastUdpMessage({ users, rinfo, msg: message, server })

});


server.on('listening', (listener) => {

  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

sendUdpMessage(server, users)
server.bind(8080);