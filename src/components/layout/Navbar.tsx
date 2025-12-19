import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Links that only non-mentors should see
const mentorOnlyExcludedLinks = [
  { href: "/mentors", label: "Mentors" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Build nav links based on user role - mentors don't see Mentors link
  const navLinks = user?.userRole === 'mentor' 
    ? baseNavLinks 
    : [...baseNavLinks.slice(0, 3), ...mentorOnlyExcludedLinks, ...baseNavLinks.slice(3)];

  // Get dashboard path based on role
  const dashboardPath = user?.userRole === 'admin' 
    ? '/admin' 
    : user?.userRole === 'mentor' 
      ? '/mentor/dashboard' 
      : '/mentee/dashboard';
  const dashboardLabel = user?.userRole === 'admin' 
    ? 'Admin Dashboard' 
    : user?.userRole === 'mentor' 
      ? 'Mentor Dashboard' 
      : 'Dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SC</span>
            </div>
            <span className="font-display text-xl text-foreground">SwarChAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              user.approvalStatus === 'approved' ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={dashboardPath}>{dashboardLabel}</Link>
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.name || user.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/application-status">Application Status</Link>
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.name || user.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              )
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/become-mentor">Become a Mentor</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/signup">Find a Mentor</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated && user ? (
                  user.approvalStatus === 'approved' ? (
                    <>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={dashboardPath} onClick={() => setIsOpen(false)}>{dashboardLabel}</Link>
                      </Button>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
                        <User className="h-4 w-4" />
                        <span>{user.name || user.email}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => { logout(); setIsOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/application-status" onClick={() => setIsOpen(false)}>Application Status</Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { logout(); setIsOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/become-mentor" onClick={() => setIsOpen(false)}>Become a Mentor</Link>
                    </Button>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>Find a Mentor</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
