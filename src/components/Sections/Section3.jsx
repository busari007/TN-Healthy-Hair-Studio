import moisture_fusion from "/src/assets/images/Moisture_Fusion.png";
import bond_repair from "/src/assets/images/Protein Strength Treatment.png";
import hair_repair from "/src/assets/images/New Client Hair Repair  Hair Restoration.png";
import DIY from "/src/assets/images/Do It Yourself (DIY) Hair Care.png";
import relaxer from "/src/assets/images/Chemical Process (Relaxer).png";
import dandruff from "/src/assets/images/Dandruff.png";
import Section4 from "./Section4";
import Section5 from "./Section5";

export default function Section3() {
  const services = [
    {
      name: "Moisture Fusion",
      image: moisture_fusion,
      price: "₦50,000",
      time: "60 Minutes - 90 Minutes",
      description: `Revive and hydrate your hair with our Moisture Fusion therapy. 
A rejuvenating process that restores softness, shine, and strength. 
It includes a nourishing hot oil treatment, micromist and 3-step shampoo system, 
deep conditioning, split-end trimming, and a finishing protective style (cornrows or blowout) for lasting ....`,
    },
    {
      name: "Strengthening/Bond Repair",
      image: bond_repair,
      price: "₦65,000",
      time: "60 Minutes",
      description: `Restore your hair's strength and resilience with our Strengthening/Bond Repair therapy. Designed to repair damage and fortify weak strands.
This treatment features a hot oil session, micromist and 3-step shampoo system, protein and deep conditioning treatments, split-end trimming, and a finishing 
protective style (cornrows or blowout) for .....`,
    },
    {
      name: "New Client: Hair Repair/ Hair Restoration",
      image: hair_repair,
      price: "₦10,000+",
      time: "30 Minutes - 40 Minutes",
      description: `Begin your healthy hair journey with a personalized consultation to assess your hair density, elasticity, porosity, and scalp condition.
Based on your results, we'll create a tailored Hair Care or Restoration Plan, which may include our Moisture Fusion or Strengthening/Bond Repair treatments to ......`,
    },
    {
      name: "Do It Yourself (DIY) Hair Care",
      image: DIY,
      price: "₦55,000",
      time: "30 Minutes - 40 Minutes",
      description: `Take control of your hair care at home with our DIY Hair Care package. 
After a personalized consultation assessing your hair and scalp condition, density, porosity, and elasticity, we'll create a weekly or bi-monthly at-home routine. 
Learn how to apply conditioning and .........`,
    },
    {
      name: "Chemical Process (Relaxer)",
      image: relaxer,
      price: "₦50,000",
      time: "60 Minutes",
      description: `Experience a safe and professional hair relaxing service with our Chemical Process. 
We prioritize your hair's health by shielding the scalp, following precise safety timings, avoiding overlap on previously treated hair, 
and restoring pH balance after the ......`,
    },
    {
      name: "Dandruff Treatment",
      image: dandruff,
      price: "₦60,000",
      time: "30 Minutes - 40 Minutes",
      description: `Say goodbye to flakes with our Dandruff Treatment, starting with a trichoscope analysis to assess severity. 
This soothing treatment includes a hot oil session, micromist and 3-step shampoo system, scalp detox/exfoliation, deep conditioning, and finishes with a protective style (cornrows or blowout) for .......`,
    },
  ];

  return (
    <div className="w-full">
      <div
        id="services"
        className="w-full bg-[#222222] text-white pb-24 border border-black lg:mt-5"
      >
        {/* Section3 Header */}
        <div className="flex flex-col gap-y-5 text-center px-4 lg:px-20 items-center">
          <h1 className="Playfair text-3xl lg:text-5xl mt-12 lg:mt-24">
            Our Services
          </h1>
          <p className="Lato text-xs md:text-sm max-w-[85%] lg:text-base leading-relaxed">
            Each treatment is thoughtfully crafted to restore balance, ease tension,
            and reveal your natural glow — all within a serene and welcoming space.
          </p>
        </div>

        {/* Services */}
        <div className="w-full mt-8 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-5 mb-16 lg:mb-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col w-full rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2 hover:cursor-pointer"
            >
              {/* Service Image Section */}
              <div className="relative w-full h-[250px]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-t-2xl"
                />

                {/* Price */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-2xl bg-[#F0CCCE] text-[#2D2D2C]">
                  <h1 className="Jakarta text-sm lg:text-base">{service.price}</h1>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>

                {/* Service Name */}
                <h1 className="absolute bottom-3 left-4 right-4 Playfair text-lg md:text-xl lg:text-2xl text-white">
                  {service.name}
                </h1>
              </div>

              {/* Service Body */}
              <div className="flex flex-col relative p-4 text-black">
                <h1 className="Lato font-bold text-sm md:text-base">
                  {service.time}
                </h1>

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
