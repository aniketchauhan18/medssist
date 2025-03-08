import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.BASE_URL! as string,
  plugins: [customSessionClient<typeof auth>()],
});
