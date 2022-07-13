const TYPE_MESSAGE = "Digite sua mensagem:"

const { Server } = require("socket.io");

const server = new Server(3000);
const users = {}


const listenMessage = (socketInstance) => socketInstance.on("message", (arg, callback) => {
  const userId = socketInstance.id
  const name = users[userId]
  if (name) {
    console.log(`${name}: ${arg}`)
    socketInstance.broadcast.emit("broadcastMessage", `${name}: ${arg}`);

    return callback(TYPE_MESSAGE);
  }
  const newUserName = arg.toUpperCase()
  users[userId] = newUserName
  console.log(`${newUserName} entrou`)
  socketInstance.broadcast.emit("broadcastMessage", `${newUserName} entrou`);
  return callback(TYPE_MESSAGE)
});


server.on("connection", (socket) => {

  listenMessage(socket)
});

