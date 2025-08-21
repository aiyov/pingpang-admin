import Navbar from "@/components/layout/sidebar";

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}