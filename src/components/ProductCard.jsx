import { Link } from "react-router-dom";

export function ProductCard({ item }){
    const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-dark-text"]
    return(
        <>
        <Link to={`/product/${item.id}`}>
        <div className="flex flex-col gap-y-5 text-center bg-white pb-2">
            <img src={item.images.map((i) => i.url)} alt="Product" />
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle text-gray-text">{item.name}</h6>
            <div className="flex justify-center gap-2">
                <h6 className="card-subtitle text-light-text ">{item.price}</h6>
                <h6 className="card-subtitle text-secondary">{item.price}</h6>
            </div>
            <div className="flex justify-center gap-2">
                {colors.map((item, index) => (
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