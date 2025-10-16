import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from './Product_card';

// Sample Rudraksha product data
const rudrakshData = [
  {
    id: "RUD001",
    name: "1 Mukhi Rudraksha",
    price: 25000,
    quantity: 1,
    discount: 17,
    availability: "in_stock",
    type: "rudraksha:1-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Rare and powerful, represents Lord Shiva. Brings enlightenment and moksha. (Size: 20mm)",
    benefits: [
      "Brings divine consciousness",
      "Removes all sins",
      "Grants moksha and liberation",
      "Enhances concentration and focus",
    ],
  },
  {
    id: "RUD002",
    name: "1 Mukhi Premium Rudraksha",
    price: 35000,
    quantity: 1,
    discount: 17,
    availability: "in_stock",
    type: "rudraksha:1-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Premium quality Indonesian bead with excellent face clarity. (Size: 22mm)",
    benefits: [
      "Supreme spiritual power",
      "Connection with divine",
      "Mental peace and clarity",
      "Success in all endeavors",
    ],
  },
  {
    id: "RUD003",
    name: "2 Mukhi Rudraksha",
    price: 800,
    quantity: 1,
    discount: 33,
    availability: "in_stock",
    type: "rudraksha:2-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Ardhanarishvara (Shiva-Parvati). Harmonizes relationships. (Size: 18mm)",
    benefits: [
      "Harmonious relationships",
      "Unity and balance",
      "Emotional stability",
      "Family peace",
    ],
  },
  {
    id: "RUD004",
    name: "2 Mukhi Nepal Rudraksha",
    price: 1500,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:2-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Authentic Nepali bead with clear natural faces. (Size: 20mm)",
    benefits: [
      "Marital bliss",
      "Partnership success",
      "Removes duality",
      "Mental peace",
    ],
  },
  {
    id: "RUD005",
    name: "3 Mukhi Rudraksha",
    price: 500,
    quantity: 1,
    discount: 29,
    availability: "in_stock",
    type: "rudraksha:3-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Symbol of Agni Dev. Purifies past karma and brings success. (Size: 16mm)",
    benefits: [
      "Destroys past sins",
      "Self-confidence",
      "Freedom from guilt",
      "Success in endeavors",
    ],
  },
  {
    id: "RUD006",
    name: "3 Mukhi Premium Rudraksha",
    price: 900,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:3-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "High quality bead with distinct three faces. (Size: 18mm)",
    benefits: [
      "Liberation from karma",
      "Inner fire activation",
      "Courage and strength",
      "Digestive health",
    ],
  },
  {
    id: "RUD007",
    name: "4 Mukhi Rudraksha",
    price: 450,
    quantity: 1,
    discount: 31,
    availability: "in_stock",
    type: "rudraksha:4-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Lord Brahma. Enhances knowledge and creativity. (Size: 17mm)",
    benefits: [
      "Enhanced memory",
      "Creative intelligence",
      "Communication skills",
      "Knowledge and wisdom",
    ],
  },
  {
    id: "RUD008",
    name: "4 Mukhi Nepal Rudraksha",
    price: 800,
    quantity: 1,
    discount: 27,
    availability: "in_stock",
    type: "rudraksha:4-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Authentic Nepali bead for scholars and students. (Size: 19mm)",
    benefits: [
      "Academic success",
      "Intellectual growth",
      "Speech improvement",
      "Mental clarity",
    ],
  },
  {
    id: "RUD009",
    name: "5 Mukhi Rudraksha",
    price: 200,
    quantity: 1,
    discount: 33,
    availability: "in_stock",
    type: "rudraksha:5-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Most common and powerful. Represents Kalagni Rudra form of Lord Shiva. (Size: 15mm)",
    benefits: [
      "Overall well-being",
      "Blood pressure control",
      "Mental peace",
      "Protection from negativity",
    ],
  },
  {
    id: "RUD010",
    name: "5 Mukhi Premium Rudraksha",
    price: 350,
    quantity: 1,
    discount: 30,
    availability: "in_stock",
    type: "rudraksha:5-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "High quality Indonesian bead with clear faces. (Size: 17mm)",
    benefits: [
      "Health and vitality",
      "Spiritual growth",
      "Inner peace",
      "Karmic balance",
    ],
  },
  {
    id: "RUD011",
    name: "6 Mukhi Rudraksha",
    price: 600,
    quantity: 1,
    discount: 29,
    availability: "in_stock",
    type: "rudraksha:6-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Blessed by Lord Kartikeya. Brings willpower and focus. (Size: 16mm)",
    benefits: [
      "Enhanced willpower",
      "Focus and determination",
      "Removes obstacles",
      "Success in competitions",
    ],
  },
  {
    id: "RUD012",
    name: "6 Mukhi Nepal Rudraksha",
    price: 1200,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:6-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Nepali origin bead with excellent energy. (Size: 18mm)",
    benefits: [
      "Leadership qualities",
      "Grounding energy",
      "Emotional balance",
      "Physical strength",
    ],
  },
  {
    id: "RUD013",
    name: "7 Mukhi Rudraksha",
    price: 800,
    quantity: 1,
    discount: 27,
    availability: "in_stock",
    type: "rudraksha:7-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Goddess Lakshmi. Brings wealth and prosperity. (Size: 17mm)",
    benefits: [
      "Wealth and abundance",
      "Financial stability",
      "Business success",
      "Good fortune",
    ],
  },
  {
    id: "RUD014",
    name: "7 Mukhi Premium Rudraksha",
    price: 1500,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:7-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Premium quality bead for prosperity seekers. (Size: 19mm)",
    benefits: [
      "Prosperity in all forms",
      "Removes poverty",
      "Career growth",
      "Luck enhancement",
    ],
  },
  {
    id: "RUD015",
    name: "8 Mukhi Rudraksha",
    price: 900,
    quantity: 1,
    discount: 31,
    availability: "in_stock",
    type: "rudraksha:8-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Blessed by Lord Ganesha. Removes all obstacles. (Size: 16mm)",
    benefits: [
      "Obstacle removal",
      "New beginnings",
      "Success in ventures",
      "Intellectual growth",
    ],
  },
  {
    id: "RUD016",
    name: "8 Mukhi Nepal Rudraksha",
    price: 1800,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:8-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Authentic Nepali bead with Ganesha blessings. (Size: 18mm)",
    benefits: [
      "Victory over challenges",
      "Wisdom and knowledge",
      "Analytical abilities",
      "Problem solving",
    ],
  },
  {
    id: "RUD017",
    name: "9 Mukhi Rudraksha",
    price: 1200,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:9-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Goddess Durga. Provides divine protection and energy. (Size: 17mm)",
    benefits: [
      "Divine protection",
      "Fearlessness",
      "Energy and vitality",
      "Spiritual strength",
    ],
  },
  {
    id: "RUD018",
    name: "9 Mukhi Premium Rudraksha",
    price: 2200,
    quantity: 1,
    discount: 27,
    availability: "in_stock",
    type: "rudraksha:9-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "High energy bead for spiritual warriors. (Size: 19mm)",
    benefits: [
      "Courage and valor",
      "Victory in battles",
      "Divine grace",
      "Shakti activation",
    ],
  },
  {
    id: "RUD019",
    name: "10 Mukhi Rudraksha",
    price: 1500,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:10-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Lord Vishnu. Provides complete protection. (Size: 18mm)",
    benefits: [
      "All-round protection",
      "Legal victories",
      "Peace and tranquility",
      "Removes evil influences",
    ],
  },
  {
    id: "RUD020",
    name: "10 Mukhi Nepal Rudraksha",
    price: 2800,
    quantity: 1,
    discount: 20,
    availability: "in_stock",
    type: "rudraksha:10-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Rare Nepali bead with divine protection. (Size: 20mm)",
    benefits: [
      "Supreme protection",
      "Court case success",
      "Negative energy shield",
      "Divine blessings",
    ],
  },
  {
    id: "RUD021",
    name: "11 Mukhi Rudraksha",
    price: 2500,
    quantity: 1,
    discount: 22,
    availability: "in_stock",
    type: "rudraksha:11-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Blessed by 11 Rudras. Enhances meditation and awareness. (Size: 17mm)",
    benefits: [
      "Enhanced awareness",
      "Meditation success",
      "Spiritual wisdom",
      "Divine consciousness",
    ],
  },
  {
    id: "RUD022",
    name: "11 Mukhi Premium Rudraksha",
    price: 4500,
    quantity: 1,
    discount: 18,
    availability: "in_stock",
    type: "rudraksha:11-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Premium bead for serious spiritual practitioners. (Size: 19mm)",
    benefits: [
      "Yogic powers",
      "Kundalini awakening",
      "Higher consciousness",
      "Spiritual attainment",
    ],
  },
  {
    id: "RUD023",
    name: "12 Mukhi Rudraksha",
    price: 3000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:12-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Sun God. Brings radiance and leadership. (Size: 18mm)",
    benefits: [
      "Leadership qualities",
      "Radiant personality",
      "Administrative power",
      "Success and fame",
    ],
  },
  {
    id: "RUD024",
    name: "12 Mukhi Nepal Rudraksha",
    price: 5500,
    quantity: 1,
    discount: 21,
    availability: "in_stock",
    type: "rudraksha:12-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description: "Rare Nepali bead with solar energy. (Size: 20mm)",
    benefits: [
      "Charismatic presence",
      "Authority and power",
      "Vitality and health",
      "Government favors",
    ],
  },
  {
    id: "RUD025",
    name: "13 Mukhi Rudraksha",
    price: 4000,
    quantity: 1,
    discount: 23,
    availability: "in_stock",
    type: "rudraksha:13-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Blessed by Lord Indra. Fulfills all desires. (Size: 17mm)",
    benefits: [
      "Desire fulfillment",
      "Attraction power",
      "Charisma enhancement",
      "Material success",
    ],
  },
  {
    id: "RUD026",
    name: "13 Mukhi Premium Rudraksha",
    price: 7000,
    quantity: 1,
    discount: 22,
    availability: "in_stock",
    type: "rudraksha:13-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Rare and powerful bead for manifestation. (Size: 19mm)",
    benefits: [
      "Alchemy and attraction",
      "Wish fulfillment",
      "Divine grace",
      "Research success",
    ],
  },
  {
    id: "RUD027",
    name: "14 Mukhi Rudraksha",
    price: 5000,
    quantity: 1,
    discount: 23,
    availability: "in_stock",
    type: "rudraksha:14-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Represents Hanuman. Most powerful protective bead. (Size: 18mm)",
    benefits: [
      "Supreme protection",
      "Intuition activation",
      "Divine wisdom",
      "Removes black magic",
    ],
  },
  {
    id: "RUD028",
    name: "14 Mukhi Nepal Rudraksha",
    price: 9000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:14-mukhi",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Extremely rare Nepali bead with divine power. (Size: 20mm)",
    benefits: [
      "Powerful protection shield",
      "Third eye activation",
      "Divine knowledge",
      "Liberation path",
    ],
  },
  {
    id: "RUD029",
    name: "Gauri Shankar Rudraksha",
    price: 8000,
    quantity: 1,
    discount: 27,
    availability: "in_stock",
    type: "rudraksha:gauri-shankar",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Two naturally joined beads representing Shiva-Parvati unity. (Size: 20mm)",
    benefits: [
      "Marital harmony",
      "Family unity",
      "Relationship bliss",
      "Prosperity and peace",
    ],
  },
  {
    id: "RUD030",
    name: "Premium Gauri Shankar Rudraksha",
    price: 15000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:gauri-shankar",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Premium quality naturally joined bead pair. (Size: 22mm)",
    benefits: [
      "Perfect union",
      "Divine blessings",
      "Abundance in life",
      "Spiritual growth together",
    ],
  },
  {
    id: "RUD031",
    name: "Ganesha Rudraksha",
    price: 12000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:ganesha",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Rare trunk-like formation blessed by Lord Ganesha. (Size: 18mm)",
    benefits: [
      "Removes all obstacles",
      "Success in new ventures",
      "Wisdom and intelligence",
      "Business prosperity",
    ],
  },
  {
    id: "RUD032",
    name: "Premium Ganesha Rudraksha",
    price: 22000,
    quantity: 1,
    discount: 21,
    availability: "in_stock",
    type: "rudraksha:ganesha",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Certified authentic Ganesha bead with clear trunk. (Size: 20mm)",
    benefits: [
      "Supreme obstacle removal",
      "New beginning blessings",
      "Intellectual excellence",
      "Guaranteed success",
    ],
  },
  {
    id: "RUD033",
    name: "Trijuti Rudraksha",
    price: 6000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:trijuti",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Three naturally joined beads representing Brahma-Vishnu-Mahesh. (Size: 19mm)",
    benefits: [
      "Trinity blessings",
      "Complete protection",
      "Karmic cleansing",
      "Spiritual evolution",
    ],
  },
  {
    id: "RUD034",
    name: "Premium Trijuti Rudraksha",
    price: 11000,
    quantity: 1,
    discount: 27,
    availability: "in_stock",
    type: "rudraksha:trijuti",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Rare formation with three perfectly joined beads. (Size: 21mm)",
    benefits: [
      "Divine trinity power",
      "Holistic wellbeing",
      "Spiritual acceleration",
      "Ultimate protection",
    ],
  },
  {
    id: "RUD035",
    name: "Garbha Gauri Rudraksha",
    price: 10000,
    quantity: 1,
    discount: 26,
    availability: "in_stock",
    type: "rudraksha:garbha-gauri",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Special bead with a smaller bead inside, blessed by Mother Goddess. (Size: 20mm)",
    benefits: [
      "Fertility and progeny",
      "Safe childbirth",
      "Family prosperity",
      "Divine motherhood",
    ],
  },
  {
    id: "RUD036",
    name: "Premium Garbha Gauri Rudraksha",
    price: 18000,
    quantity: 1,
    discount: 25,
    availability: "in_stock",
    type: "rudraksha:garbha-gauri",
    category: "Rudraksha",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    description:
      "Certified authentic with clear inner bead visible. (Size: 22mm)",
    benefits: [
      "Healthy progeny",
      "Mother-child bond",
      "Family happiness",
      "Goddess blessings",
    ],
  },
];


const RudrakshPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const baseUrl = import.meta.env.VITE_api_url||"https://localhost:5000"
  const [page,setPage] = useState(1)
  const productCount = import.meta.env.VITE_product_count;
  const categories = [
    { key: '1-mukhi', label: '1 Mukhi Rudraksha' },
    { key: '2-mukhi', label: '2 Mukhi Rudraksha' },
    { key: '3-mukhi', label: '3 Mukhi Rudraksha' },
    { key: '4-mukhi', label: '4 Mukhi Rudraksha' },
    { key: '5-mukhi', label: '5 Mukhi Rudraksha' },
    { key: '6-mukhi', label: '6 Mukhi Rudraksha' },
    { key: '7-mukhi', label: '7 Mukhi Rudraksha' },
    { key: '8-mukhi', label: '8 Mukhi Rudraksha' },
    { key: '9-mukhi', label: '9 Mukhi Rudraksha' },
    { key: '10-mukhi', label: '10 Mukhi Rudraksha' },
    { key: '11-mukhi', label: '11 Mukhi Rudraksha' },
    { key: '12-mukhi', label: '12 Mukhi Rudraksha' },
    { key: '13-mukhi', label: '13 Mukhi Rudraksha' },
    { key: '14-mukhi', label: '14 Mukhi Rudraksha' },
    { key: 'gauri-shankar', label: 'Gauri Shankar Rudraksha' },
    { key: 'ganesha', label: 'Ganesha Rudraksha' },
    { key: 'trijuti', label: 'Trijuti Rudraksha' },
    { key: 'garbha-gauri', label: 'Garbha Gauri Rudraksha' }
  ];
  const {data: products=[], isLoading, isError} = useQuery({
    queryKey: ["Rudra-products", selectedCategory,page, productCount],
    queryFn:()=>
      getProducts({
        page,
        type: selectedCategory,
        category : "rudraksha",
        productCount,
    })
    ,
    
    keepPreviousData: true,
    staleTime: 1000*60*2
  }

  )

  const getFilteredProducts = () => {
    let filtered = [];
  
    if (selectedCategory === 'all') {
      filtered = products.slice();
    } else {
      const typeKey = `rudraksha:${selectedCategory}`;
      filtered = products.filter(p => p.type === typeKey);
    }
  
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
  
    return filtered;
  };
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
  
  const Navigate = useNavigate();
  const filteredProducts = getFilteredProducts();
  const handleViewDetails = (id:string) => {
    const product = filteredProducts.find(p=>{return p.id === id});
    // setSelectedProduct(product);
    // setViewMode('detail');
    // setQuantity(1);
    // setCurrentImageIndex(0);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Navigate(`/rudra-view/${id}`);
    
  };

  // const ProductCard = ({ product }) => {
  //   const discount = product.discount;

   
  //   return (
  //     <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
  //       <div className="h-48 bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center relative overflow-hidden">
  //         <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  //         <Sparkles className="w-24 h-24 text-orange-400/40" />
  //         {discount > 0 && (
  //           <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
  //             {discount}% OFF
  //           </div>
  //         )}
  //       </div>
  //       <div className="p-6">
  //         <div className="flex items-start justify-between mb-2">
  //           <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
  //           <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">
  //             {product.id}
  //           </span>
  //         </div>
  //         <p className="text-sm text-gray-600 mb-3">{product.description}</p>
  //         <div className="flex items-center gap-2 mb-3">
  //           <span className="text-sm font-semibold text-gray-700">Size:</span>
  //           <span className="text-sm text-gray-600">{product.quantity}</span>
  //         </div>
  //         <div className="flex items-center gap-2 mb-3">
  //           <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
  //             {product.category}
  //           </span>
  //         </div>
  //         <div className="flex items-end gap-2 mb-4">
  //           <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
  //           {product.originalPrice > product.price && (
  //             <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
  //           )}
  //         </div>
  //         <button 
  //           onClick={handleViewDetails}
  //           className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2"
  //         >
  //           <Eye className="w-5 h-5" />
  //           View Details
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // const ProductDetailView = ({ product, quantity, setQuantity, onBack }) => {
  //   const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  //   const totalPrice = product.price * quantity;

  //   // Mock carousel images (in real app, these would come from product data)
  //   const carouselImages = [0, 1, 2, 3];

  //   const nextImage = () => {
  //     setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  //   };

  //   const prevImage = () => {
  //     setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  //   };

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-yellow-50/30">
  //       {/* Header */}
  //       <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 px-6 shadow-lg sticky top-0 z-50">
  //         <div className="max-w-7xl mx-auto flex items-center gap-4">
  //           <button 
  //             onClick={onBack}
  //             className="p-2 hover:bg-white/20 rounded-lg transition-colors"
  //           >
  //             <ArrowLeft className="w-6 h-6" />
  //           </button>
  //           <div className="flex items-center gap-3">
  //             <Sparkles className="w-8 h-8" />
  //             <h1 className="text-3xl font-bold">Rudraksha Details</h1>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //           {/* Left Column - Image Carousel */}
  //           <div className="space-y-6">
  //             <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
  //               <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-orange-50 via-white to-yellow-100 flex items-center justify-center p-8">
  //                 {discount > 0 && (
  //                   <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-5 py-2.5 rounded-full text-lg font-bold shadow-lg z-10">
  //                     {discount}% OFF
  //                   </div>
  //                 )}
                  
  //                 {/* Carousel Navigation */}
  //                 <button 
  //                   onClick={prevImage}
  //                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
  //                 >
  //                   <ChevronLeft className="w-6 h-6 text-gray-800" />
  //                 </button>
                  
  //                 <div className="relative">
  //                   <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full animate-pulse"></div>
  //                   <Sparkles className="w-72 h-72 text-orange-400/50 relative z-10 drop-shadow-2xl" />
  //                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
  //                     {currentImageIndex + 1} / {carouselImages.length}
  //                   </div>
  //                 </div>

  //                 <button 
  //                   onClick={nextImage}
  //                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
  //                 >
  //                   <ChevronRight className="w-6 h-6 text-gray-800" />
  //                 </button>
  //               </div>

  //               {/* Thumbnail Indicators */}
  //               <div className="flex gap-2 justify-center p-4 bg-gray-50">
  //                 {carouselImages.map((_, index) => (
  //                   <button
  //                     key={index}
  //                     onClick={() => setCurrentImageIndex(index)}
  //                     className={`w-3 h-3 rounded-full transition-all ${
  //                       index === currentImageIndex 
  //                         ? 'bg-orange-500 w-8' 
  //                         : 'bg-gray-300 hover:bg-gray-400'
  //                     }`}
  //                   />
  //                 ))}
  //               </div>

  //               {/* Product Basic Info */}
  //               <div className="p-8 border-t border-gray-100">
  //                 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{product.name}</h2>
  //                 <p className="text-orange-600 font-semibold text-lg mb-5">Product ID: {product.id}</p>
                  
  //                 <div className="flex flex-wrap gap-3 mb-6">
  //                   <span className="px-4 py-2 bg-orange-50 text-orange-800 rounded-full text-sm font-medium border-2 border-orange-200">
  //                     {product.category}
  //                   </span>
  //                   <span className="px-4 py-2 bg-gray-50 text-gray-800 rounded-full text-sm font-medium border-2 border-gray-200">
  //                     Size: {product.quantity}
  //                   </span>
  //                 </div>

  //                 <div className="flex items-baseline gap-4 mb-4">
  //                   <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
  //                   {product.originalPrice > product.price && (
  //                     <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Right Column - Details */}
  //           <div className="space-y-6">
  //             {/* Description Card */}
  //             <div className="bg-white rounded-3xl shadow-xl p-8">
  //               <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
  //               <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
  //             </div>

  //             {/* Quantity Selector & Actions */}
  //             <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 border-2 border-orange-100">
  //               <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Quantity</h3>
  //               <div className="flex items-center justify-center gap-6 mb-6">
  //                 <button
  //                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
  //                   className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
  //                 >
  //                   <Minus className="w-6 h-6 text-gray-700" />
  //                 </button>
  //                 <span className="text-4xl font-bold text-gray-900 w-20 text-center">{quantity}</span>
  //                 <button
  //                   onClick={() => setQuantity(quantity + 1)}
  //                   className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
  //                 >
  //                   <Plus className="w-6 h-6 text-gray-700" />
  //                 </button>
  //               </div>
  //               <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent text-center mb-6">
  //                 Total: ₹{totalPrice.toLocaleString()}
  //               </p>

  //               {/* Action Buttons */}
  //               <div className="space-y-3">
  //                 <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105">
  //                   <ShoppingCart className="w-6 h-6" />
  //                   Buy Now
  //                 </button>
                  
  //                 <button className="w-full bg-white hover:bg-gray-50 text-orange-600 font-bold py-5 px-8 rounded-2xl shadow-lg border-2 border-orange-500 transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105">
  //                   <Heart className="w-6 h-6" />
  //                   Add to Cart
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Benefits Card */}
  //             <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
  //               <div className="flex items-center gap-3 mb-6">
  //                 <Sparkles className="w-8 h-8 text-orange-600" />
  //                 <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
  //               </div>
  //               <ul className="space-y-4">
  //                 {product.benefits.map((benefit, index) => (
  //                   <li key={index} className="flex items-start gap-4">
  //                     <div className="w-2.5 h-2.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
  //                     <span className="text-gray-700 text-lg leading-relaxed">{benefit}</span>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  if (isLoading) {
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 mx-auto"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Products...</h2>
        <p className="text-gray-500">Please wait while we fetch the best Rudraksha beads for you.</p>
      </div>
    </div>
  );
  }
  else if (isError) {
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Failed to Load Products</h2>
        <p className="text-gray-500">There was an error fetching the products. Please try again later.</p>
      </div>
    </div>
  );
  }

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
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-8 px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">Rudraksha Collection</h1>
              <p className="text-orange-50">Discover sacred Rudraksha beads blessed with divine energy</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex gap-8">
              {/* Sidebar Filter */}
              <aside className="w-64 bg-white rounded-2xl shadow-card sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-500" />
                    Filters
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Search */}
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

                  {/* All Rudraksha */}
                  <div className="mb-4">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Rudraksha
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
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

              {/* Main Content */}
              <main className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === 'all' 
                      ? 'All Rudraksha'
                      : categories.find(c => c.key === selectedCategory)?.label}
                  </h2>
                  <span className="text-gray-600">{filteredProducts.length} products</span>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Product_card key={product.id} product={product} category="rudraksha" handleViewDetails={handleViewDetails}/>
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

export default RudrakshPage;