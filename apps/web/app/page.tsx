"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  return (
    <main className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-5xl font-bold">Welcome to Medssist</h1>
      <Link
        href={`/${session.data?.user?.userType}/${session.data?.user?.id}`}
        className="w-full flex justify-center mt-4"
      >
        <Button className="bg-dodger-blue-700 hover:bg-dodger-blue-700 hover:opacity-90 transition-all duration-200 ease-in-out cursor-pointer text-white w-full max-w-sm">
          Go to Dashboard
        </Button>
      </Link>
    </main>
  );
}
