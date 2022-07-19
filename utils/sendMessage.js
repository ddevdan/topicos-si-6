const readline = require("readline")

const sendMessage = (socketInstance) => {
  let username;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl.addListener("line", (line) => {
    let message
    if (username) message = `${username}: ${line}`;
    else username = message = line;
    socketInstance.write(message)
  });
};


module.exports = sendMessage;
