import Image from "next/image";
import { Suspense } from "react";

import { auth } from "@clerk/nextjs/server";

import "@/app/globals.css";
import Header from "@/components/header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="mx-auto">
      <div className="fixed flex h-[100dvh] w-20 flex-col items-center gap-7 bg-white py-10">
        <Image src="/logo.svg" width={25} height={25} alt="logo" />
        <div className="h-[2px] w-10 rounded-xl bg-gray-400" />
        <Image src="/dashboard/roadmap.svg" width={25} height={25} alt="logo" />
        <Image src="/dashboard/quiz.svg" width={25} height={25} alt="logo" />
      </div>
      <div className="p-10 pl-28">
        <Header />
      </div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
