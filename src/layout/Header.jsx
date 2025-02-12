import React, { useState } from 'react';
import { MenuIcon, UserIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react'; 
import { data } from '../../data';
import { Slider } from '../components/Slider';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center p-8">
        <img src={data.header.logo} className="w-32 h-auto"/>

        <nav className="flex gap-x-6">
            <UserIcon className="cursor-pointer" />
            <SearchIcon className=" cursor-pointer" />
            <ShoppingCartIcon className="cursor-pointer" />
            <MenuIcon className="cursor-pointer" onClick={handleMenuToggle} />
        </nav>
      </div>

        {isMenuOpen && (
            <nav className="flex flex-col gap-y-5 my-12 text-xl font-semibold text-center text-gray-text">
            {data.header.menu.map((item, index) => (
              <a key={index} href={item.href}>{item.text}</a>
            ))}
          </nav>
        )}

      <Slider/>
    </div>
  );
};
