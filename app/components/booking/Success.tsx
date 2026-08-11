"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Copy,
  Save,
  Check,
  ArrowRight,
  Home,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  
  const [transactionId, setTransactionId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [orderDate, setOrderDate] = useState("");
const {clearCart} = useCartStore();
  useEffect(() => {
    // Generate or get transaction ID from session
    if (session_id) {
      // In real app, fetch from your API
      const generatedId = session_id;//`TXN-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setTransactionId(generatedId);
      clearCart();
    } else {
      // Fallback for demo
      const fallbackId = `TXN-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setTransactionId(fallbackId);
    }
    
    // Set current date
    setOrderDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
  }, [session_id]);

  // Copy transaction ID to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Save transaction ID (for future use)
  const handleSave = () => {
    try {
      // Save to localStorage
      const savedTransactions = JSON.parse(
        localStorage.getItem("savedTransactions") || "[]"
      );
      
      // Check if already saved
      if (!savedTransactions.includes(transactionId)) {
        savedTransactions.push(transactionId);
        localStorage.setItem("savedTransactions", JSON.stringify(savedTransactions));
        setIsSaved(true);
        setSaveMessage("Transaction saved successfully!");
        setTimeout(() => {
          setIsSaved(false);
          setSaveMessage("");
        }, 3000);
      } else {
        setSaveMessage("Transaction already saved!");
        setTimeout(() => setSaveMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage("Failed to save");
      setTimeout(() => setSaveMessage(""), 2000);
    }
  };

  // Get saved transaction IDs (for display)
//   const getSavedTransactions = () => {
//     try {
//       return JSON.parse(localStorage.getItem("savedTransactions") || "[]");
//     } catch {
//       return [];
//     }
//   };

  return (
    <div className="min-h-screen bg-white flex  items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
          {/* Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#C9A581] via-[#dbb89b] to-[#C9A581]" />
          
          <div className="p-8 md:p-10">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 ring-4 ring-green-100">
                  <CheckCircle className="w-11 h-11 text-green-500" />
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-2">
                Thank You! 🎉
              </h1>
              <p className="text-[#6b6b6b] text-sm md:text-base">
                Your transaction has been completed successfully.
              </p>
            </div>

            {/* Transaction ID Section */}
            <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-[#C9A581]/10 rounded-lg">
                      <span className="text-[#C9A581] text-xs font-bold">TXN</span>
                    </div>
                    <span className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider">
                      Session ID
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <code className="text-sm md:text-base font-mono font-bold text-[#2D2D2D] bg-white px-3 py-1.5 rounded-lg border border-gray-200 break-all">
                      {session_id}
                    </code>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#6b6b6b]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{orderDate || "Processing..."}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-[#2D2D2D] rounded-xl transition-all duration-200 font-medium text-sm"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy ID
                    </>
                  )}
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A581] hover:bg-[#b89470] text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save ID
                    </>
                  )}
                </button>
              </div>

              {/* Save Message */}
              {saveMessage && (
                <div className={`text-center text-sm font-medium py-2 px-3 rounded-lg ${
                  saveMessage.includes("successfully") 
                    ? "bg-green-50 text-green-700" 
                    : "bg-yellow-50 text-yellow-700"
                }`}>
                  {saveMessage}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-[#6b6b6b]">What would you like to do?</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#2D2D2D] hover:bg-[#3d3d3d] text-white rounded-xl transition-all duration-200 font-medium text-sm"
              >
                <Home className="w-4 h-4" />
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-8 pb-6">
            <p className="text-center text-xs text-[#9a9a9a]">
              A confirmation email will be sent to you shortly.
            </p>
          </div>
        </div>

        {/* Saved 11 Transactions Summary (Optional) */}
        {/* <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between text-[#2D2D2D]">
            <span className="text-xs font-medium flex items-center gap-2">
              <Save className="w-3.5 h-3.5 text-[#C9A581]" />
              Saved IDs: {getSavedTransactions().length}
            </span>
            <span className="text-[10px] text-[#6b6b6b]">Auto-saved locally</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}