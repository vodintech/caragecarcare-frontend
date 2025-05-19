"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type CarInfo = {
  brand?: string;
  model?: string;
  fuelType?: string;
  phone?: string;
  year?: string;
  image?: string;
};

type ServicePackage = {
  name: string;
  price: number;
  discountedPrice: number;
  warranty: string;
  interval: string;
  services: string[];
  recommended?: boolean;
};

const ServicePage = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('carFormData');
    if (data) setCarInfo(JSON.parse(data));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const packages: ServicePackage[] = [
    {
      name: "Basic Service",
      price: 4665,
      discountedPrice: 3499,
      warranty: "1000 Kms or 1 Month",
      interval: "Every 5000 Kms or 3 Months",
      services: [
        "Wiper Fluid Replacement",
        "Battery Water Top Up",
        "Car Wash",
        "Interior Vacuuming",
        "Engine Oil Replacement"
      ],
      recommended: true
    },
    {
      name: "Standard Service",
      price: 6743,
      discountedPrice: 4699,
      warranty: "1000 Kms or 1 Month",
      interval: "Every 10,000 Kms or 6 Months",
      services: [
        "Car Scanning",
        "Battery Water Top Up",
        "Interior Vacuuming",
        "Wiper Fluid Replacement",
        "Car Wash"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Horizontal Scrolling Services */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 px-10"
            >
              {[
                "Periodic Car Services",
                "Denting Painting",
                "Mechanical Repairs",
                "Car AC Services",
                "Wheel Care",
                "Car Cleaning",
                "Car Detailing & Spa",
                "Custom Repairs",
                "Periodic Car Service",
                "Denting ",
                "Mechanical ",
                "Car AC ",
                "Wheel ",
                "Car ",
                "Car Detailing ",
                "Custom "
              ].map((service) => (
                <div key={service} className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                   
                  </div>
                  <span className="text-sm font-medium text-center">{service}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Scheduled Packages Container (70%) */}
          <div className="lg:w-[70%] bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Scheduled Packages</h2>
            
            <div className="space-y-6">
              {packages.map((pkg, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4 gap-2">
                      <span>{pkg.warranty} Warranty</span>
                      <span>•</span>
                      <span>{pkg.interval} (Recommended)</span>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {pkg.services.map((service, i) => (
                        <li key={i} className="flex items-center">
                          { i % 1 === 0 && (
  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-600 text-white text-[10px] font-semibold shadow-sm mr-1">
    ✓
  </span>
)}

                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="text-blue-600 text-sm font-medium mb-4 hover:text-blue-800">
                      + {Math.floor(Math.random() * 5) + 1} more View All
                    </button>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <span className="text-gray-500 line-through mr-2">Rs. {pkg.price}</span>
                          <span className="text-lg font-bold text-gray-800">Rs. {pkg.discountedPrice}</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
                          {pkg.recommended ? "Get at 2999" : "Book Now"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {pkg.recommended && (
                    <div className="bg-blue-50 px-6 py-2 border-t border-gray-200">
                      <span className="text-blue-800 font-medium">RECOMMENDED</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info Container (30%) */}
          <div className="lg:w-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-18">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Your Vehicle</h2>
              
              <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 h-48 flex items-center justify-center border border-gray-200">
                {carInfo?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
                    alt={`${carInfo.brand} ${carInfo.model}`}
                    width={300}
                    height={200}
                    className="object-contain object-center"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Car Image</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-lg text-gray-800 text-center">
                    {carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-600 justify-center">
                    <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm">
                      <span className="mr-2">⛽</span>
                      <span>{carInfo?.fuelType || 'Fuel Type'}</span>
                    </div>
                    <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm">
                      <span className="mr-2">📅</span>
                      <span>Year: {carInfo?.year || 'Year'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;