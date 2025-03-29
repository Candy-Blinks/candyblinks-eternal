import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex w-full bg-white-4 focus:outline-none appearance-none shadow-lg rounded-lg border border-white-4 placeholder:ty-subtext text-white-32 p-1",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
