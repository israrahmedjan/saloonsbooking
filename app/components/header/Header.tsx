"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Calendar, Menu, X } from "lucide-react";
import Topmenu from "./Topmenu";
import { Caveat } from "next/font/google";
import Profile from "./Profile";
import MobileProfile from "./MobileProfile";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const menus = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
    dropdown: true,
    subMenus: [
      { name: "Hair Styling", href: "/services/hair-styling" },
      { name: "Makeup", href: "/services/makeup" },
      { name: "Nail Care", href: "/services/nail-care" },
      { name: "Skincare", href: "/services/skincare" },
      { name: "Massage Therapy", href: "/services/massage-therapy" },
      { name: "Bridal Services", href: "/services/bridal" },
    ],
  },
  {
    name: "Salons",
    href: "/salons",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top menu */}
      <Topmenu />
     
      {/* Top menu End */}
      
      <header
        className={`fixed left-0 z-50 w-full bg-white shadow-sm transition-all  duration-300 ${
          scrolled ? "top-0" : "top-10"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className={`${caveat.className} text-5xl font-[700] text-secondary`}
          >
            <span className="text-primary">Our</span>
            Salon
          </Link>
             <Link
  href="/salons/royal-beauty-salon/services/hair-cut"
  className="btn-type-1 sm:block md:hidden inline-flex items-center gap-2  text-xs py-1 px-3"
>
  <Calendar size={18} />
  <span>Book Now</span>
</Link>
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-[16px]">
            {menus.map((menu) => (
              <div key={menu.href} className="relative">
                {menu.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(menu.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button className="transition-colors hover:text-secondary flex items-center gap-1">
                      {menu.name}
                      <ChevronDown size={16} />
                    </button>
                    {dropdownOpen === menu.name && (
                      <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                        {menu.subMenus.map((subMenu, i) => (
                          <Link
                            key={i + subMenu.href}
                            href={subMenu.href}
                            className="block px-4 py-2 hover:bg-secondary/10 transition-colors"
                          >
                            {subMenu.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={menu.href}
                    className="transition-colors duration-300 hover:text-secondary underline-offset-4 hover:underline"
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}
                <Link
              href="/salons/royal-beauty-salon/services/hair-cut"
              className="btn-type-1"
            >
              <Calendar size={18} />
              Book Appointment
            </Link>
          </nav>
  <div><Profile /></div>
            {/* Desktop Appointment Button */}
      
          {/* Mobile Right Side - Profile + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
          
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shows when hamburger is clicked */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-secondary/10 bg-white shadow-lg ">
            <nav className="flex flex-col max-h-[70vh] overflow-y-auto">
              {menus.map((menu) => (
                <div key={menu.href} className="w-full border-b border-secondary/10">
                  {menu.dropdown ? (
                    <div className="w-full">
                      <button
                        onClick={() =>
                          setMobileDropdownOpen(
                            mobileDropdownOpen === menu.name ? null : menu.name
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-700">{menu.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            mobileDropdownOpen === menu.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileDropdownOpen === menu.name && (
                        <div className="bg-gray-50">
                          {menu.subMenus.map((subMenu) => (
                            <Link
                              key={subMenu.href}
                              href={subMenu.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileDropdownOpen(null);
                              }}
                              className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              {subMenu.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={menu.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
     
    </>
  );
}