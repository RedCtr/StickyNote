import React from "react";

const EmptyPlaceholder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex min-h-[400px] flex-col items-center justify-center rounded-[4px] 
    border border-dashed p-8 text-center"
    >
      {children}
    </div>
  );
};

export default EmptyPlaceholder;
