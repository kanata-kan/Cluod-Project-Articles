'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ButtonSpinner from '@/app/_component/comments/buttonSpinner';
import { DOMAIN } from '@/app/utils/constants';

export default function FormRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    if (email === '') {
      toast.error('You must enter your email');
      return;
    } else if (password === '') {
      toast.error('You must enter your password');
      return;
    } else if (username === '') {
      toast.error('You must enter your username');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${DOMAIN}/api/users/register`, {
        email,
        password,
        username,
      });
      toast.success('Registration successful');
      router.replace('/');
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action='#'
      className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'
    >
      <p className='text-center text-lg font-medium'>
        Register to your account
      </p>

      <div>
        <label htmlFor='username' className='sr-only'>
          Username
        </label>
        <input
          type='text'
          id='username'
          className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
          placeholder='Enter username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='email' className='sr-only'>
          Email
        </label>
        <input
          type='email'
          id='email'
          className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
          placeholder='Enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>

        <div className='relative'>
          <input
            type={visibility}
            className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <span
            className='absolute inset-y-0 end-0 grid place-content-center px-4'
            onClick={() => {
              setVisibility(visibility === 'password' ? 'text' : 'password');
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-4 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type='submit'
        className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
      >
        {isLoading ? <ButtonSpinner /> : 'Sign up'}
      </button>

      <p className='text-center text-sm text-gray-500'>
        Already have an account?{' '}
        <a href='#' className='underline'>
          Sign in
        </a>
      </p>
    </form>
  );
}
