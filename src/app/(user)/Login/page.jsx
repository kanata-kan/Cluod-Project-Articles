import React from 'react';
import FormLogin from './FormLogin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function page() {
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
          Get started today
        </h1>
        <FormLogin />
      </div>
    </div>
  );
}
