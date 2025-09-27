import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/ui/navigation";
import { 
  Shield, 
  QrCode, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  MapPin, 
  Calendar, 
  User, 
  Building, 
  Store, 
  Truck,
  Camera,
  Search,
  ExternalLink,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock product data
const mockProductData = {
  id: "BT-2024-001234",
  name: "Premium Wireless Headphones",
  brand: "AudioTech Pro",
  model: "AT-WH-5000",
  batch: "BATCH-2024-03-15",
  manufactureDate: "2024-03-15",
  isAuthentic: true,
  image: "/placeholder.svg",
  description: "High-quality wireless headphones with active noise cancellation",
  specifications: {
    color: "Midnight Black",
    weight: "250g", 
    warranty: "2 years",
    certifications: ["CE", "FCC", "RoHS"]
  },
  manufacturer: {
    name: "AudioTech Industries",
    address: "123 Tech Street, San Francisco, CA",
    verified: true
  },
  trace: [
    {
      id: 1,
      event: "Manufacturing",
      location: "Factory - San Francisco, CA",
      timestamp: "2024-03-15T08:00:00Z",
      actor: "AudioTech Industries", 
      actorRole: "manufacturer",
      status: "completed"
    },
    {
      id: 2,
      event: "Quality Control",
      location: "QC Lab - San Francisco, CA", 
      timestamp: "2024-03-15T14:30:00Z",
      actor: "QC Team Alpha",
      actorRole: "manufacturer",
      status: "completed"
    },
    {
      id: 3,
      event: "Distribution",
      location: "Warehouse - Los Angeles, CA",
      timestamp: "2024-03-20T09:15:00Z", 
      actor: "TechDistrib LLC",
      actorRole: "distributor",
      status: "completed"
    },
    {
      id: 4,
      event: "Retail Transfer",
      location: "TechStore - New York, NY",
      timestamp: "2024-03-25T11:00:00Z",
      actor: "TechStore NYC",
      actorRole: "retailer", 
      status: "completed"
    },
    {
      id: 5,
      event: "Consumer Scan",
      location: "New York, NY",
      timestamp: new Date().toISOString(),
      actor: "Consumer",
      actorRole: "consumer",
      status: "current"
    }
  ]
};

const getEventIcon = (event: string, status: string) => {
  if (status === "current") {
    return <div className="animate-pulse-ring w-3 h-3 bg-primary rounded-full" />;
  }

  switch (event) {
    case "Manufacturing":
      return <Package className="w-4 h-4 text-success" />;
    case "Quality Control": 
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "Distribution":
      return <Truck className="w-4 h-4 text-success" />;
    case "Retail Transfer":
      return <Store className="w-4 h-4 text-success" />;
    case "Consumer Scan":
      return <User className="w-4 h-4 text-primary" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case "manufacturer":
      return <Building className="w-4 h-4" />;
    case "distributor": 
      return <Truck className="w-4 h-4" />;
    case "retailer":
      return <Store className="w-4 h-4" />;
    case "consumer":
      return <User className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [productId, setProductId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [productData, setProductData] = useState<typeof mockProductData | null>(null);
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const urlProductId = searchParams.get("id");
    if (urlProductId) {
      setProductId(urlProductId);
      handleVerification(urlProductId);
    }
  }, [searchParams]);

  const handleVerification = async (id?: string) => {
    const verifyId = id || productId;
    if (!verifyId) return;

    setIsVerifying(true);
    
    try {
      // Simulate API call to blockchain
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification result
      setProductData(mockProductData);
      setVerificationComplete(true);
      
      // Record this scan in the trace
      toast({
        title: mockProductData.isAuthentic ? "✅ Product Verified" : "❌ Warning: Potential Counterfeit",
        description: mockProductData.isAuthentic 
          ? "This product is authentic and registered on the blockchain."
          : "This product could not be verified. Please contact the manufacturer.",
        variant: mockProductData.isAuthentic ? "default" : "destructive"
      });
      
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Could not connect to blockchain. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="w-12 h-12 text-primary" />
              <QrCode className="w-6 h-6 absolute -bottom-1 -right-1 text-accent" />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">Product Verification</h1>
          <p className="text-muted-foreground">
            Scan QR code or enter product ID to verify authenticity
          </p>
        </div>

        {/* Manual Input */}
        <Card className="glass-card border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Enter Product ID
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <div className="flex gap-2">
                <Input
                  id="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Enter product ID (e.g., BT-2024-001234)"
                  className="flex-1"
                />
                <Button
                  onClick={() => handleVerification()}
                  disabled={!productId || isVerifying}
                  className="btn-hero text-primary-foreground"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline" 
              className="w-full border-primary/20 hover:bg-primary/10"
              onClick={() => {
                // In a real app, this would open camera/QR scanner
                setProductId("BT-2024-001234");
                handleVerification("BT-2024-001234");
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Verification Results */}
        {verificationComplete && productData && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Authenticity Status */}
            <Card className={`${productData.isAuthentic ? 'verified-glow' : 'warning-glow'} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {productData.isAuthentic ? (
                    <CheckCircle className="w-12 h-12 text-success" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">
                      {productData.isAuthentic ? "✅ Authentic Product" : "❌ Warning: Unverified"}
                    </h3>
                    <p className="text-muted-foreground">
                      {productData.isAuthentic 
                        ? "This product is verified on the blockchain"
                        : "This product could not be authenticated"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={productData.image} 
                    alt={productData.name}
                    className="w-20 h-20 rounded-lg bg-muted object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg">{productData.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{productData.brand}</Badge>
                      <Badge variant="outline">{productData.model}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {productData.description}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Product ID:</span>
                    <p className="font-mono">{productData.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Batch:</span>
                    <p className="font-mono">{productData.batch}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Manufactured:</span>
                    <p>{formatDate(productData.manufactureDate)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Warranty:</span>
                    <p>{productData.specifications.warranty}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Certifications:</span>
                  <div className="flex flex-wrap gap-1">
                    {productData.specifications.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturer Info */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Manufacturer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{productData.manufacturer.name}</h4>
                    <p className="text-sm text-muted-foreground">{productData.manufacturer.address}</p>
                  </div>
                  {productData.manufacturer.verified && (
                    <Badge className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trace Timeline */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Product Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="trace-line space-y-6">
                  {productData.trace.map((event, index) => (
                    <div key={event.id} className="relative flex items-start gap-4">
                      {/* Event Icon */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-background border-2 border-primary/20 rounded-full">
                        {getEventIcon(event.event, event.status)}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{event.event}</h4>
                          {event.status === "current" && (
                            <Badge variant="secondary" className="text-xs">Current</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(event.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(event.actorRole)}
                            <span>{event.actor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="btn-hero text-primary-foreground flex-1"
              >
                <Link to="/auth?mode=register&role=consumer">
                  Create Account to Save History
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
                onClick={() => {
                  setVerificationComplete(false);
                  setProductData(null);
                  setProductId("");
                }}
              >
                Verify Another Product
              </Button>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        {!verificationComplete && (
          <Card className="glass-card border-primary/20 mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Try the Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Test the verification system with this sample product ID:
              </p>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  BT-2024-001234
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setProductId("BT-2024-001234");
                    handleVerification("BT-2024-001234");
                  }}
                  className="text-xs"
                >
                  Try Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}