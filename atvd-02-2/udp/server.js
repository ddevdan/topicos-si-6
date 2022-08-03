const dgram = require('dgram')
const { sendUdpMessage, calcBroadcastUdpMessage, readLines } = require("../../utils");
const server = dgram.createSocket('udp4');

const users = {}

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});


const formatOperation = ({operationParams, userKey, users, msg}) => {
  const stringFromBufferMessage = `${msg}`.split(":")[1].trim()
  const numberFromMessage = Number(stringFromBufferMessage)
  const isZero = numberFromMessage === 0;
  const paramsCount = operationParams.length
  if (paramsCount === 3) users[userKey].operationParams = [];
  const receiveOperatorBeforeNumbers = paramsCount < 2 && (!isZero && !numberFromMessage);
  const receiveNumberAfterItsPosition = (paramsCount === 2 && (isZero || numberFromMessage))
  const unexpectedParam = (receiveOperatorBeforeNumbers|| receiveNumberAfterItsPosition);

  if (unexpectedParam) {
    users[userKey].operationParams = []
    return { shouldBroadcast: false, count: 0}
  } else {
    const param = (isZero || numberFromMessage) ? numberFromMessage : stringFromBufferMessage;

    users[userKey].operationParams.push(param)

    const shouldBroadcast = users[userKey].operationParams.length === 3
    return { shouldBroadcast, count: users[userKey].operationParams.length  }

  }

}
server.on('message', (msg, rinfo) => {
  const isNewConnection = !users.hasOwnProperty(rinfo.port);

  console.log(`${msg}`)
  if (isNewConnection) users[rinfo.port] = { rinfo, operationParams: [] /* [firstNumber, secondNumber, Operator] */}
  else {
    const { operationParams } = users[rinfo.port];
    const { shouldBroadcast, count } = formatOperation({operationParams, userKey: rinfo.port, users, msg});
    calcBroadcastUdpMessage({ users, rinfo, msg, server, shouldBroadcast, count, calculatingUser: rinfo.port})
    return
    }


  calcBroadcastUdpMessage({ users, rinfo, msg, server, count: 0 })


});


server.on('listening', (listener) => {

  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

sendUdpMessage(server, users)
server.bind(8080);