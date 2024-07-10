import Image from 'next/image';
import React from 'react';
import { TiTick } from 'react-icons/ti';
import cloud from '../../../../public/cloud-hosting.png';
function Hero() {
  return (
    <section>
      <div className='md:ml-20 max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='bg-primary-300 p-8 md:p-12 lg:px-16 lg:py-24'>
            <div className='mx-auto max-w-xl text-center'>
              <h2 className='text-2xl font-bold text-white md:text-3xl'>
                Cloud Hosting
              </h2>

              <p className='hidden text-white/90 sm:mt-4 sm:block'>
                The best web hosting for your online success
              </p>

              <div className='mt-4 md:mt-8'>
                <h3 className='flex items-center text-white mb-3'>
                  <TiTick />
                  Easy To Use Control Panel
                </h3>
                <h3 className='flex items-center text-white mb-3'>
                  <TiTick />
                  Secure Hosting
                </h3>
                <h3 className='flex items-center text-white mb-3'>
                  <TiTick />
                  Website Maintenance
                </h3>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <Image
              src={cloud}
              width={400}
              height={400}
              alt='cloud'
              className='max-w-full max-h-full object-contain'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
