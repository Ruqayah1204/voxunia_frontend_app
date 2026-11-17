import { useSignUpMutation } from "@/hooks/auth-hooks"
import { SignUpFormData, signUpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";



export function SignupForm() {
    const {mutate, isPending} = useSignUpMutation();

    const { register, handleSubmit, formState: {errors}} = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = (data: SignUpFormData) => {
        mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-1 space-y-6">
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input {...register("name")} id="fullname" type="text" placeholder="Maya Davies" disabled={isPending} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

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
                {isPending ? "Signing up" : "Create account"}
            </Button>

        </form>
    )
}