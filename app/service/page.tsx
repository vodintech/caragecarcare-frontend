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
    { name: "Maintenance Service Parts", icon: "/servicepagelogo/Maintenance_Service_Parts.png" },
    { name: "Air Conditioning", icon: "/servicepagelogo/Air_Conditioning.png" },
    { name: "Belts Chains and Rollers", icon: "/servicepagelogo/Belts_Chains_and_Rollers.png" },
    { name: "Bearings", icon: "/servicepagelogo/Bearings.png" },
    { name: "Body", icon: "/servicepagelogo/Body.png" },
    { name: "Control Cables", icon: "/servicepagelogo/Control_Cables.png" },
    { name: "Brake System", icon: "/servicepagelogo/Brake_System.png" },
    { name: "Car Accessories", icon: "/servicepagelogo/Car_Accessories.png" },
    { name: "Clutch System", icon: "/servicepagelogo/Clutch_System.png" },
    { name: "Electric Components", icon: "/servicepagelogo/Electric_Components.png" },
    { name: "Engine", icon: "/servicepagelogo/Engine.png" },
    { name: "Engine Cooling System", icon: "/servicepagelogo/Engine_Cooling_System.png" },
    { name: "Exhaust System", icon: "/servicepagelogo/Exhaust_System.png" },
    { name: "Filters", icon: "/servicepagelogo/Filters.png" },
    { name: "Fuel Supply System", icon: "/servicepagelogo/Fuel_Supply_System.png" },
    { name: "Gaskets and Sealing Rings", icon: "/servicepagelogo/Gaskets_and_Sealing_Rings.png" },
    { name: "Ignition and Glowplug System", icon: "/servicepagelogo/Ignition_and_Glowplug_System.png" },
    { name: "Interior and comfort", icon: "/servicepagelogo/Interior_and_comfort.png" },
    { name: "Lighting", icon: "/servicepagelogo/Lighting.png" },
    { name: "Oils and Fluids", icon: "/servicepagelogo/Oils_and_Fluids.png" },
    { name: "Pipes and Hoses", icon: "/servicepagelogo/Pipes_and_Hoses.png" },
    { name: "Repair Kits", icon: "/servicepagelogo/Repair_Kits.png" },
    { name: "Sensors Relays and Control units", icon: "/servicepagelogo/Sensors_Relays_and_Control_units.png" },
    { name: "Steering", icon: "/servicepagelogo/Steering.png" },
    { name: "Suspension and Arms", icon: "/servicepagelogo/Suspension_and_Arms.png" },
    { name: "Towbar Parts", icon: "/servicepagelogo/Towbar_Parts.png" },
    { name: "Transmission", icon: "/servicepagelogo/Transmission.png" },
    { name: "Trims", icon: "/servicepagelogo/Trims.png" },
    { name: "Tyres and Alloys", icon: "/servicepagelogo/Tyres_and_Alloys.png" },
    { name: "Universal", icon: "/servicepagelogo/Universal.png" },
    { name: "Wheels", icon: "/servicepagelogo/Wheels.png" },
    { name: "Windscreen Cleaning System", icon: "/servicepagelogo/Windscreen_Cleaning_System.png" }
];


  const CarDetails = () => (
    <div className="space-y-3">
      <p className="font-medium text-lg">{carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}</p>
      <div className="flex space-x-6 text-gray-600">
      <p className="text-gray-600 flex items-center"><span className="mr-2">⛽</span>{carInfo?.fuelType || 'Fuel Type'}</p>
      <p className="text-gray-600 flex items-center"><span className="mr-2">📅</span>Year: {carInfo?.year || 'Year'}</p>
      </div>
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
            <div className="grid grid-cols-2 gap-3">
              {parts.map((p,i) => (
                <div key={i} className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-md cursor-pointer border border-gray-100">
                  <div className="w-12 h-12 mb-2 relative">
                    <Image
                      src={p.icon}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-center">{p.name}</span>
                </div>
              ))}
            </div>
          </div>  
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-6">
          <div className="w-[70%] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Select part category:</h2>
            <div className="grid grid-cols-3 gap-4">
              {parts.map((p,i) => (
                <div key={i} className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-md cursor-pointer border border-gray-100">
                  <div className="w-16 h-16 mb-3 relative">
                    <Image
                      src={p.icon}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{p.name}</span>
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