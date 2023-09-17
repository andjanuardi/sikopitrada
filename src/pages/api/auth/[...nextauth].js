import { dbData } from "@/models/dbConn";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const q = `SELECT *,${credentials.ta} as ta, (select db from t_dbsimda where ta=${credentials.ta}) as db FROM  v_user WHERE user='${credentials.user}' AND pass='${credentials.pass}'`;

        const userdata = await dbData(q);
        const user = userdata[0];

        if (credentials.user === user.user && credentials.pass === user.pass) {
          return { name: user };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user, update }) {
      // Send properties to the client, like an access_token and user id from a provider.
      delete session.user.name.pass;
      session = session.user.name;
      return session;
    },
  },
};
export default NextAuth(authOptions);
