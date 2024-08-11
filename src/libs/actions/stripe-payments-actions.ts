"use server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export const getIntentPayment = async () => {
  try {
    stripe.reviews.retrieve;
    const paymentIntent = await stripe.paymentIntents.create({
      //amount: Number(amount) * 100,
      amount: Number(35) * 100,
      currency: "USD",
      automatic_payment_methods: { enabled: true },
    });
    console.log(
      "paymentIntent.client_secret",
      JSON.stringify(paymentIntent.client_secret, null, 2)
    );

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.log(error);
    return { clientSecret: null };
  }
};

export const verifyPayment = async (id: string) => {
  try {
    const review = await stripe.paymentIntents.retrieve(id);
    console.log(review);
  } catch (error) {
    console.log(error);
  }
};
