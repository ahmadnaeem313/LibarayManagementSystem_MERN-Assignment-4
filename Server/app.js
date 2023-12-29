const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('./db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Pass the app instance to createServer
const io = socketIo(server);

mongoose();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ahmad HMS').status(200);
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('new_user_login', (data) => {
    console.log('ran 2nd');
    io.emit('new_user_login', { message: data.message });
  });
});

app.use('/api/books/', require('./routes/books'));

server.listen(port, () => {
  console.log(`App listening at the port http://localhost:${port}`);
});
