const crypto = require('crypto');
const fs = require('fs');

const algorithm = '';
const secretKey = '';

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

const solution = fs.readFileSync('./src/encrypted_homework_solution.txt');
fs.writeFileSync(
  './src/decrypted_homework_solution.txt',
  decrypt(JSON.parse(solution))
);
