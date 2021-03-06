require('dotenv').config();

const { verify } = require('jsonwebtoken');

exports.authUser = (req, res, next) => {
  const accessTkn = req.headers.authorization;

  if (!accessTkn) return res.sendStatus(401);

  verify(accessTkn, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.body = user;
  });

  next();
};
