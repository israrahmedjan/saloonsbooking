"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";
import Cartform from "./cartForm";
import { getUserSession, PayNowProcess } from "@/app/lib/auth";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
type FormValues = {
   userId: string;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
};

function CustomerForm() {
   const { cart, removeFromCart } = useCartStore();
   const profileUser = useUserStore((state=>state.user));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
  defaultValues: {
    name: "Israr Ahmed Jan",
    email: "",
    phone: "0332-5691258",
    postalCode: "25600",
    address: "Islamabad",
  },
});

  const onSubmit = async (userData: FormValues) => {
    
    let user = {...userData,prfileUserId:profileUser?.id}
   // console.log("testddd",profileUser?.id);
   await PayNowProcess(user,cart);  
  };


useEffect(() => {
  const fetchUser = async () => {
    const userData = await getUserSession();

    console.log(userData);

    if (userData?.user) {
      reset({
     //   name: "Israr Ahmed Jan",//userData.user.user_metadata?.full_name || "",
        email: userData.user.email || "",
        userId: userData.user.id || "",
        // phone: userData.user.user_metadata?.phone || "",
        // postalCode: userData.user.user_metadata?.postalCode || "",
        // address: userData.user.user_metadata?.address || "",
      });
    }
  };

  fetchUser();
}, [reset]);

  return (

    
   <div className="w-full rounded-2xl  bg-white p-5">
      <h2
        className="text-lg"
      >
        Billing Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[70%_30%]">
      {/* Name & Email */}
      <div className=" shadow-sm rounded-2xl p-5 ">
<div className=" ">
  {/* Name */}
  <div className="mb-7">
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Full Name
    </label>

    <div className="relative">
      <User
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
<input type="hidden" {...register("userId")} />
      <input
        {...register("name", {
          required: "Name is required",
        })}
        placeholder="John Doe"
        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A581] focus:ring-2 focus:ring-[#C9A581]/20"
      />
    </div>

    {errors.name && (
      <p className="mt-2 text-sm text-red-500">
        {errors.name.message}
      </p>
    )}
  </div>

  {/* Email */}
  <div className="mb-7">
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Email Address
    </label>

    <div className="relative">
      <Mail
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="email"
        {...register("email", {
          required: "Email is required",
        })}
        placeholder="john@example.com"
        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A581] focus:ring-2 focus:ring-[#C9A581]/20"
      />
    </div>

    {errors.email && (
      <p className="mt-2 text-sm text-red-500">
        {errors.email.message}
      </p>
    )}
  </div>
</div>

      {/* Phone & Postal Code */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {/* Phone */}
  <div className="mb-7">
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Phone Number
    </label>

    <div className="relative">
      <Phone
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        {...register("phone", {
          required: "Phone number is required",
        })}
        placeholder="+92 300 1234567"
        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A581] focus:ring-2 focus:ring-[#C9A581]/20"
      />
    </div>

    {errors.phone && (
      <p className="mt-2 text-sm text-red-500">
        {errors.phone.message}
      </p>
    )}
  </div>

  {/* Postal Code */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Postal Code
    </label>

    <div className="relative">
      <MapPin
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        {...register("postalCode", {
          required: "Postal code is required",
        })}
        placeholder="54000"
        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A581] focus:ring-2 focus:ring-[#C9A581]/20"
      />
    </div>

    {errors.postalCode && (
      <p className="mt-2 text-sm text-red-500">
        {errors.postalCode.message}
      </p>
    )}
  </div>
</div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <textarea
              rows={4}
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Enter your complete address"
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A581] focus:ring-2 focus:ring-[#C9A581]/20"
            />
          </div>

          {errors.address && (
            <p className="mt-2 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#2D2D2D" }}
        >
          <CreditCard size={18} />
          Pay Now
        </button> */}
        </div>
        <Cartform />
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;