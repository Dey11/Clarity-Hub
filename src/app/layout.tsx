import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/header";
import Providers from "@/components/providers";

import "./globals.css";

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
        <body className={`bg-brand-bg tracking-wide antialiased`}>
          {/* <Header /> */}
          <main className="mx-auto max-w-[1440px]">
            <Suspense>{children}</Suspense>
          </main>
        </body>
      </html>
    </Providers>
  );
}
