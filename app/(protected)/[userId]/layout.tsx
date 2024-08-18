import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Navbar } from "./_components/navbar";
import { UserButton } from "@/components/user-button";
import { auth } from "@/auth";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user;
    return (
        <div className="flex w-full min-h-screen lg:space-x-10 py-5">
            {user && (
                <div className="lg:block hidden">
                    <Navbar user={user} />
                </div>
            )}
            <div className="w-full lg:pl-[200px] flex items-center mt-5 mb-12 lg:my-5 justify-center">
                {children}
            </div>
            <div className="lg:hidden fixed w-full h-[60px] bottom-0 left-0 bg-gray-200 flex items-center justify-between px-4">
                {user &&
                    <>
                        <Navbar user={user} />
                        <UserButton user={user} />
                    </>
                }
            </div>
        </div>
    );
}
