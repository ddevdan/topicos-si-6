const net = require('net');
const { sendMessage, receiveData, onEndConnection } = require("../utils");


const client = net.createConnection({ port: 8080 }, function () {
  console.log('Digite seu nome\n');

  sendMessage(client)

  receiveData(client)

  onEndConnection(client)
});

