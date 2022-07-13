const TYPE_YOUR_NAME = "Digite seu nome:"
const TYPE_MESSAGE = "Digite sua mensagem:"

const { Server } = require("socket.io");
const readline = require("readline");

const server = new Server(3000);
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
  const newUserName = arg.toUpperCase()
  users[userId] = newUserName
  console.log(`${newUserName} entrou`)
  return callback(TYPE_MESSAGE)
});


server.on("connection", (socket) => {
  console.log(TYPE_YOUR_NAME)
  sendMessage(socket)
  listenMessage(socket)
});

