import { Navbar } from "./_components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen space-x-10 py-5">
      <Navbar />
      <main className="w-full lg:pl-[200px] flex items-center my-5 justify-center">
        {children}
      </main>
    </div>
  );
}
