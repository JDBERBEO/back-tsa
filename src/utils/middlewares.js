import jwt from 'jsonwebtoken';

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Your session has expired');
    }
    const [_, token] = authorization.split(' ');

    if (!token) {
      throw new Error('Your session has expired');
    }
    const { adminId } = jwt.verify(token, '' + process.env.SECRET);

    req.admin = adminId;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
