import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeControl = () => {
  const [isDark, setIsDark] = useState(true);

  const themeToggle = () => {
    setIsDark((p) => !p);
  };

  return (
    <div>
      <button
        onClick={themeToggle}
        className="relative left-10 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="flex h-6 w-6 items-center justify-center text-white" />
        ) : (
          <Sun className="flex h-6 w-6 items-center justify-center text-amber-500" />
        )}
      </button>
    </div>
  );
};

export default ThemeControl;
