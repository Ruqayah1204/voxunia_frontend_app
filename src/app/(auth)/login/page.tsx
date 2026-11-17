// app/(auth)/login/page.tsx
import { AuthForm } from "@/components/auth/auth-form";

export const metadata = { title: "Log In — Voxunia" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}