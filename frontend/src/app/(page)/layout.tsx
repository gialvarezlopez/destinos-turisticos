"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/commons/header";
import { Footer } from "@/components/commons/footer";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
