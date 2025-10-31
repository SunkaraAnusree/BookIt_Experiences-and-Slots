import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const experience = location.state?.experience; // from Details page

  const [form, setForm] = useState({
    name: "",
    email: "",
    promo: "",
    agree: false,
  });
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Validate promo code
  const handlePromo = async () => {
    try {
      const res = await api.post<{ valid: boolean; discount: number }>(
        "/promo/validate",
        { code: form.promo }
      );

      if (res.data.valid) {
        setDiscount(res.data.discount);
        alert(`Promo applied! Discount ₹${res.data.discount}`);
      } else {
        alert("Invalid promo code");
        setDiscount(0);
      }
    } catch (err) {
      console.error("Promo error:", err);
      alert("Something went wrong while validating promo code.");
    }
  };

  // ✅ Handle booking
  const handlePay = async () => {
    // Check required fields
    if (!form.name || !form.email) {
      alert("Please fill all details!");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Require agreement checkbox
    if (!form.agree) {
      alert("Please agree to the terms before proceeding.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", {
        name: form.name,
        email: form.email,
        experienceId: experience?._id || "sample-id",
        slot: "10:00 AM",
        date: new Date().toLocaleDateString(),
      });
      navigate("/result", { state: { success: true } });
    } catch (err) {
      console.error("Booking failed:", err);
      navigate("/result", { state: { success: false } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="text-gray-700 mb-4">
        ← Checkout
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side — Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Full name</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700">Promo code</label>
              <div className="flex gap-2 mt-1">
                <input
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Promo code"
                  value={form.promo}
                  onChange={(e) => setForm({ ...form, promo: e.target.value })}
                />
                <button
                  onClick={handlePromo}
                  type="button"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                />
                <span className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side — Summary */}
        <aside className="bg-white p-6 rounded-2xl shadow-sm h-max">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Experience</span>
            <span className="text-gray-800 font-medium">
              {experience?.title || "Experience"}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Date</span>
            <span className="text-gray-800">{location.state?.selectedDate}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Time</span>
            <span className="text-gray-800">{location.state?.selectedTime}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Qty</span>
            <span className="text-gray-800">1</span>
          </div>
          <div className="flex justify-between">
            <div>Discount</div>
            <div>- ₹{discount}</div>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{experience?.price || 999}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Taxes</span>
            <span>₹59</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between items-center mb-3">
            <div className="font-bold text-lg">Total</div>
            <div className="font-bold text-lg">
              ₹{(experience?.price || 999) + 59 - discount}
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={!form.agree || loading}
            className={`w-full font-medium py-3 rounded-lg transition 
    ${!form.agree || loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"}
  `}
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>

        </aside>

      </div>
    </div>
  );
}
