import React, { useState } from 'react';
import { MenuIcon, SearchIcon, ShoppingCartIcon, Phone, Mail, Heart, User2Icon, ChevronDown} from 'lucide-react'; 
import { data } from '../../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  const kadinCategories = categories.filter(cat => cat.gender === 'k');
  const erkekCategories = categories.filter(cat => cat.gender === 'e');

  const genderToText = (g) => (g === 'k' ? 'kadin' : 'erkek');

  const formatTitle = (title) => {
    return title
      .toLowerCase()
      .replace('ı', 'i')
      .replace('ç', 'c')
      .replace('ş', 's')
      .replace('ğ', 'g')
      .replace('ü', 'u')
      .replace('ö', 'o')
      .replace(/[^a-z0-9]/gi, ''); 
  };
  

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

        <nav className="hidden md:flex md:gap-x-8">
          {data.header.menu.map((item, index) => {
            if (item.text === 'Shop') {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => setIsShopOpen(!isShopOpen)}
                    className="text-gray-text hover:text-primary text-base focus:outline-none flex items-center gap-2"
                  >
                    {item.text}
                    <ChevronDown className='w-5 h-5'/>
                  </button>
                  {isShopOpen && (
                    <div className='absolute left-0 top-full mt-2 bg-white shadow-lg z-50 p-6 min-w-[200px] pr-20'>
                      
                      <div className="flex gap-x-16 ">
                        {/* KADIN KATEGORİLER */}
                        <div>
                        <Link to="/shop/kadin" className="font-bold text-dark-text mb-3 block hover:text-primary">Kadın</Link>
                          <ul className="space-y-2">
                            {kadinCategories.map(cat => {
                              const routeTitle = formatTitle(cat.title);
                              return (
                                <li key={cat.id}>
                                  <Link to={`/shop/${genderToText(cat.gender)}/${routeTitle}/${cat.id}`} className="text-gray-text hover:text-primary" onClick={() => setIsShopOpen(false)}>
                                    {cat.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {/* ERKEK KATEGORİLER */}
                        <div>
                          <Link to="/shop/erkek" className="font-bold text-dark-text mb-3 block hover:text-primary">Erkek</Link>
                          <ul className="space-y-2">
                            {erkekCategories.map(cat => {
                              const routeTitle = formatTitle(cat.title);
                              return (
                                <li key={cat.id}>
                                  <Link to={`/shop/${genderToText(cat.gender)}/${routeTitle}/${cat.id}`} className="text-gray-text hover:text-primary" onClick={() => setIsShopOpen(false)} >
                                    {cat.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        
                      </div>

                      <Link to="/shop" className="font-bold text-dark-text block hover:text-primary mt-6">Tüm Ürünleri Gör</Link>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className="text-gray-text hover:text-primary text-base"
                >
                  {item.text}
                </Link>
              );
            }
          })}
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
