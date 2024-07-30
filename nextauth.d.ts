import { UserBlock, UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    OAuth: boolean;
    isBlocked: UserBlock;
}

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendUser
    }
}
