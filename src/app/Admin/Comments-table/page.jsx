import { cookies } from 'next/headers';
import { verifyTokenForPage } from '../../utils/verifyToken';
import { redirect } from 'next/navigation';
import React from 'react';
import { getAllComments } from '@/apiCalls/adminApiCall';
import DeleteButton from './DeleteButton';

export default async function AdminCommentsPage() {
  const jwtToken = cookies().get('jwtToken')?.value;
  const payload = verifyTokenForPage(jwtToken);
  if (!jwtToken) redirect('/');
  if (payload?.isAdmin === false) redirect('/');

  const comments = await getAllComments(jwtToken);
  console.log(comments);

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-5'>Comments Table</h1>
      <table className='min-w-full bg-white border shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
          <tr>
            <th className='w-1/4 py-4 px-6 uppercase font-semibold text-sm border-r border-gray-300'>
              Comment
            </th>
            <th className='w-1/4 py-4 px-6 uppercase font-semibold text-sm border-r border-gray-300'>
              Created At
            </th>
            <th className='w-1/4 py-4 px-6 uppercase font-semibold text-sm border-r border-gray-300'>
              Updated At
            </th>
            <th className='py-4 px-6 uppercase font-semibold text-sm'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {comments.map(comment => (
            <tr
              key={comment.id}
              className='border-t border-gray-300 hover:bg-gray-100 transition-colors duration-200'
            >
              <td className='py-4 px-6'>{comment.text}</td>
              <td className='py-4 px-6'>
                {new Date(comment.createdAt).toLocaleString()}
              </td>
              <td className='py-4 px-6'>
                {new Date(comment.updatedAt).toLocaleString()}
              </td>
              <td className='py-4 px-6 flex items-center space-x-4'>
                <DeleteButton id={comment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
