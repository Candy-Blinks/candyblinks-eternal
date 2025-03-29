import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, placeholder, ...props }, ref) => {
  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        "flex min-h-[64px] w-full bg-white-4 shadow-lg rounded-lg border border-white-4 placeholder:ty-subtext text-white-32 p-[8px]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
