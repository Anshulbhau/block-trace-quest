import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  QrCode, 
  BarChart3, 
  Users, 
  Plus,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Building,
  Smartphone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock user data - in real app this would come from authentication context
const mockUser = {
  id: "user-123",
  name: "John Smith",
  email: "john@audiotech.com", 
  role: "manufacturer",
  company: "AudioTech Industries"
};

// Mock products data
const mockProducts = [
  {
    id: "BT-2024-001234",
    name: "Premium Wireless Headphones",
    model: "AT-WH-5000",
    batch: "BATCH-2024-03-15",
    status: "active",
    scans: 45,
    authenticity: 100,
    createdAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "BT-2024-001235", 
    name: "Bluetooth Speaker Pro",
    model: "AT-SP-3000",
    batch: "BATCH-2024-03-10",
    status: "active", 
    scans: 23,
    authenticity: 100,
    createdAt: "2024-03-10T10:30:00Z"
  }
];

const mockStats = {
  totalProducts: 156,
  totalScans: 2847,
  authenticVerifications: 2834,
  fakeDetections: 13,
  recentScans: [
    { id: 1, productId: "BT-2024-001234", location: "New York, NY", timestamp: new Date().toISOString() },
    { id: 2, productId: "BT-2024-001235", location: "Los Angeles, CA", timestamp: new Date(Date.now() - 3600000).toISOString() },
  ]
};

export default function Dashboard() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [productForm, setProductForm] = useState({
    name: "",
    model: "",
    batch: "",
    description: "",
    category: ""
  });

  const handleProductRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      // Simulate blockchain registration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "🎉 Product Registered Successfully!",
        description: "Your product has been registered on the blockchain and QR code generated."
      });

      // Reset form
      setProductForm({
        name: "",
        model: "", 
        batch: "",
        description: "",
        category: ""
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Could not register product on blockchain. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQRCode = (productId: string) => {
    // In real app, this would generate and download the QR code
    toast({
      title: "QR Code Generated",
      description: `QR code for product ${productId} has been generated and is ready for download.`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={true}
        userRole={mockUser.role}
        onSignOut={() => {
          toast({ title: "Signed out successfully" });
        }}
      />
      
      <div className="pt-16 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Welcome back, {mockUser.name}
              </h1>
              <p className="text-muted-foreground">
                Manage your products and monitor blockchain authenticity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {mockUser.role}
              </Badge>
              <Badge variant="outline">{mockUser.company}</Badge>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Register
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Products</p>
                      <p className="text-2xl font-bold">{mockStats.totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Scans</p>
                      <p className="text-2xl font-bold">{mockStats.totalScans.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Authentic</p>
                      <p className="text-2xl font-bold">{mockStats.authenticVerifications}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blocked</p>
                      <p className="text-2xl font-bold">{mockStats.fakeDetections}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Scans
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockStats.recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{scan.productId}</p>
                        <p className="text-xs text-muted-foreground">{scan.location}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(scan.timestamp)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Authenticity Rate</span>
                      <span className="font-medium">99.5%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '99.5%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Scan Growth (30d)</span>
                      <span className="font-medium text-success">+24%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <Button 
                onClick={() => setSelectedTab("register")}
                className="btn-hero text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Register New Product
              </Button>
            </div>

            <div className="grid gap-4">
              {mockProducts.map((product) => (
                <Card key={product.id} className="glass-card border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <Badge variant="secondary">{product.model}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>ID: {product.id}</span>
                          <span>•</span>
                          <span>Batch: {product.batch}</span>
                          <span>•</span>
                          <span>Created: {formatDate(product.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{product.scans} scans</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">{product.authenticity}% authentic</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateQRCode(product.id)}
                          className="border-primary/20 hover:bg-primary/10"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          QR Code
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 hover:bg-primary/10"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-6 mt-6">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-6">Register New Product</h2>

              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Product Registration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductRegistration} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name *</Label>
                        <Input
                          id="productName"
                          value={productForm.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          value={productForm.model}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          placeholder="Enter model number"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch Number *</Label>
                        <Input
                          id="batch"
                          value={productForm.batch}
                          onChange={(e) => handleInputChange("batch", e.target.value)}
                          placeholder="Enter batch number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select 
                          value={productForm.category} 
                          onValueChange={(value) => handleInputChange("category", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="health">Health & Beauty</SelectItem>
                            <SelectItem value="food">Food & Beverage</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Enter product description"
                        rows={3}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        disabled={isRegistering || !productForm.name || !productForm.model || !productForm.batch}
                        className="btn-hero text-primary-foreground flex-1"
                      >
                        {isRegistering ? (
                          "Registering on Blockchain..."
                        ) : (
                          <>
                            <Package className="w-4 h-4 mr-2" />
                            Register Product
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setProductForm({ name: "", model: "", batch: "", description: "", category: "" })}
                        className="border-primary/20 hover:bg-primary/10"
                      >
                        Clear Form
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Registration Process Info */}
              <Card className="glass-card border-primary/20 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">What happens next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">1</div>
                    <div>
                      <p className="font-medium">Blockchain Registration</p>
                      <p className="text-sm text-muted-foreground">Product data stored immutably on blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">2</div>
                    <div>
                      <p className="font-medium">QR Code Generation</p>
                      <p className="text-sm text-muted-foreground">Unique QR code created with encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">3</div>
                    <div>
                      <p className="font-medium">Ready for Distribution</p>
                      <p className="text-sm text-muted-foreground">Product can be distributed with QR code attached</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}