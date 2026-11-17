// components/auth-form.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  LoginFormData,
  loginSchema,
  SignUpFormData,
  signUpSchema,
} from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation, useSignUpMutation } from "@/hooks/auth-hooks";
import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";

export function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex flex-col min-h-screen max-w-md items-center justify-center px-4 py-10">
        <Link href="/" className="mb-8">
          <Image
            src="/voxunia-logo1.png"
            alt="voxunia-logo"
            width={200}
            height={50}
            priority
            className=""
          />
        </Link>
        <Card className="w-full shadow-lift p-7 ">
          <CardContent className="p-0">
            <h1 className="text-2xl font-bold tracking-tight">
              {isSignup ? "Create your organizer account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignup
                ? "Host live Q&A sessions in minutes"
                : "Log in to your meetup groups"}
            </p>
          </CardContent>
          {isSignup ? <SignupForm /> : <LoginForm />}

          <p className="mt-2 text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>
                Already have an account? {""}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </>
            )}
          </p>
        </Card>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Attendees don&apos;t need an account.{" "}
          <Link
            href="/join"
            className="font-medium text-foreground hover:underline"
          >
            Join a session →
          </Link>
        </p>
      </div>
    </div>
  );
}
