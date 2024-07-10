import Link from 'next/link';
import React from 'react';

function Article({ post }) {
  return (
    <div className='border-2 border-blue-600 text-center p-2 m-5 rounded-lg hover:bg-red-200 transition-all'>
      <h2 className='text-slate-950 mb-2 text-lg line-clamp-1 font-bold'>
        {post.title}
      </h2>
      <p className='text-slate-750 mb-2 line-clamp-3'>{post.description}</p>
      <Link
        className=' bg-blue-500 px-3 py-2 rounded-sm text-white hover:bg-red-500 transition-all mb-2 '
        href={`/Articles/${post.id}`}
      >
        Read More
      </Link>
    </div>
  );
}

export default Article;
