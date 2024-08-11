import { CheckoutForm } from "@/components/PaymentForm/CheckoutForm";
import React from "react";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const getIntentPayment = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      //amount: Number(amount) * 100,
      amount: Number(35) * 100,
      currency: "USD",
      automatic_payment_methods: { enabled: true },
    });
    //console.log("paymentIntent.client_secret",JSON.stringify(paymentIntent.client_secret, null, 2));

    return { clientIntentSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.log(error);
    return { clientIntentSecret: null };
  }
};

const page = async () => {
  
  const { clientIntentSecret } = await getIntentPayment();
  return (
    <CheckoutForm clientIntentSecret={clientIntentSecret} />
  );
};

export default page;
