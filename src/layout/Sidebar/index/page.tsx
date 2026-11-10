import { AppSidebar } from "@/layout/Sidebar/components/app-sidebar";
import Navbar from "@/layout/Navbar/index/page";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/shared/theme-provider"
export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider className="min-h-svh w-full">
        <AppSidebar />

        <SidebarInset className="flex min-w-0 flex-1 flex-col rounded-none">
          <Navbar />

          <main className="flex-1 min-w-0 p-0 ml-5">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
