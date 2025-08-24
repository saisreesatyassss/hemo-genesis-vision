import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Digital Twin", path: "/digital-twin" },
    { name: "Genetic Risk", path: "/genetic-risk" },
    { name: "For Patients & NGOs", path: "/patients-ngos" },
    { name: "Patient Dashboard", path: "/patient-dashboard" },
    { name: "Blood Match Finder", path: "/blood-match-finder" },
    { name: "Send Emergency", path: "/emergency-sos" },
    { name: "AIAvatar", path: "/Modern3DAIAvatar" },
  ];

  const userId = Cookies.get("userId");

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            HemoGenesis AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {userId ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {userId ? (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" className="w-fit" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
