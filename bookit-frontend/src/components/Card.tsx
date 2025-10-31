import React from "react";
import { Link } from "react-router-dom";
import type { Experience } from "../data/experiences";

interface CardProps {
  experience: Experience;
}

const Card: React.FC<CardProps> = ({ experience }) => {
  if (!experience) return null; // safety check

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      {/* Image */}
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-64 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Title + Place */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{experience.title}</h2>

          {experience.place &&
            !experience.title
              .toLowerCase()
              .includes(experience.place.toLowerCase()) && (
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
                {experience.place}
              </span>
            )}
        </div>


        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 leading-snug">
          {experience.short ||
            "Curated small-group experience. Certified guide. Safety first with gear included."}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-900 font-semibold text-base">
            From ₹{experience.price}
          </p>
          <Link
            to={`/details/${experience._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
