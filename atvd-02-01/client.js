const dgram = require('dgram');
const { Buffer } = require("buffer")
const { sendUdpMessage } = require("../utils");

const client = dgram.createSocket('udp4');


client.on('message', (msg, rinfo) => {
  console.log(`${msg}`);
  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});


client.connect(8080, () => {

  sendUdpMessage(client)
})