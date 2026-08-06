import axios from "axios";

const client = axios.create({
  baseURL: "https://api.nowpayments.io/v1",
  headers: { "x-api-key": process.env.NOWPAYMENTS_API_KEY },
});

async function createInvoice({ orderId, amountUSD, description }) {
  const { data } = await client.post("/invoice", {
    price_amount: amountUSD,
    price_currency: "usd",
    order_id: orderId,
    order_description: description,
    ipn_callback_url: `${process.env.SERVER_URL}/api/payments/crypto/webhook`,
    success_url: `${process.env.CLIENT_URL}/orders/${orderId}?payment=success`,
    cancel_url: `${process.env.CLIENT_URL}/orders/${orderId}?payment=cancelled`,
  });
  return data;
}

export default createInvoice;
