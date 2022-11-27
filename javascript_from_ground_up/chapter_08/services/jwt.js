const {readFileSync} = require('fs');
const {sign, verify} = require('jsonwebtoken');
const {resolve} = require('path');
const {ulid} = require('ulid');
const ENVIRONMENT = require('../config/ENVIRONMENT');

const PRIVATE_KEY = readFileSync(resolve('./keys/private.pem'), 'utf8');
const PUBLIC_KEY = readFileSync(resolve('./keys/public.pem'), 'utf8');

function encodeJWT(payload, expiresIn) {
  return sign(
    {
      data: payload,
    },
    {key: PRIVATE_KEY, passphrase: ENVIRONMENT.JWT_KEY_PHRASE},
    {
      algorithm: 'RS256',
      jwtid: ulid(),
      expiresIn,
    }
  );
}

function decodeJWT(token) {
  return verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'],
  });
}

module.exports = {
  encodeJWT,
  decodeJWT,
};
