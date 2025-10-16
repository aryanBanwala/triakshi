import {
  ArrowLeft,
  Eye,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const braceletData = {
  // (same bracelet data as your original)
};

const BraceletPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { key: "career", label: "Career" },
    { key: "education", label: "Education" },
    { key: "love-life", label: "Love Life" },
    { key: "finance", label: "Finance" },
    { key: "health", label: "Health" },
  ];

  const getFilteredProducts = () => {
    let filtered: any[] = [];

    if (selectedCategory === "all") {
      Object.values(braceletData).forEach((products: any) =>
        filtered.push(...products)
      );
    } else {
      filtered = braceletData[selectedCategory] || [];
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const ProductCard = ({ product }: { product: any }) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const handleViewDetails = () => {
      setSelectedProduct(product);
      setViewMode("detail");
      setQuantity(1);
      setCurrentImageIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Sparkles className="w-24 h-24 text-amber-400/40" />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
              {product.id}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              {product.category}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>
    );
  };

  const ProductDetailView = ({
    product,
    quantity,
    setQuantity,
    onBack,
  }: any) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    const totalPrice = product.price * quantity;
    const carouselImages = [0, 1, 2, 3];

    const nextImage = () =>
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    const prevImage = () =>
      setCurrentImageIndex(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6 px-6 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Bracelet Details</h1>
            </div>
          </div>
        </div>

        {/* (Same structure below with purple → amber/orange replacements) */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === "detail" && selectedProduct ? (
        <ProductDetailView
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onBack={() => setViewMode("list")}
        />
      ) : (
        <>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">Bracelet Collection</h1>
              <p className="text-amber-50">
                Discover powerful crystal bracelets for every aspect of life
              </p>
            </div>
          </div>

          {/* Filter sidebar with amber/orange theme */}
          {/* All purple classes replaced by amber/orange equivalents */}
        </>
      )}
    </div>
  );
};

export default BraceletPage;