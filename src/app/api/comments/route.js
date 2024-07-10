import { NextResponse } from 'next/server';
import { verifyToken } from '../../utils/verifyToken';
import prisma from '../../utils/db';
import { creatCommentSchema } from '../../utils/validateChema';

/**
 * @method POST
 * @route http://localhost:3000/api/comments
 * @desc create new comment
 * @access private
 */

export async function POST(request) {
  try {
    const { token, decodedToken } = verifyToken(request);
    const user = decodedToken;

    if (!user) {
      return NextResponse.json(
        { message: 'only logged in user, access denied' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validation = creatCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.userId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/**
 * @method GET
 * @route http://localhost:3000/api/comments
 * @desc Get All Comment
 * @access private (only admin)
 */
export async function GET(request) {
  try {
    const { token, decodedToken } = verifyToken(request);
    const user = decodedToken;
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 },
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
