import { X } from "phosphor-react";
import { useEffect } from "react";

interface Props {
  scheme?: "success" | "warning" | "info" | "error";
  position?: "bottom" | "top";
  open: boolean;
  title: string;
  message: string;
  onClose: (close: boolean) => void;
}

export default function Toast({
  scheme = "info",
  position = "bottom",
  open = false,
  title,
  message,
  onClose,
}: Props) {
  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        onClose(false);
      }, 5000);
    }
  }, [open]);

  return (
    <div
      className={`w-full flex justify-start p-5 fixed transition-all delay-200 ${
        position === "bottom" ? "bottom-0" : "top-0"
      } right-0 left-0 z-50 ${
        open ? "ml-0 opacity-100" : "-ml-[100%] opacity-0"
      }`}
    >
      <div
        className={`w-[80vw] max-w-sm relative p-5 ${
          (scheme === "info" &&
            "bg-sky-700 text-white bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 dark:bg-sky-300 dark:backdrop-blur-sm") ||
          (scheme === "success" &&
            "bg-green-700 text-white bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 dark:bg-green-300 dark:backdrop-blur-sm") ||
          (scheme === "warning" &&
            "bg-yellow-500 text-white bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 dark:bg-yellow-300 dark:backdrop-blur-sm") ||
          (scheme === "error" &&
            "bg-red-600 text-white bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 dark:bg-red-300 dark:backdrop-blur-sm")
        } shadow-xl rounded-md`}
      >
        <strong className="font-bold block mb-1">{title}</strong>
        <span className="font-light">{message}</span>
        <button onClick={() => onClose(false)}>
          <X className="absolute top-3 right-3 text-lg" />
        </button>
      </div>
    </div>
  );
}
