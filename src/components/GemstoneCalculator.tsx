import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, Calculator, Sparkles } from "lucide-react";

const GemstoneCalculator = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: ""
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateGemstone = () => {
    setLoading(true);
    
    // Simulate calculation
    setTimeout(() => {
      const gemstones = [
        { name: "Blue Sapphire", reason: "Enhances wisdom and spiritual growth", price: 2500 },
        { name: "Ruby", reason: "Boosts confidence and vitality", price: 3200 },
        { name: "Emerald", reason: "Promotes healing and prosperity", price: 2800 },
        { name: "Diamond", reason: "Brings clarity and divine connection", price: 5000 },
        { name: "Yellow Sapphire", reason: "Attracts wealth and knowledge", price: 2200 }
      ];
      
      const randomGemstone = gemstones[Math.floor(Math.random() * gemstones.length)];
      
      setResult({
        primaryGemstone: randomGemstone,
        compatibility: Math.floor(Math.random() * 20) + 80,
        recommendation: `Based on your birth details, ${randomGemstone.name} is highly recommended for you.`
      });
      setLoading(false);
    }, 2000);
  };

  const isFormValid = formData.name && formData.dateOfBirth && formData.timeOfBirth && formData.placeOfBirth;

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Gem className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Gemstone Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Find Your Perfect Gemstone
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the ideal gemstone based on your astrological profile and birth chart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-primary" />
                <span>Enter Your Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBirth">Time of Birth</Label>
                <Input
                  id="timeOfBirth"
                  name="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                  className="rounded-xl"
                />
              </div>

              <Button
                onClick={calculateGemstone}
                disabled={!isFormValid || loading}
                className="w-full btn-primary"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Calculate My Gemstone</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gem className="h-5 w-5 text-primary" />
                <span>Your Gemstone Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Gem className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {result.primaryGemstone.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {result.primaryGemstone.reason}
                    </p>
                    <div className="text-3xl font-bold text-primary">
                      ₹{result.primaryGemstone.price}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gold/10 rounded-xl">
                      <span className="font-medium">Compatibility Score</span>
                      <span className="text-xl font-bold text-primary">
                        {result.compatibility}%
                      </span>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-xl">
                      <h4 className="font-semibold mb-2">Recommendation</h4>
                      <p className="text-muted-foreground">
                        {result.recommendation}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full btn-hero">
                    <Gem className="mr-2 h-4 w-4" />
                    Shop {result.primaryGemstone.name}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Gem className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill in your details to discover your perfect gemstone
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GemstoneCalculator;