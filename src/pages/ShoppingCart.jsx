import { useSelector } from "react-redux";

export function ShoppingCartPage() {
    const cart = useSelector((state) => state.shoppingCart.cart);

    // Toplam tutar ve toplam ürün adedini hesaplayalım
    const { totalPrice, totalCount } = cart.reduce(
      (acc, item) => {
        acc.totalPrice += item.product.price * item.count;
        acc.totalCount += item.count;
        return acc;
      },
      { totalPrice: 0, totalCount: 0 }
    );
  
    return (
      <div className="px-8 py-4 md:px-32">
        <h1 className="text-2xl font-bold my-8 text-dark-text">Alışveriş Sepeti</h1>

        <div className="flex flex-col md:flex-row gap-4">

          <div className="md:w-[70%] bg-white rounded shadow ">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-light border-b border-light-text text-dark-text">
                  <th className="py-3 px-4">Ürün</th>
                  <th className="py-3 px-4">Fiyat</th>
                  <th className="py-3 px-4">Adet</th>
                  <th className="py-3 px-4">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ product, count }) => {
                  const lineTotal = product.price * count;
                  return (
                    <tr key={product.id} className="border-b border-light-text">
                      <td className="py-3 px-4 flex items-center gap-4">
                        {/* Ürün Resmi */}
                        <img
                          src={product.images?.[0]?.url}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                        {/* Ürün Adı */}
                        <div>
                          <p className="font-medium text-dark-text">{product.name}</p>
                        </div>
                      </td>
                      {/* Birim Fiyat */}
                      <td className="py-3 px-4 text-dark-text">
                        {product.price.toFixed(2)}₺
                      </td>
                      {/* Adet */}
                      <td className="py-3 px-4 text-dark-text">
                        {count}
                      </td>
                      {/* Satır Toplamı */}
                      <td className="py-3 px-4 text-dark-text">
                        {lineTotal.toFixed(2)}₺
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
  
            <button className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
              Seçili Ürünleri Satın Al
            </button>
          </div>
        </div>
      </div>
    )
}