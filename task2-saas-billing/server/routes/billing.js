import express from "express";
import Stripe from "stripe";
import Plan from "../models/Plan.js";
import Invoice from "../models/Invoice.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

// list available plans
router.get("/plans", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

// create a Stripe Checkout session for a plan (test mode)
router.post("/checkout", auth, async (req, res) => {
  try {
    const { planName } = req.body;
    const plan = await Plan.findOne({ name: planName });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/billing?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/billing?canceled=true`,
      client_reference_id: req.user._id.toString(),
      metadata: { planName: plan.name },
    });

    await Invoice.create({
      user: req.user._id,
      plan: plan.name,
      amount: plan.priceMonthly,
      status: "pending",
      stripeSessionId: session.id,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

// current user's billing history
router.get("/history", auth, async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(invoices);
});

export default router;
