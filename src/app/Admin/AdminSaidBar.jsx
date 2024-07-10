import Link from 'next/link';
import React from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { PiArticleNyTimes } from 'react-icons/pi';
import { FaCommentDots } from 'react-icons/fa6';

function AdminSaidBar() {
  return (
    <div className='flex said-height w-16 flex-col justify-between border-e-2 bg-purple-50'>
      <div>
        <div className='border-t border-gray-200'>
          <div className='px-2'>
            <div className='py-4'>
              <Link
                href='/Admin'
                className='group relative flex justify-center rounded bg-blue-50 p-2 text-blue-700 hover:bg-blue-100'
              >
                <CgMenuGridR size={24} />
                <span className='invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Dashboard
                </span>
              </Link>
            </div>

            <div className='space-y-1 border-t border-gray-200 pt-4'>
              <Link
                href='/Admin/Articles-tables?pageNumber=1'
                className='group relative flex justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                <PiArticleNyTimes size={24} />
                <span className='invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Articles
                </span>
              </Link>

              <Link
                href='/Admin/Comments-table'
                className='group relative flex justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                <FaCommentDots size={24} />
                <span className='invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Comments
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSaidBar;
