const TYPE_YOUR_NAME = "Digite seu nome:"
const TYPE_MESSAGE = "Digite sua mensagem:"

const { io } = require("socket.io-client");
const client = io("ws://localhost:3000", {});
const readline = require("readline")

const users = {}

const sendMessage = (socketInstance) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return rl.addListener("line", (line) => {
    socketInstance.emit("message", line, (response) => {
      console.log(response);
    })
  })
}

const listenMessage = (socketInstance) => socketInstance.on("message", (arg, callback) => {
  const userId = socketInstance.id
  const name = users[userId]
  if (name) {
    console.log(`${name}: ${arg}`)
    return callback(TYPE_MESSAGE);
  }

  users[userId] = arg.toUpperCase()
  return callback(TYPE_MESSAGE)
});

client.on("connect", () => {
  console.log(TYPE_YOUR_NAME)

  listenMessage(client)

  sendMessage(client)

});