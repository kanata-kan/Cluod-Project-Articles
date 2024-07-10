'use client';
import { DOMAIN } from '@/app/utils/constants';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CommentsForm({ articleId }) {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if (text === '') {
      toast.error('Write a comment please');
      return;
    }
    try {
      const res = await axios.post(`${DOMAIN}/api/comments`, {
        text,
        articleId,
      });
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'
    >
      <label htmlFor='comment' className='sr-only'>
        Add a comment
      </label>
      <input
        type='text'
        id='comment'
        placeholder='Add a comment...'
        className='w-full rounded-md border border-red-500 p-2.5 pe-10 shadow-sm sm:text-sm'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        type='submit'
        className='block md:w-1/5 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
      >
        Comment
      </button>
    </form>
  );
}
