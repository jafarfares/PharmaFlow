import Preferences from "@/layout/Navbar/components/Preferences"
import LoginForm from "@/features/auth/login/components/login";
import { QueryProvider } from "@/providers/query-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import {ThemeProvider} from "@/components/shared/theme-provider"
export default function LoginPage() {
  return (
    <ThemeProvider>
    <SidebarProvider className="flex flex-col h-screen p-2">

      <Preferences/>

      <main
      className="relative flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8"
    >
      <QueryProvider>
        <LoginForm />
      </QueryProvider>
    </main>
    </SidebarProvider>
    </ThemeProvider>
    
  );
}
