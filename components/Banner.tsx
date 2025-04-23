"use client";

import { useEffect, useState } from "react";
import { BsChevronDown, BsArrowLeft, BsSearch } from "react-icons/bs";
import SocialMedia from "@/components/SocialMedia";

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
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"form" | "brands" | "models" | "fuels">("form");
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [fuelIcons, setFuelIcons] = useState<FuelType[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch brands data
        const [brandsRes, fuelsRes] = await Promise.all([
          fetch("http://localhost:8000/car/all-brands"),
          fetch("http://localhost:8000/car/fuel-icons")
        ]);

        if (!brandsRes.ok) throw new Error("Failed to fetch brands");
        if (!fuelsRes.ok) throw new Error("Failed to fetch fuel icons");

        const brandsData = await brandsRes.json();
        const fuelsData = await fuelsRes.json();

        setBrands(brandsData);
        setFuelIcons(fuelsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = (selectedBrand?.models || []).filter((model) =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedFuel(null);
    setCurrentView("models");
    setModelSearch("");
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setSelectedFuel(null);
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
      
      const result = await response.json();
      alert(result.message || "Request submitted successfully");
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedFuel(null);
      setPhone("");
      setError(null);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative flex flex-col md:flex-row h-[95vh] w-full overflow-hidden font-sans">
        <div className="absolute inset-0 bg-gray-100 z-0" />
        <div className="relative z-20 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-lg bg-white shadow-xl p-10 rounded-xl text-center">
            <p>Loading car data...</p>
          </div>
        </div>
      </section>
    );
  }

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
                {isLoading ? "PROCESSING..." : "CHECK PRICES FOR FREE"}
              </button>

              <div className="mt-8 flex justify-between text-sm text-gray-600">
                <div className="text-center">
                  <span className="text-green-600 font-bold text-2xl">4.5</span>/5
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
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredBrands.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {brands.length === 0 ? "No brands available" : "No matching brands found"}
                  </p>
                ) : (
                  // Update your image rendering to handle URLs properly
<div className="grid grid-cols-3 gap-4">
  {filteredBrands.map((brand) => (
    <div key={brand.brand} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleBrandSelect(brand)}>
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        <img
          src={`http://localhost:8000${brand.logoUrl}`}
          alt={brand.brand}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
      <p className="text-sm font-medium text-center">{brand.brand}</p>
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
                  onClick={handleBack}
                  className="mr-2 text-gray-500 hover:text-black"
                >
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold">Select Model</h2>
              </div>
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Models"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredModels.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {selectedBrand.models.length === 0 ? "No models available" : "No matching models found"}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredModels.map((model) => (
                      <div
                        key={model.name}
                        className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                        onClick={() => handleModelSelect(model)}
                      >
                        {model.imageUrl && (
                          <img
                          src={`http://localhost:8000${model.imageUrl}`}
                          alt={model.name}
                          className="w-16 h-16 object-contain mb-2"
                          onError={(e) => {
                            console.error("Failed to load image:", e.currentTarget.src);
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                        )}
                        <p className="font-medium text-center">{model.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "fuels" && selectedModel && selectedModel.fuel_types && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button 
                  onClick={handleBack}
                  className="mr-2 text-gray-500 hover:text-black"
                >
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold">Select Fuel Type</h2>
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
                          {fuelIcon?.url && (
                            <img
                              src={fuelIcon.url}
                              alt={fuel}
                              className="w-16 h-16 object-contain mb-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          <p className="font-medium text-center">{fuel}</p>
                        </div>
                      );
                    })}
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

export default Banner;