import Link from "next/link";
import { House, ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  breadcrumbs: {
    Salon_slug: string;
    Service_slug: string;
  };
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
     <section
        className="mt-20  py-20 bg-secondary/5 text-white bg-[url('/images/inner-page-2.png')] bg-cover bg-center bg-no-repeat"
      >
    <div className="container mx-auto flex flex-wrap items-center gap-2 text-lg">

      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-secondary"
      >
        <House size={16} className="text-secondary" />
        Home
      </Link>

      <ChevronRight size={16} className="text-secondary" />

      {/* Salons */}
      <Link
        href="/salons"
        className=" transition-colors hover:text-secondary"
      >
        Salons
      </Link>

      <ChevronRight size={16} className="text-secondary" />

      {/* Current Salon */}
      <span className="">
        {breadcrumbs.Salon_slug}
      </span>

      <ChevronRight size={16} className="text-secondary" />

      {/* Current Service */}
      <span className="font-medium text-white">
        {breadcrumbs.Service_slug}
      </span>

    </div>
    </section>
  );
}

export default Breadcrumbs;