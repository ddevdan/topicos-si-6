const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const users = {};
let count = 0;

const handleConnection = (socket) => {
  socket.on("end", () => {
    console.log("alguem se desconectou");
  });

  rl.addListener("line", (line) => {

    if (!count) {
      name = line.toUpperCase();
      socket.write(JSON.stringify({ text: line, name }));
      console.log("Digite sua mensagem");
      return count++

    }

    console.log("Digite sua mensagem");
    socket.write(JSON.stringify({ text: line, name }));
  });
  socket.on("data", (data) => {
    const body = JSON.parse(data.toString());
    const savedUser = users[body.name];
    if (savedUser) {
      return console.log(`${savedUser.name}: ${body.text}`);
    }
    users[body.name] = body;
    console.log(`${body.name} entrou`);
  });
};
const server = net.createServer(handleConnection);

server.listen(4000, "127.0.0.1");
