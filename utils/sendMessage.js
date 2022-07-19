const readLines = require("./readLines")

const sendMessage = (socketInstance) => {
  let username;

  return readLines((line) => {
      let message
      if (username) message = `${username}: ${line}`;
      else username = message = line;
      socketInstance.write(message)
    }
  )

};


module.exports = sendMessage;
