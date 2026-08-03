import React from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Footer() {
  return (
    <footer className="bg-primary text-[#99A1AF]">
      <div className="container mx-auto px-4 py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & About */}
          <div>
            <Link
              href="/"
              className={`${caveat.className} text-5xl font-bold text-secondary`}
            >
              <span className="text-white">Our</span>
              Salon
            </Link>

            <p className="mt-5 leading-7">
              We provide professional beauty and hair care services with a
              passion for making every client look and feel their absolute
              best. Your beauty is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition hover:text-secondary">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-secondary"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition hover:text-secondary"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="transition hover:text-secondary"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-secondary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3">
              <li>Hair Cutting</li>
              <li>Hair Coloring</li>
              <li>Hair Styling</li>
              <li>Facial Treatment</li>
              <li>Bridal Makeup</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Our Contact
            </h3>

            <ul className="space-y-5">

              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-secondary"
                />

                <span>
                  123 Main Street, New York, NY 10001
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="shrink-0 text-secondary"
                />

                <span>+92 300 1234567</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="shrink-0 text-secondary"
                />

                <span>info@demo.com</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock
                  size={20}
                  className="mt-1 shrink-0 text-secondary"
                />

                <span>
                  Mon - Sat <br />
                  09:00 AM - 08:00 PM
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            Our Salon
          </span>
          . All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;