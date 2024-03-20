import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getNoteById } from "@/lib/notes";
import NoteEditor from "@/components/NoteEditor";

type EditPageProps = {
  params: { id: string };
};

const EditorPage = async ({ params }: EditPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const note = await getNoteById(params.id);

  if (!note) {
    notFound();
  }

  return <NoteEditor note={note} />;
};

export default EditorPage;
