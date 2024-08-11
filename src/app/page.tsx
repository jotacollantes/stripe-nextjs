"use client";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { PaymentForm } from "@/components/PaymentForm/PaymentForm";
import { getStripe } from "@/utils";
import { getIntentPayment } from "@/libs";
// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );
const stripePromise=getStripe()

export default function Home() {
  //const [stripePromise, setStripePromise] = useState<any>(stripePromise);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  // useEffect(() => {
  //   console.log("entra por el public key");
  //   fetch("api/create-payment-intent", {
  //     method: "GET",
  //   }).then(async (result) => {
  //     const { publishableKey } = await result.json();
  //     console.log({publishableKey});
  //     setStripePromise(await loadStripe(publishableKey));
  //   });
  // }, []);

  useEffect(() => {
    console.log("entra por el intent");
    // fetch("api/create-payment-intent", {
    //   method: "POST",
    //   body: JSON.stringify({}),
    // }).then(async (result) => {
    //   const { client_secret } = await result.json();
    //   setClientSecret(client_secret)
    //   console.log({client_secret});
    // });
    //! Con server Action
    getIntentPayment().then(({ clientSecret }) => {
      setClientSecret(clientSecret);
    });
  }, []);

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
          <PaymentForm  />
        </Elements>
      )}
    </div>
  );
}
