import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-gemstones.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)), url(${heroImage})`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary-light/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gold-light/40 rounded-full animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-gold animate-glow" />
              <span className="text-gold font-semibold text-lg tracking-wide">
                PREMIUM COLLECTION
              </span>
              <Sparkles className="h-8 w-8 text-gold animate-glow" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Gemstone
              <span className="block text-gold">Collection</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover the mystical power of premium gemstones, carefully curated for healing, prosperity, and spiritual growth
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="btn-hero group">
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Trial Now
            </Button>
            
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="text-left">
                <div className="text-3xl font-bold text-gold">50% OFF</div>
                <div className="text-sm text-white/80">Limited Time</div>
              </div>
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-xl shadow-elegant">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">500+</div>
              <div className="text-sm text-white/80">Gemstones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">10K+</div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">25+</div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;