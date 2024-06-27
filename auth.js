import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "./database/model/user-model";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;
                const user = await User.findOne({ email });
                if (!user) return null;
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!passwordMatch) return { error: "Wrong credentials!" };
                return user;
            },
        }),
    ],
});
