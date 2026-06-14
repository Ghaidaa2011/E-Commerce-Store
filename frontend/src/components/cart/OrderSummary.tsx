import { motion } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const user = useUserStore((state) => state.user);

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original price
            </dt>
            <dd className="text-base font-medium text-white">
              ${formattedSubtotal}
            </dd>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">
                -${formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-emerald-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={async () => {
            try {
              let orderId = null;

              const lines: string[] = ["New Order", "=================="];
              if (user) {
                if (user.name) lines.push(`Name: ${user.name}`);
                if (user.email) lines.push(`Email: ${user.email}`);
              }
              lines.push("\nOrder details:");
              cart.forEach((item) => {
                const lineTotal = (item.price * item.quantity).toFixed(2);
                lines.push(
                  `${item.quantity} x ${item.name} - $${item.price.toFixed(2)} = $${lineTotal}`,
                );
              });
              lines.push("\nSubtotal: $" + subtotal.toFixed(2));
              if (coupon && isCouponApplied) {
                const discountValue = (
                  subtotal *
                  (coupon.discountPercentage / 100)
                ).toFixed(2);
                lines.push(
                  `Coupon: ${coupon.code} (-${coupon.discountPercentage}%)`,
                );
                lines.push(`Discount: -$${discountValue}`);
              }
              lines.push("Total: $" + total.toFixed(2));
              if (orderId) lines.push("Order ID: " + orderId);

              const message = lines.join("\n");

              const phone =
                (import.meta.env.VITE_WHATSAPP_NUMBER as string) || "";
              if (!phone) {
                toast.error(
                  "WhatsApp number not configured. Set VITE_WHATSAPP_NUMBER in frontend env.",
                );
                return;
              }

              const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
              window.open(waLink, "_blank");
            } catch (error: any) {
              console.error(error);
              toast.error("Failed to open WhatsApp");
            }
          }}
        >
          Proceed to Checkout (WhatsApp)
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;
