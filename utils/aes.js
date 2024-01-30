const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const _ = require('lodash');
var key = [33,
    184,
    148,
    142,
    133,
    125,
    49,
    240,
    64,
    126,
    224,
    10,
    10,
    77,
    80,
    234,
    53,
    75,
    193,
    229,
    242,
    45,
    33,
    151,
    166,
    44,
    252,
    252,
    163,
    102,
    16,
    195
];
var iv = [108,
    9,
    138,
    53,
    219,
    132,
    58,
    0,
    69,
    162,
    101,
    154,
    74,
    170,
    208,
    131
];
var key1 = Buffer.from(key)
var iv1 = Buffer.from(iv)

//link for reference
//https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/

function encrypt(text) {
    let textArray = "";
    _.forEach(text.split(""), function (char) {
        textArray += (char + '\u0000');
    })
    let cipher = crypto.createCipheriv(algorithm, key1, iv1);
    let encrypted = cipher.update(textArray);
    encrypted = Buffer.from(encrypted, 'hex');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
}

function decrypt(encryptedData) {
    encryptedData = encryptedData.replace(" ", "+").toString('base64');
    let encryptedText = Buffer.from(encryptedData, 'base64');
    let decipher = crypto.createDecipheriv(algorithm, key1, iv1);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString().replace(/\0/g, '');
}
// var hw = encrypt("newpwd123")
// // var hw = encrypt("M\u0000p\u0000o\u0000d\u0000d\u0000p\u0000r\u0000o\u0000@\u00002\u00000\u00001\u00009\u0000")
// console.log(hw)
// var stringpwd = decrypt("mrQ6hhaWsQZoRbZbdOC37LfWBNX8UF1FwDTRfi3Q/dI=");
// console.log(stringpwd);

module.exports = {
    encrypt,
    decrypt
}