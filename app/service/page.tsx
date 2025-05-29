"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Check, Shield, Star, Circle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup, useTransform, useMotionValue,animate  } from 'framer-motion';


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
  duration: string;
  recommended?: boolean;
  category?: string;
};

type CartItem = {
  packageName: string;
  price: number;
  quantity: number;
};

const ServicePage = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Periodic Car Services");
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const serviceCategories = [
    "Periodic Car Services",
    "AC Service & Repair",
    "Denting & Painting",
    "Batteries",
    "Tyres & Wheel Care",
    "Detailing Services",
    "Car Spa & Cleaning",
    "Car Inspections",
    "Windshields & Lights",
    "Suspension & Fitments",
    "Clutch & Body Parts",
    "Insurance Claims",
    "SOS Service",
  ];

  const serviceImages: Record<string, string> = {
    "Periodic Car Services": "serviceCategories/PeriodicCarServices.png",
    "AC Service & Repair": "serviceCategories/ACService&Repair.png",
    "Denting & Painting": "serviceCategories/Denting&Painting.png",
    "Batteries": "serviceCategories/Batteries.png",
    "Tyres & Wheel Care": "serviceCategories/Tyres&WheelCare.png",
    "Detailing Services": "serviceCategories/DetailingServices.png",
    "Car Spa & Cleaning": "serviceCategories/CarSpa&Cleaning.png",
    "Car Inspections": "serviceCategories/CarInspections.png",
    "Windshields & Lights": "serviceCategories/Windshields&Lights.png",
    "Suspension & Fitments": "serviceCategories/Suspension&Fitments.png",
    "Clutch & Body Parts": "serviceCategories/Clutch&BodyParts.png",
    "Insurance Claims": "serviceCategories/InsuranceClaims.png",
    "SOS Service": "serviceCategories/SOSService.png",
  };

  useEffect(() => {
    const data = sessionStorage.getItem('carFormData');
    if (data) setCarInfo(JSON.parse(data));
    fetchServicePackages(activeCategory);
  }, [activeCategory]);

  const fetchServicePackages = async (category: string) => {
    try {
      setLoading(true);
      const encodedCategory = encodeURIComponent(category);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service-packages?category=${encodedCategory}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch service packages');
      
      const data = await response.json();
      
      const formattedPackages = data.map((pkg: ServicePackage) => ({
        ...pkg,
        services: Array.isArray(pkg.services) ? pkg.services : []
      }));
      
      setPackages(formattedPackages);
      setExpandedPackages(prev => ({ ...prev, [category]: false }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory !== category) {
      setActiveCategory(category);
    }
  };

  const toggleExpandPackages = () => {
    setExpandedPackages(prev => ({
      ...prev,
      [activeCategory]: !prev[activeCategory]
    }));
  };

  const toggleExpandServices = (packageName: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [packageName]: !prev[packageName]
    }));
  };

  const addToCart = (pkg: ServicePackage) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.packageName === pkg.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.packageName === pkg.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { packageName: pkg.name, price: pkg.discountedPrice, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (packageName: string) => {
    setCart(prevCart => prevCart.filter(item => item.packageName !== packageName));
  };

  const updateQuantity = (packageName: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.packageName === packageName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const visiblePackages = expandedPackages[activeCategory] 
    ? packages 
    : packages.slice(0, 4);

  if (loading && packages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading service packages...</p>
        </div>
      </div>  
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md text-center">
          <div className="text-red-500 bg-red-50 p-3 rounded-full inline-flex mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Error loading services</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  const proceedToCheckout =()=>{
    sessionStorage.setItem('cart',JSON.stringify(cart));
    window.location.href= '/checkout';
  };

  // This is for Counting Up Animation for Total and Subtotal
  const Counter = ({ value, duration = 1 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Horizontal Scrolling Services */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5 text-grey-600" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-x-4 overflow-x-auto scrollbar-hide px-10"
            >
              {serviceCategories.map((service) => (
                <div 
                  key={service} 
                  className={`w-24 flex flex-col items-center flex-shrink-0 cursor-pointer transition-colors ${activeCategory === service ? 'text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleCategoryClick(service)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${activeCategory === service ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <img 
                      src={serviceImages[service]} 
                      alt={service}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{service}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll right" >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Scheduled Packages Container (70%) */}
          <div className="lg:w-[70%]">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{activeCategory}</h2>
                <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {packages.length} Packages Available
                </div>
              </div>
            
              <div className="relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                          <div className="p-6">
                            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-6 animate-pulse"></div>
                            <ul className="space-y-3 mb-4">
                              {[1, 2, 3, 4, 5].map((j) => (
                                <li key={j} className="flex items-center">
                                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                                  <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                                </li>
                              ))}
                            </ul>
                            <div className="border-t border-gray-200 pt-4">
                              <div className="flex justify-between">
                                <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {visiblePackages.map((pkg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <div className={`border rounded-xl overflow-hidden transition-all ${pkg.recommended ? 'border-blue-200 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                            {pkg.recommended && (
                              <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 py-2 flex items-center">
                                <Star className="w-4 h-4 text-yellow-300 mr-2" />
                                <span className="text-white font-medium text-sm">RECOMMENDED PACKAGE</span>
                              </div>
                            )}
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
                              </div>
                              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-2">
                                <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1.5">
                                  <Circle size={7} fill="#a0a0a0" stroke="none" /> 
                                  {pkg.warranty}
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1.5">
                                  <Circle size={7} fill="#a0a0a0" stroke="none" />
                                  {pkg.interval}
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1.5">
                                  <Circle size={7} fill="#a0a0a0" stroke="none" />
                                  {pkg.duration}
                                </span>
                              </div>
                              
                              <ul className="space-y-2 mb-4">
                                {pkg.services.slice(0, 4).map((service, i) => (
                                  <motion.li
                                    key={i} 
                                    className="flex items-center"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                  >
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 mr-2 flex-shrink-0">
                                      <Check className="w-3 h-3" />
                                    </span>
                                    <span className="text-gray-700">{service}</span>
                                  </motion.li>
                                ))}
                                
                                {pkg.services.length > 5 && !expandedServices[pkg.name] && (
                                  <motion.button 
                                    onClick={() => toggleExpandServices(pkg.name)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 flex items-center"
                                    whileHover={{x:2}}
                                  >
                                    + {pkg.services.length - 5} more services
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </motion.button>
                                )}
                                
                                {expandedServices[pkg.name] && pkg.services.slice(5).map((service, i) => (
                                    <motion.li
                                      key={i + 5}
                                      className="flex items-center"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.03 }}
                                    >
                                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 mr-2 flex-shrink-0">
                                        <Check className="w-3 h-3" />
                                      </span>
                                      <span className="text-gray-700">{service}</span>
                                    </motion.li>
                                  ))}
                                </ul>

                              <div className="border-t border-gray-200 pt-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                  <div>
                                    <span className="text-gray-500 line-through mr-2">Rs. {pkg.price}</span>
                                    <span className="text-lg font-bold text-gray-800">Rs. {pkg.discountedPrice}</span>
                                  </div>
                                  <motion.button 
                                    onClick={() => addToCart(pkg)}
                                    whileTap={{scale:0.90}}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
                                  >
                                    +ADD TO CART
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {packages.length > 4 && (
                        <div className="flex justify-center mt-6">
                          <motion.button 
                            onClick={toggleExpandPackages}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {expandedPackages[activeCategory] ? 'Show Less' : `+ ${packages.length - 4} more View More`}
                            {!expandedPackages[activeCategory] && (
                              <ChevronRight className="w-4 h-4 ml-1" />
                            )}
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Vehicle Info and Cart Container (30%) */}
          <div className="lg:w-[30%] space-y-6">
            {/* Vehicle Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Your Vehicle</h2>
              
              <motion.div 
                className="bg-gray-50 rounded-xl overflow-hidden mb-4 h-48 flex items-center justify-center border-2 border-gray-300 relative"
                whileHover={{ scale: 1.01 }}
              >
                {carInfo?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
                    alt={`${carInfo.brand} ${carInfo.model}`}
                    width={300}
                    height={200}
                    className="object-contain object-center p-4"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Car Image Preview</span>
                  </div>
                )}
              </motion.div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <p className="font-bold text-xl text-gray-800 text-center mb-1">
                    {carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
                    <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                      <span className="mr-2">⛽</span>
                      <span>{carInfo?.fuelType || 'Fuel Type'}</span>
                    </div>
                    <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                      <span className="mr-2">📅</span>
                      <span>{carInfo?.year || 'Year'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-16">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div>
                  <LayoutGroup>
                    <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto">
                      {cart.map((item, index) => (
                        <motion.div
                          key={index}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex justify-between items-center border-b pb-3"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{item.packageName}</p>
                            <div className="flex items-center mt-1">
                              <button 
                                onClick={() => updateQuantity(item.packageName, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.packageName, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <p className="font-medium mr-4">Rs. {item.price * item.quantity}</p>
                            <button 
                              onClick={() => removeFromCart(item.packageName)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </LayoutGroup>
                  
                  <div className="border-t pt-4">
                    {/* Subtotal */}
                    <div className="flex justify-between font-bold text-lg mb-2">
                      <span>Subtotal:</span>
                      <span className="flex">
                        Rs.&nbsp;
                        <Counter 
                          value={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} 
                          duration={0.8}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>Taxes and fees:</span>
                      <span>Calculated at checkout</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="flex">
                        Rs.&nbsp;
                        <Counter 
                          value={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} 
                          duration={0.8}
                        />
                      </span>
                    </div>
                    
                    <button
                    onClick={proceedToCheckout}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;