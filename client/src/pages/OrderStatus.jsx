import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "@/hooks/useOrder";
import useCartStore from "@/features/cart/cartStore";

export default function OrderStatus() {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useOrder(id);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (order?.crypto?.status === "finished") {
      clearCart();
    }
  }, [order?.crypt0?.status, clearCart]);

  if (isLoading) return <p>Loading order…</p>;
  if (isError || !order) return <p>Order not found.</p>;

  const cryptoStatus = order.crypto?.status;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Order #{order._id}</h1>

      <p>Total: ${order.totalPrice}</p>
      <p>Order status: {order.status}</p>
      <p>Payment status: {cryptoStatus}</p>

      {cryptoStatus === "finished" && (
        <p className="text-green-600 font-medium mt-4">
          Payment confirmed — thank you!
        </p>
      )}
      {(cryptoStatus === "failed" || cryptoStatus === "expired") && (
        <p className="text-red-600 font-medium mt-4">
          Payment did not complete.
        </p>
      )}
      {["waiting", "confirming", "confirmed", "sending"].includes(
        cryptoStatus,
      ) && (
        <p className="text-yellow-600 font-medium mt-4">
          Waiting for payment confirmation… this page updates automatically.
        </p>
      )}
    </div>
  );
}
