import { NextResponse } from 'next/server';
import { loginSchema } from '../../../utils/validateChema';
import prisma from '../../../utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { generateToken } from '../../../utils/auth';

/**
 * @method POST
 * @route http://localhost:3000/api/users/login
 * @desc Handle user login
 * @access public
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const validate = loginSchema.safeParse(body);

    // التحقق من صحة بيانات تسجيل الدخول المستلمة
    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.issues[0].message },
        { status: 400 },
      );
    }

    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // التحقق مما إذا كان المستخدم موجودًا
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 },
      );
    }

    // التحقق من صحة كلمة المرور المدخلة
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 },
      );
    }

    // إنشاء الكوكي وإرجاع الرد بنجاح تسجيل الدخول
    const cookie = generateToken(user);
    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200, headers: { 'Set-Cookie': cookie } },
    );
  } catch (error) {
    // التعامل مع أي أخطاء داخلية
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
