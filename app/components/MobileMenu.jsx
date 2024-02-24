'use client';

const MobileMenu = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute left-0 flex flex-col w-56 py-5 bg-black border-2 border-gray-800 top-8">
      <div className="flex flex-col gap-4">
        <a  href="/" className="px-3 text-center text-white hover:underline">
          Home
        </a>
        <a  href="/profiles" className="px-3 text-center text-white hover:underline">
          Profiles
        </a>
      </div>
    </div>
  )
}

export default MobileMenu;