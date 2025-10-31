import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../api/api"; // ✅ Ensure axios instance is configured properly

// 🔹 Interface for experience data
interface Experience {
  _id: string;
  title: string;
  place: string;
  short: string;
  price: number;
  image: string;
}

// 🔹 Props received from parent (like Navbar search)
interface HomeProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch experiences from backend
  const fetchData = async () => {
    try {
      const res = await api.get<Experience[]>("/experiences");
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Filter experiences by search query
  const filtered = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading experiences...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Promo Banner */}
        <div className="bg-yellow-100 text-center py-3 mb-6 rounded-md shadow-sm">
          <p className="text-gray-800 font-medium">
            🎉 Special Offer: Use <span className="font-bold">WELCOME100 Promo Code</span> for ₹100 off on your first adventure!
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.length > 0 ? (
            filtered.map((exp) => <Card key={exp._id} experience={exp} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No experiences found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
