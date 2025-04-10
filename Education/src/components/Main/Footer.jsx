import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10 border-t-2 border-primary-content grid grid-cols-2 sm:grid-cols-3 gap-8">
        <nav className="space-y-4">
          <h6 className="text-xl font-semibold text-content-primary">
            Resources
          </h6>
          <Link
            to="/branding"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Study Guides
          </Link>
          <Link
            to="/design"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Tutorials
          </Link>
          <Link
            to="/marketing"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Workshops
          </Link>
          <Link
            to="/advertisement"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Webinars
          </Link>
        </nav>
        <nav className="space-y-4">
          <h6 className="text-xl font-semibold text-content-primary">About</h6>
          <Link
            to="/about"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/careers"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Careers
          </Link>
          <Link
            to="/press"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Press Kit
          </Link>
        </nav>
        <nav className="space-y-4">
          <h6 className="text-xl font-semibold text-content-primary">
            Policies
          </h6>
          <Link
            to="/terms"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Terms of Use
          </Link>
          <Link
            to="/privacy"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className="link link-hover text-lg text-content-secondary hover:text-primary transition-colors duration-300"
          >
            Cookie Policy
          </Link>
        </nav>
      </footer>

      <footer className="footer text-base-content border-t border-primary-content px-6 py-4 flex flex-col lg:flex-row items-center justify-between">
        <aside className="flex-1 text-center lg:text-left">
          <p className="text-sm lg:text-base font-medium">
            StudyTube - Empowering Learners Everywhere
            <br />
            Unlock your potential with top-quality resources.
          </p>
        </aside>
        <nav className="mt-4 lg:mt-0 flex gap-6">
          <Link to="/facebook" className="hover:text-blue-500">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link to="/twitter" className="hover:text-blue-400">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link to="/youtube" className="hover:text-red-500">
            <Youtube className="w-6 h-6" />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
