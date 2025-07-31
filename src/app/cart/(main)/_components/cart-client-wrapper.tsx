"use client";

import { useState } from "react";
import CartSummary from "./cart-summary";
import OrderDialog from "./order-dialog";

export default function CartClientWrapper() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleOrderClick = () => {
    setShowAlertDialog(true);
  };

  return (
    <>
      <CartSummary onOrderClick={handleOrderClick} />
      <OrderDialog 
        open={showAlertDialog} 
        onOpenChange={setShowAlertDialog} 
      />
    </>
  );
} 