const MESSAGES_MAP = {"0": "First param: ", "1": "Second param: ", "2": "OPERATOR: ", }
const CALL_OPERATOR_FUNCTION = {"/": (x,y) => y === 0 ? "can't divide by 0" : x/y, "*": (x,y) => x*y, "+": (x,y) => x+y,"-": (x,y) => x-y,}
const calculateResult = ([x, y, operator]) => CALL_OPERATOR_FUNCTION[operator] && CALL_OPERATOR_FUNCTION[operator](x, y)

const formatOperation = ({operationParams, userKey, users, msg}) => {
  const message = `${msg}`.split(":")[1]?.trim() || msg.trim()
  const numberFromMessage = Number(message)
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
    const param = (isZero || numberFromMessage) ? numberFromMessage : message;

    users[userKey].operationParams.push(param)

    const shouldBroadcast = users[userKey].operationParams.length === 3
    return { shouldBroadcast, count: users[userKey].operationParams.length  }

  }

}


const calcBroadcastMessage = (socketInstance, users) => {
  socketInstance.on('data', (data) => {
    console.log(data.toString())
    const msg = data.toString();
    const userKey = socketInstance.remotePort
    const operationParams = users[userKey].operationParams
    const { shouldBroadcast, count } = formatOperation({operationParams, userKey, users, msg})
    Object.values(users).forEach((user) => {
      const userSocket = user.socket;
      const isCurrentUserPort = userSocket.remotePort === socketInstance.remotePort

      if (shouldBroadcast) return userSocket.write(`RESULT: ${calculateResult(users[userSocket.remotePort].operationParams)}`) // should calculate here

      if (isCurrentUserPort) return userSocket.write(`${MESSAGES_MAP[String(count)]}`)
      else {
        userSocket.write(data)
      }
    })
  });
}

module.exports = calcBroadcastMessage