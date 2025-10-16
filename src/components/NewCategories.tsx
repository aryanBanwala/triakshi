import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Filter,
  ShoppingCart,
  CreditCard,
  Coins,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewCategories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrollProgress, setScrollProgress] = useState({
    career: 0,
    education: 0,
    loveLife: 0,
    health: 0,
    finance: 0,
  });
  const [priceFilters, setPriceFilters] = useState({
    career: "all",
    education: "all",
    loveLife: "all",
    health: "all",
    finance: "all",
  });

  const scrollRefs = {
    career: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    loveLife: useRef<HTMLDivElement>(null),
    health: useRef<HTMLDivElement>(null),
    finance: useRef<HTMLDivElement>(null),
  };

  const categories = [
    {
      id: "career",
      name: "Career",
      icon: Briefcase,
      color: "from-orange-500 to-amber-600",
      products: [
        {
          name: "Citrine Success Stone",
          price: 850,
          image:
            "",
        },
        {
          name: "Tiger Eye Confidence",
          price: 650,
          image:
            "",
        },
        {
          name: "Pyrite Abundance",
          price: 750,
          image:
            "",
        },
        {
          name: "Green Aventurine Luck",
          price: 550,
          image:
            "",
        },
      ],
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "from-amber-500 to-yellow-500",
      products: [
        {
          name: "Fluorite Focus Stone",
          price: 600,
          image:
            "",
        },
        {
          name: "Clear Quartz Clarity",
          price: 500,
          image:
            "",
        },
        {
          name: "Amethyst Wisdom",
          price: 700,
          image:
            "",
        },
        {
          name: "Sodalite Intelligence",
          price: 450,
          image:
            "",
        },
      ],
    },
    {
      id: "loveLife",
      name: "Love Life",
      icon: Heart,
      color: "from-red-500 to-orange-500",
      products: [
        {
          name: "Rose Quartz Love",
          price: 550,
          image:
            "",
        },
        {
          name: "Moonstone Romance",
          price: 800,
          image:
            "",
        },
        {
          name: "Garnet Passion",
          price: 900,
          image:
            "",
        },
        {
          name: "Rhodonite Healing",
          price: 650,
          image:
            "",
        },
      ],
    },
    {
      id: "health",
      name: "Health",
      icon: Shield,
      color: "from-orange-600 to-amber-500",
      products: [
        {
          name: "Bloodstone Vitality",
          price: 700,
          image:
            "",
        },
        {
          name: "Carnelian Energy",
          price: 600,
          image:
            "",
        },
        {
          name: "Jade Wellness",
          price: 850,
          image:
            "",
        },
        {
          name: "Hematite Grounding",
          price: 500,
          image:
            "",
        },
      ],
    },
    {
      id: "finance",
      name: "Finance",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      products: [
        {
          name: "Pyrite Prosperity",
          price: 750,
          image:
            "",
        },
        {
          name: "Citrine Wealth Stone",
          price: 850,
          image:
            "",
        },
        {
          name: "Green Jade Fortune",
          price: 900,
          image:
            "",
        },
        {
          name: "Tiger Eye Abundance",
          price: 650,
          image:
            "",
        },
      ],
    },
  ];

  const handleScroll = (categoryId: string) => {
    const scrollElement = scrollRefs[categoryId]?.current;
    if (scrollElement) {
      const scrollWidth = scrollElement.scrollWidth - scrollElement.clientWidth;
      const scrollLeft = scrollElement.scrollLeft;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress((prev) => ({
        ...prev,
        [categoryId]: progress,
      }));
    }
  };

  useEffect(() => {
    const refs = Object.entries(scrollRefs);
    refs.forEach(([key, ref]) => {
      const element = ref.current;
      if (element) {
        const handler = () => handleScroll(key);
        element.addEventListener('scroll', handler);
      }
    });

    return () => {
      refs.forEach(([key, ref]) => {
        const element = ref.current;
        if (element) {
          const handler = () => handleScroll(key);
          element.removeEventListener('scroll', handler);
        }
      });
    };
  }, []);

  const handleSlideChange = (categoryId: string, direction: string) => {
    const scrollElement = scrollRefs[categoryId]?.current;
    if (!scrollElement) return;

    const scrollAmount = direction === "next" ? 300 : -300;
    scrollElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handlePriceFilter = (categoryId: string, filter: string) => {
    setPriceFilters((prev) => ({
      ...prev,
      [categoryId]: filter,
    }));
  };

  const getFilteredProducts = (categoryId: string, products: any[]) => {
    const filter = priceFilters[categoryId];
    if (filter === "all") return products;

    switch (filter) {
      case "under-500":
        return products.filter((p) => p.price < 500);
      case "500-700":
        return products.filter((p) => p.price >= 500 && p.price <= 700);
      case "above-700":
        return products.filter((p) => p.price > 700);
      default:
        return products;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-extrabold">
              <span 
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                Shop by Life Area
              </span>
            </h2>
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            ✨ Find the perfect gemstone for your specific needs and aspirations ✨
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                    : "bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:shadow-lg"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-semibold text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>

        {categories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className={`${activeCategory === categoryIndex ? "block" : "hidden"}`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {category.name} Gemstones
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-orange-600" />
                  <Select
                    value={priceFilters[category.id]}
                    onValueChange={(value) =>
                      handlePriceFilter(category.id, value)
                    }
                  >
                    <SelectTrigger className="w-40 border-2 border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder="Filter by price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-500">Under ₹500</SelectItem>
                      <SelectItem value="500-700">₹500 - ₹700</SelectItem>
                      <SelectItem value="above-700">Above ₹700</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideChange(category.id, "prev")}
                    className="rounded-full border-2 border-orange-300 hover:bg-orange-100 hover:border-orange-400"
                  >
                    <ChevronLeft className="h-4 w-4 text-orange-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideChange(category.id, "next")}
                    className="rounded-full border-2 border-orange-300 hover:bg-orange-100 hover:border-orange-400"
                  >
                    <ChevronRight className="h-4 w-4 text-orange-600" />
                  </Button>
                </div>
              </div>
            </div>

            <div 
              ref={scrollRefs[category.id]}
              className="flex overflow-x-auto no-scrollbar gap-4 pb-4"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {getFilteredProducts(category.id, category.products).map(
                (product, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[280px] sm:w-[300px]"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="bg-white border-2 border-orange-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden relative">
                      {/* Festive corner decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                      <div className="aspect-square overflow-hidden rounded-t-3xl relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {product.name}
                        </h4>
                        <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                          ₹{product.price}
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1 h-10 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                          <Button
                            variant="outline"
                            className="h-10 px-4 text-sm border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold"
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <div className="h-2 bg-orange-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${scrollProgress[category.id]}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default NewCategories;