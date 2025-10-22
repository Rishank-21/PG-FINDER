import jwt from 'jsonwebtoken'

export const isAuth = async ( req , res ,next ) => {
    try {
        const token = req.cookies.token || req.header.authorization.split(" ")[1]
        if(!token) return res.status(400).json({ message : "token not found"})
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded) return res.status(404).json({ message : "token not verified"})
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(500).json({ message : "isAuth error"})
    }
}