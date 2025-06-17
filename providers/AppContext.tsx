"use client";
import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { Product, ProductsResponse, CategoriesResponse } from "@/types/product";

interface ProductOverview {
  featured: Product[];
  new_arrivals: Product[];
  best_sellers: Product[];
}

interface AppContextType {
  products: Product[];
  overview: ProductOverview | null;
  availableCategories: string[];
  isLoading: boolean;
  nextCursor: number | null;
  error: string | null;
  searchTerm: string;
  handleSearchClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selectedCategory: string | null;
  section: string | null;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (category: string | null) => void;
  handleViewAll: (filter: string | null) => void;
  fetchMoreProducts: () => void;
  fetchProducts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [overview, setOverview] = useState<ProductOverview | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // <-- Add this
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [section, setSection] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = (await response.json()) as CategoriesResponse;
      setAvailableCategories(data.categories);
    } catch (err) {
      console.error("Category fetch error:", err);
      setError("Failed to load categories");
    }
  }, [API_BASE]);

    const fetchOverview = useCallback(async () => {
      try {
        const response = await fetch(`${API_BASE}/products/overview`);
        if (!response.ok) throw new Error('Failed to fetch product overview');
        const data = await response.json();
        setOverview({
          featured: data.featuredProducts || [],
          new_arrivals: data.newArrivals || [],
          best_sellers: data.bestSellers || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
  }, [API_BASE]);

  // Fetch products (with debouncing)
  const fetchProducts = useCallback(
    async (reset = false) => {
      if (isLoading) return;

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        setIsLoading(true);
        setError(null);

        if (reset) {
          setProducts([]);
          setNextCursor(null);
        }

        const params = new URLSearchParams({
          limit: "10",
          ...(nextCursor && !reset && { cursor: nextCursor.toString() }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(searchTerm.length >= 2 && { search: searchTerm }),
          ...(section && { section: section }),
        });

        try {
          const response = await fetch(`${API_BASE}/products?${params}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = (await response.json()) as ProductsResponse;

          setProducts((prev) => (reset ? data.items : [...prev, ...data.items]));
          setNextCursor(data.next_cursor);
        } catch (err) {
          setError("Failed to load products. Please try again.");
          console.error("Fetch error:", err);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    },
    [API_BASE, nextCursor, selectedCategory, searchTerm, section]
  );

  // Load initial data
  useEffect(() => {
    fetchOverview();
    fetchCategories();
  }, []);

  // Reset products when category/filter changes
  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory, section]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click (triggers actual search)
const handleSearchClick = () => {
  if (searchTerm.trim() === "" || searchTerm.length >= 2) {
    fetchProducts(true); // Or your search API call
  }
};

// Optional: Handle Enter key press in input
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    handleSearchClick();
  }
};

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleViewAll = (section: string | null) => {
    setSection(section);
  };

  const fetchMoreProducts = () => {
    if (nextCursor) fetchProducts();
  };

  return (
    <AppContext.Provider
      value={{
        fetchProducts,
        handleSearchClick,
        handleKeyDown,
        overview,
        products,
        availableCategories,
        isLoading,
        nextCursor,
        error,
        searchTerm,
        selectedCategory,
        section,
        handleSearchChange,
        handleCategoryChange,
        handleViewAll,
        fetchMoreProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};


  // // Handlers
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);
  //   if (term === "" || term.length >= 2) {
  //     fetchProducts('featured', true);
  //     fetchProducts('new-arrival', true);
  //     fetchProducts('best-seller', true);
  //   }
  // };

  // const handleCategoryChange = (category: string | null) => {
  //   setSelectedCategory(category);
  //   fetchProducts('featured', true);
  //   fetchProducts('new-arrival', true);
  //   fetchProducts('best-seller', true);
  // };

  // const handleViewAll = (filter: string | null) => {
  //   setActiveFilter(filter);
  // };

  // const fetchMoreProducts = (filterType: 'featured' | 'new-arrival' | 'best-seller') => {
  //   if (nextCursor) fetchProducts(filterType);
  // };