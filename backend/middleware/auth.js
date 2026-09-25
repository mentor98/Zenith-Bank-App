import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

let jwksCache = null;
let jwksCacheTime = 0;

const JWKS_URL = process.env.SUPABASE_JWKS_URL;
const CACHE_TTL = 3600000; // 1 hour in milliseconds

async function getJWKS() {
  const now = Date.now();
  
  if (jwksCache && (now - jwksCacheTime) < CACHE_TTL) {
    return jwksCache;
  }

  try {
    const response = await fetch(JWKS_URL);
    jwksCache = await response.json();
    jwksCacheTime = now;
    return jwksCache;
  } catch (error) {
    console.error('Failed to fetch JWKS:', error);
    throw new Error('Failed to verify token');
  }
}

function getKeyFromJWKS(header, callback) {
  getJWKS().then(jwks => {
    const signingKey = jwks.keys.find(key => key.kid === header.kid);
    
    if (!signingKey) {
      return callback(new Error('Unable to find a signing key that matches'));
    }

    const key = `-----BEGIN CERTIFICATE-----\n${signingKey.x5c[0]}\n-----END CERTIFICATE-----`;
    callback(null, key);
  }).catch(err => callback(err));
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.substring(7);

  jwt.verify(token, getKeyFromJWKS, {
    algorithms: ['RS256'],
    audience: process.env.SUPABASE_ANON_KEY
  }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token', details: err.message });
    }
    
    req.user = decoded;
    req.userId = decoded.sub;
    next();
  });
};
