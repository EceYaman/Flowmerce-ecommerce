import React, { useState, useRef } from 'react';
import { MenuIcon, SearchIcon, ShoppingCartIcon, Phone, Mail, Heart, User2Icon, ChevronDown} from 'lucide-react'; 
import { data } from '../../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export function Header() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cart = useSelector((state) => state.shoppingCart.cart);

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
  
  const closeCartTimerRef = useRef(null);
  const closeShopTimerRef = useRef(null);

  const toggleDropdown = (setState, ref, isOpen) => {
    if (isOpen) {
      if (ref.current) clearTimeout(ref.current);
      setState(true);
    } else {
      ref.current = setTimeout(() => {
        setState(false);
      }, 300);
    }
  };

  // Cart aç/kapat
  const openCart = () => toggleDropdown(setIsCartOpen, closeCartTimerRef, true);
  const closeCart = () => toggleDropdown(setIsCartOpen, closeCartTimerRef, false);

  // Shop aç/kapat
  const openShop = () => toggleDropdown(setIsShopOpen, closeShopTimerRef, true);
  const closeShop = () => toggleDropdown(setIsShopOpen, closeShopTimerRef, false);

  const handleProceedOrder = () => {
    history.push('/create-order');
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

        <nav className="hidden md:flex md:gap-x-8" onMouseEnter={openShop} onMouseLeave={closeShop}>
        {data.header.menu.map((item, index) => {
          if (item.text === 'Shop') {
            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                {/* Buton yerine sade metin olarak gösteriyoruz */}
                <div className="flex items-center gap-2 text-gray-text hover:text-primary text-base cursor-pointer">
                  {item.text}
                  <ChevronDown className="w-5 h-5" />
                </div>
                {isShopOpen && (
                  <div className="absolute left-0 top-full bg-white shadow-lg z-50 p-6 min-w-[200px] pr-20">
                    <div className="flex gap-x-16">
                      {/* Kadın Kategoriler */}
                      <div>
                        <Link
                          to="/shop/kadin"
                          className="font-bold text-dark-text mb-3 block hover:text-primary"
                        >
                          Kadın
                        </Link>
                        <ul className="space-y-2">
                          {kadinCategories.map((cat) => {
                            const routeTitle = formatTitle(cat.title);
                            return (
                              <li key={cat.id}>
                                <Link
                                  to={`/shop/${genderToText(cat.gender)}/${routeTitle}/${cat.id}`}
                                  className="text-gray-text hover:text-primary"
                                >
                                  {cat.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* Erkek Kategoriler */}
                      <div>
                        <Link
                          to="/shop/erkek"
                          className="font-bold text-dark-text mb-3 block hover:text-primary"
                        >
                          Erkek
                        </Link>
                        <ul className="space-y-2">
                          {erkekCategories.map((cat) => {
                            const routeTitle = formatTitle(cat.title);
                            return (
                              <li key={cat.id}>
                                <Link
                                  to={`/shop/${genderToText(cat.gender)}/${routeTitle}/${cat.id}`}
                                  className="text-gray-text hover:text-primary"
                                >
                                  {cat.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <Link
                      to="/shop"
                      className="font-bold text-dark-text block hover:text-primary mt-6"
                    >
                      Tüm Ürünleri Gör
                    </Link>
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
            
            <div
              className="relative"
              onMouseEnter={openCart}
              onMouseLeave={closeCart}
            >
              {/* Sepet İkonu */}
              <div className="cursor-pointer relative">
                <Link to="/shoppingcart">
                  <ShoppingCartIcon className="w-6 h-6 stroke-1 stroke-primary" />
                </Link>
                {cart?.length > 0 && (
                  <span className="absolute top-[-6px] right-[-6px] bg-alert text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>

              {/* Açılır Dropdown */}
              {isCartOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 bg-white shadow-md z-50 p-4"
                  onMouseEnter={openCart}  // Dropdown'a da mouse enter ekleyerek kapanmayı iptal ediyoruz
                  onMouseLeave={closeCart}
                >
                  <h3 className="font-bold mb-2">Sepetim ({cart.length} Ürün)</h3>
                  <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
                    {cart.map(({ product, count }) => (
                      <div key={product.id} className="flex gap-2">
                        <img
                          src={product.images?.[0]?.url}
                          alt={product.name}
                          className="w-14 h-14 object-cover"
                        />
                        <div className="flex flex-col">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {product.price.toFixed(2)} TL x {count}
                          </p>
                          <p className="text-sm text-gray-900 font-semibold">
                            {(product.price * count).toFixed(2)} TL
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to="/shoppingcart"
                      className="bg-gray-200 text-dark-text px-4 py-2 rounded hover:bg-gray-300"
                    >
                      Sepete Git
                    </Link>
                    <button onClick={handleProceedOrder} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
                      Siparişi Tamamla
                    </button>
                  </div>
                </div>
              )}
            </div>

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
