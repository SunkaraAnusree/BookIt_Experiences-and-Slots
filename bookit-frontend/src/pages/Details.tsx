import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Experience } from "../data/experiences";

const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get<Experience>(
          `http://localhost:5000/api/experiences/${id}`
        );
        setExperience(res.data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };

    if (id) fetchExperience();
  }, [id]);

  if (!experience)
    return <p className="p-8 text-gray-600">Experience not found.</p>;

  const subtotal = experience.price * quantity;
  const taxes = 59;
  const total = subtotal + taxes;
  const isReadyToConfirm = selectedDate && selectedTime;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT SIDE */}
      <div>
        {/* Page Section Title */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 text-sm mb-4 flex items-center gap-2 hover:text-gray-900"
        >
          ← Details
        </button>


        {/* Image */}
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        {/* Short description under image */}
        <div className="mt-5 bg-gray-100 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {experience.title}
          </h3>
          <p className="text-gray-600 font-medium">{experience.place}</p>
          <p className="text-gray-500 mt-2 leading-relaxed">
            {experience.short ||
              `“Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany at  ${experience.title}."`}
          </p>
        </div>

        {/* Choose Date */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8">
          Choose date
        </h3>
        <div className="flex gap-3 mt-2 flex-wrap">
          {["Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5"].map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 border rounded-lg text-sm transition ${selectedDate === date
                ? "bg-yellow-200 border-yellow-400"
                : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Choose Time */}
        {/* Choose Time */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6">Choose time</h3>
        <div className="flex gap-3 mt-2 flex-wrap">
          {[
            { time: "07:00 am", left: 4 },
            { time: "09:00 am", left: 2 },
            { time: "11:00 am", left: 5 },
            { time: "1:00 pm", left: 0 }, // sold out
          ].map(({ time, left }) => {
            const isSoldOut = left === 0;
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                onClick={() => !isSoldOut && setSelectedTime(time)}
                disabled={isSoldOut}
                className={`relative px-4 py-2 border rounded-lg text-sm transition flex items-center gap-2 ${isSoldOut
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isSelected
                    ? "bg-yellow-300 border-yellow-400 text-black"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                  }`}
              >
                <span>{time}</span>
                <span
                  className={`text-xs ${isSoldOut ? "text-gray-500 italic" : "text-red-500"
                    }`}
                >
                  {isSoldOut ? "Sold out" : `${left} left`}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 mt-2">
          All times are in IST (GMT +5:30)
        </p>

        {/* About Section */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8">About</h3>
        <p className="text-gray-500 mt-2 bg-gray-100 px-4 py-3 rounded-lg leading-relaxed">
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </p>

      </div>

      {/* Right: Booking Summary */}
      <div className="bg-gray-50 rounded-2xl shadow p-6 h-fit">
        <div className="flex justify-between text-gray-600 mb-3">
          <span>Starts at</span>
          <span className="font-medium text-gray-800">₹{experience.price}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between text-gray-400 mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-600 mb-2">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg text-gray-800">Total</span>
          <span className="font-semibold text-lg text-gray-900">₹{total}</span>
        </div>

        <button
          onClick={() => {
            if (!selectedDate || !selectedTime) {
              alert("Please select both date and time before confirming!");
              return;
            }
            navigate("/checkout", {
              state: { experience, selectedDate, selectedTime, total },
            });
          }}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-3 rounded-lg font-medium transition ${selectedDate && selectedTime
            ? "bg-yellow-400 hover:bg-yellow-500 text-black"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Confirm
        </button>
      </div>

    </div>
  );
};

export default Details;
