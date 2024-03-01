'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpTrayIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';
import Image from 'next/image';

const TOP_OFFSET = 66;

const Navbar = ({ currentUser }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-20 w-full">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <a href='./'><Image width={100} height={100} src="/images/logo.png" className="object-cover h-4 lg:h-7" alt="Logo" /></a>
        <div className="flex-row hidden ml-8 gap-7 lg:flex">
          {currentUser && (
              <div className='flex gap-x-4'>
                <NavbarItem label="Home " href="/"/>
                <NavbarItem label="Profiles" href="/profiles" />
              </div>
          )}
          {!currentUser && (<NavbarItem label="Login/Signup" href="/auth" />)}
        </div>
        <div onClick={toggleMobileMenu} className="relative flex flex-row items-center gap-2 ml-8 cursor-pointer lg:hidden">
          <p className="text-sm text-white">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row items-center ml-auto gap-7">
          <a href='/search' className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <MagnifyingGlassIcon className="w-6" />
          </a>
          <a href='/upload' className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <ArrowUpTrayIcon className="w-6" />
          </a>
            {currentUser && (<AccountMenu visible={showAccountMenu} currentUser={currentUser} />)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;