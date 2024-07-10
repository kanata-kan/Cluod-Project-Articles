import { NextResponse } from 'next/server';
import prisma from '../../../utils/db';

/**
 * @method GET
 * @route http://localhost:3000/api/article/count
 * @desc Get Articles By Page Number
 * @access public
 */

export async function GET(request) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
