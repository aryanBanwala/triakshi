import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const discountedProducts = [
    {
      id: 1,
      name: "Blue Sapphire Ring",
      originalPrice: 2500,
      discountedPrice: 1750,
      discount: 30,
      rating: 4.8,
      reviews: 124,
      image:
        "",
    },
    {
      id: 2,
      name: "Amethyst Healing Crystal",
      originalPrice: 800,
      discountedPrice: 560,
      discount: 30,
      rating: 4.9,
      reviews: 89,
      image:
        "",
    },
    {
      id: 3,
      name: "Rudraksha Mala Beads",
      originalPrice: 1200,
      discountedPrice: 840,
      discount: 30,
      rating: 4.7,
      reviews: 156,
      image:
        "",
    },
    {
      id: 4,
      name: "Rose Quartz Pendant",
      originalPrice: 600,
      discountedPrice: 420,
      discount: 30,
      rating: 4.6,
      reviews: 78,
      image:
        "",
    },
    {
      id: 5,
      name: "Citrine Prosperity Stone",
      originalPrice: 450,
      discountedPrice: 315,
      discount: 30,
      rating: 4.8,
      reviews: 92,
      image:
        "",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const nextSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const prevSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated gradient text */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
            <h2 className="text-5xl font-extrabold relative inline-block">
              <span 
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                Diwali Sale
              </span>
            </h2>
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            ✨ Limited time offers on premium gemstones, Rudraksha, Mala and Bracelets! ✨
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Up to 30% OFF</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center md:justify-end mb-6 gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-white/80 backdrop-blur-sm border-orange-300 hover:bg-orange-100 hover:border-orange-400 shadow-lg transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-orange-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-white/80 backdrop-blur-sm border-orange-300 hover:bg-orange-100 hover:border-orange-400 shadow-lg transition-all"
          >
            <ChevronRight className="h-5 w-5 text-orange-600" />
          </Button>
        </div>

        {/* Scrollable Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-6 pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {discountedProducts.map((product, index) => (
            <div
              key={product.id}
              className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white border-2 border-orange-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 relative overflow-hidden"
              style={{
                scrollSnapAlign: "start",
              }}
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 animate-pulse">
                {product.discount}% OFF
              </div>

              {/* Festive corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-t-3xl relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-base text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <Button className="flex-1 h-10 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4 text-sm border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold transition-all"
                  >
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Progress Bar */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md">
            <div className="h-2 bg-orange-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
              <span>Scroll to explore</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </div>


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

export default ProductSlider;