import jwt from "jsonwebtoken";

const auth = (req, res, next)=>{
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_SECRET)  //authentication using jwt
        next();
    } catch (error) {
        res.json({success: false, message: "Invalid token"})
    }
}

export default auth;