import LoginButton from "@/components/auth/login-button";
import { Blogs } from "@/components/blog/blogs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div
      className="flex w-full h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
     from-sky-400 to-blue-800"
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
        <Blogs />
      </div>
    </div>
  );
}
