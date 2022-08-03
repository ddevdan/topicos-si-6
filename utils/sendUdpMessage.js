const readLines = require("./readLines")

const sendUdpMessage = (instance, users) => {
  let username;


  return readLines((line) => {
      let message
      if (username) message = Buffer.from(`${username}: ${line}`);
      else {
        username = line
        message = Buffer.from(`${username}, entrou!`);
      }

      if (users) {
        Object.values(users).forEach((user) => {
          const currentUserPort = user.port ?? user.rinfo.port
          instance.send(message, currentUserPort)
        })
        return
      }

      return instance.send(message)
    }
  )

};


module.exports = sendUdpMessage;
