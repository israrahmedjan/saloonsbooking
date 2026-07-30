'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Salon, Service } from '@/app/lib/types';
import Link from 'next/link';
import { Sparkles, Clock, DollarSign, ChevronRight, Timer, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Cart from './Cart';

function SaloonServices({ salons, service_id }: { salons: Salon, service_id: number }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const services = salons.services || [];
  
  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const totalItems = services.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Handle Responsive Items Per View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation Functions
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Get visible services
  const visibleServices = services.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-5">
      <Cart />

      <div className="rounded-2xl bg-white p-5 shadow-sm ">
        {/* Header */}
        <div className="flex flex-col items-start  pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-secondary/10 p-2.5">
              <Sparkles className="h-5 w-5 text-secondary" strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl  font-semibold text-primary">
              Other Services
            </h4>
            <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-500">
              {totalItems}
            </span>
          </div>

          {/* Navigation Buttons */}
          {totalItems > itemsPerView && (
            <div className="flex w-full justify-center items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`rounded-full p-1.5 transition ${
                  currentIndex === 0
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-secondary hover:text-white text-gray-600"
                }`}
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <span className="text-xs text-gray-400">
                {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, totalItems)} of {totalItems}
              </span>
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className={`rounded-full p-1.5 transition ${
                  currentIndex >= maxIndex
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-secondary hover:text-white text-gray-600"
                }`}
              >
                <ChevronRightIcon className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          )}
        </div>

        {/* Services Grid - 5 Items */}
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3">
            {visibleServices.map((service: Service) => (
              <Link
                key={service.id}
                href={`${baseUrl}/salons/${salons.slug}/services/${service.slug}`}
              >
               <div
  className={`group relative rounded-xl px-4 py-4 transition-all duration-200 ${
    service_id === service.id
      ? "bg-gradient-to-br from-secondary/10 to-secondary/5 ring-2 ring-secondary/30 shadow-sm"
      : "bg-gray-50/80 hover:bg-gray-100/80 hover:shadow-sm border border-gray-100/50"
  }`}
>
  <div className="flex items-center justify-between gap-3">
    {/* Left: Service Name */}
    <h3
      className={`text-sm font-medium truncate flex-1 min-w-0 ${
        service_id === service.id ? "text-secondary" : "text-gray-700"
      }`}
    >
      {service.name}
    </h3>

    {/* Right: Price + Arrow */}
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* Price */}
      <div className="flex items-center gap-1">
        <DollarSign
          className="h-3.5 w-3.5 text-emerald-500"
          strokeWidth={2}
        />
        <span
          className={`text-sm font-semibold ${
            service_id === service.id ? "text-secondary" : "text-gray-900"
          }`}
        >
          ${typeof service.price === 'number' ? service.price.toFixed(2) : service.price || "0.00"}
        </span>
      </div>

      {/* Arrow */}
      <div
        className={`rounded-full p-1 transition-all duration-200 ${
          service_id === service.id
            ? "bg-secondary/20 text-secondary"
            : "bg-gray-200/70 text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary"
        }`}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </div>
  </div>

  {/* Active Indicator */}
  {service_id === service.id && (
    <div className="absolute -left-0.5 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-secondary" />
  )}
</div>
              </Link>
            ))}
          </div>

          {/* Dots Indicator */}
          {totalItems > itemsPerView && (
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? "w-6 bg-secondary"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SaloonServices