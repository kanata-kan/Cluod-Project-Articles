// ArticlesTable.jsx
import React from 'react';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '../../utils/verifyToken';
import { redirect } from 'next/navigation';
import { ARTICLE_PER_PAGE } from '@/app/utils/constants';
import { getArticles, getArticlesCount } from '@/apiCalls/apiArticleCall';
import ArticlesTableClient from './ArticlesTableClient ';
import prisma from '../../utils/db';

async function ArticlesTable({ searchParams: { pageNumber = 1 } }) {
  const jwtToken = cookies().get('jwtToken')?.value;
  const payload = verifyTokenForPage(jwtToken);
  if (!jwtToken) redirect('/');
  if (payload?.isAdmin === false) redirect('/');

  const articles = await getArticles(pageNumber);
  const count = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-5'>Articles Table</h1>
      <ArticlesTableClient
        pageNumber={pageNumber}
        articles={articles.arteclData}
        pages={pages}
      />
    </div>
  );
}

export default ArticlesTable;
