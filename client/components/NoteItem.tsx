import Link from "next/link";
import { Note } from "@/types";
import NoteOperation from "./NoteOperation";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <div
      data-testid="note-id"
      className="mt-1 flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-900/70 
      rounded-[6px] hover:cursor-pointer transition-colors"
    >
      <div className="gap-1">
        <div className="flex items-center gap-x-5">
          <Link
            href={`/notes/${note._id}`}
            className="font-semibold hover:underline"
          >
            {note.title}
          </Link>

          <Badge
            variant="default"
            className={cn(
              "text-gray-800",
              note.status
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-gray-400 hover:bg-gray-500"
            )}
          >
            {note.status ? "Completed" : "Pending"}
          </Badge>
        </div>
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
