import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";

import Providers from "@/components/providers";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ClarityHub",
  description:
    "Learn with High-Quality Study Materials , Read AI-curated content , Watch recommended educational videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`bg-brand-bg ${dmSans.className} tracking-wide antialiased`}
        >
          <main className="mx-auto">
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <LoadingSpinner size="lg" />
                    <p className="text-brand-logo-text">
                      Loading ClarityHub...
                    </p>
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </body>
      </html>
    </Providers>
  );
}
