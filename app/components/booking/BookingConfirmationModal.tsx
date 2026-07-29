'use client'
import { availabilityType, slotsType } from '@/app/lib/types';
import { CalendarDays, CircleCheck, Clock3 } from 'lucide-react';
import { format } from "date-fns";
import React from 'react'
import { formatTime } from '@/app/lib/supabaseClient';
import { useCartStore } from '@/store/useCartStore';
import RevealWrapper from '../general/RevealWrapper';
type Props = {
  open: boolean;
  selectedSlot: slotsType | null;
  onClose: () => void;
  onConfirm: () => void;
};
export default function BookingConfirmationModal({
  open,
  selectedSlot,
  onClose,
  onConfirm,
}: Props) {
const { addToCart, cart } = useCartStore();
const onConfirmOperations = ()=>{
    if(selectedSlot)
    {
        // alert('data should here', selectedSlot)
     //    console.log(selectedSlot);

    //     addToCart({
    //   id: 1,
    //   name: "iPhone 16",
    //   price: 250000,
    // })
        addToCart(selectedSlot)

    }
   
    onConfirm();
}
    if (!open) return null;

  return (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
  <RevealWrapper className="reveal-up" delay={200}>
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
{/* {JSON.stringify(selectedSlot,null,2)} */}
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <CircleCheck className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Booking
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Please review your appointment details.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-6">

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-primary/10 p-2">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Appointment Date
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                {selectedSlot?.avb_date
                  ? format(
                      new Date(selectedSlot.avb_date),
                      "EEEE, dd MMMM yyyy"
                    )
                  : "-"}
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-primary/10 p-2">
              <Clock3 className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Appointment Time
              </p>

              <p className="mt-1 text-sm font-semibold text-primary">
                {selectedSlot &&
                  `${formatTime(selectedSlot.start_time)} - ${formatTime(
                    selectedSlot.end_time
                  )}`}
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-3">
          <p className="text-xs leading-5 text-yellow-700">
            Please arrive at least <strong>10 minutes</strong> before your
            scheduled appointment.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">

        <button
          onClick={() => onClose()}
          className="flex-1 rounded-3xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-primary transition-all hover:border-secondary hover:bg-secondary"
        >
          Cancel
        </button>

        <button
          onClick={() => {
          //  console.log(selectedSlot);

            // Booking Code Here

            onConfirmOperations();
          }}
          className="flex-1 rounded-3xl bg-secondary py-2.5 text-sm  text-white transition-all duration-200 hover:bg-primary hover:shadow-lg"
        >
          Confirm Booking
        </button>

      </div>
    </div>
    </RevealWrapper>
  </div>
  )
}

