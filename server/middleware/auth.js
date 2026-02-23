const jwt = require("jsonwebtoken");

// Checks token and sets req.user => protecting our route
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;
    // takes the aughorization request from the incoming header
        if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({message: "No Token Given"});

        // If bearer token is missing
        const token = auth.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);//{id, role} if decoded it valid it will containt the content payload
            req.user = decoded; // assigning decoded to the user
        } catch (error) {
            return res.status(403).json({ message: "invalid token"});
        }
};

// check role

exports.authorize = (roles) => {
    return ( req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({ message: "forbidden"});
        next();
    };
};

// middleware sits between the request and the final route