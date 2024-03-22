import { User } from "@/types";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserAccountNav } from "./UserAccountNav";

const Navigation = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background px-4 lg:px-10">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/notes" className="flex items-center space-x-2">
          <NotebookPen />
          <span className="font-bold sm:inline-block">Sticky Task</span>
        </Link>

        <UserAccountNav user={user} />
      </div>
    </header>
  );
};

export default Navigation;
