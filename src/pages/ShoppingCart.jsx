import { useSelector } from "react-redux";

export function ShoppingCartPage() {
    const cart = useSelector((state) => state.shoppingCart.cart);
    return(
        <div className="px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>No products in cart.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.product.id} className="mb-4 border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>Quantity: {item.count}</p>
                </div>
                <div>
                  <p>{item.product.price}₺</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}