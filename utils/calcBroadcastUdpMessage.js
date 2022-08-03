const MESSAGES_MAP = {"0": "First param: ", "1": "Second param: ", "2": "OPERATOR: ", }
const CALL_OPERATOR_FUNCTION = {"/": (x,y) => y === 0 ? "can't divide by 0" : x/y, "*": (x,y) => x*y, "+": (x,y) => x+y,"-": (x,y) => x-y,}
const calculateResult = ([x, y, operator]) => CALL_OPERATOR_FUNCTION[operator](x, y)

const calcBroadcastUdpMessage = ({ users, server, msg, rinfo, shouldBroadcast, count, calculatingUser }) => {
  Object.values(users).forEach((udpUser) => {
    // thank you olga :D
    const currentUserPort = udpUser.port ?? udpUser.rinfo.port
    if (shouldBroadcast) return server.send(`RESULT: ${calculateResult(users[calculatingUser].operationParams)}`, currentUserPort) // should calculate here

    const isCurrentUser = currentUserPort === rinfo.port
    if (isCurrentUser) return server.send(`${MESSAGES_MAP[String(count)]}`, currentUserPort)
    if (!isCurrentUser) {
      return server.send(msg, currentUserPort)
    }
  });
}

module.exports = calcBroadcastUdpMessage