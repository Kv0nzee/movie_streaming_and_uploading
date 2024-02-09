import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const AccountMenu = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Menu as="div" className="relative z-10 w-36">
      <Menu.Button
        className="flex items-center rounded-md outline-none"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <Image width={32} height={32} className="w-8 rounded-md" src={currentUser.image ? currentUser.image : "/images/default-blue.png"} alt="pict" />
        <p className="ml-4 text-sm text-white text-nowrap">{currentUser?.name}</p>
        <ChevronDownIcon  className={`w-4 text-white fill-white transition ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
      </Menu.Button>
      <Transition
        show={isMenuOpen}
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="div"
          className="absolute flex flex-col w-56 py-2 mt-1 bg-black border-2 border-gray-800 -right-10"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-800' : 'bg-black'
                } block px-4 py-2 text-sm text-white w-full text-left outline-none`}
                onClick={() => signOut()}
              >
                Sign out of Netflix
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccountMenu;