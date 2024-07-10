import React from 'react';
import FormBarSkeleton from './AdminSkeleton/FormBarSkeleton';

function loading() {
  return (
    <div>
      <div className='flex w-full said-height'>
        <div></div>
        <div className='w-full overflow-y-scroll'>
          <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 '>
            <div className='mx-auto max-w-3xl'>
              <h1 className='mx-auto w-2/4 bg-gray-200 h-10 mb-5 animate-pulse'></h1>
              <FormBarSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
