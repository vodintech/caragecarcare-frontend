"use client";

import React from "react";
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
  [key: string]: unknown; // Allows additional properties with safe typing
};

const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [carInfo, setCarInfo] = React.useState<CarInfo>({});

  React.useEffect(() => {
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Secure Checkout</h1>
            <div className="space-y-2 mb-6">
              <div>
                <span className="text-gray-600">Car Model: </span>
                <span className="font-medium">{carInfo.model ?? "N/A"}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone: </span>
                <span className="font-medium">{carInfo.phone ?? "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="lg:w-[30%] bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            {cart.length > 0 ? (
              <ul className="space-y-3 mb-4">
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
