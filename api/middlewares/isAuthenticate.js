const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { authorization } = req.headers;

        const parts = authorization.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (parts[0] !== 'Bearer') {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await jwt.verify(parts[1], process.env.ENCRYPT_KEY_TOKEN, function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded
            return next();
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server Error!" });
    }
}