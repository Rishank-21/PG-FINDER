// import jwt from 'jsonwebtoken'

// export const isAuth = async ( req , res ,next ) => {
//     try {
//         const token = req.cookies.token || req.header.authorization.split(" ")[1]
//         if(!token) return res.status(400).json({ message : "token not found"})
//         const decoded = jwt.verify(token , process.env.JWT_SECRET)
//         if(!decoded) return res.status(404).json({ message : "token not verified"})
//         req.userId = decoded.userId
//         next()
//     } catch (error) {
//         return res.status(500).json({ message : "isAuth error"})
//     }
// }

// import jwt from "jsonwebtoken";

// export const isAuth = async (req, res, next) => {
//   try {
//     // Get token from cookie or Authorization header
//     let token = req.cookies?.token;

//     if (!token && req.headers?.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Token not found" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(400).json({ message: "Token not verified" });
//     }

    
//     req.user = decoded;  
//     next();
//   } catch (error) {
//     console.error("isAuth middleware error:", error);
//     return res.status(500).json({ message: "Server error in authentication" });
//   }
// };


import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers?.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Token not verified" });
    }

    // Map to _id for Mongoose compatibility
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.error("isAuth middleware error:", error);
    return res.status(500).json({ message: "Server error in authentication" });
  }
};
