require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
  appId: '1231207',
  key: '9efa7b49d6328e5e9d4d',
  secret: 'fca43c24bd8451bfa82d',
  cluster: 'mt1',
  encrypted: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/vote', (req, res) => {
  const { body } = req;
  const { player } = body;

  pusher.trigger('vote-channel', 'vote', {
    player,
  });
  res.json({ player });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});