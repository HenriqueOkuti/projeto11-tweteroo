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
  return res.status(200).send(tweetBank.slice(start, end).reverse());
});

//Logs user
server.post('/sign-up', (req, res) => {
  if (!req.body.username || !req.body.avatar) {
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  function isImage(url) {
    //return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url); //REGEX case
    return Boolean(new URL(url)); //Web API case
  }

  if (!isImage(req.body.avatar)) {
    return (
      res
        .status(400)
        // .send(
        //   'Imagem inválida, formatos aceitos são: .jpg, .jpeg, .png, .webp, .avif, .gif ou .svg'
        // );
        .send('Imagem inválida')
    );
  }

  loggedUser = {
    username: req.body.username,
    avatar: req.body.avatar,
  };
  handleUser();
  return res.status(201).send('OK');
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
  if (!req.body.tweet) {
    return res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    tweetBank.push({
      username: loggedUser.username,
      avatar: loggedUser.avatar,
      tweet: req.body.tweet,
    });
    return res.status(201).send('OK');
  }
});

server.get('/tweets/:USERNAME', (req, res) => {
  const arrayUser = [];
  const USERNAME = req.params.USERNAME;
  for (let i = 0, len = tweetBank.length; i < len; i++) {
    console.log(tweetBank[i].username);
    if (tweetBank[i].username === USERNAME) {
      arrayUser.push(tweetBank[i]);
    }
    if (i === len - 1 && arrayUser[0] === undefined) {
      return res.status(400).send('Informe uma página válida!');
    }
  }
  res.status(200).send(arrayUser.reverse());
});

server.listen(5000, () => console.log('Listening on port 5000'));
