export default function Sidebar(){
     const rows = ["HOME", "BOOKING", "PAYMENT", "CONTACT US"];
    return(
        <div className="w-full bg-white border border-gray-300 border-b-0 z-50">
            <table className="w-full border-collapse">
        <tbody>
          {rows.map((item, index) => (
            <tr key={index} className="border-b border-gray-400">
              <td className="py-3 px-2">
                {/*Sidebar Links */}
                <a
                  href={`/${item.toLowerCase()}`} 
                  className="hover:underline"
                >
                  {item}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
}