"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Calendar, Clock, MapPin, Phone, Package } from "lucide-react";
import { useRouter } from "next/navigation";

type BookingDetails = {
  phone: string;
  date: string;
  time: string;
  address: string;
  alternatePhone: string;
  serviceCenter: string;
  totalPrice: number;
  cartItems: Array<{
    packageName: string;
    price: number;
    quantity: number;
  }>;
};

const ConfirmationPage = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const details = sessionStorage.getItem("bookingDetails");
    if (!details) {
      router.push("/");
      return;
    }
    setBookingDetails(JSON.parse(details));
  }, [router]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Custom Checkmark Component with SVG animation
  const AnimatedCheckmark = () => (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M8 12L11 15L16 9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-lg"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden w-full sm:max-w-3xl"
      >
        {/* Header with animated checkmark */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex items-center justify-center mb-4"
          >
            <AnimatedCheckmark />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-center"
          >
            Booking Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="text-blue-100 text-center mt-2 text-sm sm:text-base"
          >
            Your service has been successfully scheduled. A confirmation has been sent to your phone.
          </motion.p>
        </div>

        {/* Booking details section */}
        <div className="p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Booking Summary
            </h2>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                {
                  icon: <Phone className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Phone Number",
                  value: `+91 ${bookingDetails.phone}`
                },
                {
                  icon: <Phone className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Alternate Number",
                  value: bookingDetails.alternatePhone ? `+91 ${bookingDetails.alternatePhone}` : "Not provided"
                },
                {
                  icon: <Calendar className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Service Date",
                  value: formatDate(bookingDetails.date)
                },
                {
                  icon: <Clock className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Service Time",
                  value: formatTime(bookingDetails.time)
                },
                {
                  icon: <MapPin className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Service Center",
                  value: bookingDetails.serviceCenter
                },
                {
                  icon: <MapPin className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
                  label: "Pickup Address",
                  value: bookingDetails.address
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex items-start">
                    {item.icon}
                    <div>
                      <span className="text-gray-600 block text-sm sm:text-base">{item.label}</span>
                      <span className="font-medium text-sm sm:text-base">{item.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Service details section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-gray-50 rounded-xl p-4 sm:p-6"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Service Details
            </h3>
            
            <ul className="space-y-2 sm:space-y-3">
              <AnimatePresence>
                {bookingDetails.cartItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="flex justify-between items-center text-sm sm:text-base"
                  >
                    <span className="text-gray-700">
                      {item.packageName} × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 flex justify-between font-bold text-base sm:text-lg"
            >
              <span>Total Amount</span>
              <span>₹{bookingDetails.totalPrice}</span>
            </motion.div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-200 text-sm sm:text-base"
            >
              <Download className="h-5 w-5 mr-2" />
              Print Receipt
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/service")}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
            >
              Book Another Service
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;