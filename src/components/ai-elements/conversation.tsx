import * as React from "react";
import { cn } from "@/lib/utils";

export const Conversation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col overflow-hidden min-h-0", className)} {...props} />
  )
);
Conversation.displayName = "Conversation";

export const ConversationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto", className)} {...props} />
  )
);
ConversationContent.displayName = "ConversationContent";

export const ConversationScrollButton = () => null;
