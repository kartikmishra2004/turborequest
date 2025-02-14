import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            fullName: user.name,
            photoURL: user.image,
          }),
        });
      } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
      }
      return true;
    },
  }
});