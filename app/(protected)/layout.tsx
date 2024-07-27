import { Navbar } from "./_components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-[100vh] w-full p-4 flex gap-x-10 
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      <div className="overflow-hidden min-h-[900px] min-w-[200px]">
        <Navbar />
      </div>
      <div className="flex items-center min-w-[100vh-200px] px-auto">
        {children}
      </div>
    </div>
  );
}
