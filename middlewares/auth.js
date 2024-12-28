const jwt = require("jsonwebtoken");


const authVerify =  (req, res, next) => {   
    try{
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                data: null,
                message: "Please login first",
            });
        }
        const decoded =  jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                data: null,
                message: "Please login first",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to verify",
            error: error.message
        });
    }

} 

module.exports = authVerify;