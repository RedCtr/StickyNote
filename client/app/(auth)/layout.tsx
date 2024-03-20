import Toast from "@/components/provider/Toast";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {children}
      <Toast />
    </div>
  );
};

export default AuthLayout;
