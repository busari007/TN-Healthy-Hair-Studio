import { useState } from "react";
import moisture_fusion from "/src/assets/images/Moisture_Fusion.png";
import bond_repair from "/src/assets/images/Protein Strength Treatment.png";
import hair_repair from "/src/assets/images/New Client Hair Repair  Hair Restoration.png";
import DIY from "/src/assets/images/Do It Yourself (DIY) Hair Care.png";
import relaxer from "/src/assets/images/Chemical Process (Relaxer).png";
import dandruff from "/src/assets/images/Dandruff.png";
import Section4 from "./Section4";
import Section5 from "./Section5";
import ModalWrapper from "../ModalWrapper";
import { Link } from "react-router-dom";

export default function Section3() {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const services = [
    {
      name: "Moisture Fusion",
      image: moisture_fusion,
      price: "₦50,000",
      amount: 50000,
      time: "60 Minutes - 90 Minutes",
      includes: [
        "Hot Oil Treatment",
        "Micromist Shampoo System",
        "3-step Shampoo System",
        "Deep Conditioning",
        "Split Ends Trimming",
        "Protective Style (Cornrows/Blowout)",
      ],
      description: `Revive and hydrate your hair...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote:
        "Price doesn't include hair loosening. Extra for high density or hair past shoulders.",
    },
    {
      name: "Strengthening/Bond Repair",
      image: bond_repair,
      price: "₦65,000",
      amount:65000,
      time: "60 Minutes",
      includes: [
        "Hot Oil Treatment",
        "Micromist Shampoo System",
        "3-step Shampoo System",
        "Protein Treatment",
        "Deep Conditioning",
        "Split Ends Trimming",
        "Protective Style (Cornrows/Blowout)",
      ],
      description: `Restore your hair's strength and resilience...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote: "Extra charges may apply for high-density hair.",
    },
    {
      name: "New Client: Hair Repair/ Hair Restoration",
      image: hair_repair,
      price: "₦10,000+",
      amount: 10000,
      time: "30 Minutes - 40 Minutes",
      includes: [
        "Hair & Scalp Consultation",
        "Elasticity, Porosity & Density Check",
        "Trichoscope Assessment",
        "Personalized Treatment Plan",
      ],
      description: `Begin your healthy hair journey...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote: "Initial consultation fee deducted from overall treatment cost.",
    },
    {
      name: "Do It Yourself (DIY) Hair Care",
      image: DIY,
      price: "₦55,000",
      amount: 55000,
      time: "30 Minutes - 40 Minutes",
      includes: [
        "Consultation & Analysis",
        "Customized Routine",
        "Conditioning & Care Guide",
        "Home Application Demo",
      ],
      description: `Take control of your hair care at home...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote: "Routine will be customized based on your hair goals.",
    },
    {
      name: "Chemical Process (Relaxer)",
      image: relaxer,
      price: "₦50,000",
      amount: 50000,
      time: "60 Minutes",
      includes: [
        "Scalp Shielding",
        "Timed Application",
        "pH Balance Restoration",
        "Deep Conditioning",
        "Protective Styling",
      ],
      description: `Experience a safe and professional hair relaxing service...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote: "Does not include hair loosening or pre-relaxer prep.",
    },
    {
      name: "Dandruff Treatment",
      image: dandruff,
      price: "₦60,000",
      amount: 60000,
      time: "30 Minutes - 40 Minutes",
      includes: [
        "Trichoscope Analysis",
        "Scalp Detox/Exfoliation",
        "Hot Oil Treatment",
        "Micromist Shampoo System",
        "3-step Shampoo System",
        "Deep Conditioning",
        "Protective Style (Cornrows/Blowout)",
      ],
      description: `Say goodbye to flakes with our Dandruff Treatment...`,
      policyNotes: [
        "₦10,000 penalty for late arrival over 10 min",
        "Booking deposit is non-refundable if late or no-show",
        "Cancellation without 12 hr notice = ₦10,000 fee",
      ],
      priceNote: "Best results seen with weekly follow-ups for 4 weeks.",
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="w-full">
{/* Unified Modal */}
{showModal && (
  <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)}>
    <div className="w-full relative mt-5 px-4">

      {/* Service Name */}
      <h2 className="Playfair text-2xl md:text-3xl font-semibold text-center mb-4">
        {selectedService?.name}
      </h2>

      {/* Service Image */}
      <img
        src={selectedService?.image}
        alt={selectedService?.name}
        className="w-full h-48 md:h-64 object-cover rounded-md mb-4"
      />

      {/* Service Description */}
      <p className="Jakarta text-sm md:text-base text-gray-700 leading-relaxed mb-4">
        {selectedService?.description}
      </p>

      {/* Includes List */}
      <h3 className="Playfair text-lg md:text-xl font-semibold text-gray-800 mb-2">
        What's Included
      </h3>
      <ul className="list-disc pl-5 mb-4 text-sm md:text-base Jakarta text-gray-600 space-y-1">
        {selectedService?.includes?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Pricing and Duration */}
      <p className="font-semibold text-lg md:text-xl text-black mb-1">
        Price: {selectedService?.price}
      </p>
      <p className="text-sm md:text-base text-gray-500 mb-4">{selectedService?.time}</p>

      {/* Policy Notes */}
      <div className="mt-6 border-t pt-4">
        <h3 className="Playfair text-lg md:text-xl font-semibold text-center mb-3">
          Important Policy
        </h3>
        <ul className="list-disc pl-5 text-xs md:text-sm text-gray-600 space-y-2">
          {selectedService?.policyNotes?.map((note, i) => (
            <li key={i} className="italic">{note}</li>
          ))}
        </ul>
        <p className="text-xs mt-3 italic text-gray-500 text-center">
          {selectedService?.priceNote}
        </p>
      </div>

      {/* Booking Button */}
      <Link
  to="/book_service"
  state={{ service: selectedService  }} // Pass the whole service object or just service.name
  className="block mt-6 mb-2"
>
  <div className="w-full max-w-xs mx-auto px-4 py-2 md:px-5 md:py-3 bg-[#F0CCCE] text-center rounded-2xl cursor-pointer hover:bg-[#e8b9bc] transition-colors duration-300 shadow-lg hover:shadow-xl">
    <p className="Jakarta text-sm md:text-base font-semibold text-gray-800 tracking-wide">
      BOOK NOW
    </p>
  </div>
</Link>
    </div>
  </ModalWrapper>
)}


      {/* Services Section */}
      <div
        id="services"
        className="w-full bg-[#222222] text-white pb-24 border border-black lg:mt-5"
      >
        <div className="flex flex-col gap-y-5 text-center px-4 lg:px-20 items-center">
          <h1 className="Playfair text-3xl lg:text-5xl mt-12 lg:mt-24">
            Our Services
          </h1>
          <p className="Lato text-xs md:text-sm max-w-[85%] lg:text-base leading-relaxed">
            Each treatment is thoughtfully crafted to restore balance, ease tension,
            and reveal your natural glow — all within a serene and welcoming space.
          </p>
        </div>

        {/* Services Grid */}
        <div className="w-full mt-8 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-5 mb-16 lg:mb-0">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => openModal(service)}
              className="flex flex-col w-full rounded-2xl bg-white shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:cursor-pointer"
            >
              <div className="relative w-full h-[250px]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-2xl bg-[#F0CCCE] text-[#2D2D2C]">
                  <h1 className="Jakarta text-sm lg:text-base">{service.price}</h1>
                </div>
                <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
                <h1 className="absolute bottom-3 left-4 right-4 Playfair text-lg md:text-xl lg:text-2xl text-white">
                  {service.name}
                </h1>
              </div>

              <div className="flex flex-col relative p-4 text-black">
                <h1 className="Lato font-bold text-sm md:text-base">{service.time}</h1>
                <p className="Jakarta font-light text-[11px] md:text-[12px] mt-3 mb-5 whitespace-pre-line overflow-hidden leading-relaxed">
                  {service.description}
                </p>
                <p className="absolute bottom-3 right-4 Playfair text-[10px] md:text-sm font-semibold text-[#222]">
                  Click to learn more →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <Section4 />

        {/* Reviews Section */}
        <Section5 />
      </div>
    </div>
  );
}
