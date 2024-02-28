var jwt = require('jsonwebtoken')
var fs = require('fs')
var cert = fs.readFileSync(`./ConfigSettings/Keys/private.key`)
const apiResponse = require(`./helper/formatResponse`)
const _ = require(`lodash`)
// const genericErrorRes = require(`../utils/errorResponse`).errorResponse
var middleware = async (req, res, next) => {
    if (req.originalUrl === "/api/login/authenticateUsers") {
        next();
    } else
    if (req.headers.accesstoken) {
        jwt.verify(req.headers.accesstoken, cert, { algorithms: ['RS256'] },function (err, decoded) {
            if (err) {
                res.status(401).send(apiResponse.errorFormat(`fail`, '005', {}, {
                    err: "No Access"
                }, 401))
            } else {
                next();
            }
        })
    } else {
        res.status(401).send(apiResponse.errorFormat(`fail`, '005', {}, {
            err: "No Access"
        }, 401))
    }
}
module.exports = {
    middleware
}