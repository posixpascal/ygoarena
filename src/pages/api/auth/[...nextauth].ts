import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/server/prisma";

const adapter = PrismaAdapter(prisma);

// Prisma adapter for NextAuth, optional and can be removed
export const authOptions = {
    //secret: process.env.NEXTAUTH_SECRET,
    adapter,
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
};

export default NextAuth(authOptions);
