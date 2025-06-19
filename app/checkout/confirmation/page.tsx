"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {  Calendar, Clock, MapPin, Phone } from "lucide-react";
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
      {/* Circle animation */}
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
      {/* Checkmark animation */}
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
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
       {/* Header with animated checkmark */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
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
                  className="text-3xl font-bold text-center"
                >
                  Booking Confirmed!
                </motion.h1>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="text-white text-center mt-2"
                >
                  Your service has been successfully scheduled. A confirmation has been sent to your phone.

                </motion.h1>
        </div>

        {/* Booking details section */}
       <div>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="bg-gray-50 mb-6 p-6 rounded-xl"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2 flex items-center">
      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
      Booking Summary
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          icon: <Phone className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Phone Number",
          value: `+91 ${bookingDetails?.phone}`,
        },
        {
          icon: <Phone className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Alternate Number",
          value: bookingDetails.alternatePhone ?`+91 ${bookingDetails?.alternatePhone}`: "Not provided",
        },
        {
          icon: <Calendar className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Service Date",
          value: formatDate(bookingDetails?.date)
        },
        {
          icon: <Clock className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Service Time",
          value: formatTime(bookingDetails?.time),
        },
        {
          icon: <MapPin className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Service Center",
          value: bookingDetails?.serviceCenter
        },
        {
          icon: <MapPin className="h-5 w-5 mr-2 text-blue-600 mt-1" />,
          label: "Pickup Address",
          value: bookingDetails?.address
        }
        
        ].map((item, index) => (
          <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start"
                >         
          <div key={index} className="flex items-start">
            {item.icon}
            <div>
              <span className="block font-semibold">{item.label}</span>
              <span className="text-gray-700">{item.value}</span>
            </div>
          </div>
          </motion.div>
        ))}
      </div>
      </motion.div>
    </div>


     </motion.div>
  </div>
 );
};
export default ConfirmationPage;