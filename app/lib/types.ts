// For Grid Define the type for a service and salon, including their properties and relationships 
export type Service = {
  id: number;
  name: string;
  price: number;
  slug: string;
  duration: number;
  max_slots:number;
};


 export type Salon = {
    id: number;
    name: string;
    slug: string;
    services?: Service[];
    salon_gallery?: SalonGallery[];
    salon_addresses?: SalonAddress[];
  };

// Detail Page Define the type for a salon, including its properties and relationships with services, gallery, and addresses


// type SalonDetail = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;

//   services?: Service[];

//   salon_gallery?: SalonGallery[];

//   salon_addresses?: SalonAddress[];
// };


// export type Service = {
//   id: number;
//   name: string;
//   price: number;
//   duration: number;
// };


 type SalonGallery = {
  id: number;
  title: string;
  alt_text: string;
  image_url: string;
  is_featured: boolean;
};


type SalonAddress = {
  id: number;
  city: string;
  country: string;
};

export type availabilityType = {
  salon_id?: number;
  service_id?:number;
  booking_date: string;
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  remarks?: string | null;
  price: number;
  duration?:number | 0;
  max_slots?:number | 0;
};


// {
//     "booking_date": "2026-07-05",
//     "serie_day": "sunday   ",
//     "day_of_week": "sunday",
//     "open_time": "09:00:00",
//     "close_time": "17:00:00",
//     "is_closed": true,
//     "remarks": null
//   },


export type slotsType = {
  user_id: number;
  salon_id: number | 0;
  service_id:number;
  avb_date: string;
  booking_date: string;
  service_name: string;
  start_time: string;
  end_time: string;
  time_period: string;
  total_bookings: number;
  max_slots: number;
  slot_status: string;
  price:number;
  duration?:number | 30;
}

export type SessionUser = {
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
    };
  };
};
export type UserProfile = {
  id:number;
  auth_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_role: string | null;
  status: boolean | null;
};


