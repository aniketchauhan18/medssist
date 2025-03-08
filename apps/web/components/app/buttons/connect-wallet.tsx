"use client";
import { Button } from "@/components/ui/button";
import { WalletCards } from "lucide-react";

export default function ConnectWallet() {
  return (
    <Button className="h-8 bg-neutral-800 hover:bg-neutral-800 hover:opacity-95 duration-200 ease-in-out transition-all px-3 text-sm cursor-pointer flex items-center gap-1">
      <p>Connect Wallet</p>
      <WalletCards size={8} />
    </Button>
  );
}
