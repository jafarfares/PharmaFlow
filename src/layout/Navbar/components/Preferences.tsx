import LanguageSwitcher from "@/components/shared/language-switcher"
import { Button } from "@/components/ui/button";
import {ModeToggle} from "@/layout/Navbar/components/Modebutton"
//import { useTheme } from "next-themes"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Settings2 } from "lucide-react";

export default function Preferences() {
  // const { theme } = useTheme();
  
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon">
            <Settings2 className="size-4" />
          </Button>
        }
      />

      <PopoverContent align="end" className="w-64 p-4">
        <div className="space-y-4">

          <h3 className="font-semibold">Preferences</h3>

          {/* Language */}
          <LanguageSwitcher/>

          {/* Dark Mode */}
          <ModeToggle/>

        </div>
      </PopoverContent>
    </Popover>
  );
}
