// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.body = {
        ...req.body,
        userId: decoded.id
    };
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'Invalid token' });
  }
};
