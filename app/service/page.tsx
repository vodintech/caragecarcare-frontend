"use client";

import React, { useEffect, useState } from 'react';

type CarInfo = {
  brand?: string;
  model?: string;
  fuelType?: string;
  phone?: string;
};

const ServicePage: React.FC = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});

  useEffect(() => {
    const storedCarInfo = sessionStorage.getItem('carFormData');
    if (storedCarInfo) {
      setCarInfo(JSON.parse(storedCarInfo));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-9 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Caragecarcare </h1>
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Selected Vehicle</h2>
        <p className="font-medium">{carInfo?.brand ?? 'Brand' } {carInfo?.model ?? 'Model'}</p>
        <p className="text-gray-600">{carInfo?.fuelType ?? 'Fuel Type'}</p>
        <p className="text-gray-600">Phone: {carInfo?.phone ?? 'Phone Number'}</p>
      </div>
    </div>
  );
};

export default ServicePage;
