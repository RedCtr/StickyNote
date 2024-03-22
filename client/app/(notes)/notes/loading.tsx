import NoteCreationButton from "@/components/NoteCreationButton";
import NoteHeader from "@/components/NoteHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <NoteHeader heading="Notes" text="Create and manage notes.">
        <NoteCreationButton variant="default" />
      </NoteHeader>
      <div className="flex flex-col gap-y-1 my-3">
        {Array.from({ length: 3 }).map((item, idx) => (
          <div key={idx} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-2/5 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
