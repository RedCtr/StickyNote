import Link from "next/link";
import { Note } from "@/types";
import NoteOperation from "./NoteOperation";
import { format } from "date-fns";

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <div
      className="mt-1 flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-900/70 
      rounded-[6px] hover:cursor-pointer transition-colors"
    >
      <div className="gap-1">
        <Link
          href={`/notes/${note._id}`}
          className="font-semibold hover:underline"
        >
          {note.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(note.updatedAt), "MMMM dd - HH:mm")}
          </p>
        </div>
      </div>
      <NoteOperation note={note} />
    </div>
  );
};

export default NoteItem;
