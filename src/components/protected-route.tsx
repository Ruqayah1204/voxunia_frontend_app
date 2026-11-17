"use client"

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogoLoader } from "./loader";



export function ProtectedRoute({children}:{children: React.ReactNode}) {
    const {isAuthenticated, isLoading} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if(isLoading) {
        return <LogoLoader/>
    }

    if(!isAuthenticated){
        return null;
    }

    return <>{children}</>
}