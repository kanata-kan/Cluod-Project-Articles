import Link from 'next/link';

function Pagination({ pageNumber, route, pages }) {
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  return (
    <ol className='flex justify-center gap-1 text-xs font-medium'>
      <li>
        <Link
          href={`${route}?pageNumber=${Math.max(pageNumber - 1, 1)}`}
          className='inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
        >
          <span className='sr-only'>Prev Page</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </li>
      {pagesArray.map(page => (
        <li key={page}>
          <Link
            href={`${route}?pageNumber=${page}`}
            className={`block size-8 rounded border border-primary-500 bg-white text-center leading-8 ${
              page === parseInt(pageNumber)
                ? 'text-primary-500 bg-slate-400'
                : 'text-gray-900'
            }`}
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={`${route}?pageNumber=${Math.min(
            parseInt(pageNumber) + 1,
            pages,
          )}`}
          className='inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
        >
          <span className='sr-only'>Next Page</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </li>
    </ol>
  );
}

export default Pagination;
