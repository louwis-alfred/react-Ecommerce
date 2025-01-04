import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the filter context data.
interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  filter: string; // Add filter state
  setFilter: (filter: string) => void; // Add setFilter function
  resetFilters: () => void; // Add resetFilters function
}

// Create a context for filter state, initially undefined.
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// FilterProvider component to manage and provide filter context to children.
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const [filter, setFilter] = useState<string>("all"); // Add filter state

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
    setFilter("all"); // Reset filter to "all"
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
        filter, // Provide filter state
        setFilter, // Provide setFilter function
        resetFilters, // Provide the resetFilters function
      }}
    >
      {children} {/* Render child components */}
    </FilterContext.Provider>
  );
};

// Custom hook for accessing the filter context.
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};