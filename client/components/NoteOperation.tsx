"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical, LoaderCircleIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Note } from "@/types";
import { useRouter } from "next/navigation";

const NoteOperation = ({ note }: { note: Note }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteNote = async (event: Event) => {
    event.preventDefault();

    try {
      setIsDeleteLoading(true);

      await fetch(`/api/note/${note._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsDeleteLoading(false);
      setShowDeleteAlert(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-[4px] border transition-colors hover:bg-zinc-500">
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/notes/${note._id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-rose-600 hover:text-rose-700"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Alert Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="rounded-[6px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[4px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              //@ts-ignore
              onClick={deleteNote}
              className="bg-red-600 focus:ring-red-600 rounded-[4px]"
            >
              {isDeleteLoading ? (
                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NoteOperation;
