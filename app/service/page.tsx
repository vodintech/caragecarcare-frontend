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
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service-hierarchy`);
        
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
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold text-lg text-gray-800">
          {carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}
        </p>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
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
  );

  const renderMainCategories = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 
                     bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md hover:transform hover:-translate-y-1"
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
          <span className="text-sm font-medium text-center text-gray-700">{category.name}</span>
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
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to categories
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{selectedCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 
                         bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md hover:transform hover:-translate-y-1"
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
              <span className="text-sm font-medium text-center text-gray-700">{item.name}</span>
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
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {selectedCategory}
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{selectedItem.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedItem.subItems.map((subItem) => (
            <div
              key={subItem.name}
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 
                         bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md hover:transform hover:-translate-y-1"
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
              <span className="text-sm font-medium text-center text-gray-700">{subItem.name}</span>
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
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {selectedItem?.name}
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{selectedSubItem.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedSubItem.parts.map((part) => (
            <div
              key={part.name}
              className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 
                         bg-white border border-gray-200 hover:shadow-md"
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
              <span className="text-sm font-medium text-center text-gray-700">{part.name}</span>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
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
          <span className="ml-3 text-gray-600">Loading services...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Error loading services</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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

    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No content available</h3>
        <p className="mt-1 text-sm text-gray-500">We couldn't find any services to display.</p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile View */}
        <div className="lg:hidden space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
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
            <CarDetails />
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Select Part Category</h2>
            {renderContent()}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-8">
          <div className="w-[70%] bg-white p-7 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Browse Parts & Services</h2>
            {renderContent()}
          </div>

          <div className="w-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-21">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Your Vehicle</h2>

              {/* Image Box */}
              <div className="mb-6 bg-gray-50 rounded-xl overflow-hidden w-full h-45 flex items-center justify-center border border-gray-200">
                {carInfo?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
                    alt={`${carInfo.brand} ${carInfo.model}`}
                    width={500}
                    height={300}
                    className="object-contain object-center"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-48 text-gray-500">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Car Image</span>
                  </div>
                )}
              </div>

              {/* Car Details */}
              <CarDetails />

              {/* Cart Summary (placeholder) */}
             {/*  <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Cart Summary</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Select parts to see your cart total</p>
                </div>
                <button 
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  disabled
                >
                  Proceed to Checkout
                </button>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;