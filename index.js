const client = require('discord-rich-presence')('<YOUR ID HERE>');
const express = require('express');
var song = 'Waiting for music...';
var artist = 'No Artist';
const app = express();
var tempTime = '0:00';

console.log('Starting YouTubeMusicDiscordRichPresence...')
update(song,artist);

app.use(express.json());
app.post("/", (request, response) => {
  let content = request.body;
  if(content.song == undefined || content.song == null || tempTime == content.timeMax.replace(' ', '') || content.timeMax.replace(' ', '') == '0:00') {
    response.sendStatus(200);
    return;
  }
  
  if(song == content.song) {
    response.sendStatus(200);
    return;
  }
  tempTime = content.timeMax.replace(' ', '');
  song = content.song

  console.log('Playing now ' + content.song + ' by ' + content.artist + ' Time: ' + content.timeMax.replace(' ', ''));
  update(content.song, content.artist,Date.now(), timeToMilli(content.timeMax.replace(' ', '')));
  response.sendStatus(200);
});

app.listen(3000, () => console.log('Ready Senpai!'));

function update(song,artist,timeNow,timeMax) {
  client.updatePresence({
    state: artist,
    details: song,
    startTimestamp: timeNow,
    endTimestamp: timeMax,
    largeImageKey: 'ytmusic',
    smallImageKey: 'play',
    instance: true,
  });
}

function timeToMilli(time) {
  var temp = Date.now();
  if(time.split(':').length == 2) {
    temp += Math.round(parseFloat(time.split(':')[0]) * 60000);
    temp += Math.round(parseFloat(time.split(':')[1]) * 1000);
  } else if (time.split(':').length == 3) {
    temp += Math.round(parseFloat(time.split(':')[0]) * 3600000);
    temp += Math.round(parseFloat(time.split(':')[1]) * 60000);
    temp += Math.round(parseFloat(time.split(':')[2]) * 1000);
  }
  return temp;
}