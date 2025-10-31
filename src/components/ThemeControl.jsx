import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeControl = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    } else {
      setIsLight(false);
      document.documentElement.classList.remove("light");
    }
  }, []);

  const themeToggle = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  return (
    <div>
      <button
        onClick={themeToggle}
        className="relative left-10 flex items-center justify-center"
      >
        {isLight ? (
          <Sun className="flex h-6 w-6 items-center justify-center text-amber-500" />
        ) : (
          <Moon className="flex h-6 w-6 items-center justify-center text-white" />
        )}
      </button>
    </div>
  );
};

export default ThemeControl;
