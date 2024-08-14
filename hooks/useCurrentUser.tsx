import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

// export const useCurrentUser = () => {
//     const session = useSession();

//     if (!session) {
//         return null
//     }

//     return session?.data?.user;
// }

export const useCurrentUser = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    return session?.user;
}