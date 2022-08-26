import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

//logged user info
let loggedUser = {
  username: 'username',
  avatar: 'avatar',
};

const tweetBank = [];

//sends tweet feed for requested user
server.get('/tweets', (req, res) => {
  let start = 0;
  let end = tweetBank.length;
  if (end >= 10) {
    start = end - 10;
  }
  res.send(tweetBank.slice(start, end).reverse());
});

//Logs user
server.post('/sign-up', (req, res) => {
  loggedUser = {
    username: req.body.username,
    avatar: req.body.avatar,
  };
  handleUser();
  res.send('user logged');
});

//updates same user avatar when updated
function handleUser() {
  for (let i = 0; i < tweetBank.length; i++) {
    if (
      tweetBank[i].username === loggedUser.username &&
      tweetBank[i].avatar !== loggedUser.avatar
    ) {
      tweetBank[i].avatar = loggedUser.avatar;
    }
  }
}

//posts new tweet
server.post('/tweets', (req, res) => {
  tweetBank.push({
    username: loggedUser.username,
    avatar: loggedUser.avatar,
    tweet: req.body.tweet,
  });
  res.send('posted tweet');
});

server.listen(5000, () => console.log('Listening on port 5000'));
