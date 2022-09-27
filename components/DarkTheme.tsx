import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "phosphor-react";

export default function DarkTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="icon-buttom-xs buttom-gray"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
