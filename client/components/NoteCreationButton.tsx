"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LoaderCircleIcon, Plus } from "lucide-react";

type Variant = "default" | "outline";
const NoteCreationButton = ({ variant }: { variant: Variant }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${post.id}`);
  }

  return (
    <button
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
      New post
    </button>
  );
};

export default NoteCreationButton;
