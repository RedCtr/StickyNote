"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LoaderCircleIcon, UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserAccountNav({ user }: { user: User }) {
  const router = useRouter();
  const [isloggingOut, setIsloggingOut] = useState(false);
  const signOut = async (e: Event) => {
    e.preventDefault();
    setIsloggingOut(true);

    await fetch("/api/logout", {
      method: "GET",
    });

    setIsloggingOut(false);

    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            <span className="sr-only">{user.firstName}</span>
            <UserRoundIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          {user.email && (
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={signOut}>
          {isloggingOut && (
            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
