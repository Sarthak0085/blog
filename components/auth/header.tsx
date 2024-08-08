import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className={cn("text-2xl font-semibold flex items-center gap-2", font.className)}>
        🔐<span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Vortex Vista</span>
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
