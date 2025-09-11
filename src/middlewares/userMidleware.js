import jwt from 'jsonwebtoken';

export default function userAuth(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode) {
      try {
        req.authorized = decode;
        next();
      } catch (err) {
        res.status(401).json({ message: 'Usuario nao autorizado.' });
        console.error(err);
      }
    }
  }
  next();
}
