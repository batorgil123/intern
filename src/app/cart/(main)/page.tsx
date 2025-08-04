import CartItems from "./_components/cart-items";
import CartClientWrapper from "./_components/cart-client-wrapper";
import CartHeader from "./_components/cart-header";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

export default function CartPage() {
  return (
    <div className="w-full  bg-[#F4F4F4] flex flex-col">
      <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
        <Suspense fallback={<Spinner size="lg" />}>
          <CartHeader />
        </Suspense>
        <div className="w-full flex flex-row justify-between">
          <div className="w-3/4 flex flex-row items-center gap-8 py-8">
            <Suspense fallback={<Spinner size="lg" />}>
              <CartItems />
            </Suspense>
          </div>
          <Suspense fallback={<Spinner size="lg" />}>
            <CartClientWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
