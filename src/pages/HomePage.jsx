import { data } from "../../data";
import { BlogCard } from "../components/BlogCard";
import { ProductCard } from "../components/ProductCard";
import { ShopCard } from "../components/ShopCard";
import { Slider } from "../components/Slider";

export function HomePage() {
  return (
    <>
      <div className="flex flex-col">
        {data.shop.map((item, index) => (
          <ShopCard 
            key={item.id} 
            item={item} 
            className={index >= data.shop.length - 2 ? 'h-[50vh]' : 'h-auto'} 
          />
        ))}
      </div>

      <div className="flex flex-col">
        {data.products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <Slider />

       
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.blog.map((item) => (
            <BlogCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
    </>
  );
}