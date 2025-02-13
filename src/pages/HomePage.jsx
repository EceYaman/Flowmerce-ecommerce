import { data } from "../../data";
import { ProductCard } from "../components/ProductCard";
import { ShopCard } from "../components/ShopCard";

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
    </>
  );
}