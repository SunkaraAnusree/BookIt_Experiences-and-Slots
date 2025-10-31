import React from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/"); // Always go to Home page when searching
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1
        className="text-2xl font-bold text-yellow-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        BookIt
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search experiences..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-medium"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
