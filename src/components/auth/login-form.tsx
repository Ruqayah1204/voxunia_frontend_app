import { useLoginMutation } from "@/hooks/auth-hooks"
import { LoginFormData, loginSchema} from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";



export function LoginForm() {
    const {mutate, isPending} = useLoginMutation();

    const { register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-1 space-y-6">
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="you@example.com" disabled={isPending}/>
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" type="password" placeholder="••••••••" disabled={isPending}/>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full rounded-full bg-primary px-4 py-5 text-sm font-semibold text-background" disabled={isPending}>
                {isPending ? "Loading..." : "Log in"}
            </Button>
        </form>
    )
}