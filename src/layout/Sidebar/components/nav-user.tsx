
// "use client";
// import { useState } from "react";
// import { LogOut } from "lucide-react";
// import {useProfile} from "@/features/auth/profile/hook/useProfile"
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";

// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// import { useLogout } from "@/features/auth/logout/hook/useLogout";

// export function NavUser() {
//   const { data} = useProfile();
//   const { mutate: logout, isPending } = useLogout();

//   // Temporary user data
//   const user = {
//     name: "Admin User",
//     email: "admin@admin.com",
//   };

//   const initials = user.name
//     .split(" ")
//     .map((word) => word[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     <SidebarMenu className="gap-2">
//       {/* User Information */}
//       <SidebarMenuItem>
//         <div className="flex items-center gap-3 px-2 py-2">
//           <Avatar className="h-10 w-10 rounded-lg">
//             <AvatarFallback className="rounded-lg">
//               {initials}
//             </AvatarFallback>
//           </Avatar>

//           <div className="grid flex-1 min-w-0 text-left text-sm leading-tight">
//             <span className="truncate font-semibold">
//               {data.name}
//             </span>

//             <span className="truncate text-xs text-muted-foreground">
//               {data.email}
//             </span>
//           </div>
//         </div>
//       </SidebarMenuItem>

//       {/* Logout Button */}
//       <SidebarMenuItem>
//         <SidebarMenuButton
//           onClick={() => logout()}
//           disabled={isPending}
//           className="text-destructive hover:text-destructive hover:bg-destructive/10 flex justify-center items-center"
//         >
//           <LogOut className="size-4" />

//           <span>
//             {isPending ? "Logging out..." : "Log out"}
//           </span>
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }












"use client";
import { Suspense } from 'react'
import { LogOut } from "lucide-react";
import { useProfile } from "@/features/auth/profile/hook/useProfile";
import { useLogout } from "@/features/auth/logout/hook/useLogout";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser() {
  const {
    data,
    isPending,
    isError,
  } = useProfile();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (isPending) {
    return <div className="px-2 py-3 text-sm">Loading user...</div>;
  }

  if (isError || !data) {
    return <div className="px-2 py-3 text-sm">Unable to load user</div>;
  }

  const initials = data.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarMenu className="gap-2">
      <SidebarMenuItem>
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 min-w-0 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {data.name}
            </span>

            <span className="truncate text-xs text-muted-foreground">
              {data.email}
            </span>
          </div>
        </div>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex justify-center items-center"
        >
          <LogOut className="size-4" />
          <span>
            {isLoggingOut ? "Logging out..." : "Log out"}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
