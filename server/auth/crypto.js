const { Sha256 } = require('@aws-crypto/sha256-js');
const { supports } = require('@aws-crypto/supports-web-crypto');
const crypto = require('crypto');

const secureCrypto = {
  // Hash para contraseñas
  async hashPassword(password) {
    const sha256 = new Sha256();
    sha256.update(password);
    return sha256.digest();
  },

  // Verificar firma digital
  async verifySignature(data, signature) {
    const sha256 = new Sha256();
    sha256.update(data);
    const hash = sha256.digest();
    return hash.toString() === signature;
  },

  // Cifrar datos sensibles
  async encryptData(data) {
    const secretKey = process.env.CRYPTO_SECRET || 'carcenter-secret-key';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secretKey), iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex')
    };
  }
};

module.exports = secureCrypto;
