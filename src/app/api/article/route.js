import { NextResponse } from 'next/server';
import { createArticleSchema } from '../../utils/validateChema';
import prisma from '../../utils/db';
import { ARTICLE_PER_PAGE } from '../../utils/constants';
import { verifyToken } from '../../utils/verifyToken';

/**
 * @method GET
 *@route http://localhost:3000/api/article
 *@desc Get Articles By Page Number
 *@access public
 */

export async function GET(req) {
  const pageNumber = req.nextUrl.searchParams.get('pageNumber') || '1';

  try {
    const arteclData = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ arteclData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 *@route http://localhost:3000/api/article
 *@desc Creat New Articles
 *@access public
 */
export async function POST(req) {
  try {
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
    const body = await req.json();
    const validate = createArticleSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.issues[0].message },
        { status: 400 },
      );
    }
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
