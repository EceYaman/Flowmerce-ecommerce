import React, { useState } from 'react';
import { MenuIcon, SearchIcon, ShoppingCartIcon, Phone, Mail, Heart, User2Icon} from 'lucide-react'; 
import { data } from '../../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const user = useSelector((state) => state.client.user);
  console.log('Header user:', user);
  

  return (
    <>
      <div className="hidden md:block bg-dark-text text-white py-4 w-full">
        <div className="container max-w-full mx-auto px-8 flex justify-between items-center text-sm font-medium">

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <p>(223) 555-0118</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <p>michelle.rivera@example.com</p>
            </div>
          </div>

          <p>Follow Us and get a chance to win 85% off</p>

          <div className="flex items-center space-x-4">
            <p>Follow Us:</p>
            <img src='./instagram2.svg'/>
            <img src='./youtube.svg'/>
            <img src='./facebook2.svg'/>
            <img src='./twitter2.svg'/>
          </div>
          
        </div>
      </div>


      <div className="w-full">
        <div className='container max-w-full flex justify-between items-center p-8'>
        <img src={data.header.logo} className="w-32 h-auto"/>

        <nav className='hidden  md:flex md:gap-x-8'>
        {data.header.menu.map((item, index) => (
              <Link key={index} to={item.link} className="text-gray-text hover:text-dark-text text-base">{item.text}</Link>
            ))}
        </nav>

        <nav className="flex gap-x-6">
            {user && user.email ? (
              <div className="flex items-center gap-x-1">
                <Gravatar email={user.email} size={24} className="rounded-full" />
                <span className="hidden md:block md:text-base md:text-primary">{user.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Link to="/login"><User2Icon className="cursor-pointer stroke-1 stroke-primary md:w-5" /></Link>
                <Link to="/login" className="hidden md:block md:text-base md:text-primary md:font-medium">Login</Link>
                <span className="hidden md:block md:text-base md:text-primary md:font-medium">/</span>
                <Link to="/signup" className="hidden md:block md:text-base md:text-primary md:font-medium">Register</Link>
              </div>
            )}
            <SearchIcon className="cursor-pointer stroke-1 stroke-primary md:w-5" />
            <Link to="/shoppingcart"><ShoppingCartIcon className="cursor-pointer stroke-1 stroke-primary md:w-5" /></Link>
            <Link to="/favorites"><Heart className="cursor-pointer stroke-1 stroke-primary md:w-5" /></Link>
            <MenuIcon className="cursor-pointer md:hidden stroke-1 stroke-primary md:w-5" onClick={handleMenuToggle} />
        </nav>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col gap-y-5 my-12 text-xl font-semibold text-center text-gray-text">
            {data.header.menu.map((item, index) => (
              <Link key={index} to={item.link}>{item.text}</Link>
            ))}
          </nav>
       </div>

      
    </>
  );
};
