import { Link } from "react-router-dom";
import { Heart, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SC</span>
              </div>
              <span className="font-display text-xl">SwarChAI</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              AI-powered learning, mentorship, and career growth—all in one platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-background/70 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/mentors" className="text-background/70 hover:text-primary text-sm transition-colors">Find Mentors</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-primary text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">For Mentees</h4>
            <ul className="space-y-2">
              <li><Link to="/signup" className="text-background/70 hover:text-primary text-sm transition-colors">Sign Up</Link></li>
              <li><Link to="/mentors" className="text-background/70 hover:text-primary text-sm transition-colors">Browse Mentors</Link></li>
              <li><Link to="/how-it-works" className="text-background/70 hover:text-primary text-sm transition-colors">How It Works</Link></li>
              <li><Link to="/success-stories" className="text-background/70 hover:text-primary text-sm transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/guidelines" className="text-background/70 hover:text-primary text-sm transition-colors">Mentorship Guidelines</Link></li>
              <li><Link to="/privacy" className="text-background/70 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-primary text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-primary text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2026 SwarChAI. All rights reserved.
          </p>
          <p className="text-background/50 text-sm flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for mentors and mentees everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
