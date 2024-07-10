import React from 'react';
import FormAdmin from './FormAdmin';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '../utils/verifyToken';
import { redirect } from 'next/navigation';

async function Dashboard() {
  const jwtToken = cookies().get('jwtToken')?.value;
  const payload = verifyTokenForPage(jwtToken);
  if (!jwtToken) redirect('/');
  if (payload?.isAdmin === false) redirect('/');
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 '>
      <div className='mx-auto max-w-3xl'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
          Get Register today
        </h1>
        <FormAdmin />
      </div>
    </div>
  );
}

export default Dashboard;
