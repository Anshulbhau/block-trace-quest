import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, QrCode, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onSignOut?: () => void;
}

export function Navigation({ isAuthenticated, userRole, onSignOut }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify Product" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <div className="relative">
            <Shield className="w-8 h-8" />
            <QrCode className="w-4 h-4 absolute -bottom-1 -right-1 text-accent" />
          </div>
          <span className="gradient-animate bg-clip-text text-transparent">
            BlockTrace
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {userRole && (
                <Badge variant="secondary" className="capitalize">
                  {userRole}
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-primary/20 hover:bg-primary/10"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={onSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/auth")}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
              <Button
                className="btn-hero text-primary-foreground px-6"
                onClick={() => navigate("/auth?mode=register")}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-t">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors",
                  isActive(item.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border/50 space-y-3">
              {isAuthenticated ? (
                <>
                  {userRole && (
                    <Badge variant="secondary" className="capitalize">
                      {userRole}
                    </Badge>
                  )}
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                      className="border-primary/20 hover:bg-primary/10 w-full"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onSignOut?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-muted-foreground hover:text-foreground w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    className="btn-hero text-primary-foreground w-full"
                    onClick={() => {
                      navigate("/auth?mode=register");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}