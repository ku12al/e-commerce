const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const io = socketIO(server);
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
  console.log(`User ${userId} connected with socket ID: ${socketId}`);
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  } else {
    // Update socket ID if the user already exists
    users = users.map((user) =>
      user.userId === userId ? { userId, socketId } : user
    );
  }
};

const removeUser = (socketId) => {
  console.log(`Removing user with socket ID: ${socketId}`);
  users = users.filter((user) => user.socketId !== socketId);
};


const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  //when connect

  console.log(`a user is connected`);

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
  
    const message = createMessage({ senderId, receiverId, text, images });
  
    const user = getUser(receiverId);
  
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }
  
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    } else {
      console.log(`User ${receiverId} not found online`);
    }
  });
  
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    console.log(`Message seen event received for ${messageId}`);
  
    if (!messages[senderId]) return;
  
    const message = messages[senderId].find(
      (msg) => msg.receiverId === receiverId && msg.id === messageId
    );
  
    if (message) {
      message.seen = true;
  
      const user = getUser(senderId);
      if (user) {
        io.to(user.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  
  //update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  //when disconnected
  socket.on("disconnect", () => {
    console.log(`a user disconnected!`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});

