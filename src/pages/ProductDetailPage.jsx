import { ChevronRight, Heart, ShoppingCartIcon, StarIcon, Trash } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { data } from "../../data";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, fetchProducts } from "../store/thunks";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart, updateCartQuantity } from "../store/actions/shoppingCartActions";

const detailData = {
    image:"https://placehold.co/350x420",
    title:"the quick fox jumps over",
    text:["Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.", "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.", "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."],
    title2:"the quick fox jumps over",
    list:["the quick fox jumps over the lazy dog", "the quick fox jumps over the lazy dog", "the quick fox jumps over the lazy dog", "the quick fox jumps over the lazy dog",],
    title3:"the quick fox jumps over",
    list2:["the quick fox jumps over the lazy dog", "the quick fox jumps over the lazy dog", "the quick fox jumps over the lazy dog",],
}


export function ProductDetailPage() {
  const { productId } = useParams(); 
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetail);
  const { productList, fetchState } = useSelector((state) => state.product);
  const [limitedProducts, setLimitedProducts] = useState([]);

  const cartItem = useSelector(state =>
    state.shoppingCart.cart.find(item => item.product.id === product?.id)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
      setLimitedProducts(productList.slice(0, 8)); 
  }, [fetchState, productList]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  if (fetchState === "FETCHING") {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-dark-text"]

  const handleIncrease = () => {
    if (!cartItem) {
      dispatch(addToCart(product));
    } else {
      dispatch(updateCartQuantity(product.id, cartItem.count + 1));
    }
  };
  
  const handleDecrease = () => {
    if (!cartItem || cartItem.count === 0) return;
    if (cartItem.count > 1) {
      dispatch(updateCartQuantity(product.id, cartItem.count - 1));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };
  return(
    <>
      <div className="bg-gray-light w-full p-8  md:px-32">
        <nav className='flex justify-center gap-x-4 py-10 md:justify-start'>
        <Link to="/" className="text-dark-text font-semibold text-lg">Home</Link>
        <ChevronRight className="text-gray-text"/>
        <Link to="/shop" className="text-gray-text font-semibold text-lg">Shop</Link>
        </nav>

        <div className="flex flex-col gap-y-8 md:flex-row  md:gap-x-16 md:items-center">
          <img src={product.images[0]?.url} alt="Product" className=" md:max-w-[35%]"/>

          <div>
            <h5 className="card-title">{product.name}</h5>
            <div className="flex items-center gap-1">
              <StarIcon className="text-yellow-500 fill-yellow-500 w-4" />
              <p className="text-base font-medium text-gray-text">{product. rating}</p>
            </div>
            <h3 className="title mt-8">{product.price}₺</h3>
            <p className="text-base font-medium text-gray-text mb-8">
              Stock: <span className="text-primary">{product. stock}</span>
            </p>
            <p className="text-base text-gray-text">{product.description}</p>
            <hr className="text-light-text border my-4 "></hr>
            <div className="flex justify-star gap-2">
                {colors.map((item, index) => (
                <span
                    key={index}
                    className={`w-5 h-5 rounded-full ${item}`} 
                />
                ))}
            </div>
            
            <div className="flex gap-6 items-center py-12">
            <div className="flex items-center gap-4 text-dark-text">
              <button onClick={handleDecrease} className="text-lg w-5 py-3 border rounded border-light-text">-</button>
              <span>{cartItem ? cartItem.count : 0}</span>
              <button onClick={handleIncrease} className="text-lg w-5 py-3 border rounded border-light-text">+</button>
              {cartItem && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromCart(product.id));
                  }}
                >
                  <Trash className="w-5" />
                </button>
              )}
            </div>

            {/* Add to Cart Butonu */}
            <button 
              onClick={() => dispatch(addToCart(product))}
              className="btn bg-primary w-[85%] md:w-96 flex items-center justify-center text-lg gap-2"
            >
              Add to Cart <ShoppingCartIcon className="stroke-2 w-4" />
            </button>
              <Heart className="stroke-2 text-primary"/>
            </div>
          </div>

        </div>
      </div>

      <div className="px-8 md:px-32">
        <nav className="text-gray-text text-lg font-medium flex justify-between pt-10 md:justify-center md:gap-16">
          <Link to="#description" className="underline">Description</Link>
          <Link to="#additional">Additional Information</Link>
          <Link to="#reviews">Reviews</Link>
        </nav>

        <div className="flex flex-col gap-10 py-10 md:flex-row md:justify-between md:items-center">
          <img src={detailData.image} alt={product.title} className="rounded-lg"/>
          <div className="flex flex-col gap-6 md:max-w-[30%]">
            <h3 className="title">{detailData.title}</h3>
            {detailData.text.map((item,index) => (
              <p key={index} className="text-base text-gray-text max-w-[90%] ">{item}</p>
            ))}
            
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="title">{detailData.title2}</h3>
              {detailData.list2.map((item,index) => (
                <ul key={index}  className="flex">
                  <ChevronRight className="stroke-1 text-gray-text"/> 
                  <li className="text-base text-gray-text ">{item}</li>
                </ul>
              ))}

            </div>

            <div className="flex flex-col gap-6">
              <h3 className="title">{detailData.title3}</h3>
              {detailData.list2.map((item,index) => (
                <ul key={index}  className="flex">
                  <ChevronRight className="stroke-1 text-gray-text"/> 
                  <li className="text-base text-gray-text ">{item}</li>
                </ul>
              ))}
              
            </div>
          </div>
        </div>

      </div>


      <div className="bg-gray-light w-full px-8 py-12 md:px-32">
        <h3 className="title mb-8">BESTSELLER PRODUCTS</h3>
        <div className="flex flex-col  gap-y-16 md:grid md:grid-cols-4  md:gap-4 md:gap-y-16">
          {limitedProducts.map((item, index) => (
              <div key={item.id} className={`${index >= 4 ? 'hidden md:block' : ''}`}>
                <ProductCard item={item}/>
              </div>
          ))}

        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-8 mt-24 md:flex-row md:justify-between md:px-32">
        {data.brandLogos.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className="w-20"
          />
        ))}
      </div>

    </>
  )
}