import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Filter, Heart, Minus, Plus, Search, ShoppingCart, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Sample Mala product data
const malaData = {
  'career': [
    { id: 'MAL001', name: 'Professional Success Mala', category: 'Career', description: 'Handcrafted mala with Tiger Eye and Citrine beads to enhance career growth and professional success.', price: 2500, originalPrice: 3200, quantity: '108 Beads', benefits: ['Enhances career opportunities', 'Boosts confidence at workplace', 'Attracts success and recognition', 'Improves decision-making skills'] },
    { id: 'MAL002', name: 'Leadership Power Mala', category: 'Career', description: 'Premium mala with Black Tourmaline and Carnelian for leadership qualities and authority.', price: 3500, originalPrice: 4500, quantity: '108 Beads', benefits: ['Develops leadership qualities', 'Increases authority and respect', 'Enhances strategic thinking', 'Removes career obstacles'] }
  ],
  'education': [
    { id: 'MAL003', name: 'Student Excellence Mala', category: 'Education', description: 'Special mala with Lapis Lazuli and Clear Quartz for enhanced learning and concentration.', price: 2200, originalPrice: 2800, quantity: '108 Beads', benefits: ['Improves memory and retention', 'Enhances concentration', 'Boosts academic performance', 'Reduces exam stress'] },
    { id: 'MAL004', name: 'Scholar Wisdom Mala', category: 'Education', description: 'Premium mala with Amethyst and Fluorite for wisdom and intellectual growth.', price: 3200, originalPrice: 4000, quantity: '108 Beads', benefits: ['Develops analytical thinking', 'Enhances creative intelligence', 'Improves learning abilities', 'Brings clarity of thought'] }
  ],
  'love-life': [
    { id: 'MAL005', name: 'Romantic Harmony Mala', category: 'Love Life', description: 'Beautiful mala with Rose Quartz and Moonstone to attract love and harmony in relationships.', price: 2800, originalPrice: 3500, quantity: '108 Beads', benefits: ['Attracts true love', 'Strengthens relationships', 'Promotes emotional healing', 'Enhances romance and passion'] },
    { id: 'MAL006', name: 'Eternal Bond Mala', category: 'Love Life', description: 'Premium mala with Rhodonite and Pink Tourmaline for lasting relationships and marital bliss.', price: 4200, originalPrice: 5500, quantity: '108 Beads', benefits: ['Creates deep emotional bonds', 'Resolves relationship conflicts', 'Brings marital happiness', 'Attracts soulmate connection'] }
  ],
  'finance': [
    { id: 'MAL007', name: 'Wealth Abundance Mala', category: 'Finance', description: 'Powerful mala with Green Aventurine and Pyrite to attract wealth and financial prosperity.', price: 3000, originalPrice: 3800, quantity: '108 Beads', benefits: ['Attracts wealth and prosperity', 'Removes financial obstacles', 'Enhances business success', 'Brings good fortune'] },
    { id: 'MAL008', name: 'Money Magnet Mala', category: 'Finance', description: 'Premium mala with Citrine and Golden Rutile Quartz for financial abundance and success.', price: 4500, originalPrice: 6000, quantity: '108 Beads', benefits: ['Manifests wealth rapidly', 'Attracts multiple income sources', 'Ensures financial stability', 'Brings unexpected gains'] }
  ],
  'health': [
    { id: 'MAL009', name: 'Healing Energy Mala', category: 'Health', description: 'Therapeutic mala with Green Jade and Bloodstone for overall health and vitality.', price: 2600, originalPrice: 3300, quantity: '108 Beads', benefits: ['Promotes physical healing', 'Boosts immune system', 'Increases vitality and energy', 'Reduces stress and anxiety'] },
    { id: 'MAL010', name: 'Wellness Vitality Mala', category: 'Health', description: 'Premium mala with Turquoise and Red Jasper for complete wellness and strength.', price: 3800, originalPrice: 4800, quantity: '108 Beads', benefits: ['Enhances overall wellbeing', 'Strengthens physical body', 'Promotes mental peace', 'Balances chakras'] },
    { id: 'MAL011', name: 'Chakra Balance Mala', category: 'Health', description: 'Special seven-chakra mala with seven different gemstones for complete energy alignment.', price: 5500, originalPrice: 7000, quantity: '108 Beads', benefits: ['Balances all seven chakras', 'Harmonizes body-mind-spirit', 'Removes energy blockages', 'Promotes holistic health'] }
  ]
};

const Mala_listing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { key: 'career', label: 'Career' },
    { key: 'education', label: 'Education' },
    { key: 'love-life', label: 'Love Life' },
    { key: 'finance', label: 'Finance' },
    { key: 'health', label: 'Health' }
  ];

  const getFilteredProducts = () => {
    let filtered = [];

    if (selectedCategory === 'all') {
      Object.values(malaData).forEach(products => filtered.push(...products));
    } else {
      filtered = malaData[selectedCategory] || [];
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const ProductCard = ({ product }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleViewDetails = () => {
      setSelectedProduct(product);
      setViewMode('detail');
      setQuantity(1);
      setCurrentImageIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Sparkles className="w-24 h-24 text-orange-400/40" />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">
              {product.id}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-gray-700">Beads:</span>
            <span className="text-sm text-gray-600">{product.quantity}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
              {product.category}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button 
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>
    );
  };

  const ProductDetailView = ({ product, quantity, setQuantity, onBack }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const totalPrice = product.price * quantity;

    const carouselImages = [0, 1, 2, 3];

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-yellow-50/30">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 px-6 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Mala Details</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-orange-50 via-white to-yellow-100 flex items-center justify-center p-8">
                  {discount > 0 && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-5 py-2.5 rounded-full text-lg font-bold shadow-lg z-10">
                      {discount}% OFF
                    </div>
                  )}
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full animate-pulse"></div>
                    <Sparkles className="w-72 h-72 text-orange-400/50 relative z-10 drop-shadow-2xl" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {carouselImages.length}
                    </div>
                  </div>

                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </div>

                <div className="flex gap-2 justify-center p-4 bg-gray-50">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-orange-500 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="p-8 border-t border-gray-100">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{product.name}</h2>
                  <p className="text-orange-600 font-semibold text-lg mb-5">Product ID: {product.id}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-2 bg-orange-50 text-orange-800 rounded-full text-sm font-medium border-2 border-orange-200">
                      {product.category}
                    </span>
                    <span className="px-4 py-2 bg-gray-50 text-gray-800 rounded-full text-sm font-medium border-2 border-gray-200">
                      {product.quantity}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Quantity</h3>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                  >
                    <Minus className="w-6 h-6 text-gray-700" />
                  </button>
                  <span className="text-4xl font-bold text-gray-900 w-20 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-6 h-6 text-gray-700" />
                  </button>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent text-center mb-6">
                  Total: ₹{totalPrice.toLocaleString()}
                </p>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105">
                    <ShoppingCart className="w-6 h-6" />
                    Buy Now
                  </button>
                  
                  <button className="w-full bg-white hover:bg-gray-50 text-orange-600 font-bold py-5 px-8 rounded-2xl shadow-lg border-2 border-orange-500 transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105">
                    <Heart className="w-6 h-6" />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
                </div>
                <ul className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'detail' && selectedProduct ? (
        <ProductDetailView 
          product={selectedProduct} 
          quantity={quantity}
          setQuantity={setQuantity}
          onBack={() => setViewMode('list')}
        />
      ) : (
        <>
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-8 px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">Mala Collection</h1>
              <p className="text-orange-50">Discover sacred prayer malas crafted for your spiritual journey</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex gap-8">
              <aside className="w-64 bg-white rounded-2xl shadow-card sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-500" />
                    Filters
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Malas
                    </button>
                  </div>

                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedCategory === category.key
                            ? 'bg-orange-100 text-orange-800 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === 'all' 
                      ? 'All Malas'
                      : categories.find(c => c.key === selectedCategory)?.label}
                  </h2>
                  <span className="text-gray-600">{filteredProducts.length} products</span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
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
        </>
      )}
    </div>
  );
};

export default Mala_listing;