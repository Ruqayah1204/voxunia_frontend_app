"use client"


import { Header } from "@/components/header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGroup } from "@/hooks/groups-hook";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTags } from "@/hooks/useTags";
import { CreateGroupFormData, createGroupSchema } from "@/schema/groupSchema";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImageIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { useForm } from "react-hook-form";

const MAX_TAGS = 3;

export default function GroupForm(){
    
    const user = useAuthStore((state) => state.user)
    const {mutate, isPending} = useCreateGroup()
    
    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<CreateGroupFormData>({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {tags: []},
    })

    const description = watch("description") ?? "";
    const selectedTags = watch("tags") ?? [];

    const {imagePreview, isDragging, setIsDragging, handleFile, handleDrop} = useImageUpload(setValue);
    const {tagInput, removeTag, handleTagInputChange, handleTagInputKeyDown} = useTags(selectedTags, setValue);


    const onSubmit = (data: CreateGroupFormData) => {
       mutate(data)
    }
    

    return (
        <div className="min-h-screen">
            <Header variant="app" user={user?.name} />
            <main className="mx-auto max-w-2xl py-10 px-4 sm:px-6">
                <Link href="/dashboard"
                    className="inline-flex w-full items-center  gap-2 rounded-full text-muted-foreground hover:text-primary transition sm:w-auto"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to dashboard
                </Link>
                <h1 className="mt-8 text-3xl font-bold tracking-tight font-bricolage">Create a group</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Set up a home for your recurring meetup. You can edit these details anytime.
                </p>
                <form 
                    className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-3">
                        <Label className="font-semibold uppercase tracking-wide text-muted-foreground">Cover Image</Label>
                        <div
                            onDragOver={(e) => {e.preventDefault(); setIsDragging(true)}}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-8 transition ${
                                isDragging ? "border-primary bg-primary/5" : "border-border bg-background"
                            }`}
                        >
                            {imagePreview ? (
                                <Image src={imagePreview} alt="cover preview" 
                                    width={100} 
                                    height={100}
                                    className="rounded-lg object-cover"
                                />
                            ) : (
                                <div className="grid h-12 w-12 place-items-center rounded-full bg-background">
                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground">Drag & drop or</p>
                            <Label className="cursor-pointer rounded-full bg-accent px-4 py-1.5 text-accent-foreground hover:brightness-95">
                                Browse files
                                <Input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files?.[0])}
                                />
                            </Label>
                            <p className="text-xs text-muted-foreground">PNG or JPG, max 10MB</p>
                        </div>
                    </div>

                    {/* Group name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className=" font-semibold uppercase tracking-wide text-muted-foreground">
                            Group name
                        </Label>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Austin Tech Enthusiasts"
                            className="bg-background h-10 p-4"
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="font-semibold uppercase tracking-wide text-muted-foreground">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            maxLength={280}
                            placeholder="Monthly meetup for local tech builders, designers, and founders who want to build better products and connect with the community."
                            className="bg-background p-4 resize-none"
                        />
                        <p className="text-right text-xs text-muted-foreground">{description.length}/280 characters</p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label htmlFor="tags" className="font-semibold uppercase tracking-wide text-muted-foreground">
                            Tags (up to {MAX_TAGS}) 

                        </Label>
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {selectedTags.map(tag => (
                                    <p key={tag} className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="flex items-center justify-center hover:text-red-600"
                                            aria-label={`Remove ${tag}`}
                                        >
                                            x
                                        </button>
                                    </p>
                                ))}
                            </div>
                        )}
                        <Input
                            id="tags"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagInputKeyDown}
                            placeholder={selectedTags.length >=MAX_TAGS ? "Maximum reached" : "Enter a tag, comma-seperated or enter"}
                            disabled={selectedTags.length >= MAX_TAGS}
                            className="bg-background p-4 resize-none"
                        />
                        {errors.tags && <p className="text-xs text-red-500">{errors.tags.message}</p>}
                    </div>

                    {/* Location and Link */}
                    <div className="grid sm:grid-cols-2 gap-4 space-y-3 sm:space-y-0">
                        <div className="space-y-2">
                            <Label htmlFor="location" className="font-semibold uppercase tracking-wide text-muted-foreground">
                                Location
                            </Label>
                            <Input
                                id="location"
                                {...register("location")}
                                placeholder="e.g Austin, TX or online"
                                className="bg-background p-4 resize-none"
                            />
                        </div>
                        {/* buttons */}
                        <div className="space-y-2">
                            <Label htmlFor="virtual-link" className="font-semibold uppercase tracking-wide text-muted-foreground">
                                Virtual Link (optional)

                            </Label>
                            <Input
                                id="virtual-link"
                                {...register("virtual_link")}
                                placeholder="https://meet.google.com/..."
                                className="bg-background p-4 resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end items-center pt-3 border-t border-border">
                        <Link href="/dashboard"
                            className="w-full sm:w-auto text-center rounded-full font-semibold text-sm border border-border bg-background px-4 py-2 transition hover:bg-secondary"
                        >
                            Cancel
                        </Link>
                        <Button type="submit" className="w-full sm:w-auto font-semibold rounded-full py-4.5 px-4" disabled={isPending}>
                            {isPending ? "loading..." : "Create group"} 
                        </Button>
                    </div>
                </form>

            </main>
        </div>
    )
}