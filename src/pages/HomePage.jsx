import { useDispatch, useSelector } from "react-redux";
import { data } from "../../data";
import { BlogCard } from "../components/BlogCard";
import { ProductCard } from "../components/ProductCard";
import { ShopCard } from "../components/ShopCard";
import { Slider } from "../components/Slider";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/thunks";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function HomePage() {
  const dispatch = useDispatch();
  const { productList, fetchState } = useSelector((state) => state.product);
  const [limitedProducts, setLimitedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
      setLimitedProducts(productList.slice(0, 8)); 
  }, [fetchState, productList]);

  return (
    <>
      <Slider slidesData={data.slides} />
      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full md:pb-10">
          <h3 className="title">EDITOR'S PICK</h3>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between</p>
        </div>

      
        <div className="flex flex-col gap-y-8 px-8 md:flex-row md:px-32 md:gap-x-8">
          <div >
            <ShopCard item={data.shop[0]} />
          </div>
          <div >
            <ShopCard item={data.shop[1]} />
          </div>
          <div>
            <ShopCard item={data.shop[2]} />
          </div>
        </div>

      </div>

      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full">
          <h4 className="text-gray-text text-2xl font-medium">Featured Products</h4>
          <h3 className="title">BESTSELLER PRODUCTS</h3>
          <p className="text-gray-text text-base font-medium ">Problems trying to resolve the conflinct between</p>
        </div>
        <div className="flex flex-col p-8 gap-y-16 md:grid md:grid-cols-4 md:mx-24 md:gap-4 md:gap-y-16">
          {fetchState === 'FETCHING' ? (
            <LoadingSpinner />
          ) : (
            limitedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>

      <Slider slidesData={data.slides2} />
      <div className="mx-8 md:mx-32">
      <div className="container py-16 flex flex-col items-center  gap-10 md:flex-row-reverse md:justify-between">
        <div className="flex flex-col gap-y-8 text-center max-w-60 md:max-w-80 md:text-left">
          <h5 className="text-light-text text-xl font-medium">SUMMER 2020</h5>
          <h2 className="text-dark-text text-4xl font-bold">Part Of The Neural Universe</h2>
          <p className="text-gray-text text-xl">We know how large objects will act, but things on a small scale.
          </p>
        <div className="flex flex-col md:flex-row gap-y-4 md:justify-between">
          <button className="btn bg-primary">BUY NOW</button>
          <button className="btn border border-primary text-primary">Learn More</button>
        </div>  
        </div>
        <img src="https://img.freepik.com/premium-photo/fashionable-young-couple-trendy-urban-casual-clothes-posing-near-wall-street-fashion-handsome-happy-hipster-man-his-girlfriend-wearing-vintage-sunglasses-stylish-denim-outfit_338491-17766.jpg?semt=ais_hybrid&w=740" className="w-dvh"/>
      </div>
      </div>

      <div className="py-16"> 
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full">
          <h5 className="text-primary text-xl font-medium">Practice Advice</h5>
          <h2 className="text-dark-text text-5xl font-bold">Featured Products</h2>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between two major</p>
        </div>
        <div className="flex flex-col gap-y-8 mx-8 md:flex-row md:gap-x-8 mt-8 md:mx-32">
            {data.blog.map((item) => (
              <BlogCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
      </div>
    </>
  );
}