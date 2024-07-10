import Link from 'next/link';
import AdminSaidBar from './AdminSaidBar';
import { Metadata } from 'next';

export const metadata = {
  title: 'Admin',
  description: 'This is the Admin page',
};

const Layout = ({ children }) => {
  return (
    <div className='flex w-full said-height'>
      <div>
        <AdminSaidBar />
      </div>
      <div className='w-full overflow-y-scroll'>{children}</div>
    </div>
  );
};

export default Layout;
