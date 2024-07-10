import React from 'react';
import { Metadata } from 'next';

export const metadata = {
  title: 'About',
  description: 'This is the About page',
};

function About() {
  return (
    <section className='bg-white my-10'>
      <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            About This App
          </h2>

          <p className='mt-4 text-gray-500 sm:text-xl'>
            The best hosting solution for your online success
          </p>
        </div>
        <div className='mt-8 sm:mt-12'>
          <dl className='grid grid-cols-1 gap-4 sm:grid-cols-3'></dl>
        </div>
      </div>
    </section>
  );
}

export default About;
