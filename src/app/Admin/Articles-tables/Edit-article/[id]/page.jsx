import React from 'react';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/app/utils/verifyToken';
import { redirect } from 'next/navigation';
import EditFormAdmin from './EditFormAdmin';
import { getSingleArticles } from '@/apiCalls/apiArticleCall';

async function Page({ params }) {
  const article = await getSingleArticles(parseInt(params.id));
  const jwtToken = cookies().get('jwtToken')?.value;
  const payload = verifyTokenForPage(jwtToken);
  if (!jwtToken) redirect('/');
  if (payload?.isAdmin === false) redirect('/');
  console.log(payload);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>
          Edit Article Page
        </h1>
        <EditFormAdmin article={article} />
      </div>
    </div>
  );
}

export default Page;
