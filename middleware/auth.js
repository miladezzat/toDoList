const jwt = require('jsonwebtoken');
const secretKey = 'tokenSecretKey';

module.exports.user_logged = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    }

    jwt.verify(token, secretKey, function(err, payload) {
        if (token === null) {
            return res.status(401).json({
                message: "Unauthorized request"
            });
        }
        req.userId = payload.userId;

        next();
    })

}