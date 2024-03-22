import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import NoteCreationButton from "@/components/NoteCreationButton";
import NoteHeader from "@/components/NoteHeader";
import { getAllNotesByUser } from "@/lib/notes";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { NotebookPen } from "lucide-react";
import NoteItem from "@/components/NoteItem";

export const metadata = {
  title: "Home Note Page",
};

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const notes = await getAllNotesByUser();

  return (
    <div>
      <NoteHeader heading="Notes" text="Create and manage notes.">
        <NoteCreationButton variant="default" />
      </NoteHeader>
      <div className="my-3">
        {notes && notes.length ? (
          <div className="notes-test flex flex-col gap-y-1">
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <NotebookPen className="h-10 w-10" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">No Notes created</h2>
              <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
                You don&apos;t have any notes yet. Start creating content.
              </p>

              <NoteCreationButton variant="outline" />
            </div>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
}
