import { createContext, useState } from "react";

export const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const [scrollTarget, setScrollTarget] = useState(null);

  return (
    <ScrollContext.Provider value={{ scrollTarget, setScrollTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}
