import type { Metadata } from "next";

import "./globals.css";
import { clashDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "TomFlash | Firmware Delivery",
  description: "This site is under development, product by srijan tripathi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clashDisplay.className}>{children}</body>
    </html>
  );
}
