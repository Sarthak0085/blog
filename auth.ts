import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { UserBlock, UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "@/data/account"

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("Sign In Callback:", { user, account });
            //Allow OAuth without emailnverification
            if (account?.provider !== "credentials") return true;

            if (!user?.id) {
                return false;
            }

            const existingUser = await getUserById(user?.id as string);
            console.log("Existing User:", existingUser);

            // Prevent signin without email verified
            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }

            // check if two factor authentication is Enabled
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                console.log("Two-Factor Confirmation:", twoFactorConfirmation);

                if (!twoFactorConfirmation) {
                    return false;
                }

                // Delete two factor confirmation for next sign In
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id,
                    }
                })
            }

            return true;
        },
        async session({ token, session }) {
            console.log("Session Callback:", { token, session });

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (token.isTwoFactorEnabled && session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.OAuth = token.OAuth as boolean;
                session.user.image = token.image as string;
                session.user.isBlocked = token.isBlocked as UserBlock;
            }

            return session
        },
        async jwt({ token }) {
            console.log("JWT Callback:", { token });

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            console.log("Existing User in JWT Callback:", existingUser);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);
            console.log("Existing Account in JWT Callback:", existingAccount);

            token.OAuth = !!existingAccount;
            token.role = existingUser.role as UserRole;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;
            token.isBlocked = existingUser.isBlocked;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});