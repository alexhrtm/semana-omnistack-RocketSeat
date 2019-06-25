const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Web socket
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Connecting mongo
mongoose.connect(
    "mongodb+srv://semana:semana@cluster0-4ajgz.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

// Web socket middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Cors
app.use(cors());

// Static files
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

// Routes
app.use(require("./routes"));

// Server
server.listen(3333, console.log("Servidor rodando"));
