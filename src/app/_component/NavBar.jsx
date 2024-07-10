'use client';
import React, { useState } from 'react';
import { PiCodesandboxLogoDuotone } from 'react-icons/pi';
import Link from 'next/link';
import module from './header/header.module.css';
import { TiThMenuOutline } from 'react-icons/ti';
import Logo from './Logo';

function NavBar({ isAdmin }) {
  const [toggle, setToggel] = useState(false);

  return (
    <nav className={module.nav}>
      <div className={module.content}>
        <h1 className={module.menu}>
          <TiThMenuOutline
            onClick={() => {
              setToggel(!toggle);
            }}
          />
        </h1>
        <Logo />
        <div
          className={module.menuDiv}
          style={{
            transition: 's0.5',
            opacity: toggle ? '1' : '',
            position: 'absolute',
          }}
        >
          <ul className={module.list}>
            <li className={module.item}>
              <Link
                onClick={() => {
                  setToggel(false);
                }}
                href='/'
                passHref
              >
                <span className={module.link}>Home</span>
              </Link>
            </li>
            <li className={module.item}>
              <Link
                onClick={() => {
                  setToggel(false);
                }}
                href='/Articles?pageNumber=1'
                passHref
              >
                <span className={module.link}>Articles</span>
              </Link>
            </li>
            <li className={module.item}>
              {isAdmin && (
                <Link
                  onClick={() => {
                    setToggel(false);
                  }}
                  href='/Admin'
                  passHref
                >
                  <span className={module.link}>Admin dashboard</span>
                </Link>
              )}
            </li>
            <li className={module.item}>
              <Link
                onClick={() => {
                  setToggel(false);
                }}
                href='/About'
                passHref
              >
                <span className={module.link}>About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
