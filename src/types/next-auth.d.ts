import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    firebaseToken?: string;
    user: {
      email: string;
      name: string;
      image: string;
    }
  }
}
