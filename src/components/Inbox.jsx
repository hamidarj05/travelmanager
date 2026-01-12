import { useState, useEffect } from "react";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const apiUrl = "http://localhost:5000/messages";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Inbox</h2>

      {/* Liste des messages */}
      <ul className="bg-gray-50 rounded-lg shadow-md divide-y divide-gray-200">
        {messages.map((msg, index) => (
          <li
            key={index}
            className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition duration-200 flex flex-col"
            onClick={() => setSelected(msg)}
          >
            <span className="font-semibold text-gray-800">{msg.nom}</span>
            <span className="text-gray-500 text-sm truncate">{msg.email}</span>
          </li>
        ))}
      </ul>

      {/* Modale */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Nom : {selected.nom}</h3>
            <p className="text-gray-600 mb-4">Email : {selected.email}</p>
            <div className="mb-4">
              <p className="font-semibold mb-1 text-gray-700">Message :</p>
              <p className="text-gray-700 whitespace-pre-line">{selected.message}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
