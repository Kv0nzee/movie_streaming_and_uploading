'use client';

const NavbarItem = ({ label, active, href }) => {
  return (
    <a href={href} className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </a>
  )
}

export default NavbarItem;