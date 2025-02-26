import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Check } from 'lucide-react';

export function CreateOrderPage() {
  const [addresses, setAddresses] = useState([]);

  const [activeAddressType, setActiveAddressType] = useState(null);

  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(null);
  const [selectedReceiptAddressId, setSelectedReceiptAddressId] = useState(null);

  const [sameAddress, setSameAddress] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
  });

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/user/address');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Error fetching addresses');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        const payload = { id: editingAddressId, ...formData };
        await api.put('/user/address', payload);
        toast.success('Address updated successfully');
      } else {
        const response = await api.post('/user/address', formData);
        toast.success('Address added successfully');
        const newAddress = response.data;
        if (activeAddressType === 'shipping') {
          setSelectedShippingAddressId(newAddress.id);
          if (sameAddress) setSelectedReceiptAddressId(newAddress.id);
        } else if (activeAddressType === 'receipt') {
          setSelectedReceiptAddressId(newAddress.id);
        }
      }
      setShowForm(false);
      setEditingAddressId(null);
      setActiveAddressType(null);
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Error saving address');
    }
  };
  const handleEdit = (address, type) => {
    setEditingAddressId(address.id);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
    });
    setActiveAddressType(type);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      toast.success('Address deleted successfully');
      if (selectedShippingAddressId === addressId) {
        setSelectedShippingAddressId(null);
        if (sameAddress) setSelectedReceiptAddressId(null);
      }
      if (selectedReceiptAddressId === addressId) {
        setSelectedReceiptAddressId(null);
      }
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Error deleting address');
    }
  };

  const handleSelectShipping = (addressId) => {
    setSelectedShippingAddressId(addressId);
    if (sameAddress) {
      setSelectedReceiptAddressId(addressId);
    }
  };

return (
    <div className="px-8 md:px-32">
        <h1 className="text-2xl font-bold mb-4 text-dark-text">Create Order</h1>

        {/* Shipping Address Bölümü */}
        <div className="mb-6">
            <div className='flex justify-between text-dark-text'>
                <h2 className="text-xl font-semibold mb-2 text-dark-text">Shipping Address</h2>
                {/* "Faturamı aynı adrese gönder" seçeneği */}
                <div className="mb-6">
                    <input
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAddress}
                    onChange={(e) => {
                        setSameAddress(e.target.checked);
                        if (e.target.checked && selectedShippingAddressId) {
                        setSelectedReceiptAddressId(selectedShippingAddressId);
                        } else if (!e.target.checked) {
                        setSelectedReceiptAddressId(null);
                        }
                    }}
                    />
                    <label htmlFor="sameAddress" className="ml-2">Faturamı aynı adrese gönder</label>
                </div>
            </div>

            {addresses.length === 0 ? (
            <p>No saved addresses found.</p>
            ) : (
            <ul className='text-dark-text'>
                {addresses.map((addr) => (
                <li
                    key={`shipping-${addr.id}`}
                    className={`border border-light-text rounded p-4 mb-2 flex justify-between items-center ${selectedShippingAddressId === addr.id ? 'bg-gray-light' : ''}`}
                >
                    <div>
                    <p className="font-bold">{addr.title}</p>
                    <p>{addr.name} {addr.surname}</p>
                    <p>{addr.phone}</p>
                    <p>{addr.city}, {addr.district}, {addr.neighborhood}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                    <button
                        onClick={() => handleEdit(addr, 'shipping')}
                        className=" bg-secondary-light hover:bg-secondary text-white p-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(addr.id)}
                        className="bg-alert hover:bg-red-600 text-white p-1 rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleSelectShipping(addr.id)}
                        className=" bg-primary hover:bg-blue-500 text-white p-1 rounded"
                    >
                        <Check className='w-3' />
                    </button>
                    </div>
                </li>
                ))}
            </ul>
            )}
            <button
            onClick={() => {
                setActiveAddressType('shipping');
                setShowForm(true);
                setEditingAddressId(null);
                setFormData({
                title: '',
                name: '',
                surname: '',
                phone: '',
                city: '',
                district: '',
                neighborhood: '',
                });
            }}
            className="mt-4 bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
            Add Shipping Address
            </button>
        </div>

        {/* Receipt Address Bölümü (eğer "Faturamı aynı adrese gönder" işaretli değilse gösterilir) */}
        {!sameAddress && (
            <div className="mb-6 text-dark-text">
            <h2 className="text-xl font-semibold mb-2">Receipt Address</h2>
            {addresses.length === 0 ? (
                <p>No saved addresses found.</p>
            ) : (
                <ul>
                {addresses.map((addr) => (
                    <li
                    key={`receipt-${addr.id}`}
                    className={`border border-light-text rounded p-4 mb-2 flex justify-between items-center ${selectedReceiptAddressId === addr.id ? 'bg-gray-light' : ''}`}
                    >
                    <div>
                        <p className="font-bold">{addr.title}</p>
                        <p>{addr.name} {addr.surname}</p>
                        <p>{addr.phone}</p>
                        <p>{addr.city}, {addr.district}, {addr.neighborhood}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button
                        onClick={() => handleEdit(addr, 'receipt')}
                        className=" bg-secondary-light hover:bg-secondary text-white p-1 rounded"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(addr.id)}
                        className="bg-alert hover:bg-red-600 text-white p-1 rounded"
                        >
                        Delete
                        </button>
                        <button
                        onClick={() => setSelectedReceiptAddressId(addr.id)}
                        className=" bg-primary hover:bg-blue-500 text-white p-1 rounded"
                        >
                            <Check className='w-3' />
                        </button>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            <button
                onClick={() => {
                setActiveAddressType('receipt');
                setShowForm(true);
                setEditingAddressId(null);
                setFormData({
                    title: '',
                    name: '',
                    surname: '',
                    phone: '',
                    city: '',
                    district: '',
                    neighborhood: '',
                });
                }}
                className="mt-4 bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Receipt Address
            </button>
            </div>
        )}

      {/* Adres Ekleme / Düzenleme Formu */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 border p-4 border-light-text rounded text-dark-text">
          <h3 className="text-lg font-semibold mb-2">
            {editingAddressId ? 'Edit Address' : `Add ${activeAddressType === 'shipping' ? 'Shipping' : 'Receipt'} Address`}
          </h3>
          <div className="mb-3">
            <label>Address Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label>Name & Surname:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="border p-1 w-full mt-2 border-light-text rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label>City:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            >
              <option value="">Select City</option>
              <option value="istanbul">Istanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">Izmir</option>
              {/* Diğer şehirler eklenebilir */}
            </select>
          </div>
          <div className="mb-3">
            <label>District:</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label>Neighborhood:</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              className="border p-1 w-full border-light-text rounded"
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setActiveAddressType(null);
                setEditingAddressId(null);
              }}
              className="bg-alert hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
