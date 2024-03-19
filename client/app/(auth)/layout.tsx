import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default AuthLayout;
