import React from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
};

export default RootLayout;
