import React, { useState, useEffect } from "react";

function HotelsCrud() {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({ name: "", city: "", rating: "" });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = "http://localhost:5000/hotels";
 
  const fetchHotels = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHotels();
  }, []);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) { 
        // Modifier Des Infos d'une Hotel
      fetch(`${apiUrl}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchHotels();
        setFormData({ name: "", city: "", rating: "" });
        setEditingId(null);
      });
    } else {
        // Ajouter Une Hotel
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchHotels();
        setFormData({ name: "", city: "", rating: "" });
      });
    }
  };

  
  const handleEdit = (hotel) => {
    setFormData({ name: hotel.name, city: hotel.city, rating: hotel.rating });
    setEditingId(hotel.id);
  };

  // Supprimer Une Hotel
  const handleDelete = (id) => {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => fetchHotels());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Hotels</h2>

      {/* Form */}
      <form className="mb-6" onSubmit={handleSubmit}>
        <input
          className="border p-2 mr-2 rounded"
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 mr-2 rounded"
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 mr-2 rounded w-20"
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Hotels List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(hotel => (
          <div key={hotel.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.city}</p>
            <p className="text-yellow-500">Rating: {hotel.rating}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => handleEdit(hotel)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => window.confirm('Tu es Sure ? ') && handleDelete(hotel.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelsCrud;
