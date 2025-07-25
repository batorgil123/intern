"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type BagItem = {
  id: string;
  quantity: number;
};

type BagContextType = {
  bagItems: BagItem[];
  addToBag: (id: string) => void;
  removeFromBag: (id: string) => void;
  bagCount: number;
  uniqueBagCount: number;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) throw new Error("useBag must be used within BagProvider");
  return context;
};

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);

  const addToBag = (id: string) => {
    setBagItems((prev) => {
      const found = prev.find((item) => item.id === id);
      if (found) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  const removeFromBag = (id: string) => {
    setBagItems((prev) => {
      const found = prev.find((item) => item.id === id);
      if (!found) return prev;
      if (found.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueBagCount = bagItems.length;

  return (
    <BagContext.Provider
      value={{
        bagItems,
        addToBag,
        removeFromBag,
        bagCount,
        uniqueBagCount,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}; 