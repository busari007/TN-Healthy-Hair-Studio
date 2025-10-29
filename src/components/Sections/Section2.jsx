import section2Image from "/src/assets/images/section2_spa_image.png";

export default function Section2(){
    return(
        <div className="w-full">
            <div className="h-full flex flex-col md:flex-row items-center justify-center m-4 md:m-10 lg:mt-20 mb-15 lg:mb-20 gap-8 lg:gap-16">
  {/* Text Section */}
  <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-[95%] lg:w-1/2">
    <h1 className="Playfair text-[28px] lg:text-[45px] mt-10 leading-9 lg:leading-[55px]">
      Embrace Your Inner Peace<br /> and Discover True Beauty
    </h1>
    <p className="Lato text-xs max-w-[85%] lg:text-lg mt-6 w-full">
      At TN Healthy Hair Studio, we believe beauty grows from calm. <br className="hidden lg:block" />
      Each treatment is thoughtfully designed to relax your mind <br className="hidden lg:block" />
      and care for your hair with gentle attention.
    </p>
  </div>

  {/* Image Section */}
  <div className="w-[90%] lg:w-1/2 flex justify-center mt-2 lg:mt-0">
    <img
      src={section2Image}
      alt="section2Image"
      className="w-full h-auto object-cover rounded-xl shadow-lg"
    />
  </div>
</div>
        </div>
    );
}