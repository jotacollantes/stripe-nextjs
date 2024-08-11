import React from "react";
import Stripe from "stripe";
interface Props {
  params: { id: string };
  //searchParams: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const page = async ({ searchParams }: Props) => {
  console.log("searchParams", JSON.stringify(searchParams, null, 2));
  const { payment_intent,payment_intent_client_secret } = searchParams;
  const {status} = await stripe.paymentIntents.retrieve(payment_intent);

  console.log(status);
  return (status==='succeeded') ? <div>Completado</div>:<div>Rechazado</div> ;
};

export default page;
