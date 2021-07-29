const app = require("express")();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("msg", (msg) => {
    console.log(msg);
    socket.broadcast.emit("msg", "I am connected " + socket.id);
  });
});

http.listen(3000, function () {
  console.log("listening on port 3000");
});
