"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function DarkMode() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onClick={toggleTheme}
          className="border inline-flex  size-9 rounded-full justify-center items-center bg-accent"
        >
          <Sun className="size-4 hidden dark:block " />
          <Moon className="size-4 block dark:hidden" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
