import { useEffect, useState } from "react";
import bgMobile from "/src/assets/images/Spa_Landing_Image_Mobile.png";
import bgLarge from "/src/assets/images/Spa_Landing_Image_Large.png";

export default function Section1() {
  const [bg, setBg] = useState(bgMobile);

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1024) setBg(bgLarge); // large screens
      else setBg(bgMobile); // mobile/tablet
    };

    updateBg();
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    //Landing Page
    <div
      id="home"
      className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 lg:bg-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-white text-center mt-20 lg:mt-45">
        {/* Header */}
        <h1 className="Playfair text-4xl lg:text-5xl xl:text-6xl leading-tight lg:leading-[1.15] drop-shadow-md">
          Where Beauty <br className="lg:hidden" />
          Blooms <br className="hidden lg:block" />
          In Stillness
        </h1>

        {/* Subtitle */}
        <p className="Lato text-sm md:text-base xl:text-xl mt-5 max-w-[70%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] leading-relaxed opacity-95">
          A calm, elegant space for hair care and wellness — designed to relax your mind and gently restore your natural glow.
        </p>

        {/* CTA Button */}
        <a href="/#services" className="z-30 mt-12 md:mt-20 lg:mt-28">
          <div className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 bg-[#F0CCCE] rounded-2xl cursor-pointer hover:bg-[#e8b9bc] transition-colors duration-300 shadow-lg hover:shadow-xl">
            <p className="Jakarta text-[11px] md:text-base font-semibold text-gray-800 tracking-wide">
              VIEW ALL TREATMENTS
            </p>
            <div className="bg-white rounded-full p-1.5 md:p-2 flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/545/545682.png"
                alt="arrow"
                className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
