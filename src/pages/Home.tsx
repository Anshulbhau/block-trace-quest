import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { 
  Shield, 
  QrCode, 
  Users, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Smartphone,
  Building2,
  Package,
  Eye
} from "lucide-react";
import heroImage from "@/assets/hero-blockchain.jpg";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Every product registered on immutable blockchain for ultimate authenticity verification."
  },
  {
    icon: QrCode,
    title: "Smart QR Codes",
    description: "Unique QR codes with encrypted data linking to blockchain records and product history."
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track scans, monitor product journey, and analyze supply chain performance."
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Role-based dashboards for manufacturers, distributors, retailers, and consumers."
  }
];

const stats = [
  { label: "Products Verified", value: "2.4M+", icon: CheckCircle },
  { label: "Fake Products Blocked", value: "156K+", icon: AlertTriangle },
  { label: "Trusted Partners", value: "850+", icon: Building2 },
  { label: "QR Scans Daily", value: "45K+", icon: Eye }
];

const roleCards = [
  {
    role: "Manufacturer",
    icon: Package,
    description: "Register products, generate QR codes, monitor supply chain",
    features: ["Product Registration", "QR Generation", "Analytics Dashboard"]
  },
  {
    role: "Consumer", 
    icon: Smartphone,
    description: "Scan QR codes, verify authenticity, view product journey",
    features: ["Product Verification", "Trace Timeline", "Mobile Optimized"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge 
                  variant="secondary" 
                  className="glass-card border-primary/20 text-primary"
                >
                  🔐 Blockchain-Powered Authentication
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Stop Fake Products with{" "}
                  <span className="gradient-animate bg-clip-text text-transparent">
                    BlockTrace
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionary blockchain technology meets QR code authentication. 
                  Protect your brand, secure your supply chain, and give customers 
                  instant product verification.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="btn-hero text-primary-foreground px-8 py-6 text-lg"
                >
                  <Link to="/auth?mode=register">
                    Start Protecting Products
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10"
                >
                  <Link to="/verify">
                    Verify Product
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="flex justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform rotate-6" />
              <img 
                src={heroImage} 
                alt="BlockTrace - Blockchain Product Authentication" 
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="glass-card border-primary/20 text-primary">
              ✨ Key Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              End-to-End Product Protection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From manufacturing to consumer hands, BlockTrace ensures every step 
              of your product journey is secure, transparent, and verifiable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card border-primary/20 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Built for Every Role in Your Supply Chain
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored experiences for manufacturers, distributors, retailers, and consumers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roleCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="glass-card border-primary/20 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{card.role}</h3>
                        <p className="text-muted-foreground">{card.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      asChild
                      className="w-full btn-hero text-primary-foreground"
                    >
                      <Link to={`/auth?mode=register&role=${card.role.toLowerCase()}`}>
                        Get Started as {card.role}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to Secure Your Supply Chain?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of brands already protecting their products with BlockTrace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="btn-hero text-primary-foreground px-8 py-6 text-lg"
              >
                <Link to="/auth?mode=register">
                  Start Free Trial
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10"
              >
                <Link to="/verify">
                  Try Product Verification
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}