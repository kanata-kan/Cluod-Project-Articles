import { NextResponse } from 'next/server';
import prisma from '../../../../utils/db';
import { verifyToken } from '../../../../utils/verifyToken'; // استيراد الدالة الموحدة
import bcrypt from 'bcrypt';
/**
 * @method GET
 * @route http://localhost:3000/api/users/profile/:id
 * @desc get profile
 * @access private
 */

export async function GET(request, { params }) {
  try {
    // التحقق من التوكن باستخدام الدالة الموحدة
    const { token, decodedToken } = verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { message: 'التوكن غير موجود أو غير صالح' },
        { status: 401 },
      );
    }

    // العثور على المستخدم باستخدام ID
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // تحديد الحقول الأخرى التي تريد استرجاعها هنا بدون كلمة المرور
      },
    });

    // تحقق من وجود المستخدم
    if (!user) {
      return NextResponse.json(
        { message: 'المستخدم غير موجود' },
        { status: 404 },
      );
    }

    // تحقق من تطابق البريد الإلكتروني في التوكن مع المستخدم
    if (decodedToken.email !== user.email) {
      return NextResponse.json(
        { message: 'توكن غير متطابق مع البريد الإلكتروني' },
        { status: 401 },
      );
    }

    // إعادة إرسال معلومات المستخدم
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user account:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method PUT
 * @route http://localhost:3000/api/users/profile/:id
 * @desc update profile
 * @access private
 */

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    // التحقق من التوكن باستخدام الدالة الموحدة
    const { token, decodedToken } = verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { message: 'التوكن غير موجود أو غير صالح' },
        { status: 401 },
      );
    }

    // العثور على المستخدم باستخدام ID
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // عدم تضمين حقل الرقم السري
      },
    });

    // تحقق من وجود المستخدم
    if (!user) {
      return NextResponse.json(
        { message: 'المستخدم غير موجود' },
        { status: 404 },
      );
    }

    // تحقق من تطابق البريد الإلكتروني في التوكن مع المستخدم
    if (decodedToken.email !== user.email) {
      return NextResponse.json(
        { message: 'توكن غير متطابق مع البريد الإلكتروني' },
        { status: 401 },
      );
    }

    // تجهيز البيانات للتحديث
    const updatedData = {
      email: body.email || user.email,
      username: body.username || user.username,
      // تحديث الحقول الأخرى هنا إذا كانت موجودة
    };

    // تحديث الرقم السري للمستخدم إذا كان موجودًا في الطلب
    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: 'password should de minimum 6 characters' },
          { status: 400 },
        );
      }
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(body.password, salt);
    }

    // تحديث معلومات المستخدم
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: updatedData,
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // عدم تضمين حقل الرقم السري في الاستجابة
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user account:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method DELETE
 * @route http://localhost:3000/api/users/profile/:id
 * @desc delete profile
 * @access private
 */
export async function DELETE(request, { params }) {
  try {
    // العثور على المستخدم باستخدام ID
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    // تحقق من وجود المستخدم
    if (!user) {
      return NextResponse.json(
        { message: 'المستخدم غير موجود' },
        { status: 404 },
      );
    }

    // التحقق من التوكن باستخدام الدالة الموحدة
    const { token, decodedToken } = verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'توكن غير صالح' }, { status: 401 });
    }

    // تحقق من تطابق البريد الإلكتروني في التوكن مع المستخدم
    if (decodedToken.email !== user.email) {
      return NextResponse.json(
        { message: 'توكن غير متطابق مع البريد الإلكتروني' },
        { status: 401 },
      );
    }

    // حذف المستخدم
    await prisma.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: 'لقد تم حذف الحساب بنجاح' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
