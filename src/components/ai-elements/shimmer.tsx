import * as React from "react";
import { cn } from "@/lib/utils";

export const Shimmer = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("animate-pulse text-muted-foreground", className)} {...props}>
    {children || "..."}
  </div>
);
