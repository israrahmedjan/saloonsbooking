"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingCart,
  BookOpen,
  ShoppingBag,
  LogIn,
  Menu,
  X,
  Calendar,
} from "lucide-react";

import { getUserSession, logout } from "@/app/lib/auth";
import { supabase } from "@/app/lib/supabaseClient";
import { SessionUser } from "@/app/lib/types";
import { saveUser } from "@/app/lib/auth2";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

export default function Profile() {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileUser = useUserStore((state) => state.user);
  const { cart } = useCartStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      const data = await getUserSession();
      setSession(data);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
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

  // Large Device UI (> 768px)
  const LargeDeviceUI = () => (
    <div className="hidden md:flex items-center gap-2">
      {!session?.user ? (
        <>
          <Link
            href="/auth"
            className="flex items-center gap-2 text-sm   transition-colors hover:text-[#C9A581]"
          >
            <User size={18} />
            Sign In
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <Link
            href="/signup"
            className="rounded-xl py-2 text-sm   transition-all duration-200 hover:opacity-90"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A581] text-white shadow-sm">
              <User size={18} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">
                {session.user.user_metadata?.full_name ?? profileUser?.first_name}
              </p>
              <p className="max-w-[170px] truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl bg-white py-2 shadow-lg ring-1 ring-black/5">
              <div className="px-4 pb-3">
                <p className="text-sm font-semibold text-gray-900">
                  {session.user.user_metadata?.full_name ?? profileUser?.first_name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>
              <div className="mb-2 h-px bg-gray-100" />
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <User size={18} />
                My Profile
              </Link>
              <Link
                href="/appointments"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <CalendarDays size={18} />
                My Appointments
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <div className="my-2 h-px bg-gray-100" />
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      <Link href="/payment" className="relative inline-flex items-center">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
          {cart.length}
        </span>
      </Link>
    </div>
  );

  // Small Device UI (< 768px)
const SmallDeviceUI = () => (
  <div className="md:hidden flex  items-center gap-1 text-xs">
    {!session?.user ? (
      <>
        <Link
          href="/auth"
          className="flex items-center gap-1 text-xs   transition-colors hover:text-primary"
        >
          <LogIn size={14} />
          <span>Login</span>
        </Link>
       
        <Link
          href="/auth"
          className="flex items-center gap-0 rounded-lg px-2.5 py-1 text-sm   text-primary transition-all hover:opacity-90 active:scale-95"
        >
          <User size={14} />
          <span>Register</span>
        </Link>
      </>
    ) : (
      <>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 transition-colors hover:bg-gray-100"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-sm">
            <User size={13} />
          </div>
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-2xl z-50 p-5 animate-slide-in">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-semibold text-gray-900">Menu</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Info */}
              <div className="mb-5 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session.user.user_metadata?.full_name ?? profileUser?.first_name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>

              {/* Navigation Links */}
              <div className="space-y-0.5">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  My Profile
                </Link>
                <Link
                  href="/appointments"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CalendarDays size={16} />
                  My Appointments
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </div>

              <div className="my-3 h-px bg-gray-200" />

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-600 rounded-lg transition-colors hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        )}
      </>
    )}
    
    {/* Cart */}
    <Link href="/payment" className="relative inline-flex items-center">
      <ShoppingBag className="h-4 w-4" />
      {cart.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 min-w-[13px] items-center justify-center rounded-full bg-primary px-1 text-[8px] font-semibold text-white">
          {cart.length}
        </span>
      )}
    </Link>

    {/* Book Appointment Button */}
    <Link
      href="/salons/royal-beauty-salon/services/hair-cut"
      className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-xs   text-white transition-all hover:opacity-90 active:scale-95 shadow-sm"
    >
      <Calendar size={12} />
      <span>Book</span>
    </Link>
  </div>
);

  return (
    <>
      <LargeDeviceUI />
      {/* <SmallDeviceUI /> */}
    </>
  );
}