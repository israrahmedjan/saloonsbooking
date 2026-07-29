import Image from "next/image";
import React from "react";

const galleryImages = [
  "/images/pastwork/1.png",
  "/images/pastwork/2.png",
  "/images/pastwork/3.png",
  "/images/pastwork/4.png",
  "/images/pastwork/5.png",
  "/images/pastwork/6.png",
  "/images/pastwork/7.png",
  "/images/pastwork/8.png",
];

function Pastwork() {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h4 className="mb-2 text-secondary font-[500] uppercase tracking-widest">
            Our Portfolio
          </h4>

          <h2 className="mb-4 text-4xl font-[500] text-primary">
            Some of Our Recent Work
          </h2>

          <p className="text-muted-foreground text-lg">
            Explore some of our favorite hairstyles, colors, and beauty
            transformations completed for our happy clients.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl"
            >
              <Image
                src={image}
                alt={`Portfolio ${index + 1}`}
                width={500}
                height={500}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pastwork;