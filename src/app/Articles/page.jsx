import React from 'react';
import Article from '../_component/Article/Article.jsx';
import ArticleSearchInput from '../_component/Article/ArticleSearchInput.jsx';
import Pagination from '../_component/Article/Pagination.jsx';
import { Metadata } from 'next';
import { getArticles, getArticlesCount } from '@/apiCalls/apiArticleCall.js';
import { ARTICLE_PER_PAGE } from '../utils/constants.js';
import prisma from '../utils/db.js';

export const metadata = {
  title: 'Articles',
  description: 'This is the Articles page',
};

async function Articles({ searchParams }) {
  const pageNumber = searchParams.pageNumber;
  const articles = await getArticles(pageNumber);
  const count = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  console.log(prisma);
  return (
    <div className='container w-4/5 m-auto p-4 '>
      <ArticleSearchInput />
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {articles.arteclData.map(post => (
          <Article post={post} key={post.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route='/Articles'
        pages={pages}
      />
    </div>
  );
}

export default Articles;
