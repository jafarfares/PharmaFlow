import BreadCrumb from "@/layout/Navbar/components/BreadCrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Preferences from "../components/Preferences";
export default function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center w-full">
      <div className="flex items-center gap-2 px-4 w-full justify-between">
        <div className="flex items-center gap-2  ">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <BreadCrumb />
        </div>

        <div>
          {/* <ModeToggle />
          <Suspense fallback={<span className="inline-block h-8 w-20" />}>
            <LanguageSwitcher />
          </Suspense> */}
          <Preferences />
        </div>
      </div>
    </header>
  );
}
