"use client";
import toast from "react-hot-toast";

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  duration?: number; // optional
}

export const showConfirmToast = ({
  message,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  duration = Infinity,
}: ConfirmToastProps) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-slate-800">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    ),
    { duration, position: "top-center" }
  );
};
