import React from 'react';
import CommentsForm from '../../_component/comments/CommentsForm';
import CommentText from '../../_component/comments/CommentText';
import { getSingleArticles } from '../../../apiCalls/apiArticleCall';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '../../utils/verifyToken';

async function ArticleId({ params }) {
  const article = await getSingleArticles(params.id);
  console.log(article.id);
  const jwtToken = cookies().get('jwtToken')?.value || '';
  const payload = verifyTokenForPage(jwtToken);
  console.log(payload);
  return (
    <div className='p-5'>
      <article className='flex md:p-10 md:m-10 bg-white transition hover:shadow-xl'>
        <div className='rotate-180 p-2 [writing-mode:_vertical-lr]'>
          <time
            dateTime={article.createdAt}
            className='flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900'
          >
            {new Date(article.createdAt).toDateString()}
          </time>
        </div>
        <div className='flex flex-1 flex-col justify-between'>
          <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
            <a href='#'>
              <h3 className='font-bold uppercase text-gray-900'>
                {article.title}
              </h3>
            </a>
            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>
              {article.description}
            </p>
          </div>
        </div>
      </article>
      {payload ? <CommentsForm articleId={article.id} /> : ''}
      <h1 className='text-2xl font-extrabold text-gray-800 mt-3'>Comments</h1>
      {article.comments.map(comment => (
        <CommentText
          key={comment.id}
          comment={comment}
          date={new Date(comment.createdAt).toLocaleDateString()}
          userId={payload?.userId}
        />
      ))}
    </div>
  );
}

export default ArticleId;
