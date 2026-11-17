import { CreateGroupFormData } from "@/schema/groupSchema"
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form"


const MAX_TAGS= 3

export const useTags = (
    selectedTags: string[],
    setValue: UseFormSetValue<CreateGroupFormData>
) => {
    
    const [tagInput, setTagInput] = useState("");

    const addTag = (newTag: string) => {
        const tag = newTag.trim();
        if (!tag) return;
        if (selectedTags.length >= MAX_TAGS) return;
        if (selectedTags.includes(tag)) return // no duplicates

        setValue("tags", [...selectedTags, tag]);
    };

    const removeTag = (tag : string) => {
        setValue("tags", selectedTags.filter((t) => t !== tag));
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;

        if (value.includes(",")) {
            const parts = value.split(",");
            // everything before the last comma get added as tags
            parts.slice(0, -1).forEach((part) => addTag(part));
            // whatever is after the last comma stays in the input, still being typed
            setTagInput(parts[parts.length - 1]);
            return;
        };
        setTagInput(value)
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagInput);
            setTagInput("")
        }

        // backspace on an empty input removes the last tag

        if (e.key === "Backspace" && tagInput === "" && selectedTags.length > 0) {
            removeTag(selectedTags[selectedTags.length -1]);
        }
    }

    
    return {
        tagInput,
        setTagInput,
        addTag,
        removeTag,
        handleTagInputChange,
        handleTagInputKeyDown,
    }
}