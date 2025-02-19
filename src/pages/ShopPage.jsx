import { ChevronRight, LayoutGridIcon,Menu} from "lucide-react";
import { data } from "../../data";
import { ShopCard } from "../components/ShopCard";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";

export function ShopPage(){
    const limitedProducts = data.products.slice(0, 12);
    const [sortBy, setSortBy] = useState('popularity');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
  
    const handleNext = () =>
      currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevious = () =>
      currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <main>
        <div className="bg-gray-light w-full pb-12">
        <div className="flex flex-col gap-y-12 items-center py-10 md:flex-row md:justify-between md:px-32">
          <h3 className="h3">Shop</h3>
          <nav className='flex gap-x-4 '>
          <Link to="/" className="text-dark-text font-semibold text-lg">Home</Link>
          <ChevronRight className="text-gray-text"/>
          <Link to="/shop" className="text-gray-text font-semibold text-lg">Shop</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-y-6 px-8 md:flex-row md:gap-x-4 md:px-32" >
            {data.shop2.map((item) => (
                <ShopCard key={item.id} item={item} />
            ))}
        </div>
        </div> 

        <div className="flex flex-col gap-y-6 md:flex-row items-center justify-between p-4 md:p-0 md:my-16 md:px-32">
        <p className="text-gray-text text-lg font-medium">Shopping all 12 results</p>

      <div className="flex items-center space-x-2 md:px-32">
        <p className="text-gray-text text-lg font-medium">Views:</p>
        <LayoutGridIcon className="stroke-1 border"/>
        <Menu className="stroke-1 border"/>
      </div>

      <div className="flex items-center space-x-2 ">
        <select
          id="sort-by"
          className="border bg-gray-light border-light-text rounded p-4"
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
        
        <div className="flex flex-col p-8 gap-12 md:grid md:grid-cols-4 md:p-0 md:px-32" >
          {limitedProducts.map((item, index) => (
            <div key={item.id} className={`${index >= 4 ? 'hidden md:block' : ''}`}>
              <ProductCard item={item}/>
            </div>
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

    <div className="flex flex-col items-center space-y-8 mt-24 md:flex-row md:justify-between md:px-32">
      {data.brandLogos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="w-20"
        />
      ))}
    </div>
        </main>
    )
}