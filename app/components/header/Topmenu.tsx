"use client";

import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import MobileProfile from "./MobileProfile";

function DesktopTopMenu() {
  return (
    <div className="hidden md:block bg-secondary/10 text-sm">
      <div className="container mx-auto flex h-10 items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-secondary" />
            <span>Mon - Fri: 09:00 AM - 06:00 PM</span>
          </div>

          <Link
            href="tel:+923001234567"
            className="flex items-center gap-2 hover:text-secondary transition-colors"
          >
            <Phone size={15} className="text-secondary" />
            <span>+92 300 1234567</span>
          </Link>

          <Link
            href="mailto:info@example.com"
            className="flex items-center gap-2 hover:text-secondary transition-colors"
          >
            <Mail size={15} className="text-secondary" />
            <span>info@example.com</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Facebook">
            <FaFacebookF className="text-secondary hover:text-primary transition-colors" />
          </Link>

          <Link href="#" aria-label="Instagram">
            <FaInstagram className="text-secondary hover:text-primary transition-colors" />
          </Link>

          <Link href="#" aria-label="LinkedIn">
            <FaLinkedinIn className="text-secondary hover:text-primary transition-colors" />
          </Link>

          <Link href="#" aria-label="YouTube">
            <FaYoutube className="text-secondary hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
function MobileTopMenu() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-secondary/10 backdrop-blur-md">
      <div className="container mx-auto flex h-12 items-center justify-end px-4">
        <Link
          href="tel:+923001234567"
          className="flex items-center w-full gap-2 text-sm"
        >
          <Phone size={16} className="text-secondary" />
          <span>+92 300 1234567</span>
        </Link>

        <MobileProfile />
      </div>
    </div>
  );
}

export default function Topmenu() {
  return (
    <>
      <DesktopTopMenu />
      <MobileTopMenu />
        <div className="h-12 md:hidden" />
    </>
  );
}