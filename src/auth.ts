import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdminModel } from "./models/admin.model";
import { AdminType } from "./types/admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user: AdminType | null = null;

        user = await AdminModel.findOne({
          phone: credentials.phone,
          password: credentials.password,
        });

        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
