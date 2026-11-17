import { toast } from "@/components/ui/toast";
import { CreateGroupFormData } from "@/schema/groupSchema"
import { cloudinaryUpload } from "@/service/cloudinary-service";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form"


export const useImageUpload = (setValue: UseFormSetValue<CreateGroupFormData>) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

     const handleFile = async (file: File | undefined) => {
        if(!file) return;
        setImagePreview(URL.createObjectURL(file));

        try{
            const uploadedURL = await cloudinaryUpload(file);
            setValue("cover_image_url", uploadedURL);
        } catch (error) {
            console.error("Image upload failed", error)
            toast.add({type: "error", description: "failed to create group"})
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    }

    return {
        imagePreview,
        isDragging,
        setIsDragging,
        handleFile,
        handleDrop,
    }
}