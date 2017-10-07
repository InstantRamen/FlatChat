const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const chatlog = './logs/chat.json';

app.get('/', (req, res) => {
  loadLog(chatlog, (data) => {
    res.send(data);
  });
});

app.get('/rooms/:room', (req, res) => {
  
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

const loadLog = (logfile = chatlog, callback) => {
  fs.readFile(chatlog, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    callback(JSON.parse(data));
  })
}

const postMessage = (user, message, callback) => {
  
}

const saveLog = (newLog, location = chatlog) => {
  
}