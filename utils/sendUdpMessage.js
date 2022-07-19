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
          instance.send(message, user.port)
        })
        return
      }

      return instance.send(message)
    }
  )

};


module.exports = sendUdpMessage;
