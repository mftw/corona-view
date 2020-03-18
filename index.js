const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const data = require("./data");

app.use(logger("dev"));
app.use(cors());
app.use(express.static("public"));

app.get("/api", (req, res) => {
  return res.json(data);
});

app.get("/delayed", (req, res) => {
  // return res.json(data);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res.json(data))
    }, 2000)
  })
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


const listener = app.listen(4000, () => {
  console.log("server @ http://localhost:" + listener.address().port)
});
