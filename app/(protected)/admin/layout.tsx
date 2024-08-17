import { UserButton } from "@/components/user-button";
import { AdminNavbar } from "./_components/admin-navbar";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    const role = await currentRole();
    return (
        <div className="flex w-full min-h-screen lg:space-x-10 py-5">
            {user && role === UserRole.ADMIN && (
                <div className="lg:block hidden">
                    <AdminNavbar user={user} />
                </div>
            )}
            <div className="w-full lg:pl-[200px] overflow-x-auto flex items-center my-5 justify-center">
                {children}
            </div>
            <div className="lg:hidden fixed w-full h-[60px] bottom-0 left-0 bg-gray-200 flex items-center justify-between px-4">
                {user && role === UserRole.ADMIN &&
                    <>
                        <AdminNavbar user={user} />
                        <UserButton user={user} />
                    </>
                }
            </div>
        </div>
    );
}
