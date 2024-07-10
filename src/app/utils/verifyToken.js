import jwt from 'jsonwebtoken';

export function verifyToken(request) {
  const jwtToken = request.cookies.get('jwtToken');
  const token = jwtToken?.value;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return { token, decodedToken };
  } catch (err) {
    console.log('Token verification failed:', err);
    return { token: null, decodedToken: null };
  }
}

export function verifyTokenForPage(token) {
  try {
    const privateKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, privateKey);
    if (!decodedToken) return null;
    return decodedToken;
  } catch (err) {
    console.log('Token verification failed:', err);
    return null;
  }
}
