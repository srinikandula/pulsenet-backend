import fs from 'fs';
import jwt from "jsonwebtoken";

/**
 * Generate an access token
 * @param {object} obj - The payload to be encoded in the token
 * @returns {string} The access token
 */
export const generateAccessToken = async (obj) => {
    let privateKey = fs.readFileSync('../server/config/keys/private.key');
    let accessToken = await jwt.sign(obj, privateKey, {
        algorithm: 'RS256'
    })
    // console.log(accessToken)
    return accessToken;
}

/**
 * Verifies a user using a JSON Web Token (JWT) and a private key.
 * @param {string} obj - The JWT to be verified.
 * @returns {object|string} The decoded payload of the JWT, or an error message if verification fails.
 */
export const verifyUser = async (obj) => {
    let publicKey = fs.readFileSync('../server/config/keys/public.key');

    if(!obj){ return null; }
    try {
        return jwt.verify(obj, publicKey);
    } catch (error) {
        return error.message;
    }
}