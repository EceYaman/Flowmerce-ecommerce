import { ChevronRight, LayoutGridIcon,Menu} from "lucide-react";
import { data } from "../../data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useParams,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCard } from "../components/CategoryCard";
import { fetchProducts } from "../store/thunks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ReactPaginate from "react-paginate";

export function ShopPage(){
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const categories = useSelector((state) => state.product.categories);
  const productList = useSelector((state) => state.product.productList);
  const total = useSelector((state) => state.product.total);
  const fetchState = useSelector((state) => state.product.fetchState);

  const top5 = useMemo(() => 
    [...categories]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5),
    [categories]
  );

  const limit = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * limit;
  const pageCount = total ? Math.ceil(total / limit) : 0;

  const [tempSort, setTempSort] = useState("");
  const [tempFilter, setTempFilter] = useState("");
  const [sort, setSort] = useState("");
  const [filterText, setFilterText] = useState("");

  const fetchParams = useMemo(() => ({
    limit,
    offset,
    category: categoryId,
    sort,
    filter: filterText,
  }), [limit, offset, categoryId, sort, filterText]);
  useEffect(() => {
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, fetchParams]);

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryId]);

  const handleFilter = useCallback(() => {
    setFilterText(tempFilter);
    setSort(tempSort);
    setCurrentPage(0); 
  }, [tempFilter, tempSort]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected; 
    setCurrentPage(selectedPage);
  };

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
      <div className="flex flex-col items-center md:flex-row justify-between p-8 md:px-32 md:my-16">
        <p className="text-gray-text text-lg font-medium">Showing {total} results</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-text text-lg font-medium">Views:</p>
          <LayoutGridIcon className="stroke-1 border rounded fill-dark-text"/>
          <Menu className="stroke-1 border rounded"/>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-end">
          <input 
            type="text"
            placeholder="Search products..."
            value={tempFilter}
            onChange={(e) => setTempFilter(e.target.value)}
            className="bg-gray-light p-4 rounded max-w-[30%] md:max-w-[50%]"
          />
          <select
            value={tempSort}
            onChange={(e) => setTempSort(e.target.value)}
            className=" bg-gray-light rounded p-4 max-w-[30%] md:max-w-[50%]"
          >
            <option value="">Suggested Order</option>
            <option value="price:asc">Highest price</option>
            <option value="price:desc">Lowest price</option>
            <option value="rating:asc">Highest Rating</option>
            <option value="rating:desc">Lowest Rating</option>
          </select>
          <button 
            className="btn bg-primary hover:bg-blue-700 text-white"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        
      </div>

        
      <div className="flex flex-col p-8 gap-12 md:grid md:grid-cols-4 md:p-0 md:px-32">
        {fetchState === 'FETCHING' ? (
          <LoadingSpinner />
        ) : (
          productList.length > 0 ? (
            productList.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <p className=" text-gray-text text-xl">
              Ürün bulunamadı...
            </p>
          )
        )}
      </div>

      <div className="flex justify-center items-center my-10 cursor-pointer max-w-[90%] mx-auto ">
        {pageCount > 0 && (
          <ReactPaginate
          breakLabel="..."
          nextLabel="Next>"
          previousLabel="<Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          containerClassName="flex items-center"
          pageLinkClassName="p-2 border border-light-text text-primary"
          previousLinkClassName="p-2 border border-primary text-primary rounded-l-lg"
          nextLinkClassName="p-2 border border-primary text-primary rounded-r-lg"
          activeLinkClassName="bg-primary text-white p-2 border border-primary"
          breakLinkClassName="p-2 border border-light-text text-light-text"
        />
        )}
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