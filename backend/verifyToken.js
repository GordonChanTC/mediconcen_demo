const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(403).send({"message": "Access Denied!"});

    try{
        const validToken = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.email = validToken.sub;
        next();
    } catch(err) {
        return res.status(403).send({"message": "Invalid Token!"});
    }
}