"use client";

import { formatTime, supabase } from "@/app/lib/supabaseClient";
import { availabilityType, slotsType } from "@/app/lib/types";
import React, { useEffect, useMemo, useState } from "react";


import {
  CalendarDays,
  Clock3,
  Sunrise,
  Sun,
  Sunset,
  CircleCheck,
  CircleX,
  AlertCircle,
} from "lucide-react";
import BookingConfirmationModal from "./BookingConfirmationModal";


function Slots({ slots }: { slots: availabilityType }) {
  const [timeSlots, setTimeSlots] = useState<slotsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Morning");
  const [showDialog, setShowDialog] = useState(false);
const [selectedSlot, setSelectedSlot] = useState<slotsType | null>(null);
  const max_slots =  slots?.max_slots;
  useEffect(() => {
    if (!slots) return;

    async function getServiceTimeSlots() {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc(
          "get_available_slots",
          {
            p_booking_date: slots.booking_date,
            p_salon_id: slots.salon_id,
            p_service_id: slots.service_id,
            p_open_time: slots.open_time,
            p_close_time: slots.close_time,
            p_slot_duration: slots.duration,
            p_max_slots: max_slots,
          }
        );
        //console.log(slots);
        if (error) throw error;
        setTimeSlots(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getServiceTimeSlots();
  }, [slots]);

  const filteredSlots = useMemo(() => {
    return timeSlots.filter(
      (slot) => slot.time_period === selectedPeriod
    );
  }, [timeSlots, selectedPeriod]);

// disale previouse date slots

// Disable all slots if booking date is in the past
const isPastDate = (() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookingDate = new Date(slots.booking_date);
  bookingDate.setHours(0, 0, 0, 0);

  return bookingDate < today;
})();

  const periodCounts = {
    Morning: timeSlots.filter((x) => x.time_period === "Morning").length,
    Noon: timeSlots.filter((x) => x.time_period === "Noon").length,
    Evening: timeSlots.filter((x) => x.time_period === "Evening").length,
  };

  const periods = [
    { id: "Morning", icon: Sunrise },
    { id: "Noon", icon: Sun },
    { id: "Evening", icon: Sunset },
  ];

  if (slots.is_closed) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <CircleX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-700">Salon Closed</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Time Period Tabs - Top */}
      {/* {JSON.stringify(slots,null,2)} */}
      <div className="bg-white rounded-t-lg border border-gray-100 border-b-0 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-primary" />
            Available Time Slots
          </h3>
          <span className="text-xs text-gray-400">
            {timeSlots.length} total slots
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {periods.map((period) => {
            const isSelected = selectedPeriod === period.id;
            const Icon = period.icon;
            const count = periodCounts[period.id as keyof typeof periodCounts];

            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`
                  flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm
                  ${isSelected
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 ${isSelected ? "text-white" : "text-primary"
                    }`}
                />
                <span className="font-medium">
                  {period.id}
                </span>
                <span
                  className={`
                    px-1.5 py-0.5 rounded-full text-xs
                    ${isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots Grid - Right Content */}
      <div className="bg-white rounded-b-lg border border-gray-100 border-t-0 overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        )}

        {!loading && (
          <div className="flex flex-col">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  {selectedPeriod} Slots
                </h4>
                <p className="text-xs text-gray-400">
                  {filteredSlots.length} slots available
                </p>
              </div>
              {timeSlots[0] && (
                <div className="text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {timeSlots[0]?.avb_date || "Date"}
                  </span>
                </div>
              )}
            </div>

            {/* Slots Grid - Responsive */}
            <div className="p-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                {filteredSlots.length > 0 ? (
                  filteredSlots.map((slot: slotsType, index: number) => {
                    const isAvailable = slot.total_bookings >= slot.max_slots ? false : true;
                    
                    const isFull = slot.slot_status === "Full";
                    // const isPending = slot.slot_status === "Pending";
                  //  console.log(slot);

                    return (
                      <button
                        key={index}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedSlot({...slot,price:slots.price,duration:slots.duration});
                          setShowDialog(true);
                        }}
                        className={`
                          relative bg-white border rounded-lg p-3 text-left transition-all
                        ${
    isPastDate
      ? "border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-60"
      : isAvailable
      ? "border-gray-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm cursor-pointer"
      : isFull
      ? "border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-60"
      : "border-gray-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm cursor-pointer"
  }
`}
                      >
                        {/* Status Indicator */}
                        <div className="absolute top-2 right-2">

                          {isAvailable ? (
                            <CircleCheck className="w-4 h-4 text-primary" />
                          ) : isFull ? (
                            <CircleX className="w-4 h-4 text-gray-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-gray-400" />
                          )}
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Clock3
                            className={`w-3 h-3 ${isAvailable ? "text-primary" : "text-gray-400"
                              }`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {formatTime(slot.start_time)} 
                          </span>
                        </div>

                        <div className="text-xs text-gray-500 ml-4.5">
                          - {formatTime(slot.end_time)}
                        </div>

                        {/* Bookings */}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {slot.total_bookings}/{max_slots} booked
                          </span>
                          <span
                            className={`
                              text-xs px-2 py-0.5 rounded-full
                              ${isAvailable
                                ? "text-primary bg-primary/10"
                                : isFull
                                  ? "text-gray-500 bg-gray-100"
                                  : "text-gray-500 bg-gray-100"
                              }
                            `}
                          >
                            {isAvailable ? "Available" : isFull ? "Full" : "Pending"}
                          </span>
                        </div>

                        {/* Remaining spots */}
                        {isAvailable && slot.total_bookings < 3 && (
                          <div className="mt-1 text-xs text-primary">
                            {slot.max_slots - slot.total_bookings} left - 
                             {isPastDate && (
  <div className="mb-3 rounded-md bg-red-100 p-3 text-sm text-red-600">
    This booking date has already passed.
  </div>
)
                            }
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <Clock3 className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-base font-medium text-gray-500">
                      No {selectedPeriod} Slots
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try selecting another time period
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Dialog box */}
 

{showDialog && (
  
<BookingConfirmationModal
  open={showDialog}
  selectedSlot={selectedSlot}
  onClose={() => setShowDialog(false)}
  onConfirm={() => {
    console.log("Selected",selectedSlot);

    // Booking API
    // router.push(...)
    // Supabase Insert

    setShowDialog(false);
  }}
/>

)}
    
       </div>
  );
}

export default Slots;