import { data } from "../../data";

export function ProductCard(){
 return(
        <div className="flex flex-col gap-y-5 text-center px-8">
            <img src={data.products.imgSrc} alt="Product" />
            <h3 className="title">{data.products.title}</h3>
            <h4 className="subtitle text-gray-text">{data.products.subtitle}</h4>
            <div className="flex justify-center gap-2">
                <h4 className="subtitle text-light-text ">{data.products.price.original}</h4>
                <h4 className="subtitle text-secondary">{data.products.price.discount}</h4>
            </div>
            <div className="flex justify-center gap-2">
                {data.products.colors.map((item, index) => (
                <span
                    key={index}
                    className={`w-5 h-5 rounded-full ${item}`} 
                />
                ))}
            </div>
        </div>
    )
}