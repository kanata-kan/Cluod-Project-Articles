'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '../utils/constants';

export default function FormRegister() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    if (title === '' || description === '') {
      toast.error('Title and Description are required');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${DOMAIN}/api/article`, {
        title,
        description,
      });
      setLoading(false);
      toast.success('Article added successfully');
      setTitle('');
      setDescription('');
      // Optionally, redirect to another page
      // router.push('/path-to-redirect');
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action='#'
      className='mb-0 mt-6 max-w-xl space-y-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-50 p-8 shadow-lg sm:p-10 lg:p-12'
    >
      <h2 className='text-center text-2xl font-bold text-indigo-600'>
        Register Article
      </h2>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            className='mt-1 block w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            placeholder='Enter article title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            className='mt-1 block w-full h-60 rounded-lg border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            placeholder='Enter article description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        disabled={loading}
      >
        {loading ? (
          <span className='flex items-center justify-center'>
            <svg
              className='mr-2 h-5 w-5 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Add'
        )}
      </button>
    </form>
  );
}
