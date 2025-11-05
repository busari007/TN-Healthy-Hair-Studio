import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section6 from "./Sections/Section6";
import ContactUs from "./ContactUs";

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace("#", "");
      scroller.scrollTo(section, { smooth: true, duration: 500, offset: -80 }); // account for Navbar height
    }
  }, [location]);

  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section6 />
      <ContactUs/>
    </div>
  );
}
