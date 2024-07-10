import { DOMAIN } from '@/app/utils/constants';

export async function getArticles(pageNumber) {
  const res = await fetch(`${DOMAIN}/api/article?pageNumber=${pageNumber}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}

export async function getArticlesCount() {
  const res = await fetch(`${DOMAIN}/api/article/count`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles count');
  }

  const { count } = await res.json();
  return count; // إرجاع عدد المقالات
}
export async function getArticlesSearch(searchText) {
  const res = await fetch(
    `${DOMAIN}/api/article/search?searchText=${searchText}`,
    {
      next: { revalidate: 50 },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export async function getSingleArticles(articleId) {
  const res = await fetch(`${DOMAIN}/api/article/${articleId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}
