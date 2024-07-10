import { NextResponse } from 'next/server';
import prisma from '../../../utils/db';
import { verifyToken } from '../../../utils/verifyToken';
import { comment } from 'postcss';

/**
 * @method GET single article by id
 *@route http://localhost:3000/api/article/:id
 *@desc Get All Articles
 *@access public
 */

export async function GET(req, { params }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            User: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: 'article is not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method PUT single article by id
 *@route http://localhost:3000/api/article/:id
 *@desc update Article
 *@access private
 */

export async function PUT(req, { params }) {
  // التحقق من صلاحية التوكن واستخراج المعلومات المشفرة
  const { decodedToken } = verifyToken(req);
  const user = decodedToken;
  console.log(user);
  if (user === null || user.isAdmin === false) {
    return NextResponse.json(
      { message: 'only admin, access denied' },
      { status: 403 },
    );
  }
  const articleId = parseInt(params.id);

  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 },
      );
    }

    const body = await req.json();

    const updatedArticle = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(
      { message: 'Article is updated', updatedArticle },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method DELETE single article by id
 *@route http://localhost:3000/api/article/:id
 *@desc Delete Article
 *@access private
 */

export async function DELETE(req, { params }) {
  // التحقق من صلاحية التوكن واستخراج المعلومات المشفرة
  const { decodedToken } = verifyToken(req);
  const user = decodedToken;
  console.log(user);
  if (user === null || user.isAdmin === false) {
    return NextResponse.json(
      { message: 'الوصول مسموح فقط للمشرفين' },
      { status: 403 },
    );
  }

  const articleId = parseInt(params.id);

  try {
    // البحث عن المقالة المراد حذفها مع استرجاع التعليقات المرتبطة بها
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        comments: true,
      },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { message: 'المقالة غير موجودة' },
        { status: 404 },
      );
    }

    // حذف جميع التعليقات المرتبطة بالمقالة
    const commentIds = existingArticle.comments.map(comment => comment.id);
    if (commentIds.length > 0) {
      await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentIds,
          },
        },
      });
    }

    // حذف المقالة نفسها
    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    return NextResponse.json(
      { message: 'تم حذف المقالة والتعليقات بنجاح' },
      { status: 200 },
    );
  } catch (error) {
    console.error('خطأ في حذف المقالة:', error);
    return NextResponse.json(
      { message: 'خطأ داخلي في الخادم' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect(); // قطع الاتصال بقاعدة البيانات بعد الانتهاء من العمليات
  }
}
