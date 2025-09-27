import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/ui/navigation";
import { 
  Shield, 
  QrCode, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Package, 
  Store, 
  Smartphone,
  UserCheck 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const userRoles = [
  {
    value: "manufacturer",
    label: "Manufacturer",
    icon: Package,
    description: "Register products and generate QR codes"
  },
  {
    value: "distributor", 
    label: "Distributor",
    icon: Building,
    description: "Manage product transfers and logistics"
  },
  {
    value: "retailer",
    label: "Retailer", 
    icon: Store,
    description: "Sell verified products to consumers"
  },
  {
    value: "consumer",
    label: "Consumer",
    icon: Smartphone,
    description: "Verify product authenticity"
  },
  {
    value: "admin",
    label: "Admin",
    icon: UserCheck,
    description: "System administration and oversight"
  }
];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    company: ""
  });

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    const urlRole = searchParams.get("role");
    
    if (urlMode === "register") {
      setMode("register");
    }
    if (urlRole) {
      setSelectedRole(urlRole);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === "register") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        if (!selectedRole) {
          throw new Error("Please select your role");
        }
      }

      // Simulate successful authentication
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created successfully!",
        description: mode === "login" ? "You've been signed in." : "You can now start using BlockTrace."
      });

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRoleData = userRoles.find(role => role.value === selectedRole);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-primary">
              <div className="relative">
                <Shield className="w-8 h-8" />
                <QrCode className="w-4 h-4 absolute -bottom-1 -right-1 text-accent" />
              </div>
              <span className="gradient-animate bg-clip-text text-transparent">
                BlockTrace
              </span>
            </Link>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {mode === "login" ? "Welcome Back" : "Get Started"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "login" 
                  ? "Sign in to your BlockTrace account" 
                  : "Create your BlockTrace account"
                }
              </p>
            </div>
          </div>

          {/* Auth Form */}
          <Card className="glass-card border-primary/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl text-center">
                {mode === "login" ? "Sign In" : "Create Account"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-hero text-primary-foreground"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Enter your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={selectedRole} onValueChange={setSelectedRole} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.map((role) => {
                            const Icon = role.icon;
                            return (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center space-x-2">
                                  <Icon className="w-4 h-4" />
                                  <span>{role.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {selectedRoleData && (
                        <p className="text-xs text-muted-foreground">
                          {selectedRoleData.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-hero text-primary-foreground"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Role Selection Preview */}
          {mode === "register" && selectedRoleData && (
            <Card className="glass-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <selectedRoleData.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      Selected Role
                    </Badge>
                    <p className="font-medium">{selectedRoleData.label}</p>
                    <p className="text-xs text-muted-foreground">{selectedRoleData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}