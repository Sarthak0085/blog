import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            authorize: async (credentials) => {
                const vaidatedFields = LoginSchema.safeParse(credentials);
                if (vaidatedFields.success) {
                    const { email, password } = vaidatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (passwordMatch) return user;

                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig