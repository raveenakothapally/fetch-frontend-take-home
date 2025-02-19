"use client";

import { Button } from "@mantine/core";
import { IconArrowLeft, IconDog } from "@tabler/icons-react";
import Link from "next/link";

export default function LoggedOutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg text-center">
        <div className="mx-auto bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <IconDog className="text-blue-600" size={32} />
        </div>

        <h1 className="text-2xl font-bold mb-3">You've been logged out</h1>
        <p className="text-gray-600 mb-6">
          Thank you for using Dog Finder. You have been successfully logged out
          of your account.
        </p>

        <Link href="/login">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            fullWidth
            leftSection={<IconArrowLeft size={18} />}
          >
            Return to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
