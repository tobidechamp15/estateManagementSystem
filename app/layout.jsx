import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "ESMs",
  description:
    "Showcasing the projects and skills of Oluwatobiloba, a dedicated and passionate developer specializing in web development and design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
