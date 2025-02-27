import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export function PreviousOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // GET isteğiyle siparişleri çekiyoruz
  const fetchOrders = async () => {
    try {
      const response = await api.get('/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    }
  };

  // Collapsable panel için açma/kapama fonksiyonu
  const toggleOrderDetails = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  return (
    <div className="px-8 py-4 md:px-32">
      <h1 className="text-2xl font-bold my-8 text-dark-text">Geçmiş Siparişlerim</h1>
      {orders.length === 0 ? (
        <p>Henüz siparişiniz bulunmamaktadır.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-light">
                <th className="border p-2">Sipariş No</th>
                <th className="border p-2">Sipariş Tarihi</th>
                <th className="border p-2">Toplam Tutar</th>
                <th className="border p-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="border-b">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">
                      {new Date(order.order_date).toLocaleString()}
                    </td>
                    <td className="border p-2">{order.price.toFixed(2)}₺</td>
                    <td className="border p-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="bg-primary text-white px-2 py-1 rounded"
                      >
                        {expandedOrders.includes(order.id)
                          ? 'Detayları Gizle'
                          : 'Detayları Göster'}
                      </button>
                    </td>
                  </tr>
                  {expandedOrders.includes(order.id) && (
                    <tr>
                      <td colSpan="4" className="border p-2">
                        <div>
                          <h3 className="font-semibold mb-2">Sipariş Detayları:</h3>
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-light">
                                <th className="border p-1">Ürün No</th>
                                <th className="border p-1">Adet</th>
                                <th className="border p-1">Detay</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((item, index) => (
                                <tr key={index} className="border-b">
                                  <td className="border p-1">{item.product_id}</td>
                                  <td className="border p-1">{item.count}</td>
                                  <td className="border p-1">{item.detail}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
