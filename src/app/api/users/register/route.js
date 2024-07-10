import { NextResponse } from 'next/server';
import { registerSchema } from '../../../utils/validateChema';
import prisma from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/auth'; // استدعاء الدالة

/**
 * @method POST
 * @route http://localhost:3000/api/users/register
 * @desc Create New Users
 * @access public
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const validate = registerSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.issues[0].message },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    // إنتاج التوكن والكوكي باستعمال الدالة الجديدة
    const cookie = generateToken(newUser);

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201, headers: { 'Set-Cookie': cookie } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
