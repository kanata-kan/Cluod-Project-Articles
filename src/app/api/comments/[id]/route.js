import { NextResponse } from 'next/server';
import { verifyToken } from '../../../utils/verifyToken';
import prisma from '../../../utils/db';

/**
 * @method PUT
 * @route http://localhost:3000/api/comments/:id
 * @desc update comment
 * @access private
 */
export async function PUT(request, { params }) {
  try {
    // البحث عن التعليق بناءً على معرفه الفريد
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    // إذا لم يتم العثور على التعليق، إرجاع رسالة خطأ
    if (!comment) {
      return NextResponse.json(
        { message: 'comment not found' },
        { status: 404 },
      );
    }

    // التحقق من صلاحية التوكن واستخراج المعلومات المشفرة
    const { decodedToken } = verifyToken(request);
    const user = decodedToken;

    // التحقق من هوية المستخدم ومطابقتها مع صاحب التعليق
    if (user === null || user.userId !== comment.userId) {
      return NextResponse.json(
        { message: 'you are not allowed, access denied' },
        { status: 403 },
      );
    }

    // استخراج البيانات من الطلب
    const body = await request.json();

    // تحديث نص التعليق في قاعدة البيانات
    const updateComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });

    // إرجاع التعليق المحدث مع حالة نجاح
    return NextResponse.json(updateComment, { status: 200 });
  } catch (error) {
    // تسجيل الخطأ وإرجاع رسالة خطأ مع حالة خطأ داخلي في الخادم
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
/**
 * @method PUT
 * @route http://localhost:3000/api/comments/:id
 * @desc update comment
 * @access private
 */

export async function DELETE(request, { params }) {
  try {
    // البحث عن التعليق بناءً على معرفه الفريد
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    // إذا لم يتم العثور على التعليق، إرجاع رسالة خطأ
    if (!comment) {
      return NextResponse.json(
        { message: 'comment not found' },
        { status: 404 },
      );
    }

    // التحقق من صلاحية التوكن واستخراج المعلومات المشفرة
    const { decodedToken } = verifyToken(request);
    const user = decodedToken;

    // التحقق من وجود التوكن
    if (!user) {
      return NextResponse.json(
        { message: 'no token provided, access denied' },
        { status: 401 },
      );
    }

    // التحقق من صلاحيات المستخدم لحذف التعليق
    if (user.isAdmin || user.userId === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ message: 'comment deleted' }, { status: 200 });
    }

    // إذا كان المستخدم ليس مسؤولًا وليس صاحب التعليق، إرجاع رسالة رفض الوصول
    return NextResponse.json(
      { message: 'you are not allowed, access denied' },
      { status: 403 },
    );
  } catch (error) {
    // تسجيل الخطأ وإرجاع رسالة خطأ داخلي في الخادم
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
