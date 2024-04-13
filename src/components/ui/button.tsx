import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                accent: "bg-accent rounded-md text-white bg-gradient-to-br from-[#FB2A29] from-0% via-[#E66C3A] via-100% to-[#DE5A23] to-100% hover:opacity-90 transition",
                outline: "rounded-full bg-bgel text-muted-foreground",
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-white underline-offset-4 hover:underline",
                primary: "bg-[#FF4D00] rounded-full"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-10",
                icon: "h-10 w-10",
            },
            feature: {
                default: "",
                noFocus: "focus-visible:ring-offset-0 focus-visible:ring-0"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            feature: "default"
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    label?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, feature, asChild = false, label, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        if (label)
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, feature, className }))}
                    ref={ref}
                    {...props}
                >
                    {label}
                </Comp>
            );
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, feature, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
