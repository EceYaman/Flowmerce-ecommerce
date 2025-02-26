import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export function CreateOrderPage() {
  const [addresses, setAddresses] = useState([]);
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

  // Fetch the saved addresses from the backend
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

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When the form is submitted:
  // - if editingAddressId is set, do an update (PUT request)
  // - otherwise add a new address (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        const payload = { id: editingAddressId, ...formData };
        await api.put('/user/address', payload);
        toast.success('Address updated successfully');
      } else {
        await api.post('/user/address', formData);
        toast.success('Address added successfully');
      }
      setShowForm(false);
      setEditingAddressId(null);
      // Refresh the address list
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Error saving address');
    }
  };

  // Preload the form fields for editing
  const handleEdit = (address) => {
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
    setShowForm(true);
  };

  // Delete an address using its id
  const handleDelete = async (addressId) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Error deleting address');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      
      <h2 className="text-xl font-semibold mb-2">Select Address</h2>
      {addresses.length === 0 ? (
        <p>No saved addresses found.</p>
      ) : (
        <ul>
          {addresses.map((addr) => (
            <li key={addr.id} className="border p-4 mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{addr.title}</p>
                <p>{addr.name} {addr.surname}</p>
                <p>{addr.phone}</p>
                <p>{addr.city}, {addr.district}, {addr.neighborhood}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(addr)}
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => {
          setShowForm(true);
          setEditingAddressId(null);
          // Clear the form
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
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Address
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 border p-4">
          <div className="mb-2">
            <label>Address Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>City:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            >
              <option value="">Select City</option>
              <option value="istanbul">Istanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">Izmir</option>
              {/* Add other cities as needed */}
            </select>
          </div>
          <div className="mb-2">
            <label>District:</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Neighborhood:</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
