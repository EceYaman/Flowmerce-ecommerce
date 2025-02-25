import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, removeFromCart, updateCartQuantity } from "../store/actions/shoppingCartActions";
import { ShoppingCartIcon, Trash } from "lucide-react";

export function ProductCard({ item }){
    const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-dark-text"]

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    const { gender, categoryName, categoryId} = useParams();

    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const cartItem = useSelector((state) =>
        state.shoppingCart.cart.find((cartItem) => cartItem.product.id === item.id)
      );
    
      const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(item));
      };
    
      const handleIncrease = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(updateCartQuantity(item.id, (cartItem?.count || 0) + 1));
      };
    
      const handleDecrease = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartItem.count > 1) {
          dispatch(updateCartQuantity(item.id, cartItem.count - 1));
        } else {
          dispatch(removeFromCart(item.id));
        }
      };

    return(
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link to={`/shop/${gender}/${categoryName}/${categoryId}/${generateSlug(item.name)}/${item.id}`}>
        <div className="flex flex-col gap-y-3 text-center bg-white pb-4 border border-gray-light md:h-[650px] justify-between  shadow-sm">
            <div className="overflow-hidden relative">
            <img src={item.images[0].url} alt="Product" className="transition-transform duration-500 transform hover:scale-125"/>
            </div>
            <h5 className="card-title">{item.name}</h5>
            <h6 className="text-sm text-gray-text">{item.description}</h6>
            <div className="flex justify-center gap-2">
                <h6 className="text-xl font-semibold text-primary">{item.price}₺</h6>
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
        {isHovered && (
            cartItem ? (
            <div className="absolute inset-0 z-50 btn bg-primary flex items-center justify-center text-white text-lg gap-1">
                <button onClick={handleDecrease} className="px-3 py-1 text-lg">-</button>
                <span>{cartItem.count}</span>
                <button onClick={handleIncrease} className="px-3 py-1 text-lg">+</button>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(removeFromCart(item.id)); }}>
                <Trash className="w-4"/>
                </button>
            </div>
            ) : (
            <button 
                onClick={handleAddToCart}
                className="absolute inset-0 z-50 btn bg-primary flex items-center justify-center text-white text-lg gap-1"
            >
                Add to Cart <ShoppingCartIcon className="stroke-2 w-4" />
            </button>
            )
        )}
        </div>
    )
}