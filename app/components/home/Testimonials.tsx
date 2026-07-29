"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Client",
    review:
      "Amazing service! My haircut and color turned out exactly how I wanted.",
  },
  {
    id: 2,
    name: "Emily Davis",
    role: "Bride",
    review:
      "The bridal makeup was flawless. I received compliments all day long.",
  },
  {
    id: 3,
    name: "Jessica Smith",
    role: "Customer",
    review:
      "Very friendly staff and relaxing atmosphere. Highly recommended.",
  },
  {
    id: 4,
    name: "Olivia Brown",
    role: "Customer",
    review:
      "Professional service with great attention to detail. Loved it!",
  },
  {
    id: 5,
    name: "Sophia Wilson",
    role: "Customer",
    review:
      "Best salon experience I've had. Definitely coming back.",
  },
  {
    id: 6,
    name: "Emma Taylor",
    role: "Customer",
    review:
      "Excellent service and affordable prices. Thank you!",
  },
];

function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        <div className="mb-12 text-center">
          <h4 className="text-secondary font-[500] uppercase">
            Testimonials
          </h4>

     <h2 className="mt-2 text-4xl font-[500]">
         What Our Clients Say
          </h2>

          <p className="mt-4 max-w-2xl mx-auto ">
            Hear what our happy customers have to say about their salon
            experience.
          </p>
        </div>

        <Swiper
         className="pb-14"
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-xl p-8 shadow-sm hover:shadow-lg transition">
                <div className="mb-5 text-5xl text-secondary">“</div>

                <p className=" leading-7">
                  {item.review}
                </p>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm ">
                    {item.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Testimonials;