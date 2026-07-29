"use client";

import { supabase } from "@/app/lib/supabaseClient";
import React, { useEffect, useMemo, useState } from "react";

import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isToday,
} from "date-fns";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { availabilityType, Service } from "@/app/lib/types";
import Slots from "./slots";
import SaloonServices from "./SaloonServices";
import { Salon } from "@/app/lib/types";

function CalendarContant({ salons, salon_id, service }: { salons: Salon; salon_id: number; service: Service }) {
  const [availability, setAvailability] = useState<availabilityType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<availabilityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 0 }),
    [currentDate]
  );

  const weekEnd = useMemo(
    () => endOfWeek(currentDate, { weekStartsOn: 0 }),
    [currentDate]
  );

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
      }),
    [weekStart, weekEnd]
  );

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const previousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  useEffect(() => {
    async function getSalonAvailability() {
      try {
        setLoading(true);
        const start_date = format(weekStart, "yyyy-MM-dd");
        const end_date = format(weekEnd, "yyyy-MM-dd");

        const { data, error } = await supabase
          .rpc("get_salon_availability", {
            start_date,
            end_date,
            p_salon_id: salon_id,
          });

        if (error) throw error;

        const availabilityData = data ?? [];
        setAvailability(availabilityData);

        const currentDaySlot =
          availabilityData.find(
            (item: availabilityType) =>
              item.booking_date === format(currentDate, "yyyy-MM-dd")
          ) ?? null;

        if (currentDaySlot) {
          setAvailableSlots({ ...currentDaySlot, salon_id: salon_id, service_id: service?.id });
        }
      } catch (error: unknown) {
        console.log(
          "Supabase Error:",
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    getSalonAvailability();
  }, [salon_id, service?.id, currentDate, weekStart, weekEnd]);

  const showAvailableSlots = (slots: availabilityType) => {
    setAvailableSlots({
      ...slots,
      salon_id,
      service_id:service?.id,
    });
  };

  const toggleDayExpand = (date: string) => {
    setExpandedDays(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-primary text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* {JSON.stringify(salons?.services?.length,null,2)} */}
        {/* Left Column - Calendar List */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
              <button
                onClick={previousWeek}
                className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 w-full sm:w-auto justify-center border border-gray-100 rounded-lg hover:border-primary/30 hover:text-primary transition text-sm"
              >
                <ChevronLeft size={14} />
                <span className="hidden xs:inline">Prev</span>
                <span className="xs:hidden">‹</span>
              </button>

              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays size={16} className="text-primary flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-700">
                    {format(weekStart, "MMMM yyyy")}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {format(weekStart, "dd MMM")} - {format(weekEnd, "dd MMM yyyy")}
                </p>
              </div>

              <button
                onClick={nextWeek}
                className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 w-full sm:w-auto justify-center border border-gray-100 rounded-lg hover:border-primary/30 hover:text-primary transition text-sm"
              >
                <span className="hidden xs:inline">Next</span>
                <span className="xs:hidden">›</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* List View Days */}
            <div className="space-y-2 sm:space-y-3">
              {days.map((day) => {
                const dayData = availability.find(
                  (item) => item.booking_date === format(day, "yyyy-MM-dd")
                );

                const isSelected = dayData && availableSlots?.booking_date === format(day, "yyyy-MM-dd");
                const isExpanded = expandedDays.includes(format(day, "yyyy-MM-dd"));
                const hasSlots = dayData && !dayData.is_closed;

                return (
                  <div
                    key={day.toString()}
                    className={`
                      rounded-lg border transition-all overflow-hidden
                      ${isSelected ? "border-secondary/10 border shadow-md bg-secondary/10" : "border-gray-100"}
                      ${hasSlots ? "cursor-pointer hover:border-secondary/30" : "cursor-default"}
                    `}
                  >
                    {/* Day Header */}
                    <div
                      onClick={() => {
                        if (hasSlots) {
                          toggleDayExpand(format(day, "yyyy-MM-dd"));
                          showAvailableSlots(dayData);
                        }
                      }}
                      className="flex items-center justify-between p-3 sm:p-4 "
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Date Circle */}
                        <div className={`
                          w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold flex-shrink-0
                          ${isToday(day) ? "bg-primary text-white" : "bg-secondary text-white"}
                          ${isSelected && !isToday(day) ? "border-2 border-primary/50" : ""}
                        `}>
                          {format(day, "d")}
                        </div>
                        
                        <div>
                          <div className="text-sm sm:text-base font-medium text-gray-700">
                            {format(day, "EEEE")}
                          </div>
                          <div className="text-xs sm:text-sm text-primary/80">
                            {format(day, "MMMM d, yyyy")}
                          </div>
                          {dayData && !dayData.is_closed && (
                            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                              <Clock size={12} className="text-primary" />
                              <span>{dayData.open_time} - {dayData.close_time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        {dayData && (
                          dayData.is_closed ? (
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">
                              Closed
                            </span>
                          ) : (
                            <span className="text-xs text-primary text-white bg-secondary px-2 sm:px-3 py-1 rounded-full">
                              Available
                            </span>
                          )
                        )}
                        {hasSlots && (
                          <div className="text-gray-400 hover:text-primary transition">
                            {isExpanded ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details with Slots */}
                    {isExpanded && dayData && !dayData.is_closed && (
                      <div className="border-t border-gray-100">
                        {/* Day Details */}
                        <div className="p-3 sm:p-4 bg-gray-50/50 border-b border-gray-100">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock size={14} className="text-primary flex-shrink-0" />
                              <span>Open: <strong className="text-gray-800">{dayData.open_time}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock size={14} className="text-primary flex-shrink-0" />
                              <span>Close: <strong className="text-gray-800">{dayData.close_time}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              
                                 {service?.duration || 30} min Time
                                {/* {JSON.stringify(dayData,null,2)} */}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Slots Component - Inside the expanded day */}
                        <div className="p-3 sm:p-4">
                          <Slots slots={{ 
                            ...dayData, 
                            salon_id: salon_id, 
                            service_id: service?.id,
                            price:service?.price,
                            duration:service?.duration,
                            max_slots:service?.max_slots,
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Services */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-4">
            {salons && <SaloonServices salons={salons} service_id={service?.id} />}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CalendarContant;