import React, { useState } from 'react';
import { MenuIcon, UserIcon, SearchIcon, ShoppingCartIcon, Phone, Mail, Heart, } from 'lucide-react'; 
import { data } from '../../data';
import { Slider } from '../components/Slider';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="hidden md:block bg-dark-text text-white py-2">
        <div className="container mx-auto px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>(223) 555-0118</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          <p>Follow Us and get a chance to win 85% off</p>
          <div className="flex items-center space-x-4">
            <p>Follow Us:</p>
            <div className="flex items-center space-x-3">
              <img src='./public/instagram2.svg'/>
              <img src='./public/youtube.svg'/>
              <img src='./public/facebook2.svg'/>
              <img src='./public/twitter2.svg'/>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full flex justify-between items-center p-8">
        <img src={data.header.logo} className="w-32 h-auto"/>

        <nav className='hidden  md:flex md:gap-x-8'>
          <Link to="/" className="text-gray-text hover:text-dark-text">Home</Link>
          <Link to="/shop" className="text-gray-text hover:text-dark-text">Shop</Link>
          <Link to="/about" className="text-gray-text hover:text-dark-text">About</Link>
          <Link to="/blog" className="text-gray-text hover:text-dark-text">Blog</Link>
          <Link to="/contact" className="text-gray-text hover:text-dark-text">Contact</Link>
          <Link to="/pages" className="text-gray-text hover:text-dark-text">Pages</Link>
        </nav>

        <nav className="flex gap-x-6">
            <UserIcon className="cursor-pointer" />
            <p className='hidden md:block md:text-lg md:text-primary'>Login/Register</p>
            <SearchIcon className=" cursor-pointer" />
            <ShoppingCartIcon className="cursor-pointer" />
            <MenuIcon className="cursor-pointer md:hidden" onClick={handleMenuToggle} />
            <Heart className="hidden md:block md:cursor-pointer" />
        </nav>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col gap-y-5 my-12 text-xl font-semibold text-center text-gray-text">
            {data.header.menu.map((item, index) => (
              <a key={index} href={item.href}>{item.text}</a>
            ))}
          </nav>
       </div>

      
    </div>
  );
};
