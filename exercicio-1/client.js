const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();
const users = {}
let count = 0;

client.connect(4000, "127.0.0.1", () => {


  client.on("data", (data) => {
    const body = JSON.parse(data.toString());

    const savedUser = users[body.name];
    if (savedUser) {
      return console.log(`${savedUser.name}: ${body.text}`);
    }
    users[body.name] = body;
    console.log(`${body.name} entrou`);
  });
  let name = "";
  rl.addListener("line", (line) => {

    if (!count) {
      name = line.toUpperCase();
      client.write(JSON.stringify({ text: line, name }));
      console.log("Digite sua mensagem");
      return count++

    }

    client.write(JSON.stringify({ text: line, name }));
  });
});
