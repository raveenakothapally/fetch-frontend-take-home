import type { Metadata } from "next";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/notifications/styles.css";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Analytics } from "@vercel/analytics/next";

import Header from "./_components/Header";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Create Next App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("fetch-access-token");

  // Get user info if authenticated
  let userEmail, userName;
  if (accessToken) {
    const decodedToken = jwtDecode<{ name: string; email: string }>(
      accessToken.value
    );
    // In a real app, you'd decode the token or fetch user data
    userName = decodedToken.name;
    userEmail = decodedToken.email;
  }

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header
            isAuthenticated={!!accessToken}
            userEmail={userEmail || ""}
            userName={userName || ""}
          />
          <main>{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
