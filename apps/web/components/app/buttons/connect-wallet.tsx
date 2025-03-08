
"use client";
import { WalletCards } from "lucide-react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";

import Web3 from 'web3';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum: any;
    }
}

export default function ConnectWallet() {
    const [account, setAccount] = useState<string | null>(null);
    const [, setError] = useState<string | null>(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (err) {
                console.error(err);
                setError('Failed to connect wallet');
            }
        } else {
            setError('MetaMask is not installed');
        }
    };

    return (
        <div className=''>
            {/* <h1>Connect MetaMask Wallet</h1> */}
            {account ? (
                <div>
                    <p>Connected Account: {account}</p>
                </div>
            ) : (
              <Button onClick= {connectWallet} className="h-8 bg-neutral-800 hover:bg-neutral-800 hover:opacity-95 duration-200 ease-in-out transition-all px-3 text-sm cursor-pointer flex items-center gap-1">
              <p>Connect Wallet</p>
              <WalletCards size={8} />
            </Button>
            )}
        </div>
    );
};