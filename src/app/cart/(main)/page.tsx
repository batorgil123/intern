import CartItems from "./_components/cart-items";
import CartClientWrapper from "./_components/cart-client-wrapper";
import CartHeader from "./_components/cart-header";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <div className="w-full  bg-[#F4F4F4] flex flex-col">
      <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CartHeader />
        </Suspense>
        <div className="w-full flex flex-row justify-between">
          <div className="w-3/4 flex flex-row items-center gap-8 py-8">
            <Suspense fallback={<div>Loading...</div>}>
              <CartItems />
            </Suspense>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <CartClientWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
