import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// دالة لإنتاج JWT
export function generateJWT(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      username: user.username,
    }, // إضافة username هنا
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  );
}

// دالة لإنتاج الكوكي تحتوي على JWT
export function generateToken(user) {
  const token = generateJWT(user);
  const cookie = serialize('jwtToken', token, {
    httpOnly: true, // الكوكي يمكن غير للخادم باش يقراه
    secure: process.env.NODE_ENV !== 'development', // الكوكي يكون آمن غير فـ وضع الإنتاج
    maxAge: 60 * 60 * 24 * 30, // مدة صلاحية الكوكي هي 30 يوم
    sameSite: 'strict', // الكوكي يكون متاح غير مع نفس الموقع
    path: '/', // الكوكي يكون متاح لجميع صفحات الموقع
  });
  return cookie;
}
export function clearToken() {
  return serialize('jwtToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1, // تعيين maxAge إلى قيمة سالبة لإزالة الكوكي
    sameSite: 'strict',
    path: '/', // الكوكي يكون متاح لجميع صفحات الموقع
  });
}
