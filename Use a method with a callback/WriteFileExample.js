const fs = require("fs");

const write = "HELLO ";

fs.writeFile("output.txt", write, (er) => {
  if (er) {
    console.error("Error", er);
  } else {
    console.log("Sucsses");
  }
});
