import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, toggleCartItemSelection, updateCartQuantity } from "../store/actions/shoppingCartActions";
import { Trash } from "lucide-react";
import { useHistory } from "react-router-dom";

export function ShoppingCartPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.shoppingCart.cart);

    // Toplam tutar ve toplam ürün adedini hesaplayalım
    const { totalPrice, totalCount } = cart.reduce(
      (acc, item) => {
        if (item.checked) {
          acc.totalPrice += item.product.price * item.count;
          acc.totalCount += item.count;
        }
        return acc;
      },
      { totalPrice: 0, totalCount: 0 }
    );
  
    const handleIncrease = (productId, currentCount) => {
      dispatch(updateCartQuantity(productId, currentCount + 1));
    };
  
    const handleDecrease = (productId, currentCount) => {
      if (currentCount > 1) {
        dispatch(updateCartQuantity(productId, currentCount - 1));
      } else {
        dispatch(removeFromCart(productId));
      }
    };
  
    const handleToggle = (productId) => {
      dispatch(toggleCartItemSelection(productId));
    };

    const handleProceedOrder = () => {
      // Kullanıcıyı Create Order sayfasına yönlendir
      history.push('/create-order');
    };
  
    return (
      <div className="px-8 py-4 md:px-32">
        <h1 className="text-2xl font-bold my-8 text-dark-text">Alışveriş Sepeti</h1>
        {cart.length === 0 ? (
          <p className="text-dark-text">Your shopping cart is empty</p>
        ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-[70%] bg-white rounded shadow ">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-light border-b border-light-text text-dark-text">
                  <th className="py-3 px-4">Seç</th>
                  <th className="py-3 px-4">Ürün</th>
                  <th className="py-3 px-4">Fiyat</th>
                  <th className="py-3 px-4">Adet</th>
                  <th className="py-3 px-4">Toplam</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
              {cart.map(({ product, count, checked }) => {
                const lineTotal = product.price * count;
                return (
                  <tr key={product.id} className="border-b border-light-text">
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox" 
                        checked={checked} 
                        onChange={() => handleToggle(product.id)}
                      />
                    </td>
                    <td className="py-3 px-4 flex items-center gap-4">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <p className="font-medium text-dark-text">{product.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-dark-text">
                      {product.price.toFixed(2)}₺
                    </td>
                    <td className="py-3 px-4 text-dark-text">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleDecrease(product.id, count)} className="w-5 py-1 border rounded">-</button>
                        <span>{count}</span>
                        <button onClick={() => handleIncrease(product.id, count)} className="w-5 py-1 border rounded">+</button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-dark-text">
                      {lineTotal.toFixed(2)}₺
                    </td>
                    <td className="py-3 px-4 text-dark-text">
                      <button onClick={() => dispatch(removeFromCart(product.id))}>
                        <Trash className="w-4"/>
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
  
          {/* Sipariş Özeti Kısmı */}
          <div className="md:w-[30%] bg-white rounded shadow p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-dark-text">Sipariş Özeti</h2>
  
            <div className="flex justify-between mb-2 text-dark-text">
              <span>Seçili Ürün:</span>
              <span>{totalCount} Adet</span>
            </div>
  
            <div className="flex justify-between mb-4 text-dark-text">
              <span>Toplam:</span>
              <span className="font-semibold">
                {totalPrice.toFixed(2)}₺
              </span>
            </div>
  
            <button onClick={handleProceedOrder} className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
              Seçili Ürünleri Satın Al
            </button>
          </div>
        </div>
        )}
      </div>
    )
}