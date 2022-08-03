const dgram = require('dgram');
const { Buffer } = require("buffer")
const { sendUdpMessage } = require("../../utils");

const client = dgram.createSocket('udp4');


client.on('message', (msg, rinfo) => {
  console.log(`${msg}`);
});


client.connect(8080, () => {
  console.log("Digite seu nome!")
  sendUdpMessage(client)
})