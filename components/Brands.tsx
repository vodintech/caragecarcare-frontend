import Image from "next/image";

export default function Brands() {
  const brands = [
    { name: "Brand1", src: "/media/p1.png" },
    { name: "Brand2", src: "/brand2.png" }, 
    { name: "Brand3", src: "/brand3.png" },
    { name: "Brand4", src: "/brand4.png" },
    { name: "Brand5", src: "/brand5.png" },
  ];

  return (
    <section className="bg-black py-16 text-center text-gray-300 overflow-hidden">
      <div className="relative inline-block mb-10">
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-red-600 absolute top-[-25px] left-1/2 transform -translate-x-1/2"></div>
        <h2 className="text-3xl font-bold text-white">Brands We Serve</h2>
      </div>

      {/* Auto Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-slide flex gap-16 px-6 whitespace-nowrap">
          {/* Duplicate the brands to create an infinite scroll effect */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="inline-block transition-transform duration-300 hover:scale-110"
            >
              <Image src={brand.src} alt={brand.name} width={80} height={80} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
