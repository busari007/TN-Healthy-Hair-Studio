export default function Section4() {
  const benefits = [
    {
      image: "https://cdn-icons-png.flaticon.com/128/1490/1490749.png",
      name: "Deeper Relaxation",
      description:
        "Each session eases physical and emotional tension creating space for true rest.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/10176/10176866.png",
      name: "Holistic Wellbeing",
      description:
        "We blend touch, scent, and space in harmony to restore both body and mind.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/9813/9813286.png",
      name: "Natural Radiance",
      description:
        "Circulation-boosting care enhances your glow from within.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/14528/14528562.png",
      name: "Mindful Moments",
      description:
        "Our space invites you to slow down and reconnect with what truly matters.",
    },
  ];

  return (
    <div className="w-full bg-[#F7F5F2] mt-10 lg:mt-30">
      <div className="flex flex-col items-center">
        {/* Section4 Header */}
        <div className="flex flex-col items-center text-center mt-16 lg:mt-16 px-6 md:px-12 lg:px-20 xl:px-40">
          <h1 className="Playfair text-3xl lg:text-5xl leading-snug text-[#222]">
            The Benefits of <br /> Our Treatments
          </h1>
          <p className="Lato text-sm max-w-[85%] md:text-base text-[#444] mt-5 lg:max-w-2xl leading-relaxed">
            Our treatments do more than treat hair — they restore it's balance and inner vitality.
          </p>
        </div>

        {/* Benefits Blocks */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-14 mt-10 p-5 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="w-full mx-auto lg:max-w-sm xl:max-w-md bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-fit rounded-full bg-[#D8CEC4] p-4 flex items-center justify-center">
                <img
                  src={benefit.image}
                  alt="icon"
                  className="object-contain w-10 h-10 md:w-12 md:h-12"
                />
              </div>

              {/* Benefit Title */}
              <h1 className="Playfair text-base md:text-lg lg:text-xl text-[#222222] mt-6 font-semibold">
                {benefit.name}
              </h1>

              {/* Benefit Description */}
              <p className="Lato text-[12px] md:text-sm lg:text-base text-[#525252] mt-4 leading-relaxed max-w-[80%]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
