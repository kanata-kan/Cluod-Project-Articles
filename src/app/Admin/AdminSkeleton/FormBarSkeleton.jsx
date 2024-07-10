import React from 'react';

function FormBarSkeleton() {
  return (
    <div className=' rounded-lg p-4  w-full bg-gray-200 h-80 animate-pulse'>
      <div className='mb-5 mx-auto  rounded-lg p-4  w-full bg-gray-300 h-12 animate-pulse'></div>
      <div className='mb-5 mx-auto  rounded-lg p-4  w-full bg-gray-300 h-1/3 animate-pulse'></div>
      <div className='mb-5 mx-auto  rounded-lg p-4  w-full bg-gray-300 h-12 animate-pulse'></div>
    </div>
  );
}

export default FormBarSkeleton;
