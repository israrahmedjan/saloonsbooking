"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { format } from "date-fns";
import {
  Calendar,
  Clock3,
  Timer,
  Trash2,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { getUserSession, PayNowProcess } from "@/app/lib/auth";

function Cart() {
  const router = useRouter();

  const { cart, removeFromCart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price ?? 0),
    0
  );

  // Stripe dummy data
  const payment = {
    userId: 12,
    amount: 150,
    currency: "usd",
  };

  const PayNow = async () => {

    const userData = await getUserSession();
    PayNowProcess(userData, cart);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
      {/* Heading */}
      {/* {JSON.stringify(cart,null,2)} */}
      <div className="mb-6 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Your Booking
        </h2>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 && (
        <p className="text-sm text-gray-500">
          No booking selected.
        </p>
      )}

      {/* Cart Items */}
      <div className="space-y-4 ">
        {cart.map((item) => (
          <div
            key={`${item.salon_id}-${item.service_id}-${item.start_time}`}
            className="rounded-lg p-4 border-secondary/10 border-b"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-primary">
                  {item.service_name}
                </h3>

                <div className="mt-3 space-y-2  text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(item.avb_date), "MMMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center  gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>
                      {format(new Date(`1970-01-01T${item.start_time}`), "hh:mm a")} -{" "}
                      {format(new Date(`1970-01-01T${item.end_time}`), "hh:mm a")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <span>{item.duration} mins</span>
                  </div>
                </div>

                <p className="mt-3 text-lg font-semibold text-secondary">
                  $ {item.price}
                </p>
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  removeFromCart(
                    item.salon_id,
                    item.service_id,
                    item.start_time
                  )
                }
                className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="mt-6 border-secondary/20 border-t pt-5">
          <div className="mb-5 flex items-center justify-between text-lg font-semibold">
            <span>Total</span>

            <span className="text-primary">
              $ {totalPrice}
            </span>
          </div>

          <button
            onClick={() => router.push("/payment")}
            className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-2xl bg-secondary hover:bg-primary/80 px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            <CreditCard className="h-5 w-5" />
            Continue to Payment
          </button>
        </div>
      )}

    </div>
  );
}

export default Cart;