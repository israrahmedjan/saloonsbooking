import { Calendar, Clock3, DollarSign, Star, Users, ThumbsUp } from "lucide-react";

interface ServiceHeaderProps {
  service: {
    name?: string;
    price?: number | string;
    duration?: number | string;
    max_slots?: number;
  };
  averageRating?: string | null;
  reviewCount?: number;
  salonName?: string;
}

export default function ServiceHeader({ 
  service, 
  averageRating, 
  reviewCount = 0,
  salonName 
}: ServiceHeaderProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 sm:gap-4 lg:gap-6">
        
        {/* ============================================ */}
        {/* LEFT SECTION: Title & Salon Name */}
        {/* ============================================ */}
        <div className="flex w-full lg:w-auto items-center gap-2 sm:gap-3">
          {/* Icon - Chota */}
          <div className="flex-shrink-0 rounded-lg sm:rounded-xl bg-secondary/10 p-2 sm:p-2.5 md:p-3">
            <Calendar 
              className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary" 
              strokeWidth={1.5} 
            />
          </div>
          
          {/* Title - Chota */}
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-base md:text-2xl lg:text-3xl font-semibold text-gray-900 truncate  sm:max-w-[250px] md:max-w-[450px] lg:max-w-[500px] whitespace-nowrap">
            Our Service :  {service?.name || "Service Name"}
            </h1>
            {salonName && (
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate max-w-[100px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                by {salonName}
              </p>
            )}
          </div>
        </div>

        {/* ============================================ */}
        {/* DIVIDER - Desktop */}
        {/* ============================================ */}
        <div className="hidden lg:block h-8 w-px bg-gray-200 flex-shrink-0" />

        {/* ============================================ */}
        {/* RIGHT SECTION: All Badges - Chota */}
        {/* ============================================ */}
        <div className="flex w-full flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3">
          
          {/* ========================================== */}
          {/* RATING BADGE - Chota */}
          {/* ========================================== */}
          <div className="flex items-center gap-1 rounded-lg sm:rounded-xl bg-gray-100 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 flex-shrink-0">
            <Star 
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" 
              strokeWidth={1.5} 
            />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
              {averageRating || "✨"}
            </span>
            <span className="text-[8px] sm:text-[10px] text-gray-500 whitespace-nowrap">
              ({reviewCount})
            </span>
          </div>

          {/* ========================================== */}
          {/* PRICE BADGE - Chota */}
          {/* ========================================== */}
          <div className="flex items-center gap-1 rounded-lg sm:rounded-xl bg-gray-100 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2  flex-shrink-0">
            <DollarSign 
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-600" 
              strokeWidth={1.5} 
            />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
              ${typeof service?.price === 'number' ? service.price.toFixed(2) : service?.price || "0"}
            </span>
          </div>

          {/* ========================================== */}
          {/* DURATION BADGE - Chota */}
          {/* ========================================== */}
          <div className="flex items-center gap-1 rounded-lg sm:rounded-xl bg-blue-50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2  flex-shrink-0">
            <Clock3 
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-600" 
              strokeWidth={1.5} 
            />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
              {service?.duration || "60"}m
            </span>
          </div>

          {/* ========================================== */}
          {/* SLOTS BADGE - Chota */}
          {/* ========================================== */}
          {service?.max_slots && (
            <>
              <span className="hidden sm:inline text-gray-300 text-xs">|</span>
              
              <div className="flex items-center gap-1 rounded-lg sm:rounded-xl bg-purple-50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2   flex-shrink-0">
                <Users 
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-purple-600" 
                  strokeWidth={1.5} 
                />
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  {service.max_slots}
                </span>
                <span className="hidden xs:inline text-[8px] sm:text-[10px] text-gray-500 whitespace-nowrap">
                  slots
                </span>
              </div>
            </>
          )}

          {/* ========================================== */}
          {/* POPULAR BADGE - Chota */}
          {/* ========================================== */}
          {reviewCount > 5 && (
            <>
              <span className="hidden sm:inline text-gray-300 text-xs">|</span>
              
              <div className="flex items-center gap-1 rounded-lg sm:rounded-xl bg-rose-50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 border  flex-shrink-0">
                <ThumbsUp 
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-rose-600" 
                  strokeWidth={1.5} 
                />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-rose-700 whitespace-nowrap">
                  Popular
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}