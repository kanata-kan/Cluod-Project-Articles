'use client';
import Link from 'next/link';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import Pagination from '@/app/_component/Article/Pagination';

function ArticlesTableClient({ articles, pages, pageNumber }) {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            <tr>
              <th className='w-1/3 py-4 px-6 uppercase font-semibold text-sm border-r border-gray-300'>
                Title
              </th>
              <th className='w-1/3 py-4 px-6 uppercase font-semibold text-sm border-r border-gray-300'>
                Description
              </th>
              <th className='py-4 px-6 uppercase font-semibold text-sm'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {articles.map(article => (
              <tr
                key={article.id}
                className='border-t border-gray-300 hover:bg-gray-100 transition-colors duration-200'
              >
                <td className='py-4 px-6'>{article.title}</td>
                <td className='py-4 px-6'>{article.description}</td>
                <td className='py-4 px-6 flex items-center space-x-4'>
                  <Link
                    href={`/Articles/${article.id}`}
                    className='text-blue-500 hover:text-blue-700 transition-colors duration-200'
                  >
                    View Details
                  </Link>
                  <EditButton id={article.id} />
                  <DeleteButton id={article.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-5 flex justify-center'>
        <Pagination
          pages={pages}
          pageNumber={pageNumber}
          route='/Admin/Articles-tables'
        />
      </div>
    </>
  );
}

export default ArticlesTableClient;
