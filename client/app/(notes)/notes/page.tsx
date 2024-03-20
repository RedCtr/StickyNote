import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import NoteCreationButton from "@/components/NoteCreationButton";
import NoteHeader from "@/components/NoteHeader";
// import { EmptyPlaceholder } from "@/components/empty-placeholder"
// import { PostItem } from "@/components/post-item"

export const metadata = {
  title: "Home Note Page",
};

export default async function HomePage() {
  const user = await getCurrentUser();
  console.log("user", user);

  if (!user) {
    redirect("/login");
  }

  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // })

  return (
    <div>
      <NoteHeader heading="Notes" text="Create and manage notes.">
        <NoteCreationButton />
      </NoteHeader>
      <div>
        {/* {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )} */}
      </div>
    </div>
  );
}
