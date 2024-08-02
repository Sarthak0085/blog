import { Navbar } from "./_components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen space-x-4 py-5">
      <div className="fixed hidden lg:block w-[200px] max-w-[400px] top-5 left-3 overflow-y-auto">
        <Navbar />
      </div>
      <main className="w-full lg:pl-[200px] flex items-center my-5 justify-center">
        {children}
      </main>
    </div>
  );
}
