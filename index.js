const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');

const chat = require('./chat');

const app = express();
const PORT = process.env.PORT || 3000;

chat.init('./logs/chat.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:room?', (req, res) => {
  chat.load((err, data) => {
    if (err) {
      res.status(400).send({error: "idk something happened"});
    }
    let room = req.params.room || data.root;
    res.send(data.rooms[room]);
  });
});


app.post('/:room?', (req, res) => {
  chat.post({
    room: req.params.room, 
    username: req.body.username,
    message: req.body.message
  }, err => {
    if (err) {
      return res.send('ERROR:' + err);
    }
    
    res.send(req.body);
  });
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
