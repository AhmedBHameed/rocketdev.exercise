const {readFileSync} = require('fs');

function LoginController(req, res) {
  const {error, user} = req.auth;

  if (error) {
    res.status(401).send({error});
    return;
  }

  res.send(readFileSync('./public/home/index.html', 'utf8'));
}

module.exports = LoginController;
