"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

type CarInfo = {
  brand?: string; model?: string; fuelType?: string; 
  phone?: string; year?: string; image?: string;
};

const ServicePage = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  useEffect(() => {
    const data = sessionStorage.getItem('carFormData');
    if (data) setCarInfo(JSON.parse(data));
  }, []);

  const parts = [
    { name: "Maintenance Service Parts", icon: "🛠️" },
    { name: "Air Conditioning", icon: "❄️" },
    { name: "Belts Chains and Rollers", icon: "⛓️" },
    { name: "Bearings", icon: "⚙️" },
    { name: "Body", icon: "🚗" },
    { name: "Control Cables", icon: "🎛️" },
    { name: "Brake System", icon: "🛑" },
    { name: "Car Accessories", icon: "🎀" },
    { name: "Clutch System", icon: "🔄" },
    { name: "Electric Components", icon: "🔌" },
    { name: "Engine", icon: "⚡" },
    { name: "Engine Cooling System", icon: "🌡️" }
  ];

  const CarDetails = () => (
    <div className="space-y-3">
      <p className="font-medium text-lg">{carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}</p>
      <p className="text-gray-600 flex items-center"><span className="mr-2">⛽</span>{carInfo?.fuelType || 'Fuel Type'}</p>
      <p className="text-gray-600 flex items-center"><span className="mr-2">📅</span>Year: {carInfo?.year || 'Year'}</p>
      <p className="text-gray-600 flex items-center"><span className="mr-2">📞</span>Phone: {carInfo?.phone || 'Phone Number'}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Mobile View */}
        <div className="lg:hidden space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Your Cart</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-40 flex items-center justify-center">
              {carInfo?.image ? (
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`} 
                  alt={`${carInfo.brand} ${carInfo.model}`} width={300} height={200} 
                  className="w-full h-full object-cover" />
              ) : <span className="text-gray-500">Car Image</span>}
            </div>
            <CarDetails />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Select part category:</h2>
            <div className="grid grid-cols-1 gap-3">
              {parts.map((p,i) => (
                <div key={i} className="flex items-center p-3 hover:bg-blue-50 rounded-md cursor-pointer border border-gray-100">
                  <span className="text-xl mr-2">{p.icon}</span>
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </div>  
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-6">
          <div className="w-[70%] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Select part category:</h2>
            <div className="grid grid-cols-2 gap-4">
              {parts.map((p,i) => (
                <div key={i} className="flex items-center p-4 hover:bg-blue-50 rounded-md cursor-pointer border border-gray-100">
                  <span className="text-2xl mr-3">{p.icon}</span>
                  <span className="font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {carInfo?.image ? (
                  <Image src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`} 
                    alt={`${carInfo.brand} ${carInfo.model}`} width={300} height={200} 
                    className="w-full h-full object-cover" />
                ) : <span className="text-gray-500">Car Image</span>}
              </div>
              <CarDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;