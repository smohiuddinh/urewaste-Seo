import { useState } from "react";
import { Menu, ArrowDown, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/croplogo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleCloseMenu = () => setMenuOpen(false);
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
  ];
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      role="navigation"
      className="fixed top-0 w-full z-50 bg-opacity-70 bg-gradient-to-r from-[#0b1f17]/90 via-[#0c2b1f]/70 to-[#132e2c]/70 backdrop-blur-md shadow-lg border-b border-white/20 font-[Urbanist] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 py-2">
            <img
              src={logo1}
              alt="EcoWaste Logo"
              className="h-14 w-auto drop-shadow-lg object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ name, to }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-5 py-3 rounded-lg font-semibold overflow-hidden group cursor-pointer select-none transition-colors ${
                  isActive(to)
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {/* Animated background */}
                <span
                  className={`absolute inset-0 bg-accent-green rounded-lg transform scale-x-0 origin-left transition-transform duration-300 ease-out ${
                    isActive(to) ? "scale-x-100" : "group-hover:scale-x-100"
                  }`}
                ></span>
                <span className="relative z-10">{name}</span>
              </Link>
            ))}

            {/* CTA Buttons */}
            <Link to="/SchedulePickupPage" onClick={handleCloseMenu}>
              <button
                className={`relative px-6 py-3 rounded-full font-semibold shadow-lg overflow-hidden text-white select-none transition-transform duration-200 ease-out hover:scale-[1.05] active:scale-[0.98] ${
                  isActive("/SchedulePickupPage")
                    ? "bg-accent-green"
                    : "bg-accent-green"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Schedule a Pickup <ArrowDown size={18} />
                </span>
              </button>
            </Link>

            <Link to="/contact">
              <button
                className={`relative px-6 py-3 rounded-full font-semibold shadow-lg overflow-hidden text-white select-none transition-transform duration-200 ease-out hover:scale-[1.05] active:scale-[0.98] ${
                  isActive("/contact")
                    ? "bg-accent-green"
                    : "bg-accent-green"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us <ArrowDown size={18} />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-[#0b1f17]/95 backdrop-blur-md shadow-lg z-50 px-6 py-10"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseMenu}
              className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>

            {/* Centered Mobile Menu Items */}
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map(({ name, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={handleCloseMenu}
                  className={`relative text-2xl font-medium overflow-hidden group`}
                >
                  <span
                    className={`absolute inset-0 bg-accent-green rounded-md transform scale-x-0 origin-left transition-transform duration-300 ease-out ${
                      isActive(to) ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  ></span>
                  <span
                    className={`relative z-10 ${
                      isActive(to)
                        ? "text-white"
                        : "text-gray-200 group-hover:text-white"
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <Link to="/SchedulePickupPage" onClick={handleCloseMenu}>
                <button
                  className={`relative w-fit flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-white transition-transform hover:scale-[1.05] active:scale-[0.98] ${
                    isActive("/SchedulePickupPage")
                      ? "bg-accent-green"
                      : "bg-accent-green"
                  }`}
                >
                  Schedule a Pickup <ArrowDown size={18} />
                </button>
              </Link>

              <Link to="/contact" onClick={handleCloseMenu}>
                <button
                  className={`relative w-fit flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-white transition-transform hover:scale-[1.05] active:scale-[0.98] ${
                    isActive("/contact")
                      ? "bg-accent-green"
                      : "bg-accent-green"
                  }`}
                >
                  Contact Us <ArrowDown size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
