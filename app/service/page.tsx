"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

type CarInfo = {
  brand?: string;
  model?: string;
  fuelType?: string;
  phone?: string;
  year?: string;
  image?: string;
};

type Part = {
  name: string;
  image: string;
};

type SubItem = {
  name: string;
  image: string;
  parts: Part[];
};

type ServiceItem = {
  name: string;
  image: string;
  subItems: SubItem[];
};

type ServiceCategory = {
  name: string;
  icon: string;
  items: ServiceItem[];
};

const ServicePage = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<SubItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('carFormData');
    if (data) setCarInfo(JSON.parse(data));

    const fetchServiceHierarchy = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-hierarchy`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data.categories || []);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceHierarchy();
  }, []);

  // Navigation handlers
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedItem(null);
    setSelectedSubItem(null);
  };

  const handleItemSelect = (item: ServiceItem) => {
    setSelectedItem(item);
    setSelectedSubItem(null);
  };

  const handleSubItemSelect = (subItem: SubItem) => {
    setSelectedSubItem(subItem);
  };

  const goBack = () => {
    if (selectedSubItem) setSelectedSubItem(null);
    else if (selectedItem) setSelectedItem(null);
    else if (selectedCategory) setSelectedCategory(null);
  };

  // Render functions
  const CarDetails = () => (
    <div className="space-y-3">
      <p className="font-medium text-lg">{carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}</p>
      <div className="flex space-x-6 text-gray-600">
        <p className="text-gray-600 flex items-center">
          <span className="mr-2">⛽</span>{carInfo?.fuelType || 'Fuel Type'}
        </p>
        <p className="text-gray-600 flex items-center">
          <span className="mr-2">📅</span>Year: {carInfo?.year || 'Year'}
        </p>
      </div>
    </div>
  );

  const renderMainCategories = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center p-4 rounded-md cursor-pointer border border-gray-100 hover:bg-blue-50"
          onClick={() => handleCategorySelect(category.name)}
        >
          <div className="w-16 h-16 mb-3 relative">
            <Image
              src={category.icon}
              alt={category.name}
              fill
              className="object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-category.png';
              }}
            />
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </div>
      ))}
    </div>
  );

  const renderCategoryItems = () => {
    const category = categories.find(c => c.name === selectedCategory);
    if (!category) return null;

    return (
      <div className="mt-4">
        <button
          onClick={goBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to categories
        </button>
        <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center p-4 rounded-md cursor-pointer border border-gray-100 hover:bg-blue-50"
              onClick={() => handleItemSelect(item)}
            >
              <div className="w-16 h-16 mb-3 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-item.png';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSubItems = () => {
    if (!selectedItem) return null;

    return (
      <div className="mt-4">
        <button
          onClick={goBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {selectedCategory}
        </button>
        <h2 className="text-xl font-semibold mb-4">{selectedItem.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedItem.subItems.map((subItem) => (
            <div
              key={subItem.name}
              className="flex flex-col items-center p-4 rounded-md cursor-pointer border border-gray-100 hover:bg-blue-50"
              onClick={() => handleSubItemSelect(subItem)}
            >
              <div className="w-16 h-16 mb-3 relative">
                <Image
                  src={subItem.image}
                  alt={subItem.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-subitem.png';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-center">{subItem.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderParts = () => {
    if (!selectedSubItem) return null;

    return (
      <div className="mt-4">
        <button
          onClick={goBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {selectedItem?.name}
        </button>
        <h2 className="text-xl font-semibold mb-4">{selectedSubItem.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedSubItem.parts.map((part) => (
            <div
              key={part.name}
              className="flex flex-col items-center p-4 rounded-md border border-gray-100 hover:bg-blue-50"
            >
              <div className="w-16 h-16 mb-3 relative">
                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-part.png';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-center">{part.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading services</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!selectedCategory) return renderMainCategories();
    if (selectedCategory && !selectedItem) return renderCategoryItems();
    if (selectedItem && !selectedSubItem) return renderSubItems();
    if (selectedSubItem) return renderParts();

    return <div>No content available</div>;
  };

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
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
                  alt={`${carInfo.brand} ${carInfo.model}`}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Car Image</span>
              )}
            </div>
            <CarDetails />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Select part category:</h2>
            {renderContent()}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-6">
          <div className="w-[70%] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Select part category:</h2>
            {renderContent()}
          </div>

          <div className="w-[30%]">
  <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

    {/* Image Box */}
    <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden w-full max-h-52">
      {carInfo?.image ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
          alt={`${carInfo.brand} ${carInfo.model}`}
          width={500}
          height={300}
          className="w-full h-auto object-contain"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-48 text-gray-500">
          Car Image
        </div>
      )}
    </div>

    {/* Car Details */}
    <CarDetails />
  </div>
</div>

        </div>
      </div>
    </>
  );
};

export default ServicePage;