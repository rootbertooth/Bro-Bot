import * as React from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface PromptInputProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit?: (message: { text?: string }) => void;
  children?: React.ReactNode;
}

export const PromptInput = ({ onSubmit, children, className, ...props }: PromptInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("message") as string;
    if (onSubmit && text?.trim()) {
      onSubmit({ text: text.trim() });
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </form>
  );
};

export const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }
      onKeyDown?.(e);
    };

    return (
      <textarea
        ref={ref}
        name="message"
        className={cn("w-full p-2 border rounded-md resize-none", className)}
        rows={3}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
PromptInputTextarea.displayName = "PromptInputTextarea";

export const PromptInputFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex justify-between items-center", className)}>{children}</div>
);

export const PromptInputSubmit = ({ status, disabled, className }: { status?: string; disabled?: boolean; className?: string }) => (
  <button type="submit" disabled={disabled} className={cn("inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50", className)}>
    <Send className="size-4" />
  </button>
);
