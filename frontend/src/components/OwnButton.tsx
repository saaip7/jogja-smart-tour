import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-[12px] md:text-[13px] lg:text-[14px] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " bg-primary-500 text-white hover:bg-[#0E6095] active:bg-[#1269A0]",
        outline:
          "border border-darkBlue1 bg-transparent hover:bg-lightBlue1 text-darkBlue1 font-semibold",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        none: "hover:bg-yellow-500",
        "default-brown": "bg-brown-100 text-white hover:bg-yellow-700 active:bg-yellow-500",
        "default-white": "bg-white text-yellow-900 hover:bg-yellow-900 hover:text-white active:bg-brown-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  as?: React.ElementType; // Update the type for the "as" prop
}

const OwnButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, as: Component = "button", ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Component : "button"; // Use React.ElementType

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
OwnButton.displayName = "Button";

export { OwnButton, buttonVariants };