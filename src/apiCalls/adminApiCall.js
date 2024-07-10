import { DOMAIN } from '@/app/utils/constants';

export async function getAllComments(jwtToken) {
  const res = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${jwtToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  return res.json();
}
