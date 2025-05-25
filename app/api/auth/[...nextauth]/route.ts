import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/session";

const config: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .execute();

      if (existingUser.length === 0) {
        await db.insert(users).values({
          id: crypto.randomUUID(),
          email: user.email,
          name: user.name || profile?.name || null,
          image: user.image || null,
          passwordHash: "",
          role: "user",
        });
      }

      const dbUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .execute();

      await createSession(dbUser[0].id);

      return true;
    },
    async session({ session }) {
      const dbUser = await db
        .select({ id: users.id, role: users.role })
        .from(users)
        .where(eq(users.email, session.user.email))
        .execute();

      if (dbUser[0]) {
        session.user.id = dbUser[0].id;
        session.user.role = dbUser[0].role;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const nextAuth = NextAuth(config);

export const { GET, POST } = nextAuth.handlers;

