import { useEffect, useState, useRef } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "../ui/BookCard";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const MainContent = () => {
  const {
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    keyword,
    filter,
    setFilter,
  } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  const dropdownRef = useRef<HTMLDivElement>(null);


  // Handle Page
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) {
      newPage = 1;
    }
    if (newPage > totalPages) {
      newPage = totalPages;
    }

    setCurrentPage(newPage)
  }
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Fetch products
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // Calculate total pages
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyword]);

  // Filter products
  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (filter === "Cheap") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price < 50
      );
    } else if (filter === "Expensive") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= 50
      );
    } else if (filter === "Popular") {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating > 4
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts; // Always returns an array
  };


  return (
    <section className="xl:w-[55rem] lg:w[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="div mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 />
              {filter === "all" ? "Filter" : filter}
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40"
              >
                <button
                  onClick={() => setFilter("Cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("Expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("Popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {getFilteredProducts().map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
        <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      />
    </PaginationItem>

    <PaginationItem>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
    </PaginationItem>

    <PaginationItem>
      <PaginationNext
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        </div>
      </div>
    </section>
  );
};

export default MainContent;