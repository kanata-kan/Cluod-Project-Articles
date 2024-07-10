import React from 'react';

function ArticleSkeleton() {
  return (
    <div className=' text-center p-2 m-5 rounded-lg  bg-gray-200 animate-pulse'>
      <h2 className=' mb-2   w-2/3 h-8 bg-gray-300 animate-pulse '></h2>
      <p className='mb-2   w-3/3 h-24 bg-gray-300 animate-pulse '></p>
      <div className=' mb-2 mx-auto   w-1/3 h-10 bg-gray-300 animate-pulse '></div>
    </div>
  );
}

export default ArticleSkeleton;
