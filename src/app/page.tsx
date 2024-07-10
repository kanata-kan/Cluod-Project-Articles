import Image from 'next/image';
import Hero from './_component/Home/hero';
import WebHostingPlan from './_component/Home/WebHostingPlan';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className='max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mx-auto'>
        <div className='grid  grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-20'>
          <WebHostingPlan />
          <WebHostingPlan />
          <WebHostingPlan />
        </div>
      </div>
    </div>
  );
}
