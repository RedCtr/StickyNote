"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Note } from "@/types";
import { ChevronLeft, Loader } from "lucide-react";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formData = z.object({
  title: z.string(),
  content: z.string(),
});

type FormData = z.infer<typeof formData>;

const NoteEditor = ({ note }: { note: Note }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formData),
  });

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [status, setStatus] = useState(note.status ? "completed" : "pending");

  async function onSubmit(noteData: FormData) {
    console.log("noteData", noteData);

    const taskData = {
      ...noteData,
      status: status === "pending" ? false : true,
    };

    console.log("taskData", taskData);

    try {
      setIsSaving(true);

      // @TODO: no need to add extra call just to set cookie to header bc it was httponly
      //   now we can set it from the frontend directly
      await fetch(`/api/note/${note._id}`, {
        method: "PUT",
        body: JSON.stringify(taskData),
      });

      setIsSaving(false);

      router.refresh();

      return toast.success("Your note has been saved.", {
        id: "succestoast",
        className: "succestoast",
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/notes"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-[6px]"
            )}
          >
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>

          <div className="flex items-center gap-x-3">
            <Select
              onValueChange={(e) => {
                setStatus(e);
              }}
              value={status}
            >
              <SelectTrigger
                className={cn(
                  "w-[160px] focus:outline-none rounded no-underline focus-visible:ring-0 ring-offset-0 ring-0 border-transparent text-gray-900",
                  note.status ? "bg-yellow-400" : "bg-gray-400"
                )}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent
                defaultValue={note.status ? "completed" : "pending"}
              >
                <SelectItem
                  className="focus:outline-none rounded no-underline 
                  focus-visible:ring-0 ring-offset-0 ring-0 border-transparent"
                  value="pending"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  className="focus:outline-none rounded no-underline 
                  focus-visible:ring-0 ring-offset-0 ring-0 border-transparent"
                  value="completed"
                >
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>

            <button
              type="submit"
              className={cn(buttonVariants(), "rounded-[6px]")}
            >
              {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col mx-auto w-[800px] gap-y-6 my-4 lg:my-10 font-raley">
          <Input
            id="title"
            autoFocus
            placeholder="Note Title"
            type="text"
            defaultValue={note.title}
            disabled={isSaving}
            className="w-full resize-none appearance-none ring-offset-0 ring-0 border-transparent overflow-hidden 
            bg-transparent text-5xl font-bold focus:outline-none no-underline py-6 focus-visible:ring-0"
            {...register("title")}
          />

          <Input
            id="content"
            placeholder="type here to write your content ...."
            type="text"
            defaultValue={note.content}
            disabled={isSaving}
            className="rounded-[4px] max-w-[750px] focus:outline-none no-underline focus-visible:ring-0"
            {...register("content", { required: false })}
          />
        </div>
      </div>
    </form>
  );
};

export default NoteEditor;
