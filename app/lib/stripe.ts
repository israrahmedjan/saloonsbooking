import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-ignore
   apiVersion: "2025-06-30.basil", // ya aapke account ki current version
});