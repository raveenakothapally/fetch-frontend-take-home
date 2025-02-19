"use client";

import { logoutAction } from "@/actions/auth";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Automatically trigger logout on page load
    logoutAction();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-gray-500">
          Please wait while we log you out of your account.
        </p>
      </div>
    </div>
  );
}
