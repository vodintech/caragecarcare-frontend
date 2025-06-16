"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type CartItem = {
  packageName: string;
  price: number;
  quantity: number;
};

type CarInfo = {
  model?: string;
  phone?: string;
  [key: string]: unknown;
};

const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    const carData = sessionStorage.getItem("carFormData");

    if (cartData) setCart(JSON.parse(cartData));
    if (carData) {
      const parsedCarData: CarInfo = JSON.parse(carData);
      setCarInfo(parsedCarData);
    }
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!selectedDate || !selectedTime || !address) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Order placed successfully!");
    sessionStorage.removeItem("cart");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left side - Checkout Details */}
          <div className="lg:w-[70%] bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Secure Checkout</h1>
            
            {/* Phone Number Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Account</h2>
              <div className="flex items-center border-b border-gray-200 pb-2">
                <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300">+91</span>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={carInfo.phone || ""}
                  readOnly
                />
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Select Date and Time of Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Address Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Set Pickup Location</h2>
              <textarea
                placeholder="Enter your address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Alternate Phone number */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Alternate Phone Number</h2>
              <input
              type="tel"
              maxLength={10}
              placeholder="ENTER ALTERNATE NUMBER"
              className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Service Centre */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Select Service Centre</h2>
              <select className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                <option>COIMBATORE</option>
              </select>
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="lg:w-[30%] bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            {cart.length > 0 ? (
              <ul className="space-y\3 mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm text-gray-700">
                    <div>
                      {item.packageName} × <span className="font-medium">{item.quantity}</span>
                    </div>
                    <div className="font-semibold">₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
            )}

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-gray-800 font-semibold">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;