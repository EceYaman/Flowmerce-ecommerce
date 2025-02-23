import { Link } from "react-router-dom";

export function ProductCard({ item }){
    const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-dark-text"]
    return(
        <>
        <Link to={`/product/${item.id}`}>
        <div className="flex flex-col gap-y-3 text-center bg-white pb-4 border border-gray-light md:h-[670px] justify-between hover:scale-105 transform transition-transform duration-300 shadow-sm">
            <img src={item.images.map((i) => i.url)} alt="Product" />
            <h5 className="card-title">{item.name}</h5>
            <h6 className="text-base text-gray-text">{item.description}</h6>
            <div className="flex justify-center gap-2">
                <h6 className="text-xl font-semibold text-primary">{item.price}₺</h6>
            </div>
            <div className="flex justify-center gap-2">
                {colors.map((item, index) => (
                <span
                    key={index}
                    className={`w-5 h-5 rounded-full ${item}`} 
                />
                ))}
            </div>
        </div>
        </Link>
        </>
    )
}