// app/(auth)/signup/page.tsx
import { AuthForm } from "@/components/auth/auth-form";

export const metadata = { title: "Sign Up — Voxunia" };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
