import { stripe } from "@/app/lib/stripe";
import { supabase } from "@/app/lib/supabaseClient";
import { slotsType } from "@/app/lib/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { user, cart } = body;

        console.log("my userdfd",user);
        // check befor send data
        if (!user || !cart) {
            return NextResponse.json(
                { message: "User and cart are required." },
                { status: 400 }
            );
        }

        if (!Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json(
                { message: "Cart is empty." },
                { status: 400 }
            );
        }

        if (!user.userId || !user.email) {
            return NextResponse.json(
                { message: "Invalid user data." },
                { status: 400 }
            );
        }
        const cartMeta = cart.map((item: slotsType) => ({
            salon_id: item.salon_id,
            service_id: item.service_id,
            avb_date: item.avb_date,
            start_time: item.start_time,
            end_time: item.end_time,
        }));

        const serviceNames = cart.map((item: slotsType) => item.service_name).join(", ");
        const totalPrice = cart.reduce((sum: number, item: slotsType) => sum + item.price, 0);
        if (totalPrice <= 0) {
            return NextResponse.json(
                { message: "Invalid total amount." },
                { status: 400 }
            );
        }

        //.log(serviceNames);
        const saveAppointment = await saveAppointments(cart, user);
        if (saveAppointment.length > 0) {
            // return false;
            const session = await stripe.checkout.sessions.create({
                mode: "payment",

                payment_method_types: ["card"],

                line_items: [
                    {
                        price_data: {
                            currency: "usd",

                            product_data: {
                                name: serviceNames,
                            },

                            unit_amount: totalPrice * 100,
                        },

                        quantity: 1,
                    },
                ],

                success_url: "http://localhost:3000/payment",

                cancel_url: "http://localhost:3000/payment",

                metadata: {
                    userId: user.userId,
                    email: user.email,
                    phone: user.phone,
                    cart: JSON.stringify(saveAppointment),
                },

                payment_intent_data: {
                    metadata: {
                        userId: user.userId11,
                        email: user.email,
                        phone: user.phone,
                        cart: JSON.stringify(saveAppointment),
                    },
                },
            });

            return NextResponse.json(session);
            //     return NextResponse.json({data:"Inpprogress"});

        }

    } catch (error) {
         console.error("Stripe Checkout Error:");
  console.dir(error, { depth: null });

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create checkout session.",
            },
            {
                status: 500,
            }
        );
    }

}

export const saveAppointments = async (cart: slotsType[], user:any) => {
    try {
        console.log("saveAppointments called");

        const saveResult = cart.map((item: slotsType) => ({
            user_id: user.prfileUserId,
            userId_Auth: user.userId,
            salon_id: item.salon_id,
            service_id: item.service_id,
            booking_date: item.avb_date,
            start_time: item.start_time,
            end_time: item.end_time,
            status: "pending",
        }));

        const { data, error } = await supabase
            .from("appointments")
            .insert(saveResult)
            .select();

        if (error) {
            throw error;
        }

     //   console.log("Appointments saved successfully:", data);
        const appointmentIds = data?.map((item) => item.id);

        //console.log(appointmentIds);
        return appointmentIds;
    } catch (error) {
        console.error("Error saving appointments:", error);

        // Agar caller ko bhi error handle karwani ho
        throw error;

        // Agar throw nahi karna to iski jagah:
        // return null;
    }
};