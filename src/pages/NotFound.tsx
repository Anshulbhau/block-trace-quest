import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { Shield, QrCode, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-primary">
            <div className="relative">
              <Shield className="w-12 h-12" />
              <QrCode className="w-6 h-6 absolute -bottom-1 -right-1 text-accent" />
            </div>
            <span className="gradient-animate bg-clip-text text-transparent">
              BlockTrace
            </span>
          </Link>

          {/* 404 Content */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="btn-hero text-primary-foreground"
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link to="/verify">
                    Verify Product
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Helpful Links */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Need help? Try these links:</p>
            <div className="flex justify-center gap-4">
              <Link to="/auth" className="hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link to="/verify" className="hover:text-primary transition-colors">
                Verify Product
              </Link>
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
