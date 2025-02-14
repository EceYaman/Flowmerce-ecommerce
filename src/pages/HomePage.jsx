import { data } from "../../data";
import { BlogCard } from "../components/BlogCard";
import { ProductCard } from "../components/ProductCard";
import { ShopCard } from "../components/ShopCard";
import { Slider } from "../components/Slider";

export function HomePage() {
  return (
    <>
      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full md:pb-10">
          <h3 className=" text-dark-text text-3xl font-bold">EDITOR'S PICK</h3>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between</p>
        </div>

        
        
        <div className="flex flex-col gap-y-8 px-8 md:flex-row md:px-32 md:gap-x-8">
          <div >
            <ShopCard item={data.shop[0]} />
          </div>
          <div >
            <ShopCard item={data.shop[1]} className="h-[500px]"/>
          </div>
          <div className="flex flex-col gap-y-8 md:gap-y-5">
            <ShopCard item={data.shop[2]} />
            <ShopCard item={data.shop[3]} />
          </div>
        </div>



      </div>

      <div className="py-16">
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full">
          <h4 className="text-gray-text text-2xl font-medium">Featured Products</h4>
          <h3 className="text-dark-text text-3xl font-bold">BESTSELLER PRODUCTS</h3>
          <p className="text-gray-text text-lg font-medium ">Problems trying to resolve the conflinct between</p>
        </div>
        <div className="flex flex-col p-8 gap-y-12 md:grid md:grid-cols-4 md:mx-24 md:gap-4 md:gap-y-12">
          {data.products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Slider />
      <div className="py-16 md:flex md:flex-row-reverse md:mx-32">
        <div className="flex flex-col gap-y-8 text-center max-w-60 mx-auto md:max-w-80 md:text-left md:my-auto">
          <h5 className="text-light-text text-xl font-medium">SUMMER 2020</h5>
          <h2 className="text-dark-text text-4xl font-bold">Part Of The Neural Universe</h2>
          <p className="text-gray-text text-xl">We know how large objects will act, but things on a small scale.
          </p>
        <div className="flex flex-col md:flex-row gap-y-4 md:justify-between">
          <button className="btn bg-primary">BUY NOW</button>
          <button className="btn border border-primary text-primary">Learn More</button>
        </div>  
        </div>
        <img src="https://placehold.co/430x400" className="w-full mt-8 md:w-dvh"/>
      </div>

      <div className="py-16"> 
        <div className="flex flex-col gap-y-4 text-center max-w-60 mx-auto md:max-w-full">
          <h5 className="text-primary text-xl font-medium">Practice Advice</h5>
          <h2 className="text-dark-text text-5xl font-bold">Featured Products</h2>
          <p className="text-gray-text text-lg">Problems trying to resolve the conflinct between two major</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mx-32">
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