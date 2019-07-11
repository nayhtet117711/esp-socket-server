const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");

const tempdata = { data: 0 };

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("<h1>Hello Smart World</h1>");
});

app.post("/socket-temp", (req, res) => {
  res.json(tempdata)
})

app.post("/socket-light", (req, res) => {
  const body = req.body;
  io.emit("GIVE_ME_DATA", body);
  res.json("ok")
})

// event = name_userid_deviceid_
io.on("connection", socket => {
  console.log("Client-connected.")
  socket.on("disconnect", () => {
    console.log("Client-disconnected.")
  });
  socket.emit("GIVE_ME_DATA", "Hello ESP8226");

  socket.on("HERE_IS_DATA", data => {
    // console.log(data)
    tempdata.data = data
  })

});

http.listen(3333, () => {
  console.log("Server listening on *:3000");
});
