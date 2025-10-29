import Sidebar from "./Sidebar";
import logo from "../assets/images/TN-Skincare logo.jpeg";

export default function Navbar(){
      return(
        <div className="h-15 w-full absolute z-20">
            <div className="flex flex-row items-center justify-between m-3 lg:m-5">
            {/*Logo*/}
            <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-full">
                <img src={logo} alt="logo" className="object-contain rounded-full"/>
            </div>

            <div className="hidden lg:flex flex-row gap-x-4 text-lg font-semibold z-50">
  {[
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Bookings", href: "/bookings" },
    { label: "Payment", href: "/payment" },
    { label: "Contact Us", href: "/#contact" },
  ].map((link, i) => (
    <a
      key={i}
      href={link.href}
      className="Lato text-white relative group"
    >
      {link.label}
      {/* Animated underline */}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </a>
  ))}
</div>


            <div className="flex flex-row items-center gap-2">
                {/*profile pic*/}
                <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/128/14260/14260729.png" alt="profile icon" className="object-contain"/>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/128/7710/7710488.png" alt="hamburger" className="w-5 h-5 lg:hidden"/>
            </div>
            </div>
            {/* <Sidebar/> */}
        </div>
);
}