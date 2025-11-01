export default function Sidebar({open, onClose}){
     const rows = ["HOME", "BOOKING", "PAYMENT", "CONTACT US"];
    return(
     <div
      className={`fixed w-full bg-white border-l border-gray-300 border-b-0 z-50 transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
            <table className="w-full border-collapse">
        <tbody>

          {/* Home row*/}
            <tr className="border-b border-gray-400">
              <td className="py-3 px-2">
                <a
                  href={`/home`} 
                  className="hover:underline"
                >
                  HOME
                </a>
              </td>
            </tr>

            {/* Services row */}
            <tr className="border-b border-gray-400">
              <td className="py-3 px-2">
                <a
                  href={`/#services`} 
                  className="hover:underline"
                >
                  SERVICES
                </a>
              </td>
            </tr>

            {/* Payment row */}
            <tr className="border-b border-gray-400">
              <td className="py-3 px-2">
                <a
                  href={`/payment`} 
                  className="hover:underline"
                >
                  PAYMENT
                </a>
              </td>
            </tr>

            {/* Contact Us row */}
            <tr className="border-b border-gray-400">
              <td className="py-3 px-2">
                <a
                  href={`/#contact`} 
                  className="hover:underline"
                >
                  CONTACT US
                </a>
              </td>
            </tr>

            {/* Log In and Sign Up row*/}
          <tr className="flex w-full border-b border-gray-400 Playfair">
            <td className="w-1/2 text-center border-r border-gray-400">
            <a
            href="/register"
            className="block py-3 px-3 hover:bg-gray-100 w-full h-full"
            >
              Sign Up
              </a>
              </td>
              <td className="w-1/2 text-center">
              <a
              href="/login"
              className="block py-3 px-3 hover:bg-gray-100 w-full h-full"
              >
                Log In
                </a>
                </td>
                </tr>
        </tbody>
      </table>
        </div>
    );
}