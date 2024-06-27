import React, { createContext, useState, ReactNode } from "react";
import type { UseSearchContextType } from "@/types";

const SearchContext = createContext<UseSearchContextType | undefined>(
  undefined
);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
