const fs = require('fs');
const _ = require('lodash');

let chatlog = './logs/chat.json';

const init = (logfile = chatlog) => {
  chatlog = logfile;
}

const load = (callback) => {
  fs.readFile(chatlog, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
};

const post = (message = {room: "main", username: "anon", message: "no message"}, callback) => {
  load((err, data) => {
    if(err) {
      return callback(err);
    }
    let room = message.room || data.root;
    data.rooms[room].log.push({"message": message.message, username: message.username});
    save(data, callback);
  });
};

const save = (newLog, callback) => {
  console.log(`saving log as ${JSON.stringify(newLog, null, 2)}`);

  let chatJson = JSON.stringify(newLog, null, 2);
  fs.writeFile(chatlog, chatJson, (err) => {
    if (err) {
      callback(err);
    }
    console.log('saved!');
    callback(null);
  });
};

module.exports = {init, post, load}