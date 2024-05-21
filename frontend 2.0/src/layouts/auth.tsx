import React, { useEffect } from "react";
import axios from "axios";

interface AuthLayout {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayout) {
  useEffect(()=>{
    axios.get()
  });

  return <>{children}</>;
}
