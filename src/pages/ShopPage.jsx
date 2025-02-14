import { LayoutGridIcon,MenuSquare} from "lucide-react";
import { data } from "../../data";
import { ShopCard } from "../components/ShopCard";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";

export function ShopPage(){
    const [viewType, setViewType] = useState('grid');
    const [sortBy, setSortBy] = useState('popularity');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
  
    // Sayfa geçiş fonksiyonları
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
        <>
        <div className="flex flex-col gap-y-6 mx-8" >
            {data.shop2.map((item) => (
                <ShopCard key={item.id} item={item} />
            ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between p-4">
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

      <div className="flex items-center space-x-2">
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
        
    <div className="flex flex-col p-8 gap-y-12 md:grid md:grid-cols-4 md:mx-24 md:gap-4 md:gap-y-12" >
            {data.products2.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </div>

        <div className="flex justify-center items-center mt-4 ">
      {/* First button */}
      <button
        className={`px-4 py-2 border rounded-l-lg ${
          currentPage === 1 ? "text-gray-400 border-gray-300" : "text-blue-500"
        }`}
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        First
      </button>

      {/* Page numbers */}
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

      {/* Next button */}
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

    <div className="flex flex-col items-center space-y-8 mt-8">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="w-32 grayscale hover:grayscale-0 transition-all duration-300"
        />
      ))}
    </div>
        </>
    )
}