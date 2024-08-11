"use client";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { PaymentForm } from "@/components/PaymentForm/PaymentForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
interface Props {
    clientIntentSecret: string | null
}
export const CheckoutForm=({clientIntentSecret}:Props)=> {
  //const [stripePromise, setStripePromise] = useState<any>(stripePromise);
  const [clientSecret, setClientSecret] = useState(clientIntentSecret);
  const options = {
    clientSecret: clientSecret,
    appearance: { theme: "stripe" },
  };
  return (
    <div>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && (
        //theme: 'stripe'||'night'||'flat'
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}
