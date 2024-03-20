import React from "react";
import { Inter, Raleway } from "next/font/google";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

import Toast from "@/components/provider/Toast";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const railay = Raleway({
  subsets: ["latin"],
  variable: "--font-raley",
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col space-y-6",
        inter.className,
        railay.variable
      )}
    >
      <Navigation user={user} />

      <div className="container flex-1">
        <main className="flex w-full mx-auto flex-col max-w-3xl overflow-hidden">
          {children}

          <Toast />
        </main>
      </div>
    </div>
  );
}
