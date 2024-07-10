import React from 'react';
import ArticleSearchInputSkeleton from '../_component/Article/skeleton/ArticleSearchInputSkeleton';
import ArticleSkeleton from '../_component/Article/skeleton/ArticleSkeleton';
import PaginationSkeleton from '../_component/Article/skeleton/PaginationSkeleton';

const arrSkeleton = [1, 2, 3, 4, 5, 6];

function loading() {
  return (
    <div className='container w-4/5 m-auto p-4'>
      <ArticleSearchInputSkeleton />
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {arrSkeleton.map(item => (
          <ArticleSkeleton key={item} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
}

export default loading;
