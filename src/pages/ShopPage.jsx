import { ChevronRight, LayoutGridIcon,Menu} from "lucide-react";
import { data } from "../../data";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useParams,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCard } from "../components/CategoryCard";
import { fetchProducts } from "../store/thunks";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function ShopPage(){
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const categories = useSelector((state) => state.product.categories);
  const productList = useSelector((state) => state.product.productList);
  const total = useSelector((state) => state.product.total);
  const fetchState = useSelector((state) => state.product.fetchState);
  const top5 = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5); 

    const limit = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * limit;
    const totalPages = 3;

    const [tempSort, setTempSort] = useState('');
    const [tempFilter, setTempFilter] = useState('');
    const [sort, setSort] = useState('');
    const [filterText, setFilterText] = useState('');
  
  
    const handleNext = () =>
      currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevious = () =>
      currentPage > 1 && setCurrentPage(currentPage - 1);

    useEffect(() => {
      const query = {
        limit,
        offset,
        ...(categoryId && { category: categoryId }),
        ...(sort && { sort }),
        ...(filterText && { filter: filterText }),
      };
      dispatch(fetchProducts(query));
    }, [dispatch, categoryId, sort, filterText, offset]);
    return (
        <main>
        <div className="bg-gray-light w-full pb-12">
          <div className="flex flex-col gap-y-12 items-center py-10 md:flex-row md:justify-between md:px-32">
            <h3 className="title">Shop</h3>
            <nav className='flex gap-x-4 '>
            <Link to="/" className="text-dark-text font-semibold text-lg">Home</Link>
            <ChevronRight className="text-gray-text"/>
            <Link to="/shop" className="text-gray-text font-semibold text-lg">Shop</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-y-6 px-8 md:flex-row md:gap-x-4 md:px-32 " >
              {top5.map((item) => (
                  <CategoryCard key={item.id} item={item}/>
              ))}
          </div>
        </div> 
        
        {/* Sort and filter controls */}
      <div className="flex flex-col items-center md:flex-row justify-between p-4 md:px-32 md:my-16">
        <p className="text-gray-text text-lg font-medium">Shopping all {total} results</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-text text-lg font-medium">Views:</p>
          <LayoutGridIcon className="stroke-1 border rounded fill-dark-text"/>
          <Menu className="stroke-1 border rounded"/>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="text"
            placeholder="Search products..."
            value={tempFilter}
            onChange={(e) => setTempFilter(e.target.value)}
            className="bg-gray-light p-4 rounded"
          />
          <select
            value={tempSort}
            onChange={(e) => setTempSort(e.target.value)}
            className=" bg-gray-light rounded p-4"
          >
            <option value="">Suggested Order</option>
            <option value="price:asc">Highest price</option>
            <option value="price:desc">Lowest price</option>
            <option value="rating:asc">Highest Rating</option>
            <option value="rating:desc">Lowest Rating</option>
          </select>
          <button 
            className="btn bg-primary hover:bg-blue-700 text-white"
            onClick={() => {
              setFilterText(tempFilter);
              setSort(tempSort);
            }}
          >
            Filter
          </button>
        </div>
        
      </div>

        
    <div className="flex flex-col p-8 gap-12 md:grid md:grid-cols-4 md:p-0 md:px-32">
        {fetchState === 'FETCHING' ? (
          <LoadingSpinner />
        ) : (
          productList.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        )}
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