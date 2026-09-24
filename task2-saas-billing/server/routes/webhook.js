import Stripe from "stripe";
import User from "../models/User.js";
import Invoice from "../models/Invoice.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const invoice = await Invoice.findOne({ stripeSessionId: session.id });
    if (invoice) {
      invoice.status = "paid";
      await invoice.save();
      await User.findByIdAndUpdate(invoice.user, { plan: invoice.plan });
    }
  }

  res.json({ received: true });
}
