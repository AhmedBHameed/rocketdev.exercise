function LogoutController(req, res) {
  res.clearCookie('ACCESS_TOKEN');
  res.clearCookie('REFRESH_TOKEN');

  res.send({message: 'You have logged out successfully.'});
}

module.exports = LogoutController;
