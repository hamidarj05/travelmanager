import React from "react";
import { Link } from "react-router-dom";

function Navbar({onLogout}) {  
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Trek & Tip</h1>
        <ul className="flex space-x-4">
          <li>
            <Link className="hover:text-gray-300" to="/">Home</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/hotels">Hotels</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/tours">Tours</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/contact">Contact</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/inbox">Inbox</Link>
          </li>
        </ul>
        <button onClick={onLogout}>
            LogOut
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
