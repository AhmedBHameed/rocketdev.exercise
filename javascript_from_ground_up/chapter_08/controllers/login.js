const {encodeJWT} = require('../services/jwt');
const user = {
  id: 1,
  username: 'abc',
  password: '123456',
};

const JWT_MAX_AGE = 20;

function LoginController(req, res) {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).send({
      error: 'Bad user input. username and password fields are required.',
    });
    return;
  }

  if (user.username !== username || user.password !== password) {
    res.status(404).send({error: 'Invalid username or password.'});
    return;
  }

  const accessToken = encodeJWT(
    {id: user.id, isRefreshToken: false},
    `${JWT_MAX_AGE}m`
  );
  const refreshToken = encodeJWT({id: user.id, isRefreshToken: true}, '7d');

  res.cookie('ACCESS_TOKEN', accessToken, {
    maxAge: JWT_MAX_AGE * 60 * 1000,
    httpOnly: true,
  });
  res.cookie('REFRESH_TOKEN', refreshToken, {
    maxAge: 24 * 60 * 60 * 1000 * 7,
    httpOnly: true,
  });

  res.send({message: 'You have logged in successfully.'});
}

module.exports = LoginController;
