import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { connect } from "@/server/db/client";
import { checkUserExists } from "@/server/helpers";
import dotenv from "dotenv";
dotenv.config();

const client = await connect();

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.DB_NAME!)),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    additionalFields: {
      userType: {
        type: "string",
      },
    },
  },
  secret: process.env.AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      const us = await checkUserExists(session.userId);
      return {
        user: {
          ...user,
          userType: us.userType,
        },
        session,
      };
    }),
  ],
});
