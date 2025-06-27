const jwt = require('jsonwebtoken');

// Middleware: Auth check
const authMiddleware = (req, res, next) => {
  let token;

  // ✅ First: Try from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // ✅ If not in cookies, try Bearer token in Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // ❌ If still no token
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Middleware: Role-based Authorization
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorizeRoles
};
