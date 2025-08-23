'use client';
import Navbar from "@/components/layout/sidebar";
import { useEffect } from "react";

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}