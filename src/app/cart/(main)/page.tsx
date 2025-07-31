import CartItems from "./_components/cart-items";
import CartClientWrapper from "./_components/cart-client-wrapper";
import CartHeader from "./_components/cart-header";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="w-full h-screen bg-gray-200 flex flex-col">
        <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
          <CartHeader />
          <div className="w-full flex flex-row justify-between">
            <div className="w-3/4 flex flex-row items-center gap-8 py-8">
              <CartItems />
            </div>
            <CartClientWrapper />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
