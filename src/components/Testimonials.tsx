import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      review:
        "The blue sapphire I purchased has brought incredible clarity to my life. The quality is exceptional and the energy is truly transformative.",
      avatar:
        "",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      review:
        "Amazing collection of rudraksha beads! The spiritual energy and authenticity is unmatched. Highly recommend for anyone on a spiritual journey.",
      avatar:
        "",
    },
    {
      id: 3,
      name: "Anitha Reddy",
      location: "Bangalore, India",
      rating: 5,
      review:
        "The health calculator feature helped me choose the perfect gemstone. My stress levels have reduced significantly since wearing the recommended stone.",
      avatar:
        "",
    },
    {
      id: 4,
      name: "Manoj Patel",
      location: "Ahmedabad, India",
      rating: 5,
      review:
        "Excellent customer service and authentic products. The lucky charms I bought have definitely improved my business prospects!",
      avatar:
        "",
    },
    {
      id: 5,
      name: "Neha Verma",
      location: "Jaipur, India",
      rating: 5,
      review:
        "The gemstone consultation was spot-on! The energy of the stone has brought peace and prosperity into my life.",
      avatar:
        "",
    },
    {
      id: 6,
      name: "Amit Singh",
      location: "Lucknow, India",
      rating: 5,
      review:
        "The delivery was quick and the gemstone came with proper certification. Great experience overall!",
      avatar:
        "",
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount =
      direction === "left" ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-10 bg-gradient-to-br from-secondary/20 to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full mb-4">
            <Star className="h-5 w-5 text-gold fill-current" />
            <span className="text-gold font-semibold">Customer Reviews</span>
            <Star className="h-5 w-5 text-gold fill-current" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            10,000+ Happy Customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from our satisfied gemstone buyers
          </p>
        </div>

        {/* Slider Controls */}
        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-8 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          {/* Testimonials Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white/60 backdrop-blur-md border border-gold/10 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                style={{ scrollSnapAlign: "start" }}
              >
                <Quote className="h-6 w-6 text-gold/60 mb-3" />
                <p className="text-sm text-muted-foreground italic mb-4">
                  "{testimonial.review}"
                </p>

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-current" />
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/20"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-8 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Trust Indicators (kept concise) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-xs text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-xs text-muted-foreground">Gem Varieties</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">99%</div>
            <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
