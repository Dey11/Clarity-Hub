import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { auth } from "@clerk/nextjs/server";

import "@/app/globals.css";
import Header from "@/components/header";
import { Loading } from "@/components/ui/loading";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="mx-auto">
      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-row items-center justify-around bg-white py-3 shadow-lg md:h-[100dvh] md:w-20 md:flex-col md:items-center md:justify-center md:gap-7 md:py-10 md:shadow-none">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/logo.svg" width={25} height={25} alt="logo" />
        </Link>
        <div className="hidden h-[2px] w-10 rounded-xl bg-gray-400 md:block" />
        <Link href={"/generate"} className="flex items-center justify-center">
          <Image
            src="/dashboard/roadmap.svg"
            width={25}
            height={25}
            alt="logo"
          />
        </Link>
        <Link
          href={"/generate-quiz"}
          className="flex items-center justify-center"
        >
          <Image src="/dashboard/quiz.svg" width={25} height={25} alt="logo" />
        </Link>
      </div>

      <div className="p-5 pb-16 md:p-10 md:pl-28">
        <Suspense
          fallback={
            <div className="h-10">
              <LoadingSpinner size="sm" />
            </div>
          }
        >
          <Header />
        </Suspense>
      </div>
      <Loading>{children}</Loading>
    </div>
  );
}
