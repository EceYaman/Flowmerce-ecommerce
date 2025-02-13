import { data } from "../../data";
import { BlogCard } from "../components/BlogCard";
import { ProductCard } from "../components/ProductCard";
import { ShopCard } from "../components/ShopCard";
import { Slider } from "../components/Slider";

export function HomePage() {
  return (
    <>
      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto">
          <h3 className=" text-dark-text text-3xl font-bold">EDITOR'S PICK</h3>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between</p>
        </div>

        <div className="flex flex-col">
          {data.shop.map((item, index) => (
            <ShopCard 
              key={item.id} 
              item={item} 
              className={index >= data.shop.length - 2 ? 'h-[50vh]' : 'h-auto'} 
            />
          ))}
        </div>
      </div>

      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto">
          <h4 className="text-gray-text text-2xl font-medium">Featured Products</h4>
          <h3 className="text-dark-text text-3xl font-bold">BESTSELLER PRODUCTS</h3>
          <p className="text-gray-text text-lg font-medium ">Problems trying to resolve the conflinct between</p>
        </div>
        <div className="flex flex-col">
          {data.products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Slider />
      <div className="py-16">
        <div className="flex flex-col gap-y-8 text-center max-w-60 mx-auto">
          <h5 className="text-light-text text-xl font-medium">SUMMER 2020</h5>
          <h2 className="text-dark-text text-4xl font-bold">Part Of The Neural Universe</h2>
          <p className="text-gray-text text-xl font-medium">We know how large objects will act, but things on a small scale.
          </p>
          <button className="btn bg-primary">BUY NOW</button>
          <button className="btn border border-primary text-primary">Learn More</button>
        </div>
        <img src="https://placehold.co/430x400" className="w-full mt-8"/>
      </div>

      <div className="py-16"> 
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto">
          <h5 className="text-primary text-xl font-medium">Practice Advice</h5>
          <h2 className="text-dark-text text-5xl font-bold">Featured Products</h2>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between two major</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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