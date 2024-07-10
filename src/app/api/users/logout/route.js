import { NextResponse } from 'next/server';
import { clearToken } from '../../../utils/auth'; // استدعاء الدالة لإزالة التوكن

/**
 * @method POST
 * @route http://localhost:3000/api/users/logout
 * @desc Log out user by clearing the JWT token cookie
 * @access public
 */

export async function POST() {
  try {
    // إزالة التوكن باستخدام الدالة clearToken
    const cookie = clearToken();

    // الرد بنجاح مع إعداد الهيدر لإزالة الكوكي
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200, headers: { 'Set-Cookie': cookie } },
    );
  } catch (error) {
    console.error('Error logging out user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
