import * as React from "react";
import { cn } from "@/lib/utils";

export const Message = ({ from, children }: { from: string; children: React.ReactNode }) => (
  <div className={cn("flex", from === "user" ? "justify-end" : "justify-start")}>
    <div className={cn("max-w-[80%]", from === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
      {children}
    </div>
  </div>
);

export const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-3 rounded-lg", className)} {...props} />
);
MessageContent.displayName = "MessageContent";

export const MessageResponse = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("whitespace-pre-wrap", className)} {...props} />
);
MessageResponse.displayName = "MessageResponse";
