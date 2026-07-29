"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingBag,
  LogIn,
  Calendar,
} from "lucide-react";

import { getUserSession, logout } from "@/app/lib/auth";
import { supabase } from "@/app/lib/supabaseClient";
import { SessionUser } from "@/app/lib/types";
import { saveUser } from "@/app/lib/auth2";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

export default function MobileProfile() {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const profileUser = useUserStore((state) => state.user);
  const { cart } = useCartStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      const data = await getUserSession();
      setSession(data);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const result = await saveUser(session?.user);
        if (result && !result.error) {
          useUserStore.getState().setUser(result.data);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  // User Avatar Component
  const UserAvatar = () => (
    <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-white shadow-sm">
      <User size={14} className="md:w-[18px] md:h-[18px]" />
    </div>
  );

  // User Info Component
  const UserInfo = () => (
    <div className="hidden sm:block text-left">
      <p className="text-xs md:text-sm font-semibold text-gray-900 truncate max-w-[100px] md:max-w-[170px]">
        {session?.user?.user_metadata?.full_name ?? profileUser?.first_name}
      </p>
      <p className="hidden md:block max-w-[170px] truncate text-xs text-gray-500">
        {session?.user?.email}
      </p>
    </div>
  );

  // Dropdown Menu Component
  const DropdownMenu = () => (
    <div className="absolute right-0 z-[555] mt-2 md:mt-3 w-56 sm:w-64 overflow-hidden rounded-2xl bg-white py-2 shadow-lg ring-1 ring-black/5 z-50">
      <div className="px-4 pb-3">
        <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
          {session?.user?.user_metadata?.full_name ?? profileUser?.first_name}
        </p>
        <p className="truncate text-[10px] sm:text-xs text-gray-500">
          {session?.user?.email}
        </p>
      </div>

      <div className="mb-2 h-px bg-gray-100" />

      {[
        { href: "/profile", icon: User, label: "My Profile" },
        { href: "/appointments", icon: CalendarDays, label: "My Appointments" },
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <item.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
          {item.label}
        </Link>
      ))}

      <div className="my-2 h-px bg-gray-100" />

      <button
        onClick={logout}
        className="flex w-full items-center gap-3 px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
        Logout
      </button>
    </div>
  );

  // Cart Badge Component
  const CartBadge = () => (
    <Link href="/payment" className="relative inline-flex items-center">
      <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 flex h-3.5 min-w-[14px] md:h-4 md:min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] md:text-xs font-semibold text-white">
          {cart.length}
        </span>
      )}
    </Link>
  );

  // Auth Links Component
  const AuthLinks = () => (
    <>
         <Link
  href="/salons/royal-beauty-salon/services/hair-cut"
  className="btn-type-1 inline-flex items-center gap-2  text-xs py-1 px-3"
>
  <Calendar size={18} />
  <span>Book Appointment</span>
</Link>
      <Link
        href="/auth"
        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium transition-colors hover:text-primary"
      >
        <LogIn size={16} className="md:w-[18px] md:h-[18px]" />
        <span className="hidden  xs:inline">Sign In</span>
        <span className="xs:hidden">Login</span>
      </Link>

      <div className="h-4 md:h-5 w-px bg-gray-200 hidden xs:block" />

      <Link
        href="/signup"
        className="flex items-center gap-1 md:gap-2 rounded-xl px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-primary transition-all hover:opacity-90 active:scale-95"
      >
        <User size={16} className="md:w-[18px] md:h-[18px]" />
        <span className="hidden xs:inline whitespace-nowrap">Sign Up</span>
        <span className="xs:hidden whitespace-nowrap">Sign Up</span>
      </Link>
    </>
  );

  return (
    <div className="flex items-center justify-end w-full gap-2 md:gap-3">
      {/* Left side - Auth or User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {!session?.user ? (
          <AuthLinks />
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 md:gap-3 rounded-xl px-1 md:px-2 py-1 md:py-2 transition-colors hover:bg-gray-100"
            >
              <UserAvatar />
              <UserInfo />
              <ChevronDown
                size={16}
                className={`md:w-[18px] md:h-[18px] transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && <DropdownMenu />}
          </div>
        )}
      </div>

      {/* Right side - Cart */}
      <CartBadge />
    </div>
  );
}