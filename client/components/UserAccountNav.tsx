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
import { UserRoundIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function UserAccountNav({ user }: { user: User }) {
  const router = useRouter();

  const signOut = (e: Event) => {
    e.preventDefault();

    Cookies.remove("AUTH-TOKEN");

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
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
