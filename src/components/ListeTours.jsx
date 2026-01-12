import React, { useState, useEffect } from "react";

function ToursCrud () {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({ name: "", duration: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = "http://localhost:5000/tours";
 
  const fetchTours = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
        
      fetch(`${apiUrl}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchTours();
        setFormData({ name: "", duration: "", price: "" });
        setEditingId(null);
      });
    } else {
        
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        fetchTours();
        setFormData({ name: "", duration: "", price: "" });
      });
    }
  };

  
  const handleEdit = (tour) => {
    setFormData({ name: tour.name, duration: tour.duration, price: tour.price });
    setEditingId(tour.id);
  };

  
  const handleDelete = (id) => {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => fetchTours());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tours</h2>

      {/* Form */}
      <form className="mb-6 flex flex-wrap gap-2" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded flex-1"
          type="text"
          name="name"
          placeholder="Tour Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded w-32"
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded w-24"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Tours List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map(tour => (
          <div key={tour.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{tour.name}</h3>
            <p className="text-gray-600">Duration: {tour.duration}</p>
            <p className="text-green-600 font-bold">${tour.price}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => handleEdit(tour)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(tour.id)}
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

export default ToursCrud;
