import { ChevronRight, EyeIcon, Heart, ShoppingCartIcon, StarHalf, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "../components/Slider";
import { data } from "../../data";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export function ProductDetailPage() {
  const limitedProducts = data.products.slice(0, 4);
  const { id } = useParams(); 
  const product = data.products.find((product) => product.id === parseInt(id)); 

  if (!product) {
    return <div>Product not found!</div>;
  }

  return(
    <>
      <div className="bg-gray-light w-full px-8 ">
        <nav className='flex justify-center gap-x-4 py-10 md:px-32'>
        <Link to="/" className="text-dark-text font-semibold text-lg">Home</Link>
        <ChevronRight className="text-gray-text"/>
        <Link to="/shop" className="text-gray-text font-semibold text-lg">Shop</Link>
        </nav>

        <div className="flex flex-col gap-y-8 md:flex-row mt-10">
          <Slider slidesData={product.slides}/>

          <div className="">
            <h5 className="card-title">{product.title}</h5>

            <div className="flex gap-4 my-4">
              <div className="flex gap-1">
                <StarIcon className="stroke-yellow-500 fill-yellow-500 stroke-1 w-5"/>
                <StarIcon className="stroke-yellow-500 fill-yellow-500 stroke-1 w-5"/>
                <StarIcon className="stroke-yellow-500 fill-yellow-500 stroke-1 w-5"/>
                <StarIcon className="stroke-yellow-500 fill-yellow-500 stroke-1 w-5"/>
                <StarIcon className="stroke-yellow-500 stroke-1 w-5"/>
              </div>
              <p className="text-base font-semibold text-gray-text">{product. review}</p>
            </div>

            <h3 className="h3">{product.price.discount}</h3>
            <p className="text-base font-semibold text-gray-text mb-8">
              Availability : <span className="text-primary">{product. stock}</span>
            </p>
            <p className="text-base text-gray-text font-medium max-w-[85%]">{product.info}</p>
            <hr className="text-light-text border my-4"></hr>
            <div className="flex gap-2">
              {product.colors.map((item, index) => (
              <span
                  key={index}
                  className={`w-7 h-7 rounded-full ${item}`} 
              />
              ))}
            </div>
            <div className="flex gap-6 items-center py-12">
              <button className="btn bg-primary">Select Options</button>
              <Heart className="stroke-1"/>
              <ShoppingCartIcon className="stroke-1" />
              <EyeIcon className="stroke-1" />
            </div>
          </div>

        </div>
      </div>

      <div className="px-8">
        <nav className="text-gray-text text-lg font-medium flex justify-between pt-10">
          <Link to="#description">Description</Link>
          <Link to="#additional">Additional Information</Link>
          <Link to="#reviews">Reviews</Link>
        </nav>

        <div className="flex flex-col gap-12 py-10">
          <img src={product.descImage} alt={product.title} className="rounded-lg"/>
          <div className="flex flex-col gap-6">
            <h3 className="h3">{product.descTitle}</h3>
            {product.descText.map((item,index) => (
              <p key={index} className="text-base text-gray-text font-medium max-w-[85%]">{item}</p>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h3 className="h3">{product.descTitle2}</h3>
              {product.descList.map((item,index) => (
                <ul key={index}  className="flex">
                  <ChevronRight className="stroke-1 text-gray-text"/> 
                  <li className="text-base text-gray-text font-medium">{item}</li>
                </ul>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="h3">{product.descTitle3}</h3>
              {product.descList2.map((item,index) => (
                <ul key={index}  className="flex">
                  <ChevronRight className="stroke-1 text-gray-text"/> 
                  <li className="text-base text-gray-text font-medium">{item}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

      </div>


      <div className="bg-gray-light px-8 py-12 md:mx-24">
        <h3 className="h3">BESTSELLER PRODUCTS</h3>
        <hr className="text-light-text border my-8"></hr>
        <div className="flex flex-col  gap-y-16 md:grid md:grid-cols-4  md:gap-4 md:gap-y-16">
          {limitedProducts.map((item) => (
            <ProductCard key={item.id} item={item}/>
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