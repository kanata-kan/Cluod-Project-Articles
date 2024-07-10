import { getArticlesSearch } from '@/apiCalls/apiArticleCall';
import Article from '@/app/_component/Article/Article';
import React from 'react';

async function SearchPage(props) {
  const search = props.searchParams.searchText;
  const articles = await getArticlesSearch(search);

  return (
    <section className='fix-height m-auto px-5'>
      <h1 className='text-3xl text-gray-800 font-bold mb-5 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
        Search Results for: {search}
      </h1>
      {articles.articles.length > 0 ? (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {articles.articles.map(post => (
            <Article post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <p className='text-xl text-center text-gray-700 mt-10'>
          No articles found matching your search :{' '}
          <span className='text-red-500'>{search}</span>.
        </p>
      )}
    </section>
  );
}

export default SearchPage;
