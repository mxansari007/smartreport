import jwt from "jsonwebtoken";


export const auth = (req,res,next)=>{
    
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'maazansari007');
        req.body.userId = decoded.userId;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }

}