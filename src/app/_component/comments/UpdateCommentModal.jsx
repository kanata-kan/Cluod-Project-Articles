'use client';
import { DOMAIN } from '@/app/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function UpdateCommentModal({ setOpenModel, comment }) {
  const commentId = comment.id;
  const text = comment.text;
  const [isText, setIsText] = useState(text);
  const router = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: isText,
      });
      if (isText === '') {
        return toast.info('Please write a comment');
      }
      router.refresh();
      setOpenModel(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-2xl mb-4'>Update Comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='w-full p-2 border border-gray-300 rounded mb-4'
            rows='5'
            value={isText}
            onChange={e => setIsText(e.target.value)}
          ></textarea>
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              className='bg-red-500 text-white py-2 px-4 rounded'
              onClick={() => {
                setOpenModel(false);
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCommentModal;
