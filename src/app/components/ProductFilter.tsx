"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

// Filter types
interface Filters {
  size: string;
  price: string;
  fabric: string;
  color: string;
}

interface ProductFilterProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  resultsCount: number;
  onApplyFilters?: () => void;
}

const ProductFilter = ({ filters, onFiltersChange, resultsCount, onApplyFilters }: ProductFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const updateFilter = (filterKey: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({ size: "", price: "", fabric: "", color: "" });
  };

  const Dropdown = ({
    label,
    options,
    filterKey,
    dropUp = false,
  }: {
    label: string;
    options: { label: string; value: string }[];
    filterKey: keyof Filters;
    dropUp?: boolean;
  }) => (
    <Menu as="div" className="relative inline-block text-left w-full">
      {({ open }: { open: boolean }) => (
        <>
          <Menu.Button
            className={`inline-flex justify-between items-center w-full px-3 py-2.5 bg-gray-800/80 text-gray-300 text-sm font-medium rounded-lg border border-gray-700 hover:border-amber-500/50 hover:text-white transition-all duration-300 cursor-pointer ${open ? "ring-2 ring-amber-500/30 border-amber-500/50" : ""
              }`}
          >
            <span className="truncate whitespace-nowrap w-full text-left">
              {filters[filterKey] || label}
            </span>
            <FaChevronDown
              className={`ml-2 text-xs transition-transform duration-300 ${open ? "rotate-180 text-amber-400" : "text-gray-500"
                }`}
            />
          </Menu.Button>

          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                as={motion.div}
                initial={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  y: dropUp ? 10 : -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className={`absolute w-56 rounded-xl bg-gray-800 shadow-2xl ring-1 ring-gray-700 border border-gray-700 focus:outline-none z-[9999] overflow-visible
                  ${dropUp ? "bottom-full mb-1 left-0" : "top-full mt-1 left-0"}`}
              >
                <div className="py-2">
                  {options.map((opt, index) => (
                    <Menu.Item key={opt.value}>
                      {({ active }: { active: boolean }) => (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: index * 0.05 },
                          }}
                          onClick={() => updateFilter(filterKey, opt.value)}
                          className={`${active
                            ? "bg-amber-500/10 text-amber-400"
                            : "text-gray-300 hover:bg-gray-700/50"
                            } ${filters[filterKey] === opt.value
                              ? "bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-500"
                              : ""
                            } 
                          block px-3 py-2 text-sm w-full text-left cursor-pointer transition-all duration-300 whitespace-nowrap`}
                        >
                          {opt.label}
                        </motion.button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );

  return (
    <div className="w-64 relative h-fit" ref={filterRef}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center justify-between w-full px-6 py-3 mb-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-600 border border-gray-600 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm text-amber-400" />
          <span>Filters</span>
        </div>
        <motion.div
          animate={{ rotate: showFilters ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-sm" />
        </motion.div>
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-visible bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl relative z-40"
          >
            <div className="p-4 space-y-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                <h3 className="text-lg font-semibold text-white">Filter Products</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Size</label>
                  <Dropdown
                    label="Select Size"
                    filterKey="size"
                    options={[
                      { label: "All Sizes", value: "" },
                      { label: "Small", value: "S" },
                      { label: "Medium", value: "M" },
                      { label: "Large", value: "L" },
                      { label: "XL", value: "XL" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price Range</label>
                  <Dropdown
                    label="Select Price"
                    filterKey="price"
                    options={[
                      { label: "All Prices", value: "" },
                      { label: "Under ₹5000", value: "0-5000" },
                      { label: "₹5000 - ₹10000", value: "5000-10000" },
                      { label: "₹10000 - ₹20000", value: "10000-20000" },
                      { label: "Above ₹20000", value: "20000-" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Fabric</label>
                  <Dropdown
                    label="Select Fabric"
                    filterKey="fabric"
                    options={[
                      { label: "All Fabrics", value: "" },
                      { label: "Silk", value: "silk" },
                      { label: "Cotton", value: "cotton" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Color</label>
                  <Dropdown
                    label="Select Color"
                    filterKey="color"
                    dropUp={true}
                    options={[
                      { label: "All Colors", value: "" },
                      { label: "Red", value: "red" },
                      { label: "Yellow", value: "yellow" },
                    ]}
                  />
                </div>
              </div>

              {/* Active Filters Summary */}
              {(filters.size || filters.price || filters.fabric || filters.color) && (
                <div className="pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {filters.size && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                        Size: {filters.size}
                      </span>
                    )}
                    {filters.price && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                        Price:{" "}
                        {filters.price.includes("-")
                          ? `₹${filters.price.replace("-", " - ₹")}`
                          : `Above ₹${filters.price}`}
                      </span>
                    )}
                    {filters.fabric && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                        Fabric: {filters.fabric}
                      </span>
                    )}
                    {filters.color && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                        Color: {filters.color}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="pt-3 border-t border-gray-700">
                <p className="text-sm font-medium text-white">
                  {resultsCount} product{resultsCount !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => {
                  setShowFilters(false);
                  if (onApplyFilters) {
                    onApplyFilters();
                  }
                }}
                className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;