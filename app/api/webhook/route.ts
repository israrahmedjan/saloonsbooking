import { stripe } from "@/app/lib/stripe";
import { supabase } from "@/app/lib/supabaseClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read raw body
    const body = await request.text();

    // Get Stripe signature
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe Signature" },
        { status: 400 }
      );
    }

    // Verify webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Webhook Event:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        console.log("✅ Payment Successful");

        const cart: number[] = JSON.parse(session.metadata?.cart || "[]");

        console.log("Appointment IDs:", cart);

        if (cart.length === 0) {
          console.warn("No appointment IDs found in metadata.");
          break;
        }

        const { data, error } = await supabase
          .from("appointments")
          .update({
            status: "approved",
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
          })
          .in("id", cart)
          .select();

        if (error) {
          console.error("Supabase Update Error:", error);
          throw error;
        }

        console.log("Updated Appointments:", data);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      { error: "Webhook Failed" },
      { status: 400 }
    );
  }
}