import React from 'react';
import module from './header.module.css';
import NavBar from '../NavBar';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '../../utils/verifyToken';
import Logout from '../../(user)/Login/Logout';

function Header() {
  const jwtToken = cookies().get('jwtToken')?.value || '';
  const payload = verifyTokenForPage(jwtToken);
  return (
    <div className={`${module.container} bg-primary-100`}>
      <NavBar isAdmin={payload?.isAdmin} />
      <div className={module.btns}>
        {payload ? (
          <>
            <strong>{payload.username}</strong>
            <Logout />
          </>
        ) : (
          <>
            <button className={module.btn}>
              <Link href={'/Login'}>LogIn</Link>
            </button>
            <button className={module.btn}>
              <Link href={'/Register'}>Register</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
