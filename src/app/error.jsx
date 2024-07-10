'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Failed from '../../public/fild.png';

function ErrorPage({ error, reset }) {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <div className='relative h-80 '>
        <Image src={Failed} alt='خلفية خطأ' layout='fill' objectFit='cover' />
      </div>

      <div className='flex flex-1 items-center justify-center'>
        <div className='mx-auto max-w-xl px-4 py-8 text-center'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {error.message}
          </h1>

          <p className='mt-4 text-gray-500'>
            Try searching again, or return home to start from the beginning.{' '}
          </p>
          <button
            onClick={() => {
              reset();
            }}
            className='mt-6 rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring'
          >
            Reset
          </button>
          <br />
          <Link
            href='/'
            className='mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring'
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
