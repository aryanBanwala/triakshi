import { getProducts } from "@/API/Product";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from "./Product_card";
// Sample product data
// const productsData = {
//   precious: {
//     moonga: [
//       { id: 'MNG001', name: 'Premium Red Coral', quantity: '5.25 Ratti', description: 'Natural Italian Red Coral with excellent clarity', price: 12500, originalPrice: 15000 },
//       { id: 'MNG002', name: 'Italian Moonga Stone', quantity: '7.5 Ratti', description: 'Deep red coral from Mediterranean sea', price: 18750, originalPrice: 22000 }
//     ],
//     heera: [
//       { id: 'HRA001', name: 'Brilliant Cut Diamond', quantity: '0.50 Carat', description: 'VS1 clarity, F color certified diamond', price: 85000, originalPrice: 95000 },
//       { id: 'HRA002', name: 'Round Diamond', quantity: '0.75 Carat', description: 'VVS2 clarity, excellent cut and polish', price: 125000, originalPrice: 140000 }
//     ],
//     panna: [
//       { id: 'PNA001', name: 'Colombian Emerald', quantity: '4.25 Ratti', description: 'Natural emerald with vivid green color', price: 32000, originalPrice: 38000 },
//       { id: 'PNA002', name: 'Zambian Panna', quantity: '6.0 Ratti', description: 'Premium quality with minor inclusions', price: 45000, originalPrice: 52000 }
//     ],
//     moti: [
//       { id: 'MTI001', name: 'South Sea Pearl', quantity: '8-9mm', description: 'Natural pearl with excellent luster', price: 8500, originalPrice: 10000 },
//       { id: 'MTI002', name: 'Basra Moti', quantity: '10-11mm', description: 'Rare natural pearl, certified authentic', price: 25000, originalPrice: 30000 }
//     ],
//     manik: [
//       { id: 'MNK001', name: 'Burmese Ruby', quantity: '5.5 Ratti', description: 'Pigeon blood red ruby with certification', price: 75000, originalPrice: 85000 },
//       { id: 'MNK002', name: 'Madagascar Manik', quantity: '4.0 Ratti', description: 'Natural ruby with excellent color', price: 48000, originalPrice: 55000 }
//     ],
//     pukhraj: [
//       { id: 'PKJ001', name: 'Ceylon Yellow Sapphire', quantity: '6.25 Ratti', description: 'Natural unheated yellow sapphire', price: 42000, originalPrice: 48000 },
//       { id: 'PKJ002', name: 'Thai Pukhraj', quantity: '7.5 Ratti', description: 'Premium quality with excellent clarity', price: 52500, originalPrice: 60000 }
//     ],
//     neelam: [
//       { id: 'NLM001', name: 'Kashmir Blue Sapphire', quantity: '5.0 Ratti', description: 'Rare cornflower blue sapphire', price: 95000, originalPrice: 110000 },
//       { id: 'NLM002', name: 'Ceylon Neelam', quantity: '6.5 Ratti', description: 'Natural blue sapphire, certified', price: 68000, originalPrice: 78000 }
//     ],
//     gomed: [
//       { id: 'GMD001', name: 'Hessonite Garnet', quantity: '7.25 Ratti', description: 'Natural Ceylon Gomed with honey color', price: 5500, originalPrice: 7000 },
//       { id: 'GMD002', name: 'African Gomed', quantity: '9.0 Ratti', description: 'Deep orange-red hessonite', price: 7200, originalPrice: 9000 }
//     ],
//     vaidurya: [
//       { id: 'VDR001', name: "Cat's Eye Chrysoberyl", quantity: '5.5 Ratti', description: 'Sharp chatoyancy effect, honey color', price: 35000, originalPrice: 42000 },
//       { id: 'VDR002', name: 'Lahsuniya Stone', quantity: '6.75 Ratti', description: 'Premium quality with excellent eye', price: 45000, originalPrice: 52000 }
//     ]
//   },
//   semiPrecious: {
//     sulemani: [
//       { id: 'SLM001', name: 'Sulemani Hakik', quantity: '8.0 Ratti', description: 'Natural banded agate with unique patterns', price: 2500, originalPrice: 3200 },
//       { id: 'SLM002', name: 'Black Agate Stone', quantity: '10.0 Ratti', description: 'Premium quality Sulemani stone', price: 3200, originalPrice: 4000 }
//     ],
//     safedPukhraj: [
//       { id: 'SPK001', name: 'White Sapphire', quantity: '5.25 Ratti', description: 'Natural colorless sapphire', price: 8500, originalPrice: 10500 },
//       { id: 'SPK002', name: 'Ceylon White Pukhraj', quantity: '6.5 Ratti', description: 'Excellent clarity and brilliance', price: 11000, originalPrice: 13500 }
//     ],
//     haritTurmali: [
//       { id: 'HTR001', name: 'Green Tourmaline', quantity: '4.5 Ratti', description: 'Natural green tourmaline with vibrancy', price: 15000, originalPrice: 18000 },
//       { id: 'HTR002', name: 'Afghan Harit Turmali', quantity: '5.75 Ratti', description: 'Premium chrome tourmaline', price: 22000, originalPrice: 26000 }
//     ],
//     chandrakant: [
//       { id: 'CHK001', name: 'Moonstone', quantity: '7.0 Ratti', description: 'Natural moonstone with blue sheen', price: 4500, originalPrice: 6000 },
//       { id: 'CHK002', name: 'Rainbow Chandrakant', quantity: '8.5 Ratti', description: 'Multi-color adularescence effect', price: 6500, originalPrice: 8000 }
//     ],
//     gomedak: [
//       { id: 'GMK001', name: 'Hessonite Upratna', quantity: '8.0 Ratti', description: 'Natural garnet with warm tones', price: 3500, originalPrice: 4500 },
//       { id: 'GMK002', name: 'Orange Gomedak', quantity: '10.0 Ratti', description: 'Bright orange hessonite garnet', price: 4800, originalPrice: 6000 }
//     ],
//     sunehla: [
//       { id: 'SNH001', name: 'Golden Topaz', quantity: '6.25 Ratti', description: 'Natural yellow topaz with brilliance', price: 5500, originalPrice: 7000 },
//       { id: 'SNH002', name: 'Imperial Sunehla', quantity: '7.5 Ratti', description: 'Premium golden-orange topaz', price: 8500, originalPrice: 10500 }
//     ],
//     jamuniya: [
//       { id: 'JMN001', name: 'Amethyst', quantity: '9.0 Ratti', description: 'Deep purple amethyst from Brazil', price: 3200, originalPrice: 4200 },
//       { id: 'JMN002', name: 'Zambian Jamuniya', quantity: '11.0 Ratti', description: 'Rich violet amethyst stone', price: 4500, originalPrice: 5800 }
//     ],
//     santreeGomed: [
//       { id: 'STG001', name: 'Spessartite Garnet', quantity: '5.5 Ratti', description: 'Orange-red garnet with fire', price: 12000, originalPrice: 15000 },
//       { id: 'STG002', name: 'Mandarin Santree', quantity: '6.0 Ratti', description: 'Vibrant orange spessartite', price: 16000, originalPrice: 19500 }
//     ],
//     vaiduryaUpratna: [
//       { id: 'VDU001', name: "Cat's Eye Quartz", quantity: '7.5 Ratti', description: 'Natural chatoyant quartz', price: 5500, originalPrice: 7200 },
//       { id: 'VDU002', name: 'Fiber Optic Stone', quantity: '9.0 Ratti', description: 'Strong cat eye effect', price: 7500, originalPrice: 9500 }
//     ]
//   }
// };




const GemstonesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [productCount] = useState(40);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";
// --- add this memo so the key & queryFn stay in sync ---
  const effectiveCategory = useMemo(
    () => (selectedSubcategory !== "all" ? selectedSubcategory : selectedCategory),
    [selectedCategory, selectedSubcategory]
  );
  // ------------------ TanStack Query ------------------
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["Gem-products", effectiveCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type:effectiveCategory === "all" ? undefined : effectiveCategory,
        category: "gemstone",
        productCount,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
  useEffect(() => {
    // setPage(1);
    // console.log(effectiveCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [effectiveCategory]);
  // ------------------ Filter search locally ------------------
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // ------------------ Categories ------------------
  const categories = {
    precious: {
      label: "Precious (Ratna)",
      subcategories: {
        moonga: "Moonga",
        heera: "Heera",
        panna: "Panna",
        moti: "Moti",
        manik: "Manik",
        pukhraj: "Pukhraj",
        neelam: "Neelam",
        gomed: "Gomed",
        vaidurya: "Vaidurya/Lahsuniya",
      },
    },
    semiPrecious: {
      label: "Semi-Precious (Upratna)",
      subcategories: {
        sulemani: "Sulemani",
        safedPukhraj: "Safed Pukhraj",
        haritTurmali: "Harit Turmali",
        chandrakant: "Chandrakant Mani",
        gomedak: "Gomedak",
        sunehla: "Sunehla",
        jamuniya: "Jamuniya",
        santreeGomed: "Santree Gomed",
        vaiduryaUpratna: "Vaidurya Uparatna",
      },
    },
  };
  // const discountedPrice = product.price*(1-(0.01*product.discount))
  const handleViewDetails = (id: string) => {
    navigate(`/gem-view/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Gemstones Collection</h1>
          <p className="text-yellow-50">Discover our exquisite collection of precious and semi-precious gemstones</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter */}
          <aside className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white rounded-2xl shadow-card p-6 h-fit sticky top-8`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-6 h-6 text-yellow-500" />
                Filters
              </h2>
              <button 
                className="lg:hidden text-gray-500"
                onClick={() => setMobileFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search gemstones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* All Gemstones */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setPage(1);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Gemstones
              </button>
            </div>

            {/* Categories */}
            {Object.entries(categories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-6">
                <button
                  onClick={() => {
                    setSelectedCategory(categoryKey);
                    setSelectedSubcategory('all');
                    setPage(1);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mb-2 ${
                    selectedCategory === categoryKey && selectedSubcategory === 'all'
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
                
                {/* Subcategories */}
                <div className="ml-4 mt-2 space-y-1">
                  {Object.entries(category.subcategories).map(([subKey, subLabel]) => (
                    <button
                      key={subKey}
                      onClick={() => {
                        setSelectedCategory(categoryKey);
                        setSelectedSubcategory(subKey);
                        setPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === categoryKey && selectedSubcategory === subKey
                          ? 'bg-yellow-100 text-yellow-800 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>
      
      <main className="flex-1">
        {isLoading && <p>Loading products...</p>}
        
        { isError &&<h1 className="text-red-500">Failed to fetch products!</h1>}

        { filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Product_card key={product.id} product={product} handleViewDetails={handleViewDetails} />
            ))}
          </div>
        ) }
        {!isError && !isLoading && filteredProducts.length===0 &&(
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>
      </div>
      </div>
    </div>
  );
};

export default GemstonesPage;
