import { Link } from "react-router-dom";

export function ProductCard({ item }){
 return(
        <>
        <Link to={`/product/${item.id}`}>
        <div className="flex flex-col gap-y-5 text-center bg-white pb-2">
            <img src={item.image} alt="Product" />
            <h5 className="card-title">{item.title}</h5>
            <h6 className="card-subtitle text-gray-text">{item.subtitle}</h6>
            <div className="flex justify-center gap-2">
                <h6 className="card-subtitle text-light-text ">{item.price.original}</h6>
                <h6 className="card-subtitle text-secondary">{item.price.discount}</h6>
            </div>
            <div className="flex justify-center gap-2">
                {item.colors.map((item, index) => (
                <span
                    key={index}
                    className={`w-4 h-4 rounded-full ${item}`} 
                />
                ))}
            </div>
        </div>
        </Link>
        </>
    )
}