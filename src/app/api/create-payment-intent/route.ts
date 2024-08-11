import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  // const rest = await req.json()
  // const { amount } = rest;

  try {
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
    //return new NextResponse(paymentIntent.client_secret, { status: 200 })
    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    //return new NextResponse(error, {status: 400,});
    return NextResponse.json(
      { respuesta: "Client id error" },
      {
        status: 400,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY },
    {
      status: 200,
    }
  );
}
