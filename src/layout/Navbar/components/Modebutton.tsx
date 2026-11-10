"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
 
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-t pt-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? (
                <Sun className="mr-2 size-4" />
              ) : (
                <Moon className="mr-2 size-4" />
              )}

              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
  )
}
