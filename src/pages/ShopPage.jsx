import { ChevronRight, LayoutGridIcon,MenuSquare} from "lucide-react";
import { data } from "../../data";
import { ShopCard } from "../components/ShopCard";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";

export function ShopPage(){
    const [viewType, setViewType] = useState('grid');
    const [sortBy, setSortBy] = useState('popularity');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
  
    const handleNext = () =>
      currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevious = () =>
      currentPage > 1 && setCurrentPage(currentPage - 1);

    const logos = [
        { src: "logo1.svg", alt: "Hooli" },
        { src: "logo2.svg", alt: "Lyft" },
        { src: "logo3.svg", alt: "Logo 3" },
        { src: "logo4.svg", alt: "Stripe" },
        { src: "logo5.svg", alt: "AWS" },
        { src: "logo6.svg", alt: "Reddit" },
      ];

    return (
        <main className="md:px-32">
        <div className="flex flex-col gap-y-12 items-center py-10 md:flex-row md:justify-between">
          <h2 className="text-3xl text-dark-text font-bold">Shop</h2>
          <nav className='flex gap-x-4 '>
          <Link to="/" className="text-dark-text font-semibold text-lg">Home</Link>
          <ChevronRight className="text-gray-text"/>
          <Link to="/shop" className="text-gray-text font-semibold text-lg">Shop</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-y-6 px-8 md:px-0 md:flex-row md:gap-x-4" >
            {data.shop2.map((item) => (
                <ShopCard key={item.id} item={item} />
            ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-0 md:my-16">
        <p className="text-gray-text text-lg font-medium">Shopping all 12 results</p>

      <div className="flex items-center space-x-2">
        <p className="text-gray-text text-lg font-medium">Views:</p>
        <button
          className={`p-2 rounded ${viewType === 'grid' ? '' : ''}`}
          onClick={() => setViewType('grid')}
        >
          <LayoutGridIcon/>
        </button>
        <button
          className={`p-2 rounded ${viewType === 'list' ? '' : ''}`}
          onClick={() => setViewType('list')}
        >
           <MenuSquare/>
        </button>
      </div>

      <div className="flex items-center space-x-2 ">
        <select
          id="sort-by"
          className="border border-gray-300 rounded p-4"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="newest">Newest</option>
          <option value="priceLow">Price (Low to High)</option>
          <option value="priceHigh">Price (High to Low)</option>
        </select>

        <button className="btn bg-primary hover:bg-blue-700 text-white">
        Filter
      </button>
      </div>
    </div>
        
    <div className="flex flex-col p-8 gap-y-12 md:grid md:grid-cols-4  md:gap-8 md:gap-y-8 md:p-0" >
            {data.products2.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </div>

        <div className="flex justify-center items-center mt-4 md:py-8">
      <button
        className={`px-4 py-2 border rounded-l-lg ${
          currentPage === 1 ? "text-gray-400 border-gray-300" : "text-blue-500"
        }`}
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        First
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 border ${
            currentPage === index + 1
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-500 border-gray-300"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`px-4 py-2 border rounded-r-lg ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300"
            : "text-blue-500"
        }`}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>

    <div className="flex flex-col items-center space-y-8 mt-8 md:flex-row md:justify-between">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="w-32 grayscale hover:grayscale-0 transition-all duration-300"
        />
      ))}
    </div>
        </main>
    )
}