"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LoaderCircleIcon, Plus } from "lucide-react";
import { Note } from "@/types";

type Variant = "default" | "outline";
const NoteCreationButton = ({ variant }: { variant: Variant }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    setIsLoading(true);

    try {
      // @TODO: no need to add extra call just to set cookie to header bc it was httponly
      //  now we can set it from the frontend directly
      const res = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Note",
          content: "",
        }),
      });

      setIsLoading(false);

      const note = (await res.json()) as Note;

      // This forces a cache invalidation.
      router.refresh();

      router.push(`/notes/${note._id}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <button
      id="newnote"
      onClick={onClick}
      className={cn(buttonVariants({ variant }), "font-raley rounded-md", {
        "cursor-not-allowed opacity-60": isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      New task
    </button>
  );
};

export default NoteCreationButton;
