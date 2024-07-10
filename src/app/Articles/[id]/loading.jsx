import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loading() {
  return (
    <div className='p-5'>
      <article className='flex md:p-10 md:m-10 bg-white transition hover:shadow-xl'>
        <div className='rotate-180 p-2 [writing-mode:_vertical-lr]'>
          <Skeleton height={20} width={80} />
        </div>
        <div className='flex flex-1 flex-col justify-between'>
          <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
            <Skeleton height={30} width={'60%'} />
            <Skeleton height={20} count={3} />
          </div>
        </div>
      </article>
      <div className='mt-5'>
        <Skeleton height={40} width={150} />
        <Skeleton height={150} />
      </div>
    </div>
  );
}

export default Loading;
