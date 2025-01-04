import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
    resetFilters, // Use the resetFilters function from context
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trend",
    "Shoes",
    "Shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className="w-64 p-5 h-screen bg-white border-r">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search Product"
          className="mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Price Range Inputs */}
        <div className="flex justify-between items-center gap-2 mb-6">
          <Input
            type="text"
            placeholder="Min"
            className="py-2 w-full"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <Input
            type="text"
            placeholder="Max"
            className="py-2 w-full"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        <Separator className="my-4" />

        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-3">
            {categories.map((category, index) => (
              <Label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="w-4 h-4"
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </Label>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Keywords Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Keywords</h2>
          <div className="flex flex-col gap-2">
            {keywords.map((keyword, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleKeywordClick(keyword)}
                className="text-left w-full"
              >
                {keyword.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={resetFilters}>Reset Filter</Button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;