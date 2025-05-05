{/*"use client";

import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

// Car brands data
const manufacturers = [
  {
    name: "Maruti Suzuki",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Maruti_Suzuki_Logo.svg/1280px-Maruti_Suzuki_Logo.svg.png",
  },
  {
    name: "Hyundai",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Hyundai-Logo-768x432.png",
  },
  {
    name: "Honda",
    logo: "https://1000logos.net/wp-content/uploads/2018/03/Honda-logo-768x432.png",
  },
  {
    name: "Tata",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Tata-logo-768x432.png",
  },
  {
    name: "Ford",
    logo: "https://1000logos.net/wp-content/uploads/2018/03/Ford-Logo-768x432.png",
  },
  {
    name: "Volkswagen",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Volkswagen-logo-768x432.png",
  },
  {
    name: "Mahindra",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Mahindra-logo-768x432.png",
  },
  {
    name: "Renault",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/Renault-logo-768x432.png",
  },
  {
    name: "Chevrolet",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Chevrolet-logo-768x432.png",
  },
];

const ManufacturerSelector = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const filtered = manufacturers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Select Manufacturer</h2>
      <input
        type="text"
        placeholder="Search Brands"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <div className="h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((brand, index) => (
            <div
              key={index}
              className="text-center hover:shadow-md p-2 rounded cursor-pointer transition"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-16 h-16 mx-auto object-contain"
              />
              <p className="mt-2 text-sm font-medium">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <section className="relative flex flex-col md:flex-row h-[95vh] w-full overflow-hidden font-sans">
      {/* Background Image */}{/*
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/media/bg2.png')",
        }}
      />

      {/* Form Section */}{/*
      <div className="relative z-20 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg bg-white shadow-xl p-10 rounded-xl">
          {showVehicleSelection ? (
            <ManufacturerSelector search={search} setSearch={setSearch} />
          ) : (
            <div className="w-full">
              <h2 className="text-3xl font-extrabold mb-4 text-black leading-tight">
                Experience Premier Car Services In Chennai
              </h2>
              <p className="mb-6 text-gray-600 text-lg">
                Get instant quotes for your car service
              </p>

              <button className="flex items-center justify-between w-full border p-4 border-gray-300 hover:border-gray-400 rounded mb-4">
                CHENNAI <BsChevronDown />
              </button>

              <button
                onClick={() => setShowVehicleSelection(true)}
                className="flex items-center justify-between w-full border p-4 border-gray-300 hover:border-gray-400 rounded mb-4"
              >
                SELECT YOUR CAR <BsChevronDown />
              </button>

              <input
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="ENTER MOBILE NUMBER"
                className="w-full border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-all duration-200 shadow-md">
                CHECK PRICES FOR FREE
              </button>

              <div className="mt-8 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-4">
                <div>
                  <span className="text-green-600 font-bold text-2xl">4.5</span>
                  /5
                  <br />
                  <span className="text-xs">Based on 100+ Reviews</span>
                </div>
                <div>
                  <span className="font-bold text-2xl">1000+</span>
                  <br />
                  Happy Customers
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Media Handles */}{/*
      <div className="fixed bottom-10 right-6 flex flex-col space-y-4 z-20">
        <a
          href="https://www.facebook.com/caragecarcare/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-black hover:text-blue-400 text-3xl transition duration-300 hover:scale-110" />
        </a>
        <a
          href="https://www.instagram.com/caragecarcare/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-black hover:text-red-300 text-3xl transition duration-300 hover:scale-110" />
        </a>
        <a
          href="https://www.youtube.com/@caragecarcare"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-black hover:text-red-500 text-3xl transition duration-300 hover:scale-110" />
        </a>
      </div>
    </section>
  );
};

export default Banner;



*/}




     {
       /* Fullscreen Background Video {" "}
      
         const [showVideo, setShowVideo] = useState(false);
        useEffect(() => {
    setShowVideo(true);
  }, []);

      {showVideo && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/media/banner.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      )}{" "}
      //Overlay {" "}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />*/
     }


     
{/*"use client";

import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { Filter, Search } from "lucide-react";
import manufacturers from "@/app/FormDetails/Manufacturer";
import SocialMedia from "@/components/SocialMedia";

type CarModel = {
  id: string;
  name: string;
  image: string;
};

const ManufacturerSelector = ({
  search,
  setSearch,
  close,
}: {
  search: string;
  setSearch: (value: string) => void;
  close: () => void;
}) => {
  const filtered = manufacturers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Select Manufacturer</h2>
        <button onClick={close}>
          <BsX className="text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors duration-200" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Brands"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-black rounded-lg px-4 py-2 mb-4"
      />
      <div className="h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((brands, index) => (
            <div
              key={index}
              className="text-center hover:shadow-md p-2 rounded cursor-pointer transition"
            >
              <img
                src={brands.logo}
                alt={brands.name}
                className="w-16 h-16 mx-auto object-contain"
              />
              <p className="mt-2 text-sm font-medium">{brands.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [search, setSearch] = useState("");
  const [showModelSelection, setShowModelSelection] = useState(false);
  return (
    <section className="relative flex flex-col md:flex-row h-[95vh] w-full overflow-hidden font-sans">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/media/bg2.png')",
        }}
      />
       Left Form Section 
      <div className="relative z-20 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 ">
        <div className="w-full max-w-lg bg-white shadow-xl p-10 rounded-xl">
          {showVehicleSelection ? (
            <ManufacturerSelector
              search={search}
              setSearch={setSearch}
              close={() => setShowVehicleSelection(false)}
            />
          ) : (
            <div className="w-full">
              <h2 className="text-3xl font-extrabold mb-4 text-black leading-tight">
                Experience Premier Car Services In Chennai
              </h2>
              <p className="mb-6 text-gray-600 text-lg">
                Get instant quotes for your car service
              </p>

              <button className="flex items-center justify-between w-full border p-4 border-gray-300 hover:border-gray-400 rounded mb-4">
                CHENNAI <BsChevronDown />
              </button>

              <button
                onClick={() => setShowVehicleSelection(true)}
                className="flex items-center justify-between w-full border p-4 border-gray-300 hover:border-gray-400 rounded mb-4"
              >
                SELECT YOUR CAR <BsChevronDown />
              </button>

              <input
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="ENTER MOBILE NUMBER"
                className="w-full border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-all duration-200 shadow-md">
                CHECK PRICES FOR FREE
              </button>

              <div className="mt-8 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-4">
                <div>
                  <span className="text-green-600 font-bold text-2xl">4.5</span>
                  /5
                  <br />
                  <span className="text-xs">Based on 100+ Reviews</span>
                </div>
                <div>
                  <span className="font-bold text-2xl">1000+</span>
                  <br />
                  Happy Customers
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      Social Media Handles 
      <SocialMedia />
    </section>
  );
};

export default Banner;*/}







{/* latest banner */}

{
  /*"use client";

import { useEffect, useState } from "react";
import { BsChevronDown, BsArrowLeft } from "react-icons/bs";
import SocialMedia from "@/components/SocialMedia";

type CarModel = {
  name: string;
  image?: string;
  fuel_types?: string[];
};

type CarBrand = {
  brand: string;
  logo?: string;
  models: CarModel[];
};

const Banner = () => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    "form" | "brands" | "models" | "fuels"
  >("form");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/car/all-brands");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        setError("Failed to load car brands. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setCurrentView("models");
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setCurrentView("fuels");
  };

  const handleFuelSelect = (fuel: string) => {
    setSelectedFuel(fuel);
    setCurrentView("form");
  };

  const handleBack = () => {
    if (currentView === "models") setCurrentView("brands");
    else if (currentView === "fuels") setCurrentView("models");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedFuel || !phone) {
      setError("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/car/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: selectedBrand.brand,
          model: selectedModel.name,
          phone,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      alert("Request submitted successfully");
      // Reset form
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedFuel(null);
      setPhone("");
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative flex flex-col md:flex-row h-[95vh] w-full overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/media/bg2.png')" }}
      />

      <div className="relative z-20 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg bg-white shadow-xl p-10 rounded-xl">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          {currentView === "form" && (
            <form onSubmit={handleSubmit} className="w-full">
              <h2 className="text-3xl font-extrabold mb-4 text-black leading-tight">
                Experience Premier Car Services In Chennai
              </h2>
              <p className="mb-6 text-gray-600 text-lg">
                Get instant quotes for your car service
              </p>

              <div className="mb-4 p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                <span className="font-medium">CHENNAI</span>
                <BsChevronDown className="text-gray-500" />
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setCurrentView("brands")}
                  className="flex items-center justify-between w-full border p-4 border-gray-300 hover:border-gray-400 rounded-lg"
                >
                  <span>
                    {selectedBrand && selectedModel && selectedFuel
                      ? `${selectedBrand.brand} ${selectedModel.name} (${selectedFuel})`
                      : selectedBrand && selectedModel
                      ? `${selectedBrand.brand} ${selectedModel.name}`
                      : selectedBrand
                      ? selectedBrand.brand
                      : "SELECT YOUR CAR"}
                  </span>
                  <BsChevronDown className="text-gray-500" />
                </button>
              </div>

              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ENTER MOBILE NUMBER"
                className="w-full border border-gray-300 p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md text-lg"
                disabled={isLoading}
              >
                {isLoading ? "LOADING..." : "CHECK PRICES FOR FREE"}
              </button>

              <div className="mt-8 flex justify-between text-sm text-gray-600">
                <div className="text-center">
                  <span className="text-green-600 font-bold text-2xl">4.5</span>
                  /5
                  <br />
                  <span className="text-xs">Based on 100+ Reviews</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-2xl">1000+</span>
                  <br />
                  Happy Customers
                </div>
              </div>
            </form>
          )}

          {currentView === "brands" && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setCurrentView("form")}
                  className="mr-2 text-gray-500 hover:text-black"
                >
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold">Select Manufacturer</h2>
              </div>

              <input
                type="text"
                placeholder="Search Brands"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              />

              <div className="h-64 overflow-y-auto">
                {filteredBrands.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No brands found
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredBrands.map((brand) => (
                      <div
                        key={brand.brand}
                        className="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleBrandSelect(brand)}
                      >
                        <p className="font-medium">{brand.brand}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "models" && selectedBrand && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setCurrentView("brands")}
                  className="mr-2 text-gray-500 hover:text-black"
                >
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold">Select Model</h2>
              </div>

              <div className="h-64 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {selectedBrand.models.map((model) => (
                    <div
                      key={model.name}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer text-center"
                      onClick={() => handleModelSelect(model)}
                    >
                      <p className="font-medium">{model.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === "fuels" &&
            selectedModel &&
            selectedModel.fuel_types && (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setCurrentView("models")}
                    className="mr-2 text-gray-500 hover:text-black"
                  >
                    <BsArrowLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold">Select Fuel Type</h2>
                </div>

                <div className="h-64 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedModel.fuel_types.map((fuel) => (
                      <div
                        key={fuel}
                        className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer text-center"
                        onClick={() => handleFuelSelect(fuel)}
                      >
                        <p className="font-medium">{fuel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <SocialMedia />
    </section>
  );
};

export default Banner;
 */
}

  {/*const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedBrand || !selectedModel || !selectedFuel || !phone) {
    setError("Please fill all fields");
    return;
  }

  try {
    // Store form data
    sessionStorage.setItem('carFormData', JSON.stringify({
      brand: selectedBrand.brand,
      model: selectedModel.name,
      fuelType: selectedFuel,
      phone
    }));

    // For Pages Router:
    window.location.href = '/service'; // Full page reload ensures data is available
    
    // OR for App Router:
    // router.push('/service');
    
    // Process submission in background
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/submit-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: selectedBrand.brand,
        model: selectedModel.name,
        fuelType: selectedFuel,
        phone,
      }),
    });

  } catch (err) {
    console.error("Submission error:", err);
    setError("Failed to submit. Please try again.");
  }
}; */}
















{/* full code with year added */}
{/*
  "use client";
  
  import { useEffect, useState } from "react";
  import { BsChevronDown, BsArrowLeft, BsSearch } from "react-icons/bs";
  import SocialMedia from "@/components/SocialMedia";
  import Image from 'next/image';
  
  interface CarModel {
    name: string;
    imageUrl?: string;
    fuel_types?: string[];
  }
  
  interface CarBrand {
    brand: string;
    logoUrl?: string;
    models: CarModel[];
  }
  
  interface FuelType {
    type: string;
    url: string;
  }
  
  const Banner = () => {
    const [brands, setBrands] = useState<CarBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
    const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
    const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<"form" | "brands" | "models" | "fuels" | "years">("form");
    const [brandSearch, setBrandSearch] = useState("");
    const [modelSearch, setModelSearch] = useState("");
    const [fuelIcons, setFuelIcons] = useState<FuelType[]>([]);
  
    // Generate years from current year to 30 years back
    const years = Array.from({length: 30}, (_, i) => (new Date().getFullYear() - i).toString());
  
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          setIsLoading(true);
          
          const [brandsRes, fuelsRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/all-brands`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/fuel-icons`)
          ]);
  
          if (!brandsRes.ok || !fuelsRes.ok) throw new Error("Failed to fetch data");
  
          const [brandsData, fuelsData] = await Promise.all([
            brandsRes.json(),
            fuelsRes.json()
          ]);
  
          setBrands(brandsData);
          setFuelIcons(fuelsData);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load data");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchInitialData();
    }, []);
  
    const filteredBrands = brands.filter(brand =>
      brand.brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  
    const filteredModels = (selectedBrand?.models || []).filter(model =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  
    const handleBrandSelect = (brand: CarBrand) => {
      setSelectedBrand(brand);
      setSelectedModel(null);
      setSelectedFuel(null);
      setSelectedYear(null);
      setCurrentView("models");
      setModelSearch("");
    };
  
    const handleModelSelect = (model: CarModel) => {
      setSelectedModel(model);
      setSelectedFuel(null);
      setSelectedYear(null);
      setCurrentView("fuels");
    };
  
    const handleFuelSelect = (fuel: string) => {
      setSelectedFuel(fuel);
      setCurrentView("years");
    };
  
    const handleYearSelect = (year: string) => {
      setSelectedYear(year);
      setCurrentView("form");
    };
  
    const handleBack = () => {
      if (currentView === "models") setCurrentView("brands");
      else if (currentView === "fuels") setCurrentView("models");
      else if (currentView === "years") setCurrentView("fuels");
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedBrand || !selectedModel || !selectedFuel || !selectedYear || !phone) {
        setError("Please fill all fields");
        return;
      }
  
      try {
        // Store form data
        sessionStorage.setItem('carFormData', JSON.stringify({
          brand: selectedBrand.brand,
          model: selectedModel.name,
          fuelType: selectedFuel,
          year: selectedYear,
          phone
        }));
  
        window.location.href = '/service';
      
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/submit-request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: selectedBrand.brand,
            model: selectedModel.name,
            fuelType: selectedFuel,
            year: selectedYear,
            phone,
          }),
        });
  
      } catch (err) {
        console.error("Submission error:", err);
        setError("Failed to submit. Please try again.");
      }
    }; 
  
    if (isLoading) {
      return (
        <section className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
          <div className="absolute inset-0 z-0 blur-sm opacity-30 bg-[url('/images/loading-bg.svg')] bg-cover bg-center" />
          <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center text-center">
            <div className="mb-6 animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading car data</h2>
            <p className="text-sm text-gray-500">Please wait while we fetch the latest information for you.</p>
          </div>
        </section>
      );
    }
  
    const renderImage = (url: string, alt: string, className = "") => (
      <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
        <Image 
          src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
          alt={alt}
          width={124}  
          height={124}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </div>
    );
  
    return (
      <section className="relative flex flex-col lg:flex-row min-h-[400px] lg:min-h-screen w-full overflow-hidden font-sans">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/media/bg2.png')" }} />
  
        <div className="relative z-20 w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-xl">
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
                {error}
              </div>
            )}
  
            {currentView === "form" && (
              <form onSubmit={handleSubmit} className="w-full">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-black leading-tight">
                  Experience Premier Car Services In Chennai
                </h2>
                <p className="mb-6 text-gray-600 text-base sm:text-lg">
                  Get instant quotes for your car service
                </p>
  
                <div className="mb-4 p-3 sm:p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                  <span className="font-medium">CHENNAI</span>
                  <BsChevronDown className="text-gray-500" />
                </div>
  
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrentView("brands")}
                    className="flex items-center justify-between w-full border p-3 sm:p-4 border-gray-300 hover:border-gray-400 rounded-lg text-sm sm:text-base"
                  >
                    <span>
                      {selectedBrand?.brand || "SELECT YOUR CAR"}
                      {selectedModel && ` ${selectedModel.name}`}
                      {selectedFuel && ` (${selectedFuel})`}
                      {selectedYear && ` - ${selectedYear}`}
                    </span>
                    <BsChevronDown className="text-gray-500" />
                  </button>
                </div>
  
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ENTER MOBILE NUMBER"
                  className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
  
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md text-base sm:text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "PROCESSING..." : "CHECK PRICES FOR FREE"}
                </button>
  
                <div className="mt-6 sm:mt-8 flex justify-between text-xs sm:text-sm text-gray-600">
                  <div className="text-center">
                    <span className="text-green-600 font-bold text-xl sm:text-2xl">4.5</span>/5
                    <br />
                    <span className="text-xs">Based on 100+ Reviews</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-xl sm:text-2xl">1000+</span>
                    <br />
                    Happy Customers
                  </div>
                </div>
              </form>
            )}
  
            {currentView === "brands" && (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <button onClick={() => setCurrentView("form")} className="mr-2 text-gray-500 hover:text-black">
                    <BsArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold">Select Manufacturer</h2>
                </div>
                
                <div className="relative mb-4">
                  <BsSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Brands"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                  />
                </div>
                
                <div className="h-64 overflow-y-auto">
                  {filteredBrands.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">
                      {brands.length === 0 ? "No brands available" : "No matching brands found"}
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {filteredBrands.map((brand) => (
                        <div 
                          key={brand.brand} 
                          className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer" 
                          onClick={() => handleBrandSelect(brand)}
                        >
                          {brand.logoUrl && renderImage(brand.logoUrl, brand.brand)}
                          <p className="text-xs sm:text-sm font-medium text-center mt-2">{brand.brand}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
  
            {currentView === "models" && selectedBrand && (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                    <BsArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold">Select Model</h2>
                </div>
                
                <div className="relative mb-4">
                  <BsSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Models"
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                  />
                </div>
                
                <div className="h-64 overflow-y-auto">
                  {filteredModels.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">
                      {selectedBrand.models.length === 0 ? "No models available" : "No matching models found"}
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {filteredModels.map((model) => (
                        <div
                          key={model.name}
                          className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                          onClick={() => handleModelSelect(model)}
                        >
                          {model.imageUrl && renderImage(model.imageUrl, model.name, "mb-3 w-20 h-20 sm:w-24 sm:h-24")}
                          <p className="font-medium text-center text-sm sm:text-base">{model.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
  
            {currentView === "fuels" && selectedModel?.fuel_types && (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                    <BsArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold">Select Fuel Type</h2>
                </div>
                
                <div className="h-64 overflow-y-auto">
                  {selectedModel.fuel_types.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No fuel types available</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedModel.fuel_types.map((fuel) => {
                        const fuelIcon = fuelIcons.find(f => 
                          f.type.toLowerCase() === fuel.toLowerCase()
                        );
                        return (
                          <div
                            key={fuel}
                            className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                            onClick={() => handleFuelSelect(fuel)}
                          >
                            {fuelIcon?.url && renderImage(fuelIcon.url, fuel, "mb-2")}
                            <p className="font-medium text-center text-sm sm:text-base">{fuel}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
  
            {currentView === "years" && (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                    <BsArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold">Select Manufacturing Year</h2>
                </div>
                
                <div className="h-64 overflow-y-auto">
                  {years.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No years available</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {years.map((year) => (
                        <button
                          key={year}
                          className={`p-3 border rounded-lg hover:border-blue-500 cursor-pointer text-center ${
                            selectedYear === year ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => handleYearSelect(year)}
                        >
                          <p className="font-medium text-sm sm:text-base">{year}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <SocialMedia />
      </section>
    );
  };
  
  export default Banner; */}

  "use client";
  import React, { useEffect, useState } from 'react';
  import Navbar from '@/components/Navbar';
  import Image from 'next/image';
  import { BsChevronDown, BsArrowLeft, BsSearch } from 'react-icons/bs';
  
  interface CarModel {
    name: string;
    imageUrl?: string;
    fuel_types?: string[];
  }
  
  interface CarBrand {
    brand: string;
    logoUrl?: string;
    models: CarModel[];
  }
  
  interface FuelType {
    type: string;
    url: string;
  }
  
  const ServicePage = () => {
    const [carInfo, setCarInfo] = useState<any>({});
    const [brands, setBrands] = useState<CarBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
    const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
    const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [phone, setPhone] = useState("");
    const [brandSearch, setBrandSearch] = useState("");
    const [modelSearch, setModelSearch] = useState("");
    const [fuelIcons, setFuelIcons] = useState<FuelType[]>([]);
    const [currentView, setCurrentView] = useState<"carInfo" | "brands" | "models" | "fuels" | "years">("carInfo");
  
    const years = Array.from({length: 30}, (_, i) => (new Date().getFullYear() - i).toString());
  
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const [brandsRes, fuelsRes, carData] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/all-brands`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/fuel-icons`),
            sessionStorage.getItem('carFormData')
          ]);
  
          if (!brandsRes.ok || !fuelsRes.ok) throw new Error("Failed to fetch data");
  
          const [brandsData, fuelsData] = await Promise.all([
            brandsRes.json(),
            fuelsRes.json()
          ]);
  
          setBrands(brandsData);
          setFuelIcons(fuelsData);
          
          if (carData) {
            const parsedData = JSON.parse(carData);
            setCarInfo(parsedData);
          }
        } catch (err) {
          console.error("Error loading data:", err);
        }
      };
      
      fetchInitialData();
    }, []);
  
    const filteredBrands = brands.filter(brand =>
      brand.brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  
    const filteredModels = (selectedBrand?.models || []).filter(model =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  
    const handleBrandSelect = (brand: CarBrand) => {
      setSelectedBrand(brand);
      setSelectedModel(null);
      setSelectedFuel(null);
      setSelectedYear(null);
      setCurrentView("models");
      setModelSearch("");
    };
  
    const handleModelSelect = (model: CarModel) => {
      setSelectedModel(model);
      setSelectedFuel(null);
      setSelectedYear(null);
      setCurrentView("fuels");
    };
  
    const handleFuelSelect = (fuel: string) => {
      setSelectedFuel(fuel);
      setCurrentView("years");
    };
  
    const handleYearSelect = (year: string) => {
      setSelectedYear(year);
      saveCarSelection();
    };
  
    const handleBack = () => {
      if (currentView === "models") setCurrentView("brands");
      else if (currentView === "fuels") setCurrentView("models");
      else if (currentView === "years") setCurrentView("fuels");
      else setCurrentView("carInfo");
    };
  
    const saveCarSelection = () => {
      if (selectedBrand && selectedModel && selectedFuel && selectedYear) {
        const newCarInfo = {
          brand: selectedBrand.brand,
          model: selectedModel.name,
          fuelType: selectedFuel,
          year: selectedYear,
          phone: carInfo.phone || "",
          image: selectedModel.imageUrl
        };
        setCarInfo(newCarInfo);
        sessionStorage.setItem('carFormData', JSON.stringify(newCarInfo));
        setCurrentView("carInfo");
      }
    };
  
    const renderImage = (url: string, alt: string, className = "") => (
      <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
        <Image 
          src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
          alt={alt}
          width={124}  
          height={124}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </div>
    );
  
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
  
    const renderCarInfoView = () => (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button 
            onClick={() => setCurrentView("brands")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Change Car
          </button>
        </div>
        <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
          {carInfo?.image ? (
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`} 
              alt={`${carInfo.brand} ${carInfo.model}`} width={300} height={200} 
              className="w-full h-full object-cover" />
          ) : <span className="text-gray-500">Car Image</span>}
        </div>
        <div className="space-y-3">
          <p className="font-medium text-lg">
            {carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">⛽</span>
            {carInfo?.fuelType || 'Fuel Type'}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">📅</span>
            Year: {carInfo?.year || 'Year'}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">📞</span>
            Phone: {carInfo?.phone || 'Phone Number'}
          </p>
        </div>
      </>
    );
  
    const renderCarSelectionView = () => {
      switch(currentView) {
        case "brands":
          return (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Manufacturer</h2>
              </div>
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredBrands.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {brands.length === 0 ? "No brands available" : "No matching brands found"}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {filteredBrands.map((brand) => (
                      <div 
                        key={brand.brand} 
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer" 
                        onClick={() => handleBrandSelect(brand)}
                      >
                        {brand.logoUrl && renderImage(brand.logoUrl, brand.brand)}
                        <p className="text-xs sm:text-sm font-medium text-center mt-2">{brand.brand}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        
        case "models":
          return (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Model</h2>
              </div>
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Models"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredModels.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {selectedBrand?.models.length === 0 ? "No models available" : "No matching models found"}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {filteredModels.map((model) => (
                      <div
                        key={model.name}
                        className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                        onClick={() => handleModelSelect(model)}
                      >
                        {model.imageUrl && renderImage(model.imageUrl, model.name, "mb-3 w-20 h-20 sm:w-24 sm:h-24")}
                        <p className="font-medium text-center text-sm sm:text-base">{model.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        
        case "fuels":
          return (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Fuel Type</h2>
              </div>
              
              <div className="h-64 overflow-y-auto">
                {selectedModel?.fuel_types?.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No fuel types available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedModel?.fuel_types?.map((fuel) => {
                      const fuelIcon = fuelIcons.find(f => 
                        f.type.toLowerCase() === fuel.toLowerCase()
                      );
                      return (
                        <div
                          key={fuel}
                          className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                          onClick={() => handleFuelSelect(fuel)}
                        >
                          {fuelIcon?.url && renderImage(fuelIcon.url, fuel, "mb-2")}
                          <p className="font-medium text-center text-sm sm:text-base">{fuel}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        
        case "years":
          return (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Manufacturing Year</h2>
              </div>
              
              <div className="h-64 overflow-y-auto">
                {years.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No years available</p>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        className={`p-3 border rounded-lg hover:border-blue-500 cursor-pointer text-center ${
                          selectedYear === year ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => handleYearSelect(year)}
                      >
                        <p className="font-medium text-sm sm:text-base">{year}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        
        default:
          return renderCarInfoView();
      }
    };
  
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">Caragecarcare</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Parts Categories (70%) */}
            <div className="w-full lg:w-[70%] bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Select the required category of part:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {parts.map((p,i) => (
                  <div 
                    key={i} 
                    className="flex items-center p-4 hover:bg-blue-50 rounded-md cursor-pointer border border-gray-100"
                  >
                    <span className="text-2xl mr-3">{p.icon}</span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Car Info (30%) */}
            <div className="w-full lg:w-[30%]">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                {renderCarSelectionView()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ServicePage;