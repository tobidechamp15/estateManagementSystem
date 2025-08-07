import Header from "@/components/Header";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      <>{children}</>
    </div>
  );
}
