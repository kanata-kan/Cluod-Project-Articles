import Link from 'next/link';
import React from 'react';
import Logo from '../Logo'; // Ensure the path is correct

function Footer() {
  return (
    <footer className='bg-primary-100'>
      <div className='mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8'>
        <Logo />

        <p className='mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <ul className='mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12'>
          <li>
            <Link
              className='text-gray-700 transition hover:text-gray-700/75'
              href='/'
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className='text-gray-700 transition hover:text-gray-700/75'
              href='/Articles'
            >
              Articles
            </Link>
          </li>

          <li>
            <Link
              className='text-gray-700 transition hover:text-gray-700/75'
              href='/Dashboard'
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className='text-gray-700 transition hover:text-gray-700/75'
              href='/About'
            >
              About
            </Link>
          </li>
        </ul>

        <ul className='mt-12 flex justify-center gap-6 md:gap-8'>
          <li>
            <a
              href='#'
              rel='noopener noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:text-gray-700/75'
            >
              <span className='sr-only'>Facebook</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href='#'
              rel='noopener noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:text-gray-700/75'
            >
              <span className='sr-only'>Instagram</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href='#'
              rel='noopener noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:text-gray-700/75'
            >
              <span className='sr-only'>Twitter</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M19.633 7.997c.013.18.013.362.013.542 0 5.494-4.18 11.823-11.823 11.823-2.35 0-4.532-.688-6.368-1.876.337.04.662.054 1.01.054a8.385 8.385 0 005.192-1.79 4.193 4.193 0 01-3.914-2.906c.267.04.521.067.802.067.37 0 .728-.053 1.068-.14a4.187 4.187 0 01-3.355-4.107v-.053c.55.307 1.18.502 1.85.522a4.173 4.173 0 01-1.856-3.48c0-.772.202-1.492.55-2.112a11.873 11.873 0 008.621 4.375 4.713 4.713 0 01-.107-.957 4.184 4.184 0 014.184-4.184c1.204 0 2.292.502 3.056 1.304a8.226 8.226 0 002.646-1.01 4.156 4.156 0 01-1.836 2.302 8.348 8.348 0 002.401-.648 8.97 8.97 0 01-2.1 2.166z' />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
