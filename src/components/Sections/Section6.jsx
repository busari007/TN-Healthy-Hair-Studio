import image1 from "/src/assets/images/GalleryImage1.png";
import image2 from "/src/assets/images/GalleryImage2.png";
import image3 from "/src/assets/images/GalleryImage4.png";

export default function Section6(){

    const images = [image1, image2, image3];
    return(
      //Gallery Section
        <div className="w-full">
<div className="w-full bg-[#D8CEC4] flex flex-col items-center text-center py-16 px-4">
  {/* Header */}
  <h1 className="Playfair text-3xl md:text-4xl lg:text-5xl max-w-2xl leading-tight">
    TN Healthy Hair Studio Gallery
  </h1>

  {/* Image Grid */}
  <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
    {images.map((image, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl h-[250px] lg:h-[300px] relative group"
      >
        <img
          key={index}
          src={image}
          alt={`gallery_image_${index}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Optional subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    ))}
  </div>
</div>


        </div>
    );
}