const readline = require("readline")


const readLines = (cb) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl.addListener("line", (line) => {
    cb(line)
  })
}

module.exports = readLines;
